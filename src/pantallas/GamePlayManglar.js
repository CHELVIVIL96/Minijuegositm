var GRAVEDAD_Y = 200;
var AMOUNT_BASUREROS = 0;
var AMOUNT_REMOLINOS = 0;
var cant_plat = 0;
var cant_tron = 0;
var flagResultEndGame = false;
var segundosLagarto = 0;
var sizeBola;
var ballNeeded = false;
var flagArrangeBall = false;
var flagSetNewBall = true;
var frameBola = 0;
var currentScore = 0;
var flagTimer = false;
var flagDropBall = false;
var flagEndGame = false;
var colisionRemolino = false;
var faseActual = 0;
var segundosTroncoTrampa = 0;
var currentLevel = 0;
var music;
var PuntajeTrashLvl1, PuntajeTrashLvl2, PuntajeTrashLvl3;

var GamePlayManglar = function() {};

//nivel 1
GamePlayManglar.prototype = {
  init: function(){
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      game.scale.setGameSize(game.width, game.height);
      game.world.setBounds(0, 0, game.width, game.height);
    //   game.scale.forcePortrait=true;
    //   game.scale.refresh();

      //Resetear valores
      currentLevel=1;
      AMOUNT_BASUREROS = 4;
      AMOUNT_REMOLINOS = 2;
      cant_tron = 4;
      cant_plat = 7;
      flagDropBall = false;
      flagEndGame = false;
      flagResultEndGame=false;
      segundosLagarto = 0;
      ballNeeded = false;
      flagArrangeBall = false;
      flagSetNewBall = true;
      currentScore = 0;
      flagTimer = false;
  },
  create: function(){
    if(music.isPlaying==true){
      music.play();
      music.volume=1;
    }
      /********************************Materiales del juego*******************************************/
      game.physics.startSystem(Phaser.Physics.P2JS);
      game.physics.p2.gravity.y = GRAVEDAD_Y;
      this.worldMaterial = game.physics.p2.createMaterial('worldMaterial');
      game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
      this.materialPlataforma = game.physics.p2.createMaterial('materialPlataforma');
      this.materialTronco = game.physics.p2.createMaterial('materialTronco');
      this.materialBasurero = game.physics.p2.createMaterial('materialBasurero');

      //Array de troncos
      this.troncos=[];
      //Array de plataformas
      this.plataformas=[];
      //Array de basureros
      this.basureros=[];
      //Array de remolino
      this.remolinos=[];

      //Fondo
      var fondo = game.add.sprite(0,0,'fondoLimpio');
      fondo.width = game.width;
      fondo.height = game.height;

      //Remolino
      this.remolino0 = game.add.sprite((game.width*52)/100,(game.height*14)/100,'remolino');
      this.remolino0.width = (game.height*10)/100;
      this.remolino0.height = (game.height*10)/100;
      this.remolino0.anchor.setTo(0.5);

      this.remolino1 = game.add.sprite((game.width*78)/100,(game.height*48)/100,'remolino');
      this.remolino1.width = (game.height*10)/100;
      this.remolino1.height = (game.height*10)/100;
      this.remolino1.anchor.setTo(0.5);

      this.remolinos[0] = this.remolino0;
      this.remolinos[1] = this.remolino1;

      //Bola
      frameBola = Math.floor(Math.random() * 17);
      /*Size de la bola*/
      sizeBola = (game.height*6)/100;

      this.bola_basura=game.add.sprite(game.width-100,0,'basuras',frameBola);

      if(frameBola < 5)
          this.tipoBola = 1;
      else if(frameBola > 4 && frameBola < 10)
          this.tipoBola = 0;
      else if(frameBola > 9 && frameBola < 14)
          this.tipoBola = 2;
      else
          this.tipoBola = 3;

      this.bola_basura.width = sizeBola;
      this.bola_basura.height = sizeBola;

      //Plataformas
      var platLimpio1 = game.add.sprite(game.width,(game.height*13)/100,'platLimpio1');
      platLimpio1.width = (game.width*25)/100;
      platLimpio1.height = (game.height*3)/100;
      platLimpio1.x=(game.width)-(platLimpio1.width/3.5);

      var platLimpio2 = game.add.sprite((game.width*44.5)/100,(game.height*18.8)/100,'platLimpio2');
      platLimpio2.width = (game.width*38)/100;
      platLimpio2.height = (game.height*3)/100;

      var platLimpio3 = game.add.sprite((game.width*45)/100,(game.height*45)/100,'platLimpio3');
      platLimpio3.width = (game.width*50)/100;
      platLimpio3.height = (game.height*3)/100;

      var platLimpio4 = game.add.sprite((game.width*42)/100,(game.height*70)/100,'platLimpio4');
      platLimpio4.width = (game.width*48)/100;
      platLimpio4.height = (game.height*3)/100;

      var platLimpio5 = game.add.sprite((game.width*42)/100,(game.height*88)/100,'platLimpio5');
      platLimpio5.width = (game.width*58)/100;
      platLimpio5.height = (game.height*3)/100;

      var platBas1= game.add.sprite(game.width,(game.height*37)/100,'platBas1');
      platBas1.width = (game.width*65)/100;
      platBas1.height = (game.height*3)/100;

      var platBas2= game.add.sprite((game.width*0)/100,(game.height*81)/100,'platBas2');
      platBas2.width = (game.width*40)/100;
      platBas2.height = (game.height*3)/100;

      this.plataformas[1] = platLimpio1;
      this.plataformas[2] = platLimpio2;
      this.plataformas[3] = platLimpio3;
      this.plataformas[4] = platLimpio4;
      this.plataformas[5] = platLimpio5;
      this.plataformas[6] = platBas1;
      this.plataformas[7] = platBas2;

      /*Controles individuales de plataformas*/
      for(var i=1; i<=cant_plat; i++){
          this.plataformas[i].anchor.setTo(0.5);
          game.physics.p2.enable(this.plataformas[i]);
          switch(i){
              case 1:
                      this.plataformas[i].body.angle=-25;
              break;
              case 2:
                      this.plataformas[i].body.angle=10;
              break;
              case 3:
                      this.plataformas[i].body.angle=30;
              break;
              case 4:
                      this.plataformas[i].body.angle=-10;
              break;
              case 5:
                      this.plataformas[i].body.angle=-13;
              break;
          }
          this.plataformas[i].body.setMaterial(this.materialPlataforma);
          this.plataformas[i].body.motionState=2;
          this.plataformas[i].body.mass=0;
      }

      //BASUREROS
      this.bolaCollisionGroup = game.physics.p2.createCollisionGroup();
      this.basureroCollisionGroup = game.physics.p2.createCollisionGroup();


       var basurero_0 = game.add.sprite((game.width*74)/100,(game.height*31)/100,'basureros');
          basurero_0.frame = 0;
          var basurero_1 = game.add.sprite((game.width*10)/100,(game.height*53)/100,'basureros');
          basurero_1.frame = 1;
          var basurero_2 = game.add.sprite((game.width*9)/100,(game.height*75)/100,'basureros');
          basurero_2.frame = 2;
          var basurero_3 = game.add.sprite((game.width*84)/100,(game.height*91)/100,'basureros');
          basurero_3.frame = 3;

          this.basureros[0] = basurero_0;
          this.basureros[0].id = 0;
          this.basureros[1] = basurero_1;
          this.basureros[1].id = 1;
          this.basureros[2] = basurero_2;
          this.basureros[2].id = 2;
          this.basureros[3] = basurero_3;
          this.basureros[3].id = 3;

          for (var i = 0; i < this.basureros.length; i++) {
              this.basureros[i].width=(game.width*17)/100;
              this.basureros[i].height=(game.height*10)/100;
              game.physics.p2.enable(this.basureros[i],true);
              this.basureros[i].body.motionState=2;
              this.basureros[i].body.mass=0;
              this.basureros[i].body.clearShapes();
              this.basureros[i].body.setMaterial(this.materialBasurero);

          }

      //Lagarto
      this.lagarto = game.add.sprite((game.width*-2)/100,(game.height*76)/100,'lagarto',0);
      this.lagarto.width = (game.width*50)/100;
      this.lagarto.height = (game.height*20)/100;


      //Barra tiempo
      this.barraTiempo = game.add.sprite(0,(game.height*6)/100,'barraTiempo');
      this.barraTiempo.width = (game.width*22)/100;
      this.barraTiempo.height = (game.height*1)/100;

      //Reloj
      this.reloj = game.add.sprite(0,(game.height*8)/100,'reloj');
      this.reloj.width = (game.width*5)/100;
      this.reloj.height = (game.height*4)/100;

      //Troncos


      /*Controloes individuales de cada tronco*/
      for (var i = 0; i < cant_tron; i++) {
          switch(i){
              case 0:
                  this.troncos[i]=game.add.sprite((game.width*72.5)/100,(game.height*18.6)/100,"tronco")
                  this.troncos[i].width = (game.width*18)/100;
                  this.troncos[i].height = (game.height*3.5)/100;
                  game.physics.p2.enable(this.troncos[i]);
                  this.troncos[i].body.angle=-15;
                  this.troncos[i].body.clearShapes();
                  this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);
              break;
              case 1:
                  this.troncos[i]=game.add.sprite((game.width*14.5)/100,(game.height*34)/100,"tronco2")
                  this.troncos[i].width = (game.width*26)/100;
                  this.troncos[i].height = (game.height*3.5)/100;
                  game.physics.p2.enable(this.troncos[i]);
                  this.troncos[i].body.angle=34;
              break;
              case 2:
                  this.troncos[i]=game.add.sprite((game.width*82)/100,(game.height*64)/100,"tronco")
                  this.troncos[i].width = (game.width*30)/100;
                  this.troncos[i].height = (game.height*3)/100;
                  game.physics.p2.enable(this.troncos[i]);
                  if(this.isPixel2XL){
                      this.troncos[i].body.y=(game.height*66)/100;
                  }
                  this.troncos[i].body.angle=-15;
                  this.troncos[i].body.clearShapes();
                  this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);
              break;
              case 3:
                  this.troncos[i]=game.add.sprite((game.width*83)/100,(game.height*81)/100,"tronco")
                  this.troncos[i].width = (game.width*30)/100;
                  this.troncos[i].height = (game.height*3)/100;
                  game.physics.p2.enable(this.troncos[i]);
                  if(this.isPixel2XL){
                      this.troncos[i].body.y=(game.height*83)/100;
                  }
                  this.troncos[i].body.angle=-15;
                  this.troncos[i].body.clearShapes();
                  this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);
              break;

              default:
              break;
          }
          this.troncos[i].body.setMaterial(this.materialPlataforma);
          this.troncos[i].name = i;
          this.troncos[i].inputEnabled = true;
          this.troncos[i].body.motionState=2;
          this.troncos[i].body.mass=0;
          this.troncos[i].activado = false;
          this.troncos[i].events.onInputDown.add(this.tocandoTronco,this);
      }

      var style = {
          font: 'bold '+((game.width*6)/100)+'pt Arial',
          fill: '#FFFFFF',
          align: 'center'
        }

      this.scoreText = game.add.text(0, 0, '0', style);

      var plataformaMundo = game.physics.p2.createContactMaterial(this.materialPlataforma, this.worldMaterial, { friction: 0 });
      game.input.onDown.add(this.onTap, this);

  },
  createBola: function(){
      flagDropBall = false;
      flagArrangeBall = true;
      flagSetNewBall = true;

      frameBola = Math.floor(Math.random() * 17);
      this.bola_basura.frame = frameBola;
      this.checkBola(frameBola);
  },
  checkBola: function(tipoBola){
      if(tipoBola < 5)
          this.tipoBola = 1;
      else if(tipoBola > 4 && tipoBola < 10)
          this.tipoBola = 0;
      else if(tipoBola > 9 && tipoBola < 14)
          this.tipoBola = 2;
      else
          this.tipoBola = 3;
  },
  update: function(){
      //Reducir tiempo
      if(flagTimer)
          this.barraTiempo.width -= 0.05;

      //Checar fin de juego
      if(this.barraTiempo.width <= 0)
          this.state.start('final');

      //Animación lagarto
      segundosLagarto++;

      if(segundosLagarto==28){
          if(this.lagarto.frame == 0)
              this.lagarto.frame = 1;
          else
              this.lagarto.frame = 0;

          segundosLagarto = 0;
      }


      this.physics.p2.gravity.x = 0;
      this.physics.p2.gravity.y = GRAVEDAD_Y;

      var speedLaunch = 0;

      //Checa colisiones con remolinos
      for(var i=0; i<AMOUNT_REMOLINOS; i++){
                  var rectBola = this.getBounds(this.bola_basura);
                  var rectRemolino = this.getBounds(this.remolinos[i]);
                  if(this.isRectanglesOverlapping(rectBola,rectRemolino)){
                      if(i==0)
                          speedLaunch = -500;
                      else if(i==1)
                          speedLaunch = 500;
                  }
              }
      if(speedLaunch<1000)
          this.physics.p2.gravity.x = speedLaunch;
      else
          this.physics.p2.gravity.y = speedLaunch;

      for(var i=0;i<AMOUNT_REMOLINOS;i++)
          this.remolinos[i].angle += 10;

      if(!flagEndGame){
          var rectBola;
          var rectLagarto;
          if(flagDropBall){
              flagTimer = true;
              for (var i = 0; i < AMOUNT_BASUREROS; i++) {
                 rectBola=this.getBounds(this.bola_basura);
                 var rectBas=this.getBounds(this.basureros[i]);

                 if (this.isRectanglesOverlapping(rectBola,rectBas)) {
                     if(flagSetNewBall){
                     if(this.tipoBola==this.basureros[i].id){
                       this.increaseScore();
                       this.barraTiempo.width += 10;
                       this.createBola();

                      }
                     else
                        this.decreaseScore();
                        this.barraTiempo.width -= 10;
                        this.createBola();

                     }
                     flagArrangeBall = true;
                     flagSetNewBall = true;
                 }
              }

              if (this.bola_basura.body.velocity.x>0) {
                  this.bola_basura.body.rotation+=0.1;
              }
              if (this.bola_basura.body.velocity.x<0) {
                 this.bola_basura.body.rotation-=0.1;
              }

              //Checa colisiones con el lagarto
              rectLagarto = this.getBounds(this.lagarto);
              if(this.isRectanglesOverlapping(rectBola,rectLagarto)){
                  currentScore = -1;
                  this.state.start('final');
              }

          }
          if(flagArrangeBall){
              this.bola_basura.body.y = 0;
              this.bola_basura.body.x = (game.width*72)/100;
              this.bola_basura.body.velocity.x=0;
              this.bola_basura.body.velocity.y=0;
          }
    }
  },
  tocandoTronco: function(tronco){
                  if(!tronco.activado){
                      this.troncos[tronco.name].activado = true;
                      switch(tronco.name){
                          case 0:
                                  this.troncos[tronco.name].body.angle=90;
                                  this.troncos[tronco.name].body.x=(game.width*82.5)/100;
                                  this.troncos[tronco.name].body.y=(game.height*21)/100;
                          break;
                          case 1:
                                  this.troncos[tronco.name].body.angle=90;
                                  this.troncos[tronco.name].body.x=(game.width*25)/100;
                                  this.troncos[tronco.name].body.y=(game.height*30)/100;
                          break;
                          case 2:
                                  this.troncos[tronco.name].body.angle=98;
                                  this.troncos[tronco.name].width= (game.width*24)/100;
                                  this.troncos[tronco.name].height= (game.height*3.5)/100;
                                  this.troncos[tronco.name].body.x=(game.width*67)/100;
                                  this.troncos[tronco.name].body.y=(game.height*61)/100;
                                  this.troncos[tronco.name].body.clearShapes();
                                  this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                                  if (this.isPixel2XL) {
                                      this.troncos[tronco.name].body.y+=(game.height*3)/100;
                                  }
                          break;
                          case 3:
                                  this.troncos[tronco.name].body.angle=90;
                                  this.troncos[tronco.name].width= (game.width*24)/100;
                                  this.troncos[tronco.name].height= (game.height*3.5)/100;
                                  this.troncos[tronco.name].body.x=(game.width*71)/100;
                                  this.troncos[tronco.name].body.y=(game.height*78)/100;
                                  this.troncos[tronco.name].body.clearShapes();
                                  this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                                  if (this.isPixel2XL) {
                                      this.troncos[tronco.name].body.y=(game.height*81)/100;
                                  }
                          break;
                          default:
                      }
                      tronco.activado = true;
                  }else{
                      this.troncos[tronco.name].activado = false;
                      switch(tronco.name){
                          case 0:
                                  this.troncos[tronco.name].body.angle=-15;
                                  this.troncos[tronco.name].body.x=(game.width*72.5)/100;
                                  this.troncos[tronco.name].body.y=(game.height*18.6)/100;
                          break;
                          case 1:
                                  this.troncos[tronco.name].body.angle=34;
                                  this.troncos[tronco.name].body.x=(game.width*14.5)/100;
                                  this.troncos[tronco.name].body.y=(game.height*34)/100;
                          break;
                          case 2:
                                  this.troncos[tronco.name].body.angle=-15;
                                  this.troncos[tronco.name].width = (game.width*30)/100;
                                  this.troncos[tronco.name].body.x=(game.width*82)/100;
                                  this.troncos[tronco.name].body.y=(game.height*64)/100;
                                  this.troncos[tronco.name].body.clearShapes();
                                  this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                                  if (this.isPixel2XL) {
                                      this.troncos[tronco.name].body.y=(game.height*66)/100;
                                  }
                          break;
                          case 3:
                                  this.troncos[tronco.name].body.angle=-15;
                                  this.troncos[tronco.name].width = (game.width*30)/100;
                                  this.troncos[tronco.name].body.x=(game.width*83)/100;
                                  this.troncos[tronco.name].body.y=(game.height*81)/100;
                                  this.troncos[tronco.name].body.clearShapes();
                                  this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                                  if (this.isPixel2XL) {
                                      this.troncos[tronco.name].body.y=(game.height*83)/100;
                                  }
                          break;
                          default:
                      }
                      tronco.activado = false;
                  }
  },
  getBounds:function(currentPlataform){
      return new Phaser.Rectangle(currentPlataform.left, currentPlataform.top, currentPlataform.width, currentPlataform.height);
  },
  isRectanglesOverlapping: function(rect1, rect2) {
      if(rect1.x> rect2.x+rect2.width || rect2.x> rect1.x+rect1.width){
          return false;
      }
      if(rect1.y> rect2.y+rect2.height || rect2.y> rect1.y+rect1.height){
          return false;
      }
      return true;
  },
  render:function(){

  },
  onTap: function(){
      flagArrangeBall = false;
      flagDropBall=true;
      game.physics.p2.enable(this.bola_basura);
      this.bola_basura.body.setCircle(this.sizeBola/2);
      this.materialBola = game.physics.p2.createMaterial('materialBola');
      this.bola_basura.body.setMaterial(this.materialBola);
      this.bola_basura.allowRotation=true;
      var plataformaBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialPlataforma, { friction: -3 });
      var troncoBola=game.physics.p2.createContactMaterial(this.materialBola, this.materialTronco, { friction:1});
  },
  increaseScore:function(){
    if(this.tipoBola==3||this.tipoBola==2){
      currentScore+=200;
      this.scoreText.text = currentScore;
    }
    else{
      currentScore+=100;
      this.scoreText.text = currentScore;
    }


  },
  decreaseScore:function(){
    if(this.tipoBola==3||this.tipoBola==2){
      currentScore-=200;
      this.scoreText.text = currentScore;
    }
    else{
      currentScore-=100;
      this.scoreText.text = currentScore;
    }

  },
}
var GamePlayManglarDesktop = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setGameSize(game.width, game.height);

        //Resetear valores
        AMOUNT_BASUREROS = 4;
        AMOUNT_REMOLINOS = 2;
        cant_tron = 4;
        cant_plat = 7;
        flagDropBall = false;
        flagEndGame = false;
        flagResultEndGame = false;
        segundosLagarto = 0;
        ballNeeded = false;
        flagArrangeBall = false;
        flagSetNewBall = true;
        currentScore = 0;
        flagTimer = false;
        this.isIpad = false;
        this.isPixel2XL = false;
    },
    create: function() {
        music.play();


        /********************************Materiales del juego*******************************************/
        if (game.scale.isPortrait) {
            game.state.start('GameplayManglar');
        }
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = GRAVEDAD_Y;
        this.worldMaterial = game.physics.p2.createMaterial('worldMaterial');
        game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
        this.materialPlataforma = game.physics.p2.createMaterial('materialPlataforma');
        this.materialTronco = game.physics.p2.createMaterial('materialTronco');
        this.materialBasurero = game.physics.p2.createMaterial('materialBasurero');

        //Array de troncos
        this.troncos = [];
        //Array de plataformas
        this.plataformas = [];
        //Array de basureros
        this.basureros = [];
        //Array de remolino
        this.remolinos = [];

        //Fondo
        var fondo = game.add.sprite(0, 0, 'fondoDesktop');
        fondo.width = game.width;
        fondo.height = game.height;

        /*Comprobacion de formatos especificos**************************************************************************/


        /***********************************************************************************************************/

        //Bola
        frameBola = Math.floor(Math.random() * 17);
        /*Size de la bola*/
        this.sizeBola = (game.width * 4) / 100;


        this.bola_basura = game.add.sprite(game.width - 100, 0, 'basuras', frameBola);

        if (frameBola < 5)
            this.tipoBola = 1;
        else if (frameBola > 4 && frameBola < 10)
            this.tipoBola = 0;
        else if (frameBola > 9 && frameBola < 14)
            this.tipoBola = 2;
        else
            this.tipoBola = 3;

        this.bola_basura.width = this.sizeBola;
        this.bola_basura.height = this.sizeBola;

        //Plataformas
        var platLimpio1 = game.add.sprite(game.width, (game.height * 13) / 100, 'platLimpio1');
        platLimpio1.width = (game.width * 25) / 100;
        platLimpio1.height = (game.height * 3) / 100;
        platLimpio1.x = (game.width) - (platLimpio1.width / 3.5);

        var platLimpio2 = game.add.sprite((game.width * 44.5) / 100, (game.height * 18.8) / 100, 'platLimpio2');
        platLimpio2.width = (game.width * 38) / 100;
        platLimpio2.height = (game.height * 3) / 100;

        var platLimpio3 = game.add.sprite((game.width * 45) / 100, (game.height * 45) / 100, 'platLimpio3');
        platLimpio3.width = (game.width * 50) / 100;
        platLimpio3.height = (game.height * 3) / 100;

        var platLimpio4 = game.add.sprite((game.width * 48) / 100, (game.height * 73) / 100, 'platLimpio4');
        platLimpio4.width = (game.width * 48) / 100;
        platLimpio4.height = (game.height * 3) / 100;

        var platLimpio5 = game.add.sprite((game.width * 46) / 100, (game.height * 92) / 100, 'platLimpio5');
        platLimpio5.width = (game.width * 58) / 100;
        platLimpio5.height = (game.height * 3) / 100;

        var platBas1 = game.add.sprite(game.width, (game.height * 37) / 100, 'platBas1');
        platBas1.width = (game.width * 65) / 100;
        platBas1.height = (game.height * 3) / 100;

        var platBas2 = game.add.sprite((game.width * 0) / 100, (game.height * 81) / 100, 'platBas2');
        platBas2.width = (game.width * 40) / 100;
        platBas2.height = (game.height * 3) / 100;

        this.plataformas[1] = platLimpio1;
        this.plataformas[2] = platLimpio2;
        this.plataformas[3] = platLimpio3;
        this.plataformas[4] = platLimpio4;
        this.plataformas[5] = platLimpio5;
        this.plataformas[6] = platBas1;
        this.plataformas[7] = platBas2;

        /*Controloles individuales de plataformas*/
        for (var i = 1; i <= cant_plat_1; i++) {
            this.plataformas[i].anchor.setTo(0.5);
            game.physics.p2.enable(this.plataformas[i]);
            switch (i) {
                case 1:
                    this.plataformas[i].body.angle = -12;
                    break;
                case 2:
                    this.plataformas[i].body.angle = 10;
                    break;
                case 3:
                    if (!this.isIpad && !this.isPixel2XL) {
                        this.plataformas[i].body.angle = 10;
                    } else {
                        if (this.isPixel2XL) {
                            this.plataformas[i].body.y = (game.height * 42) / 100;
                            this.plataformas[i].body.angle = 28;
                        }
                        if (this.isIpad) {
                            this.plataformas[i].body.angle = 24;
                        }

                    }
                    break;
                case 4:
                    if (!this.isIpad && !this.isPixel2XL) {
                        this.plataformas[i].body.angle = -4;

                    } else {
                        if (this.isPixel2XL) {
                            this.plataformas[i].body.angle = -10;
                        }
                        if (this.isIpad) {
                            this.plataformas[i].body.angle = -6;
                        }

                    }

                    break;
                case 5:
                    if (!this.isIpad && !this.isPixel2XL) {
                        this.plataformas[i].body.angle = -4;

                    } else {
                        if (this.isPixel2XL) {
                            this.plataformas[i].body.angle = -13;
                        }
                        if (this.isIpad) {
                            this.plataformas[i].body.angle = -9;
                        }

                    }
                    break;
                case 6:

                    break
                case 7:

                    break;
                default:

            }
            this.plataformas[i].body.setMaterial(this.materialPlataforma);
            this.plataformas[i].body.motionState = 2;
            this.plataformas[i].body.mass = 0;
        }

        /****BASUREROS****************************************************************************************************/
        this.bolaCollisionGroup = game.physics.p2.createCollisionGroup();
        this.basureroCollisionGroup = game.physics.p2.createCollisionGroup();


        var basurero_0 = game.add.sprite((game.width * 74) / 100, (game.height * 31) / 100, 'basureros');
        basurero_0.frame = 0;
        var basurero_1 = game.add.sprite((game.width * 10) / 100, (game.height * 53) / 100, 'basureros');
        basurero_1.frame = 1;
        var basurero_2 = game.add.sprite((game.width * 9) / 100, (game.height * 75) / 100, 'basureros');
        basurero_2.frame = 2;
        var basurero_3 = game.add.sprite((game.width * 86) / 100, (game.height * 98) / 100, 'basureros');
        basurero_3.frame = 3;

        //Esto es para hacer match con las basura correspondiente
        this.basureros[0] = basurero_0;
        this.basureros[0].id = 0;
        this.basureros[1] = basurero_1;
        this.basureros[1].id = 1;
        this.basureros[2] = basurero_2;
        this.basureros[2].id = 2;
        this.basureros[3] = basurero_3;
        this.basureros[3].id = 3;

        for (var i = 0; i < this.basureros.length; i++) {
            this.basureros[i].width = (game.width * 7) / 100;
            this.basureros[i].height = (game.height * 10) / 100;
            game.physics.p2.enable(this.basureros[i], true);
            this.basureros[i].body.motionState = 2;
            this.basureros[i].body.mass = 0;
            this.basureros[i].body.clearShapes();
            this.basureros[i].body.setMaterial(this.materialBasurero);
            if (i == 2) {
                this.basureros[i].body.angle = 90;
                this.basureros[i].height = (game.width * 8) / 100;
                this.basureros[i].width = (game.height * 11) / 100;
                this.basureros[i].body.x = (game.width * 15) / 100;
            }
            if (i == 1) {
                this.basureros[i].width = (game.width * 10) / 100;
                this.basureros[i].height = (game.height * 15) / 100;
                this.basureros[i].body.y = (game.height * 53) / 100;

            }
            if (i == 3) {
                this.basureros[i].width = (game.width * 15) / 100;
                this.basureros[i].height = (game.height * 15) / 100;

            }

        }


        this.remolino0 = game.add.sprite((game.width * 52) / 100, (game.height * 14) / 100, 'remolino');
        this.remolino0.width = (game.height * 15) / 100;
        this.remolino0.height = (game.height * 15) / 100;
        this.remolino0.anchor.setTo(0.5);

        this.remolino1 = game.add.sprite((game.width * 78) / 100, (game.height * 48) / 100, 'remolino');
        this.remolino1.width = (game.height * 20) / 100;
        this.remolino1.height = (game.height * 20) / 100;
        this.remolino1.anchor.setTo(0.5);

        this.remolinos[0] = this.remolino0;
        this.remolinos[1] = this.remolino1;

        //Lagarto
        this.lagarto = game.add.sprite((game.width * 2) / 100, (game.height * 81) / 100, 'lagarto', 0);
        this.lagarto.width = (game.width * 37) / 100;
        this.lagarto.height = (game.height * 22) / 100;


        //Barra tiempo
        this.barraTiempo = game.add.sprite(0, (game.height * 1.5) / 100, 'barraTiempo');
        this.barraTiempo.width = (game.width * 8) / 100;
        this.barraTiempo.height = (game.height * 1) / 100;

        //Reloj
        this.reloj = game.add.sprite(0, (game.height * 8) / 100, 'reloj');
        this.reloj.width = (game.width * 5) / 100;
        this.reloj.height = (game.height * 4) / 100;


        /*********Troncos*************************************************/


        /*Controloes individuales de cada tronco*/
        for (var i = 0; i < cant_tron_1; i++) {
            switch (i) {
                case 0:
                    this.troncos[i] = game.add.sprite((game.width * 74.8) / 100, (game.height * 21) / 100, "tronco")
                    this.troncos[i].width = (game.width * 12) / 100;
                    this.troncos[i].height = (game.height * 3.5) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle = -12;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width * 96) / 100, (this.troncos[i].height * 75) / 100);
                    break;
                case 1:
                    this.troncos[i] = game.add.sprite((game.width * 12) / 100, (game.height * 36) / 100, "tronco2")
                    this.troncos[i].width = (game.width * 20) / 100;
                    this.troncos[i].height = (game.height * 3.5) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle = 0;
                    break;
                case 2:
                    this.troncos[i] = game.add.sprite((game.width * 82) / 100, (game.height * 65) / 100, "tronco")
                    this.troncos[i].width = (game.width * 20) / 100;
                    this.troncos[i].height = (game.height * 3) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    if (this.isPixel2XL) {
                        this.troncos[i].body.y = (game.height * 66) / 100;
                    }
                    this.troncos[i].body.angle = -10;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width * 96) / 100, (this.troncos[i].height * 75) / 100);
                    break;
                case 3:
                    this.troncos[i] = game.add.sprite((game.width * 84) / 100, (game.height * 83) / 100, "tronco")
                    this.troncos[i].width = (game.width * 20) / 100;
                    this.troncos[i].height = (game.height * 3) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    if (this.isPixel2XL) {
                        this.troncos[i].body.y = (game.height * 83) / 100;
                    }
                    this.troncos[i].body.angle = -10;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width * 96) / 100, (this.troncos[i].height * 75) / 100);
                    break;

                default:
                    break;
            }
            this.troncos[i].body.setMaterial(this.materialPlataforma);
            this.troncos[i].name = i;
            this.troncos[i].inputEnabled = true;
            this.troncos[i].body.motionState = 2;
            this.troncos[i].body.mass = 0;
            this.troncos[i].activado = false;
            this.troncos[i].events.onInputDown.add(this.tocandoTronco, this);
        }

        var style = {
            font: 'bold ' + ((game.width * 6) / 100) + 'pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }

        this.scoreText = game.add.text(0, 0, '0', style);

        var plataformaMundo = game.physics.p2.createContactMaterial(this.materialPlataforma, this.worldMaterial, { friction: 0 });
        game.input.onDown.add(this.onTap, this);
    },
    createBola: function() {
        this.flagDropBall = false;
        flagArrangeBall = true;
        flagSetNewBall = true;

        frameBola = Math.floor(Math.random() * 17);
        this.bola_basura.frame = frameBola;
        this.checkBola(frameBola);
    },
    checkBola: function(tipoBola) {
        if (tipoBola < 5)
            this.tipoBola = 1;
        else if (tipoBola > 4 && tipoBola < 10)
            this.tipoBola = 0;
        else if (tipoBola > 9 && tipoBola < 14)
            this.tipoBola = 2;
        else
            this.tipoBola = 3;
    },
    update: function() {
        //Reducir tiempo
        if (flagTimer)
            this.barraTiempo.width -= 0.05;

        //Checar fin de juego
        if (this.barraTiempo.width <= 0)
            this.state.start('final');

        //Animación lagarto
        segundosLagarto++;

        if (segundosLagarto == 28) {
            if (this.lagarto.frame == 0)
                this.lagarto.frame = 1;
            else
                this.lagarto.frame = 0;

            segundosLagarto = 0;
        }


        this.physics.p2.gravity.x = 0;
        this.physics.p2.gravity.y = GRAVEDAD_Y;

        var speedLaunch = 0;

        //Checa colisiones con remolinos
        for (var i = 0; i < AMOUNT_REMOLINOS; i++) {
            var rectBola = this.getBounds(this.bola_basura);
            var rectRemolino = this.getBounds(this.remolinos[i]);
            if (this.isRectanglesOverlapping(rectBola, rectRemolino)) {
                if (i == 0)
                    this.bola_basura.body.velocity.x = -500;
                else if (i == 1)
                    this.bola_basura.body.velocity.x = 200;
                this.bola_basura.body.velocity.y = 220;
            }
        }
        if (speedLaunch < 1000)
            this.physics.p2.gravity.x = speedLaunch;
        else
            this.physics.p2.gravity.y = GRAVEDAD_Y;

        for (var i = 0; i < AMOUNT_REMOLINOS; i++)
            this.remolinos[i].angle += 10;

        if (!this.flagEndGame) {
            var rectBola;
            var rectLagarto;
            if (this.flagDropBall) {
                flagTimer = true;
                for (var i = 0; i < AMOUNT_BASUREROS; i++) {
                    rectBola = this.getBounds(this.bola_basura);
                    var rectBas = this.getBounds(this.basureros[i]);

                    if (this.isRectanglesOverlapping(rectBola, rectBas)) {
                        if (flagSetNewBall) {
                            if (this.tipoBola == this.basureros[i].id) {
                                this.createBola();
                                this.increaseScore();
                                this.barraTiempo.width = (game.width * 8) / 100;
                            } else
                                this.createBola();
                        }
                        flagArrangeBall = true;
                        flagSetNewBall = true;
                    }
                }

                if (this.bola_basura.body.velocity.x > 0) {
                    this.bola_basura.body.rotation += 0.1;
                }
                if (this.bola_basura.body.velocity.x < 0) {
                    this.bola_basura.body.rotation -= 0.1;
                }

                //Checa colisiones con el lagarto
                rectLagarto = this.getBounds(this.lagarto);
                if (this.isRectanglesOverlapping(rectBola, rectLagarto)) {
                    currentScore = -1;
                    this.state.start('final');
                }

            }
            if (flagArrangeBall) {
                this.bola_basura.body.y = 0;
                this.bola_basura.body.x = (game.width * 72) / 100;
            }
        }
    },
    tocandoTronco: function(tronco) {
        if (pantalla == 1) {
            //tronco.body.moves = false;
            if (!tronco.activado) {
                this.troncos[tronco.name].activado = true;
                switch (tronco.name) {
                    case 0:
                        this.troncos[tronco.name].body.angle = 15;
                        this.troncos[tronco.name].body.x = (game.width * 75) / 100;
                        this.troncos[tronco.name].body.y = (game.height * 15) / 100;
                        this.troncos[tronco.name].width = (game.width * 12) / 100;
                        this.troncos[tronco.name].body.clearShapes();
                        this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                        break;
                    case 1:
                        this.troncos[tronco.name].body.angle = 85;
                        this.troncos[tronco.name].body.x = (game.width * 21) / 100;
                        this.troncos[tronco.name].body.y = (game.height * 26) / 100;
                        this.troncos[tronco.name].width = (game.width * 13) / 100;
                        this.troncos[tronco.name].body.clearShapes();
                        this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                        break;
                    case 2:
                        this.troncos[tronco.name].body.angle = -60;
                        this.troncos[tronco.name].body.x = (game.width * 77) / 100;
                        this.troncos[tronco.name].body.y = (game.height * 57) / 100;
                        if (this.isPixel2XL) {
                            this.troncos[tronco.name].body.y += (game.height * 3) / 100;
                        }
                        break;
                    case 3:
                        this.troncos[tronco.name].body.angle = -45;
                        this.troncos[tronco.name].body.x = (game.width * 82) / 100;
                        this.troncos[tronco.name].body.y = (game.height * 78) / 100;
                        if (this.isPixel2XL) {
                            this.troncos[tronco.name].body.y = (game.height * 81) / 100;
                        }
                        break;
                    default:
                }
                tronco.activado = true;
            } else {
                this.troncos[tronco.name].activado = false;
                switch (tronco.name) {
                    case 0:
                        this.troncos[tronco.name].body.angle = -12;
                        this.troncos[tronco.name].body.x = (game.width * 74.8) / 100;
                        this.troncos[tronco.name].body.y = (game.height * 21) / 100;
                        this.troncos[tronco.name].width = (game.width * 12) / 100;
                        this.troncos[tronco.name].body.clearShapes();
                        this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                        break;
                    case 1:
                        this.troncos[tronco.name].body.angle = 0;
                        this.troncos[tronco.name].body.x = (game.width * 12) / 100;
                        this.troncos[tronco.name].body.y = (game.height * 36) / 100;
                        this.troncos[tronco.name].width = (game.width * 20) / 100;
                        this.troncos[tronco.name].body.clearShapes();
                        this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                        break;
                    case 2:
                        this.troncos[tronco.name].body.angle = -10;
                        this.troncos[tronco.name].body.x = (game.width * 82) / 100;
                        this.troncos[tronco.name].body.y = (game.height * 65) / 100;
                        if (this.isPixel2XL) {
                            this.troncos[tronco.name].body.y = (game.height * 66) / 100;
                        }
                        break;
                    case 3:
                        this.troncos[tronco.name].body.angle = -10;
                        this.troncos[tronco.name].body.x = (game.width * 84) / 100;
                        this.troncos[tronco.name].body.y = (game.height * 83) / 100;
                        if (this.isPixel2XL) {
                            this.troncos[tronco.name].body.y = (game.height * 83) / 100;
                        }
                        break;
                    default:
                }
                tronco.activado = false;
            }
        }
    },
    getBounds: function(currentPlataform) {
        return new Phaser.Rectangle(currentPlataform.left, currentPlataform.top, currentPlataform.width, currentPlataform.height);
    },
    isRectanglesOverlapping: function(rect1, rect2) {
        if (rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) {
            return false;
        }
        if (rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height) {
            return false;
        }
        return true;
    },
    render: function() {

    },
    onTap: function() {
        flagArrangeBall = false;
        this.flagDropBall = true;
        this.flagDropBall = true;
        game.physics.p2.enable(this.bola_basura, true);
        this.bola_basura.body.setCircle((this.sizeBola * 50) / 100);
        this.materialBola = game.physics.p2.createMaterial('materialBola');
        this.bola_basura.body.setMaterial(this.materialBola);
        this.bola_basura.allowRotation = true;
        var plataformaBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialPlataforma, { friction: -3 });
        var troncoBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialTronco, { friction: 1 });
    },
    increaseScore: function() {
        currentScore += 100;
        this.scoreText.text = currentScore;

    },
    showFinalMessage: function(msg) {
        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#FFFFFF';
        bgAlpha.ctx.fillRect(0, 0, game.width, game.height);

        var bg = game.add.sprite(0, 0, bgAlpha);
        bg.alpha = 0.5;

        var style = {
            font: 'bold 12pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }

        this.textFieldFinalMsg = game.add.text(game.width / 2, game.height / 2, msg, style);
        this.textFieldFinalMsg.anchor.setTo(0.5);
    },
}

//nivel 2
var nivel2 = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        this.game.scale.setGameSize(game.width, game.height);
        game.world.setBounds(0, 0, game.width, game.height)

        currentLevel = 2;
        AMOUNT_BASUREROS = 4;
        AMOUNT_REMOLINOS = 2;
        cant_tron = 3;
        cant_plat = 8;
        flagDropBall = false;
        flagEndGame = false;
        flagResultEndGame = false;
        segundosLagarto = 0;
        ballNeeded = false;
        flagArrangeBall = false;
        flagSetNewBall = true;
        currentScore = 0;
        flagTimer = false;
    },
    create: function(){
      if(music.isPlaying==true){
        music.play();
        music.volume=1;
      }

        /********************************Materiales del juego*******************************************/
        if (game.scale.isGameLandscape) {
            game.state.start('gameplayManglarDesktop');
        }
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = GRAVEDAD_Y;
        this.worldMaterial = game.physics.p2.createMaterial('worldMaterial');
        this.materialPlataforma = game.physics.p2.createMaterial('materialPlataforma');
        this.materialTronco = game.physics.p2.createMaterial('materialTronco');
        this.materialBasurero = game.physics.p2.createMaterial('materialBasurero');

        game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);

        //Array de troncos
        this.troncos = [];
        //Array de plataformas
        this.plataformas = [];
        //Array de basureros
        this.basureros = [];
        //Array de remolino
        this.remolinos = [];

        //Fondo
        var fondo = game.add.sprite(0, 0, 'fondoLimpio');
        fondo.width = game.width;
        fondo.height = game.height;

        /*Comprobacion de formatos especificos**************************************************************************/
        if ((game.width >= 700) && (game.height >= 1024)) {
            this.isIpad = true;
        }
        if ((game.width <= 411) && (game.height >= 680)) {
            this.isPixel2XL = true;
        }
        /***********************************************************************************************************/

        ///Remolino
        this.remolino0 = game.add.sprite((game.width * 84) / 100, (game.height * 65) / 100, 'remolino');
        this.remolino0.width = (game.height * 10) / 100;
        this.remolino0.height = (game.height * 10) / 100;
        this.remolino0.anchor.setTo(0.5);
        game.physics.p2.enable(this.remolino0);
        this.remolino0.body.clearShapes();
        this.remolino0.body.motionState = 2;
        this.remolino0.body.mass = 0;

        /*this.remolino1 = game.add.sprite((game.width*78)/100,(game.height*48)/100,'remolino');
        this.remolino1.width = (game.height*10)/100;
        this.remolino1.height = (game.height*10)/100;
        this.remolino1.anchor.setTo(0.5);

        this.remolinos[0] = this.remolino0;
        this.remolinos[1] = this.remolino1;*/

        //Bola
        frameBola = Math.floor(Math.random() * 17);
        /*Size de la bola*/
        if (game.width < game.height)
            this.sizeBola = (game.height * 6) / 100;
        else {
            if (game.width > game.height)
                this.sizeBola = (game.height * 4) / 100;
        }


        this.bola_basura = game.add.sprite(game.width - 35, 0, 'basuras', frameBola);
        this.bola_basura.spawnSite = 1;

        if (frameBola < 5)
            this.tipoBola = 1;
        else if (frameBola > 4 && frameBola < 10)
            this.tipoBola = 0;
        else if (frameBola > 9 && frameBola < 14)
            this.tipoBola = 2;
        else
            this.tipoBola = 3;

        this.bola_basura.width = this.sizeBola;
        this.bola_basura.height = this.sizeBola;




        //Plataformas
        var platLimpio1 = game.add.sprite(game.width * 0, (game.height * 12) / 100, 'platLimpio1');
        platLimpio1.width = (game.width * 30) / 100;
        platLimpio1.height = (game.height * 3) / 100;
        platLimpio1.x = (platLimpio1.width / 3.5);

        var platLimpio2 = game.add.sprite(game.width, (game.height * 12) / 100, 'platLimpio3');
        platLimpio2.width = (game.width * 30) / 100;
        platLimpio2.height = (game.height * 3) / 100;
        platLimpio2.x = (game.width) - (platLimpio2.width / 6);

        var platLimpio3 = game.add.sprite((game.width * 50) / 100, (game.height * 15) / 100, 'platLimpio2');
        platLimpio3.width = (game.width * 15) / 100;
        platLimpio3.height = (game.height * 3) / 100;


        var platLimpio4 = game.add.sprite((game.width * 83.5) / 100, (game.height * 50) / 100, 'platLimpio4');
        platLimpio4.width = (game.width * 20) / 100;
        platLimpio4.height = (game.height * 2) / 100;

        var platLimpio5 = game.add.sprite((game.width * 0) / 100, (game.height * 62) / 100, 'platLimpio5');
        platLimpio5.width = (game.width * 32) / 100;
        platLimpio5.height = (game.height * 3) / 100;

        var platLimpio6 = game.add.sprite((game.width * 86) / 100, (game.height * 70) / 100, 'platLimpio1');
        platLimpio6.width = (game.width * 40) / 100;
        platLimpio6.height = (game.height * 3) / 100;
        //platLimpio6.x=(platLimpio1.width/3.5);

        var platBas1 = game.add.sprite(game.width, (game.height * 55) / 100, 'platBas1');
        platBas1.width = (game.width * 65) / 100;
        platBas1.height = (game.height * 3) / 100;

        var platBas2 = game.add.sprite((game.width * 0) / 100, (game.height * 83) / 100, 'platBas2');
        platBas2.width = (game.width * 55) / 100;
        platBas2.height = (game.height * 3) / 100;

        this.plataformas[1] = platLimpio1;
        this.plataformas[2] = platLimpio2;
        this.plataformas[3] = platLimpio3;
        this.plataformas[4] = platLimpio4;
        this.plataformas[5] = platLimpio5;
        this.plataformas[6] = platLimpio6;
        this.plataformas[7] = platBas1;
        this.plataformas[8] = platBas2;

        /*Controloles individuales de plataformas*/
        for (var i = 1; i <= cant_plat; i++) {
            this.plataformas[i].anchor.setTo(0.5);
            game.physics.p2.enable(this.plataformas[i]);
            switch (i) {
                case 1:
                    this.plataformas[i].body.angle = 38;
                    break;
                case 2:
                    this.plataformas[i].body.angle = -55;
                    break;
                case 3:
                    this.plataformas[i].body.angle = 0;
                    break;
                case 4:
                    this.plataformas[i].body.angle = 90;
                    break;
                case 5:
                    this.plataformas[i].body.angle = 0;
                    break;
                case 6:
                    this.plataformas[i].body.angle = -10
                    break
                case 7:
                    break;
                default:

            }
            this.plataformas[i].body.setMaterial(this.materialPlataforma);
            this.plataformas[i].body.motionState = 2;
            this.plataformas[i].body.mass = 0;
        }

        /****BASUREROS****************************************************************************************************/



        var basurero_0 = game.add.sprite((game.width * 74) / 100, (game.height * 50) / 100, 'basureros');
        basurero_0.frame = 0;
        var basurero_1 = game.add.sprite((game.width * 93) / 100, (game.height * 50) / 100, 'basureros');
        basurero_1.frame = 1;
        var basurero_2 = game.add.sprite((game.width * 6) / 100, (game.height * 78) / 100, 'basureros');
        basurero_2.frame = 2;
        var basurero_3 = game.add.sprite((game.width * 9) / 100, (game.height * 57) / 100, 'basureros');
        basurero_3.frame = 3;
        var basurero_4 = game.add.sprite((game.width * 6) / 100, (game.height * 56) / 100, 'basureros');
        basurero_4.frame = 3;

        //Esto es para hacer match con las basura correspondiente
        this.basureros[0] = basurero_0;
        this.basureros[0].id = 0;
        this.basureros[1] = basurero_1;
        this.basureros[1].id = 1;
        this.basureros[2] = basurero_2;
        this.basureros[2].id = 2;
        this.basureros[3] = basurero_3;
        this.basureros[3].id = 3;
        this.basureros[4] = basurero_4;
        this.basureros[4].id = 3;

        for (var i = 0; i < this.basureros.length; i++) {
            this.basureros[i].width = (game.width * 14) / 100;
            this.basureros[i].height = (game.height * 10) / 100;
            game.physics.p2.enable(this.basureros[i], true);
            this.basureros[i].body.motionState = 2;
            this.basureros[i].body.mass = 0;
            this.basureros[i].body.clearShapes();
            this.basureros[i].body.setMaterial(this.materialPlataforma);
        }
        this.basureros[4].width = (game.width * 16) / 100;
        this.basureros[4].height = (game.height * 11) / 100;
        this.basureros[3].body.angle = 90;
        this.basureros[2].body.angle = 90;
        this.basureros[3].angle = 90;
        this.basureros[2].angle = 90;

        //Lagarto
        this.lagarto = game.add.sprite((game.width * 30) / 100, (game.height * 84) / 100, 'lagarto', 0);
        this.lagarto.width = (game.width * 50) / 100;
        this.lagarto.height = (game.height * 20) / 100;


        //Barra tiempo
        this.barraTiempo = game.add.sprite(0, (game.height * 6) / 100, 'barraTiempo');
        this.barraTiempo.width = (game.width * 22) / 100;
        this.barraTiempo.height = (game.height * 1) / 100;

        //Reloj
        this.reloj = game.add.sprite(0, (game.height * 8) / 100, 'reloj');
        this.reloj.width = (game.width * 5) / 100;
        this.reloj.height = (game.height * 4) / 100;







        /*********Troncos*************************************************************************************/
        /*Controloes individuales de cada tronco*/
        for (var i = 0; i < cant_tron; i++) {
            switch (i) {
                case 0:
                    this.troncos[i] = game.add.sprite((game.width * 46) / 100, (game.height * 22) / 100, "tronco")
                    this.troncos[i].width = (game.width * 28) / 100;
                    this.troncos[i].height = (game.height * 3.5) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle = 80;
                    /*this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);*/
                    break;
                case 1:
                    this.troncos[i] = game.add.sprite((game.width * 54) / 100, (game.height * 22) / 100, "tronco2")
                    this.troncos[i].width = (game.width * 28) / 100;
                    this.troncos[i].height = (game.height * 3.5) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle = 90;
                    break;
                case 2:
                    this.troncos[i] = game.add.sprite((game.width * 52) / 100, (game.height * 75) / 100, "tronco")
                    this.troncos[i].width = (game.width * 40) / 100;
                    this.troncos[i].height = (game.height * 4) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    if (this.isPixel2XL) {
                        this.troncos[i].body.y = (game.height * 66) / 100;
                    }
                    this.troncos[i].body.angle = -20;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width * 96) / 100, (this.troncos[i].height * 75) / 100);
                    break;
                case 3:
                    this.troncos[i] = game.add.sprite((game.width * 200) / 100, (game.height) / 100, "tronco")
                    this.troncos[i].width = (game.width * 30) / 100;
                    this.troncos[i].height = (game.height * 3) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    if (this.isPixel2XL) {
                        this.troncos[i].body.y = (game.height * 83) / 100;
                    }
                    this.troncos[i].body.angle = -15;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width * 96) / 100, (this.troncos[i].height * 75) / 100);
                    break;
                default:
                    break;
            }
            this.troncos[i].body.setMaterial(this.materialTronco);
            this.troncos[i].name = i;
            this.troncos[i].state = 1;
            this.troncos[i].inputEnabled = true;
            this.troncos[i].body.motionState = 2;
            this.troncos[i].body.mass = 0;
            this.troncos[i].activado = false;
            this.troncos[i].events.onInputDown.add(this.tocandoTronco, this);
        }

        var style = {
            font: 'bold ' + ((game.width * 6) / 100) + 'pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }

        this.scoreText = game.add.text(0, 0, '0', style);

        var plataformaMundo = game.physics.p2.createContactMaterial(this.materialPlataforma, this.worldMaterial, { friction: 0 });
        game.input.onDown.add(this.onTap, this);

    },
    createBola: function() {
        this.flagDropBall = false;
        flagArrangeBall = true;
        flagSetNewBall = true;

        frameBola = Math.floor(Math.random() * 17);
        this.bola_basura.frame = frameBola;
        this.checkBola(frameBola);
    },
    checkBola: function(tipoBola) {
        if (tipoBola < 5)
            this.tipoBola = 1;
        else if (tipoBola > 4 && tipoBola < 10)
            this.tipoBola = 0;
        else if (tipoBola > 9 && tipoBola < 14)
            this.tipoBola = 2;
        else
            this.tipoBola = 3;
    },
    update: function() {
        //Reducir tiempo
        if (flagTimer)
            this.barraTiempo.width -= 0.05;

        //Checar fin de juego
        if (this.barraTiempo.width <= 0)
            this.state.start('final');

        //Animación lagarto
        segundosLagarto++;

        if (segundosLagarto == 28) {
            if (this.lagarto.frame == 0)
                this.lagarto.frame = 1;
            else
                this.lagarto.frame = 0;

            segundosLagarto = 0;
        }


        this.physics.p2.gravity.x = 0;
        this.physics.p2.gravity.y = GRAVEDAD_Y;

        var speedLaunch = 0;

        ///Checa colisiones con remolinos
        for (var i = 0; i < AMOUNT_REMOLINOS; i++) {
            var rectBola = this.getBounds(this.bola_basura);
            var rectRemolino = this.getBounds(this.remolino0);
            if (this.isRectanglesOverlapping(rectBola, rectRemolino)) {
                this.bola_basura.body.velocity.x = -450;
            }
        }


        for (var i = 0; i < AMOUNT_REMOLINOS; i++)
            this.remolino0.body.angle += 10;

        if (!flagEndGame) {
            var rectBola;
            var rectLagarto;
            if (flagDropBall) {
                flagTimer = true;
                for (var i = 0; i < 5; i++) {
                    rectBola = this.getBounds(this.bola_basura);
                    var rectBas = this.getBounds(this.basureros[i]);

                    if (this.isRectanglesOverlapping(rectBola, rectBas)) {
                        if (flagSetNewBall) {
                            if (this.tipoBola == this.basureros[i].id) {
                                this.createBola();
                                this.increaseScore();
                                this.barraTiempo.width += 10;
                            } else
                                this.decreaseScore();
                            this.createBola();
                            this.barraTiempo.width -= 10;
                        }
                        flagArrangeBall = true;
                        flagSetNewBall = true;
                        flagDropBall = false;
                    }
                }

                if (this.bola_basura.body.velocity.x > 0) {
                    this.bola_basura.body.rotation += 0.1;
                }
                if (this.bola_basura.body.velocity.x < 0) {
                    this.bola_basura.body.rotation -= 0.1;
                }

                //Checa colisiones con el lagarto
                rectLagarto = this.getBounds(this.lagarto);
                if (this.isRectanglesOverlapping(rectBola, rectLagarto)) {
                    currentScore = -1;
                    this.state.start('final');
                }

            } else {
                if (flagArrangeBall) {
                    this.bola_basura.body.velocity.x = 0;
                    this.bola_basura.body.velocity.y = 0;
                    switch (this.bola_basura.spawnSite) {
                        case 1:
                            this.bola_basura.body.y = 0;
                            this.bola_basura.body.x = (game.width * 90) / 100;
                            this.bola_basura.body.allowGravity = false;
                            break;
                        case 2:
                            this.bola_basura.body.y = 0;
                            this.bola_basura.body.x = (game.width * 10) / 100;
                            this.bola_basura.body.allowGravity = false;
                            break;
                        default:
                            ;
                    }
                }
            }

        }
    },
    tocandoTronco: function(tronco) {
        /*Control de estados para troncos con mas de 2 posiciones*/
        if (tronco.name == 1) {
            this.troncos[tronco.name].state += 1;
            var estado = this.troncos[tronco.name].state;
            if (this.troncos[tronco.name].state == 3) {
                estado = 1
            }
            if (this.troncos[tronco.name].state == 4) {
                estado = 3
            }
            if (this.troncos[tronco.name].state == 5) {
                estado = 1;
                this.troncos[tronco.name].state = 1;
            }

            switch (estado) {
                case 1:
                    this.troncos[tronco.name].body.angle = 90;
                    this.troncos[tronco.name].body.x = (game.width * 54) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 22) / 100;
                    break;
                case 2:
                    this.troncos[tronco.name].body.angle = 38;
                    this.troncos[tronco.name].body.x = (game.width * 62) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 20) / 100;
                    break;
                case 3:
                    this.troncos[tronco.name].body.angle = -58;
                    this.troncos[tronco.name].body.x = (game.width * 47) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 21) / 100;
                    break;
                default:
            }
        }
        /*********************************************************/
        //tronco.body.moves = false;
        if (!tronco.activado) {
            this.troncos[tronco.name].activado = true;
            switch (tronco.name) {
                case 0:
                    this.troncos[tronco.name].body.angle = -8;
                    this.troncos[tronco.name].body.x = (game.width * 33) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 16) / 100;
                    break;
                case 1:
                    /*this.troncos[tronco.name].body.angle=58;
                    this.troncos[tronco.name].body.x=(game.width*58)/100;
                    this.troncos[tronco.name].body.y=(game.height*22)/100;*/
                    break;
                case 2:
                    this.troncos[tronco.name].body.angle = 40;
                    this.troncos[tronco.name].body.x = (game.width * 55) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 67) / 100;
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                    if (this.isPixel2XL) {
                        this.troncos[tronco.name].body.y = (game.height * 66) / 100;
                    }
                    break;
                case 3:
                    this.troncos[tronco.name].body.angle = 0;
                    this.troncos[tronco.name].width = (game.width * 24) / 100;
                    this.troncos[tronco.name].height = (game.height * 3.5) / 100;
                    this.troncos[tronco.name].body.x = (game.width * 52) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 67) / 100
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                    if (this.isPixel2XL) {
                        this.troncos[tronco.name].body.y = (game.height * 81) / 100;
                    }
                    break;
                default:
            }
            tronco.activado = true;
        } else {
            this.troncos[tronco.name].activado = false;
            switch (tronco.name) {
                case 0:
                    this.troncos[tronco.name].body.angle = 80;
                    this.troncos[tronco.name].body.x = (game.width * 46) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 22) / 100;
                    break;
                case 1:
                    /* this.troncos[tronco.name].body.angle=90;
                     this.troncos[tronco.name].body.x=(game.width*54)/100;
                     this.troncos[tronco.name].body.y=(game.height*23)/100;*/
                    break;
                case 2:
                    this.troncos[tronco.name].body.angle = -20;
                    this.troncos[tronco.name].body.x = (game.width * 52) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 75) / 100
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                    if (this.isPixel2XL) {
                        this.troncos[tronco.name].body.y += (game.height * 3) / 100;
                    }
                    break;
                case 3:
                    this.troncos[tronco.name].body.angle = 30;
                    this.troncos[tronco.name].width = (game.width * 28) / 100;
                    this.troncos[tronco.name].body.x = (game.width * 80) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 81) / 100;
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                    if (this.isPixel2XL) {
                        this.troncos[tronco.name].body.y = (game.height * 83) / 100;
                    }
                    break;
                default:
            }
            tronco.activado = false;
        }

    },
    getBounds: function(currentPlataform) {
        return new Phaser.Rectangle(currentPlataform.left, currentPlataform.top, currentPlataform.width, currentPlataform.height);
    },
    isRectanglesOverlapping: function(rect1, rect2) {
        if (rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) {
            return false;
        }
        if (rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height) {
            return false;
        }
        return true;
    },
    onTap: function() {
        flagArrangeBall = false;
        if (this.bola_basura.spawnSite == 1) {
            this.bola_basura.spawnSite = 2;
        } else {
            this.bola_basura.spawnSite = 1;
        }
        flagDropBall = true;
        game.physics.p2.enable(this.bola_basura);
        this.bola_basura.body.setCircle((this.sizeBola * 55) / 100);
        this.materialBola = game.physics.p2.createMaterial('materialBola');
        this.bola_basura.body.setMaterial(this.materialBola);
        this.bola_basura.allowRotation = true;
        this.bola_basura.body.allowGravity = true;
        var plataformaBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialPlataforma, { friction: -3 });
        var mundoBola = game.physics.p2.createContactMaterial(this.materialBola, this.worldMaterial, { friction: 0 });
        var troncoBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialTronco, { friction: 1, restitution: 0.5 });
    },
    increaseScore: function() {
        if (this.tipoBola == 3 || this.tipoBola == 2) {
            currentScore += 200;
            this.scoreText.text = currentScore;
        } else {
            currentScore += 100;
            this.scoreText.text = currentScore;
        }
    },
    decreaseScore: function() {
        if (this.tipoBola == 3 || this.tipoBola == 2) {
            currentScore -= 200;
            this.scoreText.text = currentScore;
        } else {
            currentScore -= 100;
            this.scoreText.text = currentScore;
        }

    },
}

//nivel 3
var nivel3 = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setGameSize(game.width, game.height);
        game.scale.forcePortrait = true;
        game.scale.refresh();

        //Resetear valores
        currentLevel = 3;
        AMOUNT_BASUREROS = 4;
        AMOUNT_REMOLINOS = 4;
        cant_tron = 4;
        cant_plat = 8;
        flagDropBall = false;
        flagEndGame = false;
        flagResultEndGame = false;
        segundosLagarto = 0;
        segundosTroncoTrampa = 0;
        ballNeeded = false;
        flagArrangeBall = false;
        flagSetNewBall = true;
        currentScore = 0;
        flagTimer = false;
    },
    create: function() {
        if (!music.isPlaying) {
            music.play();
            music.volume = 1;
        }
        /********************************Materiales del juego*******************************************/
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = GRAVEDAD_Y;
        this.worldMaterial = game.physics.p2.createMaterial('worldMaterial');
        game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
        this.materialPlataforma = game.physics.p2.createMaterial('materialPlataforma');
        this.materialTronco = game.physics.p2.createMaterial('materialTronco');
        this.materialBasurero = game.physics.p2.createMaterial('materialBasurero');

        //Array de troncos
        this.troncos = [];

        //Array de plataformas
        this.plataformas = [];

        //Array de basureros
        this.basureros = [];

        //Array de remolino
        this.remolinos = [];

        //Fondo
        var fondo = game.add.sprite(0, 0, 'fondoLimpio');
        fondo.width = game.width;
        fondo.height = game.height;

        //Remolino
        this.remolino0 = game.add.sprite((game.width * 44) / 100, (game.height * 48) / 100, 'remolino');
        this.remolino0.width = (game.height * 10) / 100;
        this.remolino0.height = (game.height * 10) / 100;
        this.remolino0.anchor.setTo(0.5);

        this.remolino1 = game.add.sprite((game.width * 10) / 100, (game.height * 90) / 100, 'remolino');
        this.remolino1.width = (game.height * 10) / 100;
        this.remolino1.height = (game.height * 10) / 100;
        this.remolino1.anchor.setTo(0.5);

        this.remolino2 = game.add.sprite((game.width * 12) / 100, (game.height * 12) / 100, 'remolinoMorado');
        this.remolino2.width = (game.height * 10) / 100;
        this.remolino2.height = (game.height * 10) / 100;
        this.remolino2.anchor.setTo(0.5);

        this.remolino3 = game.add.sprite((game.width * 66) / 100, (game.height * 73) / 100, 'remolinoMorado');
        this.remolino3.width = (game.height * 10) / 100;
        this.remolino3.height = (game.height * 10) / 100;
        this.remolino3.anchor.setTo(0.5);

        this.remolinos[0] = this.remolino0;
        this.remolinos[1] = this.remolino1;
        this.remolinos[2] = this.remolino2;
        this.remolinos[3] = this.remolino3;

        //Bola
        frameBola = Math.floor(Math.random() * 17);
        /*Size de la bola*/
        sizeBola = (game.height * 6) / 100;

        this.bola_basura = game.add.sprite((game.width * 78) / 100, 0, 'basuras', frameBola);

        if (frameBola < 5)
            this.tipoBola = 1;
        else if (frameBola > 4 && frameBola < 10)
            this.tipoBola = 0;
        else if (frameBola > 9 && frameBola < 14)
            this.tipoBola = 2;
        else
            this.tipoBola = 3;

        this.bola_basura.width = sizeBola;
        this.bola_basura.height = sizeBola;

        //Plataformas
        var platFondo = game.add.sprite((game.width * 5) / 100, (game.height * 8) / 100, 'platFondo');
        platFondo.width = (game.width * 90) / 100;
        platFondo.height = (game.height * 26) / 100;

        var plat0 = game.add.sprite((game.width * 66) / 100, (game.height * 36) / 100, 'plat0');
        plat0.width = (game.width * 18) / 100;
        plat0.height = (game.height * 2.5) / 100;

        var plat1 = game.add.sprite((game.width * 34) / 100, (game.height * 48) / 100, 'plat1');
        plat0.width = (game.width * 18) / 100;
        plat0.height = (game.height * 2.5) / 100;

        var plat2 = game.add.sprite((game.width * 4) / 100, (game.height * 54) / 100, 'plat2');
        plat0.width = (game.width * 18) / 100;
        plat0.height = (game.height * 2.5) / 100;

        var plat3 = game.add.sprite((game.width * 30) / 100, (game.height * 70) / 100, 'plat3');
        plat3.width = (game.width * 18) / 100;
        plat3.height = (game.height * 2.5) / 100;

        var plat4 = game.add.sprite((game.width * 30) / 100, (game.height * 94) / 100, 'plat4');
        plat3.width = (game.width * 12) / 100;
        plat3.height = (game.height * 2.5) / 100;

        var platBloqueo1 = game.add.sprite((game.width * 76) / 100, 0, 'platBloqueo');
        platBloqueo1.width = (game.width * 2) / 100;
        platBloqueo1.height = (game.height * 10) / 100;

        var platBloqueo2 = game.add.sprite((game.width * 89) / 100, 0, 'platBloqueo');
        platBloqueo2.width = (game.width * 2) / 100;
        platBloqueo2.height = (game.height * 10) / 100;

        var platBloqueo3 = game.add.sprite((game.width * 22) / 100, (game.height * 20) / 100, 'platBloqueo');
        platBloqueo3.width = (game.width * 2) / 100;
        platBloqueo3.height = (game.height * 28) / 100;

        this.plataformas[0] = plat0;
        this.plataformas[1] = plat1;
        this.plataformas[2] = plat2;
        this.plataformas[3] = plat3;
        this.plataformas[4] = plat4;
        this.plataformas[5] = platBloqueo1;
        this.plataformas[6] = platBloqueo2;
        this.plataformas[7] = platBloqueo3;

        //Orientación de plataformas
        for (var i = 0; i < cant_plat; i++) {
            this.plataformas[i].anchor.setTo(0.5);
            game.physics.p2.enable(this.plataformas[i]);
            switch (i) {
                case 0:
                    this.plataformas[i].body.angle = -16;
                    break;
                case 1:
                    this.plataformas[i].body.angle = 90;
                    break;
                case 2:
                    this.plataformas[i].body.angle = 48;
                    break;
                case 3:
                    this.plataformas[i].body.angle = -28;
                    break;
                case 4:
                    this.plataformas[i].body.angle = -30;
                    break;
                case 7:
                    this.plataformas[i].body.angle = 180;
                    break;
            }
            this.plataformas[i].body.setMaterial(this.materialPlataforma);
            this.plataformas[i].body.motionState = 2;
            this.plataformas[i].body.mass = 0;
        }

        //BASUREROS
        this.bolaCollisionGroup = game.physics.p2.createCollisionGroup();
        this.basureroCollisionGroup = game.physics.p2.createCollisionGroup();


        var basurero_0 = game.add.sprite((game.width * 60) / 100, (game.height * 90) / 100, 'basureros');
        basurero_0.frame = 0;
        var basurero_1 = game.add.sprite((game.width * 46) / 100, (game.height * 14) / 100, 'basureros');
        basurero_1.frame = 1;
        var basurero_2 = game.add.sprite((game.width * 13) / 100, (game.height * 27) / 100, 'basureros');
        basurero_2.frame = 2;
        var basurero_3 = game.add.sprite((game.width * 44) / 100, (game.height * 60) / 100, 'basureros');
        basurero_3.frame = 3;

        //Esto es para hacer match con las basura correspondiente
        this.basureros[0] = basurero_0;
        this.basureros[0].id = 0;
        this.basureros[1] = basurero_1;
        this.basureros[1].id = 1;
        this.basureros[2] = basurero_2;
        this.basureros[2].id = 2;
        this.basureros[3] = basurero_3;
        this.basureros[3].id = 3;

        for (var i = 0; i < this.basureros.length; i++) {
            this.basureros[i].width = (game.width * 14) / 100;
            this.basureros[i].height = (game.height * 10) / 100;
            game.physics.p2.enable(this.basureros[i], true);
            this.basureros[i].body.motionState = 2;
            this.basureros[i].body.mass = 0;
            this.basureros[i].body.clearShapes();
            this.basureros[i].body.setMaterial(this.materialBasurero);
        }
        this.basureros[0].body.angle = -18;
        this.basureros[1].body.angle = 180;
        this.basureros[3].body.angle = -90;

        //Lagarto
        this.lagarto = game.add.sprite((game.width * 100) / 100, (game.height * 50) / 100, 'lagartoReversa', 0);
        this.lagarto.anchor.setTo(0.5);
        this.lagarto.width = (game.width * 50) / 100;
        this.lagarto.height = (game.height * 20) / 100;
        this.lagarto.x = game.width;

        //this.lagarto.angle = 36;

        //Barra tiempo
        this.barraTiempo = game.add.sprite(0, (game.height * 6) / 100, 'barraTiempo');
        this.barraTiempo.width = (game.width * 22) / 100;
        this.barraTiempo.height = (game.height * 1) / 100;

        //Reloj
        this.reloj = game.add.sprite(0, (game.height * 8) / 100, 'reloj');
        this.reloj.width = (game.width * 5) / 100;
        this.reloj.height = (game.height * 4) / 100;

        //Troncos
        /*Creación de troncos*/
        for (var i = 0; i < cant_tron; i++) {
            switch (i) {
                case 0:
                    this.troncos[i] = game.add.sprite((game.width * 84) / 100, (game.height * 32) / 100, "tronco");
                    this.troncos[i].width = (game.width * 20) / 100;
                    this.troncos[i].height = (game.height * 3.5) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle = -15;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width * 96) / 100, (this.troncos[i].height * 75) / 100);
                    break;
                case 1:
                    this.troncos[i] = game.add.sprite((game.width * 46) / 100, (game.height * 39) / 100, "tronco2");
                    this.troncos[i].width = (game.width * 22) / 100;
                    this.troncos[i].height = (game.height * 3.5) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle = -6;
                    break;
                case 2:
                    this.troncos[i] = game.add.sprite((game.width * 34) / 100, (game.height * 62) / 100, "tronco");
                    this.troncos[i].width = (game.width * 20) / 100;
                    this.troncos[i].height = (game.height * 3) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle = 90;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width * 96) / 100, (this.troncos[i].height * 75) / 100);
                    break;
                case 3:
                    this.troncos[i] = game.add.sprite((game.width * 58) / 100, (game.height * 83) / 100, "tronco");
                    this.troncos[i].width = (game.width * 20) / 100;
                    this.troncos[i].height = (game.height * 3) / 100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle = -28;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width * 96) / 100, (this.troncos[i].height * 75) / 100);
                    break;
                default:
                    break;
            }
            this.troncos[i].body.setMaterial(this.materialPlataforma);
            this.troncos[i].name = i;
            this.troncos[i].inputEnabled = true;
            this.troncos[i].body.motionState = 2;
            this.troncos[i].body.mass = 0;
            this.troncos[i].activado = false;
            this.troncos[i].events.onInputDown.add(this.tocandoTronco, this);
        }

        var style = {
            font: 'bold ' + ((game.width * 6) / 100) + 'pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }

        this.scoreText = game.add.text(0, 0, '0', style);

        var plataformaMundo = game.physics.p2.createContactMaterial(this.materialPlataforma, this.worldMaterial, { friction: 0 });
        game.input.onDown.add(this.onTap, this);

    },
    createBola: function() {
        flagDropBall = false;
        flagArrangeBall = true;
        flagSetNewBall = true;

        frameBola = Math.floor(Math.random() * 17);
        this.bola_basura.frame = frameBola;
        this.checkBola(frameBola);
    },
    checkBola: function(tipoBola) {
        if (tipoBola < 5)
            this.tipoBola = 1;
        else if (tipoBola > 4 && tipoBola < 10)
            this.tipoBola = 0;
        else if (tipoBola > 9 && tipoBola < 14)
            this.tipoBola = 2;
        else
            this.tipoBola = 3;
    },
    update: function() {

        //Reducir tiempo
        if (flagTimer)
            this.barraTiempo.width -= 0.05;

        //Checar fin de juego
        if (this.barraTiempo.width <= 0) {
            this.state.start('final');
            faseActual = 3;
        }

        //Animación lagarto
        segundosLagarto++;

        if (segundosLagarto == 28) {
            if (this.lagarto.frame == 0)
                this.lagarto.frame = 1;
            else
                this.lagarto.frame = 0;

            segundosLagarto = 0;
        }

        //Animacion tronco trampa
        segundosTroncoTrampa++;
        if (segundosTroncoTrampa == 40) {
            if (!this.troncos[0].activado) {
                this.troncos[0].body.angle = 90;
                this.troncos[0].body.x = (game.width * 94) / 100;
                this.troncos[0].activado = true;
            } else {
                this.troncos[0].body.angle = -15;
                this.troncos[0].body.x = (game.width * 84) / 100;
                this.troncos[0].activado = false;
            }
            segundosTroncoTrampa = 0;
        }

        var speedLaunch = 0;
        var colisionMorado = false;

        //Checa colisiones con remolinos
        for (var i = 0; i < AMOUNT_REMOLINOS; i++) {
            var rectBola = this.getBounds(this.bola_basura);
            var rectRemolino = this.getBounds(this.remolinos[i]);
            if (this.isRectanglesOverlapping(rectBola, rectRemolino)) {
                if (i == 0)
                    speedLaunch = -20000;
                else if(i==1)
                    speedLaunch = +1000;
                else if(i==3)
                    colisionMorado = true;
            }
        }
        if (speedLaunch < 0)
            this.physics.p2.gravity.y = speedLaunch;
        else if (speedLaunch > 0)
            this.physics.p2.gravity.x = speedLaunch;
        else {
            this.physics.p2.gravity.y = GRAVEDAD_Y;
            this.physics.p2.gravity.x = 0;
        }

        if (colisionMorado) {
            this.bola_basura.body.x = this.remolinos[2].x;
            this.bola_basura.body.y = this.remolinos[2].y;
        }

        for (var i = 0; i < AMOUNT_REMOLINOS; i++)
            this.remolinos[i].angle += 10;

        if (!flagEndGame) {
            var rectBola;
            var rectLagarto;
            if (flagDropBall) {
                flagTimer = true;
                for (var i = 0; i < AMOUNT_BASUREROS; i++) {
                    rectBola = this.getBounds(this.bola_basura);
                    var rectBas = this.getBounds(this.basureros[i]);

                    if (this.isRectanglesOverlapping(rectBola, rectBas)) {
                        if (flagSetNewBall) {
                            if (this.tipoBola == this.basureros[i].id) {
                                this.increaseScore();
                                this.barraTiempo.width += 10;
                                this.createBola();

                            } else
                                this.decreaseScore();
                            this.barraTiempo.width -= 10;
                            this.createBola();

                        }
                        flagArrangeBall = true;
                        flagSetNewBall = true;
                    }
                }

                if (this.bola_basura.body.velocity.x > 0) {
                    this.bola_basura.body.rotation += 0.1;
                }
                if (this.bola_basura.body.velocity.x < 0) {
                    this.bola_basura.body.rotation -= 0.1;
                }

                //Checa colisiones con el lagarto
                rectLagarto = this.getBounds(this.lagarto);
                if (this.isRectanglesOverlapping(rectBola, rectLagarto)) {
                    currentScore = -1;
                    faseActual = 3;
                    this.state.start('final');
                }
            }

            if (flagArrangeBall) {
                this.bola_basura.body.y = (game.height * 2) / 100;
                this.bola_basura.body.x = (game.width * 82) / 100;
                this.bola_basura.body.velocity.x = 0;
                this.bola_basura.body.velocity.y = 0;
            }

        }
    },
    tocandoTronco: function(tronco) {
        //Si el tronco está desactivado se ejecuta esto
        if (!tronco.activado) {
            this.troncos[tronco.name].activado = true;
            switch (tronco.name) {
                case 1:
                    this.troncos[tronco.name].body.angle = 90;
                    this.troncos[tronco.name].body.x = (game.width * 58) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 46) / 100;
                    break;
                case 2:
                    this.troncos[tronco.name].body.angle = 190;
                    this.troncos[tronco.name].body.x = (game.width * 26) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 64) / 100;
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                    break;
                case 3:
                    this.troncos[tronco.name].body.angle = -120;
                    this.troncos[tronco.name].body.x = (game.width * 60) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 76) / 100;
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);

                    break;
                default:
                    break;
            }
            tronco.activado = true;
            //Si el tronco está activado se ejecuta esto
        } else {
            this.troncos[tronco.name].activado = false;
            switch (tronco.name) {
                case 1:
                    this.troncos[tronco.name].body.angle = -6;
                    this.troncos[tronco.name].body.x = (game.width * 46) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 39) / 100;
                    break;
                case 2:
                    this.troncos[tronco.name].body.angle = 90;
                    this.troncos[tronco.name].body.x = (game.width * 34) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 62) / 100;
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                    break;
                case 3:
                    this.troncos[tronco.name].body.angle = -28;
                    this.troncos[tronco.name].body.x = (game.width * 58) / 100;
                    this.troncos[tronco.name].body.y = (game.height * 83) / 100;
                    this.troncos[tronco.name].body.clearShapes();
                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width * 96) / 100, (this.troncos[tronco.name].height * 75) / 100);
                    break;
                default:
                    break;
            }
            tronco.activado = false;
        }
    },
    getBounds: function(currentPlataform) {
        return new Phaser.Rectangle(currentPlataform.left, currentPlataform.top, currentPlataform.width, currentPlataform.height);
    },
    isRectanglesOverlapping: function(rect1, rect2) {
        if (rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width)
            return false;
        if (rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height)
            return false;
        return true;
    },
    render: function() {},
    onTap: function() {
        flagArrangeBall = false;
        flagDropBall = true;
        game.physics.p2.enable(this.bola_basura);
        this.bola_basura.body.setCircle(this.sizeBola / 2);
        this.materialBola = game.physics.p2.createMaterial('materialBola');
        this.bola_basura.body.setMaterial(this.materialBola);
        this.bola_basura.allowRotation = true;
        var plataformaBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialPlataforma, { friction: -3 });
        var troncoBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialTronco, { friction: 1 });
        this.bola_basura.body.motionState = 1;
        this.bola_basura.body.mass = 1;
    },
    increaseScore:function(){
      if(this.tipoBola==2||this.tipoBola==0){
        currentScore+=200;
        this.scoreText.text = currentScore;
      }
      else{
        currentScore+=300;
        this.scoreText.text = currentScore;
      }

    },
    decreaseScore: function() {
        if (this.tipoBola == 3 || this.tipoBola == 0) {
            currentScore -= 200;
            this.scoreText.text = currentScore;
        } else {
            currentScore -= 100;
            this.scoreText.text = currentScore;
        }

    },
}

//Estados de incio y final
var estadoPrincipal = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    create: function() {
        var fondo = game.add.sprite(0, 0, 'fondoInicio');
        var anchoBoton = (game.width * 45) / 100;
        var largoBoton = (game.height * 10) / 100;
        music = game.add.audio('loopMusica');
        music.loop = true;
        music.play();
        music.isPlaying = true;
        fondo.width = game.width;
        fondo.height = game.height;
        var boton1 = this.add.button(game.width / 2, (game.height * 50) / 100, 'boton1', this.iniciarEtapa1, this);
        boton1.anchor.setTo(0.5);
        boton1.width = anchoBoton;
        boton1.height = largoBoton;
        var boton2 = this.add.button(game.width / 2, (game.height * 62) / 100, 'boton2', this.iniciarEtapa2, this);
        boton2.anchor.setTo(0.5);
        boton2.width = anchoBoton;
        boton2.height = largoBoton;
        boton2.visible = false;
        var boton3 = this.add.button(game.width / 2, (game.height * 74) / 100, 'boton3', this.iniciarEtapa3, this);
        boton3.anchor.setTo(0.5);
        boton3.width = anchoBoton;
        boton3.height = largoBoton;
        boton3.visible = false;
        var botonSalir = this.add.button(game.width * 30 / 100, (game.height * 90) / 100, 'boton_mundos', this.salir, this);
        botonSalir.anchor.setTo(0.5);
        botonSalir.width = (game.width * 30) / 100;
        botonSalir.height = (game.width * 11) / 100;
        var botonInstru = this.add.button(game.width * 70 / 100, (game.height * 90) / 100, 'botonInstrucciones', this.mostrarInstrucciones, this);
        botonInstru.anchor.setTo(0.5);
        botonInstru.width = (game.width * 30) / 100;
        botonInstru.height = (game.width * 11) / 100;
        var botonSonido = this.add.button(game.width * 15 / 100, (game.height * 5) / 100, 'botonSonido', this.toggleSound, this);
        botonSonido.anchor.setTo(0.5);
        botonSonido.width = (game.width * 20) / 100;
        botonSonido.height = (game.width * 11) / 100;

        if (localStorage.getItem("PuntajeTrashLvl1") != null) {
            if (localStorage.getItem("PuntajeTrashLvl1") >= 500) {
                boton2.visible = true;
            }
        }

        if (localStorage.getItem("PuntajeTrashLvl2") != null) {
            if (localStorage.getItem("PuntajeTrashLvl2") >= 700) {
                boton3.visible = true;
            }
        }
    },
    iniciarEtapa1: function() {
        this.state.start('GamePlayManglar');
    },
    iniciarEtapa2: function() {
        this.state.start('nivel2');
    },
    iniciarEtapa3: function() {
        this.state.start('nivel3');
    },
    salir: function() {
        music.stop();
        game.state.start("PlanetasMenu");
    },
    mostrarInstrucciones: function() {
        game.state.start('instrucciones')
    },
    toggleSound:function(){
      if (music.isPlaying) {
        music.stop();
        music.isPlaying=false;
      }
      else{
        music.play();
        music.isPlaying=true;
      }

    },
}
var estadoFinal = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    create: function() {
        var fondo;
        var anchoBoton = (game.width * 35) / 100;
        var largoBoton = (game.height * 8) / 100;
        if (currentScore < 0) {
            fondo = game.add.sprite(0, 0, 'fondoPerder');
            music.volume = 0.25;
        } else {
            fondo = game.add.sprite(0, 0, 'fondoGanar');
            var text = game.add.text(game.width / 2, (game.height / 2) - 100, 'Reciclaste: ' + currentScore + " puntos");
            var textMaximo = "";
            text.anchor.setTo(0.5);
            switch (currentLevel) {
                case 1:
                    if (localStorage.getItem('PuntajeTrashLvl1') == null) {
                        PuntajeTrashLvl1 = currentScore;
                    } else {
                        var score = localStorage.getItem('PuntajeTrashLvl1');
                        if (currentScore > score) { PuntajeTrashLvl1 = currentScore; } else { PuntajeTrashLvl1 = score }
                    }
                    localStorage.setItem("PuntajeTrashLvl1", PuntajeTrashLvl1);
                    var maxScore = localStorage.getItem("PuntajeTrashLvl1");
                    textMaximo = game.add.text(game.width / 2, (game.height / 2) - 75, 'Tu puntaje máximo es: ' + maxScore);
                    break;
                case 2:
                    if (localStorage.getItem('PuntajeTrashLvl2') == null) {
                        PuntajeTrashLvl2 = currentScore;
                        localStorage.setItem("PuntajeTrashLvl2", PuntajeTrashLvl2);
                    } else {
                        var score = localStorage.getItem('PuntajeTrashLvl2');;
                        if (currentScore > score) { PuntajeTrashLvl2 = currentScore; } else { PuntajeTrashLvl2 = score }
                    }

                    localStorage.setItem("PuntajeTrashLvl2", PuntajeTrashLvl2);
                    var maxScore2 = localStorage.getItem("PuntajeTrashLvl2");
                    textMaximo = game.add.text(game.width / 2, (game.height / 2) - 75, 'Tu puntaje máximo es: ' + maxScore2);
                    break;
                case 3:
                    if (localStorage.getItem('PuntajeTrashLvl3') == null) { PuntajeTrashLvl3 = currentScore; } else {
                        var score = localStorage.getItem('PuntajeTrashLvl3');
                        if (currentScore > score) { PuntajeTrashLvl3 = currentScore; } else { PuntajeTrashLvl3 = score }
                    }
                    localStorage.setItem("PuntajeTrashLvl3", PuntajeTrashLvl3);
                    var maxScore3 = localStorage.getItem("PuntajeTrashLvl3");
                    textMaximo = game.add.text(game.width / 2, (game.height / 2) - 75, 'Tu puntaje máximo es: ' + maxScore3);
                    break;
                default:

            }
            textMaximo.fontSize = 15;
            textMaximo.anchor.setTo(0.5);
        }

        fondo.width = game.width;
        fondo.height = game.height;
        var boton = this.add.button(game.width * 30 / 100, (game.height * 85 / 100), 'boton_reinicar', this.iniciarJuego, this);
        boton.anchor.setTo(0.5);
        boton.width = anchoBoton;
        boton.height = largoBoton;
        var botonMenu = this.add.button(game.width * 70 / 100, (game.height * 85 / 100), 'boton_salir', this.menuJuego, this);
        botonMenu.anchor.setTo(0.5);
        botonMenu.width = anchoBoton;
        botonMenu.height = largoBoton;
    },
    iniciarJuego: function() {
        switch (currentLevel) {
            case 1:
                this.state.start('GamePlayManglar');
                break;
            case 2:
                this.state.start('nivel2');
                break;
            case 3:
                this.state.start('nivel3');
                break;
            default:
                this.state.start('inicio');
        }


    },
    menuJuego: function() {
        music.stop();
        music.isPlaying = false;
        this.state.start('inicio');

    },
}
var estadoInstrucciones = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    create: function() {

        var fondo;
        var anchoBoton = (game.width * 35) / 100;
        var largoBoton = (game.height * 8) / 100;

        fondo = game.add.sprite(0, 0, 'fondoIstrucciones');
        fondo.width = game.width;
        fondo.height = game.height;
        var botonMenu = this.add.button(game.width * 50 / 100, (game.height * 95 / 100), 'boton_salir', this.menuInicio, this);
        botonMenu.anchor.setTo(0.5);
        botonMenu.width = anchoBoton;
        botonMenu.height = largoBoton;
    },
    menuInicio: function() {
        music.stop();
        this.state.start('inicio');

    },
}


game.state.add('gameplayManglarDesktop', GamePlayManglarDesktop);
game.state.add('GamePlayManglar', GamePlayManglar);
game.state.add('nivel2', nivel2);
game.state.add('nivel3', nivel3);
game.state.add('instrucciones', estadoInstrucciones);
game.state.add('inicio', estadoPrincipal);
game.state.add('final', estadoFinal);
