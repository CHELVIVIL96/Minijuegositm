var STATE_GAME_NONE = 0;
var STATE_GAME_LOADING = 1;
var STATE_GAME_PLAYING = 2;
var STATE_GAME_OVER = 3;
var STATE_GAME_WIN = 4;
var STATE_GAME_MENU = 5;
var STATE_GAME_LEVEL = 0;
// son los estados de juego se le asignan valores numericos.
var puntos_level = 0;
var loop = 0;
var stateGame;
var puntaje = 0;
var permitirDisparo=true;
var nivel2_lock=true;
var nivel3_lock=true;
var nivel4_lock=true;
var velocidadBarra;

var basureros_array = [{ id: 0, idImage: 'basureroOrganico', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroOrganico.png' },
    { id: 1, idImage: 'basureroVidrio', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroVidrio.png' },
    { id: 2, idImage: 'basureroEnvases', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroEnvases.png' },
    { id: 3, idImage: 'basureroCarton', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroCartonYPapel.png' },
    { id: 4, idImage: 'basureroLatas', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroLatasYAluminio.png' },
    { id: 5, idImage: 'basureroEspecial', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/basureros/BasureroManejoEspecial.png' }
];


var desechoOrganicos = [{ id: 0, idImage: 'desechoOrganico1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico1.png' },
    { id: 0, idImage: 'desechoOrganico2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico2.png' },
    { id: 0, idImage: 'desechoOrganico3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico3.png' },
    { id: 0, idImage: 'desechoOrganico4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico4.png' },
    { id: 0, idImage: 'desechoOrganico5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico5.png' },
    { id: 0, idImage: 'desechoOrganico6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/organico1.png' }
];

var desechoLata = [{ id: 4, idImage: 'desechoLata1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio1.png' },
    { id: 4, idImage: 'desechoLata2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio2.png' },
    { id: 4, idImage: 'desechoLata3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio3.png' },
    { id: 4, idImage: 'desechoLata4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio4.png' },
    { id: 4, idImage: 'desechoLata5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio5.png' },
    { id: 4, idImage: 'desechoLata6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/lataOAluminio3.png' }
];

var desechoPapel = [{ id: 3, idImage: 'desechoPapel1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton1.png' },
    { id: 3, idImage: 'desechoPapel2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton2.png' },
    { id: 3, idImage: 'desechoPapel3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton3.png' },
    { id: 3, idImage: 'desechoPapel4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton4.png' },
    { id: 3, idImage: 'desechoPapel5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton5.png' },
    { id: 3, idImage: 'desechoPapel6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/papelOcarton2.png' }
];

var desechoVidrio = [{ id: 1, idImage: 'desechoVidrio1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio1.png' },
    { id: 1, idImage: 'desechoVidrio2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio2.png' },
    { id: 1, idImage: 'desechoVidrio3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio3.png' },
    { id: 1, idImage: 'desechoVidrio4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio4.png' },
    { id: 1, idImage: 'desechoVidrio5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio5.png' },
    { id: 1, idImage: 'desechoVidrio6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Vidrio3.png' }
];

var desechoEnvase = [{ id: 2, idImage: 'desechoEnvases1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases1.png' },
    { id: 2, idImage: 'desechoEnvases2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases1.png' },
    { id: 2, idImage: 'desechoEnvases3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases2.png' },
    { id: 2, idImage: 'desechoEnvases4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases3.png' },
    { id: 2, idImage: 'desechoEnvases5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases4.png' },
    { id: 2, idImage: 'desechoEnvases6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/Envases5.png' }
];

var desechoEspecial = [{ id: 5, idImage: 'desechoEspecial1', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial1.png' },
    { id: 5, idImage: 'desechoEspecial2', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial2.png' },
    { id: 5, idImage: 'desechoEspecial3', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial3.png' },
    { id: 5, idImage: 'desechoEspecial4', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial4.png' },
    { id: 5, idImage: 'desechoEspecial5', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial3.png' },
    { id: 5, idImage: 'desechoEspecial6', x: 0, y: 250, ruta: 'assets/img/juegoBasketball/Basura/ManejoEspecial2.png' }
];
//Estos son arreglos con las caracteristicas de cada uno de los basureros estas caracteristicas
//se utilizan para las opciones de Phaser


GameOverManager = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        //ESto hace responsivo el proyecto

    },
    preload: function() {
        game.load.image('background', 'assets/img/juegoBasketball/gameover/fondo.png');
        game.load.image('msg', 'assets/img/juegoBasketball/gameover/msg.png');
        game.load.image('1e', 'assets/img/juegoBasketball/gameover/1estrella.png');
        game.load.image('2e', 'assets/img/juegoBasketball/gameover/2estrella.png');
        game.load.image('3e', 'assets/img/juegoBasketball/gameover/3estrella.png');
         game.load.image('marcoP', 'assets/img/juegoBasketball/gameover/marcoPuntos.png');
        game.load.spritesheet('salir_inicio', 'assets/img/juegoBasketball/FondoInicio/BtnSalir.png',646,202,2);
        //Pr4eload se encarga de precargar los elementos del juego
    },
    create: function() {
        this.style = {
            font: 'bold 15pt Arial',
            fill: '#00000',
            align: 'center',
        }

         this.sfxGameOver = game.add.audio('aplausos');
        // this.sfxGameOver.play();
         this.gameOver();
         this.colocarEstrellas();
         puntaje=0;
        this.btn_salir=game.add.button(game.width/2,game.height*88/100, 'salir_inicio', this.restart, this, 1,2);
        this.btn_salir.anchor.setTo(0.5);
        this.btn_salir.width=game.width*38/100;
        this.btn_salir.height=game.width*15/100;
    },
    update: function() {
        switch (stateGame) {
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_OVER:

                break;

            case STATE_GAME_WIN:

                break;

            case STATE_GAME_MENU:

                break;
        }
    },
    restart:function(){
        
game.state.start('gameplayParque');

  //Este metodo reinicia el juego.
    },
    gameOver:function(){

this.fondo=game.add.sprite(0,0,'background');
this.fondo.width = game.width;
this.fondo.height = game.height;
this.msg=game.add.sprite(game.width/2,game.height*60/100,'msg');
this.msg.anchor.setTo(0.5);
this.msg.width=game.width*62/100;
this.msg.height=game.width*20/100;
this.marcoP=game.add.sprite(game.width/2,game.height*75/100,'marcoP');
this.marcoP.anchor.setTo(0.5);
this.marcoP.width=game.width*48/100;
this.marcoP.height=game.width*18/100;
this.scoreText = game.add.text(this.marcoP.x+game.width*10/100,this.marcoP.y+game.width*1.5/100, '0', this.style);
this.scoreText.anchor.setTo(0.5);
this.scoreText.text = puntaje;

//ESte metodo contiene todas las funciones del GAMEOVER

},
colocarEstrellas:function(){
if(puntaje>=100&&puntaje<400){
    this.estrellas=game.add.sprite(game.width/2-game.width*5/100,game.height*7/100,'1e');
    this.estrellas.anchor.setTo(0.5);
    this.estrellas.width=game.width*48/100;
    this.estrellas.height=game.width*18/100;
}
if(puntaje>=400&&puntaje<700){
    this.estrellas=game.add.sprite(game.width/2,game.height*5/100,'2e');
    this.estrellas.anchor.setTo(0.5);
    this.estrellas.width=game.width*48/100;
    this.estrellas.height=game.width*18/100;

}
if(puntaje>=700){
    this.estrellas=game.add.sprite(game.width/2,game.height*5/100,'3e');
    this.estrellas.anchor.setTo(0.5);
    this.estrellas.width=game.width*48/100;
    this.estrellas.height=game.width*18/100;
}
//Este metodo asigna el total de estrellas obtenidas por el jugador dependiendo de los puntos.
}
}
var GamePlayParque = function() {};

GamePlayParque.prototype = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        //ESto hace responsivo el proyecto
        var valor = 1;

    },
    preload: function() {
        stateGame = STATE_GAME_LOADING;
        game.load.image('background_inicio', 'assets/img/juegoBasketball/FondoInicio/FondoMenu.png');
        game.load.spritesheet('nivel1', 'assets/img/juegoBasketball/FondoInicio/n1.png',340,134,2);
        game.load.spritesheet('nivel2', 'assets/img/juegoBasketball/FondoInicio/n2.png',340,134,2);
        game.load.spritesheet('nivel3', 'assets/img/juegoBasketball/FondoInicio/n3.png',340,134,2);
        game.load.spritesheet('nivel4', 'assets/img/juegoBasketball/FondoInicio/n4.png',340,134,2);
        game.load.spritesheet('home', 'assets/img/juegoBasketball/FondoInicio/home.png',175,172,2);
        game.load.image('candado', 'assets/img/juegoBasketball/FondoInicio/candado.png');
        game.load.image('manito', 'assets/img/juegoBasketball/FondoInicio/manito.png');
        game.load.spritesheet('ins_inicio', 'assets/img/juegoBasketball/FondoInicio/BtnInstrucciones.png',340,107,2);
        game.load.spritesheet('salir_inicio', 'assets/img/juegoBasketball/FondoInicio/BtnSalir.png',646,202,2);


        game.load.image('background', 'assets/img/juegoBasketball/fondo/fondo.png');
        game.load.image('can', 'assets/img/juegoBasketball/canion/cañon.png');
        game.load.image('base', 'assets/img/juegoBasketball/canion/Base.png');
        game.load.image('barra', 'assets/img/juegoBasketball/canion/barras.png');
        game.load.spritesheet("BotonPlay", 'assets/img/juegoBasketball/botonPlay.png', 330, 328, 3);
        game.load.spritesheet("BotonMenu", 'assets/img/juegoBasketball/botonPlay.png', 178, 176, 3);
        game.load.image('line', 'assets/img/juegoBasketball/charge.png');
        game.load.image('shot', 'assets/img/juegoBasketball/shots.png');

        game.load.image('v', 'assets/img/juegoBasketball/circulos/simboloBasuraVidrio.png');
        game.load.image('p', 'assets/img/juegoBasketball/circulos/simboloBasuraPapelYCarton.png');
        game.load.image('te', 'assets/img/juegoBasketball/circulos/simboloBasuraTratoEspecial.png');
        game.load.image('o', 'assets/img/juegoBasketball/circulos/simboloBasuraOrganica.png');
        game.load.image('e', 'assets/img/juegoBasketball/circulos/simboloBasuraEnvases.png');
        game.load.image('a', 'assets/img/juegoBasketball/circulos/simboloBasuraAluminioYLatas.png');
        game.load.image('cincuenta', 'assets/img/juegoBasketball/canion/cincuenta.png');
        game.load.image('cien', 'assets/img/juegoBasketball/canion/cien.png');

        game.load.image(basureros_array[0].idImage, basureros_array[0].ruta);
        game.load.image(basureros_array[1].idImage, basureros_array[1].ruta);
        game.load.image(basureros_array[2].idImage, basureros_array[2].ruta);
        game.load.image(basureros_array[3].idImage, basureros_array[3].ruta);
        game.load.image(basureros_array[4].idImage, basureros_array[4].ruta);
        game.load.image(basureros_array[5].idImage, basureros_array[5].ruta);

        game.load.image(desechoOrganicos[0].idImage, desechoOrganicos[0].ruta);
        game.load.image(desechoOrganicos[1].idImage, desechoOrganicos[1].ruta);
        game.load.image(desechoOrganicos[2].idImage, desechoOrganicos[2].ruta);
        game.load.image(desechoOrganicos[3].idImage, desechoOrganicos[3].ruta);
        game.load.image(desechoOrganicos[4].idImage, desechoOrganicos[4].ruta);
        game.load.image(desechoOrganicos[5].idImage, desechoOrganicos[5].ruta);

        game.load.image(desechoLata[0].idImage, desechoLata[0].ruta);
        game.load.image(desechoLata[1].idImage, desechoLata[1].ruta);
        game.load.image(desechoLata[2].idImage, desechoLata[2].ruta);
        game.load.image(desechoLata[3].idImage, desechoLata[3].ruta);
        game.load.image(desechoLata[4].idImage, desechoLata[4].ruta);
        game.load.image(desechoLata[5].idImage, desechoLata[5].ruta);

        game.load.image(desechoPapel[0].idImage, desechoPapel[0].ruta);
        game.load.image(desechoPapel[1].idImage, desechoPapel[1].ruta);
        game.load.image(desechoPapel[2].idImage, desechoPapel[2].ruta);
        game.load.image(desechoPapel[3].idImage, desechoPapel[3].ruta);
        game.load.image(desechoPapel[4].idImage, desechoPapel[4].ruta);
        game.load.image(desechoPapel[5].idImage, desechoPapel[5].ruta);

        game.load.image(desechoEnvase[0].idImage, desechoEnvase[0].ruta);
        game.load.image(desechoEnvase[1].idImage, desechoEnvase[1].ruta);
        game.load.image(desechoEnvase[2].idImage, desechoEnvase[2].ruta);
        game.load.image(desechoEnvase[3].idImage, desechoEnvase[3].ruta);
        game.load.image(desechoEnvase[4].idImage, desechoEnvase[4].ruta);
        game.load.image(desechoEnvase[5].idImage, desechoEnvase[5].ruta);

        game.load.image(desechoEspecial[0].idImage, desechoEspecial[0].ruta);
        game.load.image(desechoEspecial[1].idImage, desechoEspecial[1].ruta);
        game.load.image(desechoEspecial[2].idImage, desechoEspecial[2].ruta);
        game.load.image(desechoEspecial[3].idImage, desechoEspecial[3].ruta);
        game.load.image(desechoEspecial[4].idImage, desechoEspecial[4].ruta);
        game.load.image(desechoEspecial[5].idImage, desechoEspecial[5].ruta);

        game.load.image(desechoVidrio[0].idImage, desechoVidrio[0].ruta);
        game.load.image(desechoVidrio[1].idImage, desechoVidrio[1].ruta);
        game.load.image(desechoVidrio[2].idImage, desechoVidrio[2].ruta);
        game.load.image(desechoVidrio[3].idImage, desechoVidrio[3].ruta);
        game.load.image(desechoVidrio[4].idImage, desechoVidrio[4].ruta);
        game.load.image(desechoVidrio[5].idImage, desechoVidrio[5].ruta);
        game.load.audio('loopMusic', 'assets/Sonidos/Principal.mp3');
        //Todo lo que se quiere utilizar se tiene que pre cargar aca

        game.load.image('ins', 'assets/img/juegoBasketball/instrucciones.png');
        game.load.audio('boom', 'assets/Sonidos/boom.wav');
        game.load.audio('click', 'assets/Sonidos/click.wav')

    },

    create: function() {
        this.clicked=true;
        this.FondoInicio=game.add.sprite(0,0,'background_inicio');
        this.FondoInicio.width = game.width;
        this.FondoInicio.height = game.height;

        this.level_1=game.add.button(game.width/2, game.height*27/100, 'nivel1', this.onTap, this, 1,2);
        this.level_1.anchor.setTo(0.5);

        this.level_1.width=game.width*35/100;
        this.level_1.height=game.width*13/100;
        this.level_1.anchor.setTo(0.5);

        this.level_2=game.add.button(game.width/2, game.height*37/100, 'nivel2', this.cambiarAnivel2, this, 1,2);
        this.level_2.width=game.width*35/100;
        this.level_2.height=game.width*13/100;
        this.level_2.anchor.setTo(0.5);

        this.level_3=game.add.button(game.width/2, game.height*47/100, 'nivel3', this.cambiarAnivel3, this, 1,2);
        this.level_3.width=game.width*35/100;
        this.level_3.height=game.width*13/100;
        this.level_3.anchor.setTo(0.5);

        this.level_4=game.add.button(game.width/2, game.height*57/100, 'nivel4', this.cambiarAnivel4, this, 1,2);
        this.level_4.width=game.width*35/100;
        this.level_4.height=game.width*13/100;
        this.level_4.anchor.setTo(0.5);

        this.btn_instrucciones=game.add.button(game.width/2,game.height*69/100, 'ins_inicio', this.mostrarInstrucciones, this, 1,2);
        this.btn_instrucciones.width=game.width*35/100;
        this.btn_instrucciones.height=game.width*13/100;
        this.btn_instrucciones.anchor.setTo(0.5);

        this.btn_salir=game.add.button(game.width/2,game.height*79/100, 'salir_inicio', this.salir, this, 1,2);
        this.btn_salir.anchor.setTo(0.5);
        this.btn_salir.width=game.width*35/100;
        this.btn_salir.height=game.width*13/100;

         if(nivel2_lock){
         this.level_2.inputEnabled = false;
         this.candado_nivel2=game.add.sprite(game.width/2, game.height*37/100,'candado');
         this.candado_nivel2.anchor.setTo(0.5);
         this.candado_nivel2.width=game.width*10/100;
         this.candado_nivel2.height=game.width*10/100;
         this.candado_nivel2.visible=true;
           }
           if(nivel3_lock){
         this.level_3.inputEnabled = false;
         this.candado_nivel3=game.add.sprite(game.width/2, game.height*47/100,'candado');
         this.candado_nivel3.anchor.setTo(0.5);
         this.candado_nivel3.width=game.width*10/100;
         this.candado_nivel3.height=game.width*10/100;
         this.candado_nivel3.visible=true;
           }
           if(nivel4_lock){
         this.level_4.inputEnabled = false;
         this.candado_nivel4=game.add.sprite(game.width/2, game.height*57/100,'candado');
         this.candado_nivel4.anchor.setTo(0.5);
         this.candado_nivel4.width=game.width*10/100;
         this.candado_nivel4.height=game.width*10/100;
         this.candado_nivel4.visible=true;
           }
        this.flag = true;
        this.click=game.add.audio('click');
        this.nivel1=true;
         this.loopMusic = game.add.audio('loopMusic');
          this.loopMusic.loop = true;
        // se crean las variables globales por asi decirlo
    },
    mostrarInstrucciones:function(){

        if(this.clicked){
            this.btn_instrucciones.destroy();
        this.click.play();

        this.instrucciones=game.add.sprite(0,0,'ins');
        this.instrucciones.width=game.width;
        this.instrucciones.height=game.height;
        this.instrucciones.visible=true;

 this.jugar=game.add.button(game.width/2, game.height/1.03, 'home', this.ocultar, this, 1,2);
 //this.jugar.game.input.onDown.add(this.ocultar,this);
 this.jugar.width=game.width*10/100;
 this.jugar.height=game.width*11/100;
 this.jugar.anchor.setTo(0.5);
 this.clicked=false;
}

 // este metodo muestra las instrucciones del juego
    },
    ocultar:function(){
        this.instrucciones.visible=false;
        this.jugar.destroy();
        this.clicked=true;
        this.create();
        //oculta las instrucciones

    },
    desbloquearNivel2:function(){
   if(puntaje>=0)
   {
  nivel2_lock=false;
   }
    },
     desbloquearNivel3:function(){
   if(puntaje>=0)
   {
  nivel3_lock=false;
   }
    },
    desbloquearNivel4:function(){
   if(puntaje>=0)
   {
  nivel4_lock=false;
   }
    },

    cambiarAnivel2:function(){
  this.nivel2=true;
  this.nivel1=false;
  this.nivel3=false;
  this.nivel4=false;
  this.level_1.destroy();
  this.level_3.destroy();
  this.level_4.destroy();
  this.onTap();

    },
    cambiarAnivel3:function(){
  this.nivel2=false;
  this.nivel1=false;
  this.nivel4=false;
  this.nivel3=true;
  this.level_4.destroy();
  this.level_2.destroy();
  this.level_1.destroy();
  this.onTap();

    },
 cambiarAnivel4:function(){
  this.nivel4=true;
  this.nivel2=false;
  this.nivel1=false;
  this.nivel3=false;
  this.level_1.destroy();
  this.level_2.destroy();
  this.level_3.destroy();
  this.onTap();
    },
    salir:function(){
        this.loopMusic.stop();
        game.state.start("PlanetasMenu");

    },
    onTap: function() {
        if (this.flag) {
           
           this.btn_salir.destroy();
           this.btn_instrucciones.destroy();

            this.fondo = game.add.sprite(0, 0, 'background');
           // this.fondo.scale.setTo(0.478, 0.484);
            this.fondo.width = game.width;
            this.fondo.height = game.height;
            //SECCION DE ESCALADO+*****************************************************************
            this.scaleBasureroHeight=game.height*16/100;
            this.scaleBasureroWidth=game.width*16/100;

            this.scaleDistInYBasurero=game.height*19/100;

            this.scaleLineWidth=game.width*77/100;
            this.scaleLineHeight=game.height*2/100;

            this.scaleCanWidth=game.width*14/100;
            this.scaleCanHeight=game.width*22/100;
            //*************************************************************************************

            this.line = game.add.sprite(game.width*12.5/100,game.height*1.2/100, 'line');
            this.line.width=this.scaleLineWidth;
            this.line.height=this.scaleLineHeight;
            //this.line.scale.setTo(0.15);

            this.shotline=game.add.sprite(game.width*5/100,game.height*35/100, 'shot');
            this.shotline.width=game.width*4/100;
            this.shotline.height=game.height*13.5/100
            this.treinta=this.shotline.height*33.3/100;
            this.tiros=0;
            this.noventa=this.shotline.height*99.9/100;

            this.base = game.add.sprite(game.width/2, game.height-game.height*8/100, 'base');
            this.base.anchor.setTo(0.5, 0.5);
            this.base.width=game.width*38/100;
            this.base.height=game.width*20/100;

            this.can = game.add.sprite(this.base.centerX, this.base.centerY - game.height*5/100, 'can');
            this.can.anchor.setTo(0.5, 1);
            this.can.width=this.scaleCanWidth;
            this.can.height=this.scaleCanHeight;
            this.desecho = game.add.group();
            this.desecho.enableBody = true;
            this.valor = 0;
            this.secuencia = [];
            this.basureros = [];
            this.secuenciaDesechos = [];
            this.desechosArreglo = [];
            this.play = true;
            this.cincuenta = game.add.sprite(game.width/2,0, 'cincuenta');
            this.cincuenta.visible = false;
            this.cincuenta.width=game.width*13/100;
            this.cincuenta.height=game.width*13/100;
            this.cien = game.add.sprite(game.width/2, 0, 'cien');
            this.cien.visible = false;
            this.cien.width=game.width*13/100;
            this.cien.height=game.width*13/100;
            this.style = {
                font: 'bold 30pt Arial',
                fill: '#FFFFFF',
                align: 'center',
            }
            this.scoreText = game.add.text(game.width/2, 40, '0', this.style);
            this.scoreText.anchor.setTo(0.5);
            this.buttonPlay = game.add.button(game.width/2, game.height/2, 'BotonPlay', this.empezarJuego, this, 1, 0, 3, 0);
            this.buttonPlay.anchor.setTo(0.4);
            this.buttonPlay.width=game.width*19/100;
            this.buttonPlay.height=game.width*19/100;
            this.lanzado = false;

            this.derecha=true;
            this.izquierda=false;
            this.derecha2=true;
            this.izquierda2=false;
            this.desechoMonitoreado;

            this.loopMusic = game.add.audio('loopMusic');
            this.boom=game.add.audio('boom');
             this.btn_home=game.add.button(game.width*94/100, game.height*4/100, 'home', this.restart, this, 1,2);
            this.btn_home.width=game.width*10/100;
            this.btn_home.height=game.width*12/100;
            this.btn_home.anchor.setTo(0.5);


            this.manito=game.add.sprite(game.width/2-game.width*12/100, game.height*90.9/100,'manito');
            this.manito.width=game.width*7/100;
            this.manito.height=game.width*13/100;
            this.manito.anchor.setTo(0.5);

            this.barra=game.add.sprite(game.width*5, game.height*40/100,'barra');
            this.barra.width=game.width*25/100;
            this.barra.height=game.width*9/100;
            this.barra.anchor.setTo(0.5);
        }
        this.flag = false

        //Aqui estan todas las cosas necesarias para iniciar el juego
    },
    restart:function(){
        this.loopMusic.stop();
game.state.start('gameplayParque');

//Este metodo reinicia el juego.
    },
    empezarJuego: function() {
        stateGame = STATE_GAME_PLAYING;

       
        this.loopMusic.play();
        this.buttonPlay.visible = false;

        this.buttonPlay.destroy();
        this.crearSecuenciaDesecho();
        this.crearpoolDesechos();
        this.agregarbasureros();
        this.agregarDesechos();

        //Se inicia el juego.

    },
    sumarPuntos: function() {
        puntaje += 100;
        this.scoreText.text = puntaje;

    },
    restarPuntos: function() {
        this.scoreText.text = puntaje;
        this.restarBarra(game.width*10/100);
    },
    permitirGravedad: function(objeto) {

        this.desechoMonitoreado=objeto;
        this.lanzado = true;
        objeto.visible = true;
        objeto.body.allowGravity = true;
        if(this.nivel1){
        objeto.body.velocity.setTo(0, -game.height*70/100);
         }
           if(this.nivel2){
        objeto.body.velocity.setTo(0, -game.height*75/100);
         }
        if(this.nivel3){
        objeto.body.velocity.setTo(0, -game.height*80/100);
         }
           if(this.nivel4){
        objeto.body.velocity.setTo(0, -game.height*85/100);
         }
        //Logra hacer que el desecho salga disparado
    },
     monitorearDesecho:function(){
     if(this.desechoMonitoreado.y<game.height*2/100){

        var x = game.rnd.integerInRange(game.width*10/100,game.width*90/100);
        var y = game.rnd.integerInRange(game.height*20/100,game.height*60/100);

        this.contaminacion=game.add.sprite(x,y,this.desechoMonitoreado.key);
        this.contaminacion.width=game.width*8/100;
        this.contaminacion.height=game.width*11/100;
        this.restarBarra(game.width*3/100)
        this.lanzado=false;
        //Persigue la posicion del desecho lanzado y si lo falla reubica el desecho en el campo

     }
    },
    restarBarra: function(resta) {
        this.line.width -= resta;
        if (this.line.width < 3) {
            stateGame = STATE_GAME_OVER;
        }
    // resta tamaño a la barra de tiempo si llega a cierto limite se acaba el juego
    },
    tocandoDesecho: function() {
             this.manito.visible=false;
        if(permitirDisparo){
            this.boom.play();
        this.valor++;
        if (this.valor >= this.desechosArreglo.length - 1) {
            this.valor = 0;

        }

        this.desecho.children[this.valor - 1].reset(game.width/2, game.height-125);
        this.desecho.children[this.valor-1].reset(this.can.x,this.can.top);
        this.desecho.children[this.valor].visible = false;
        this.permitirGravedad(this.desecho.children[this.valor - 1]);
        this.shotline.height-=this.treinta;
        this.tiros+=1;
        this.agregarDetalles();
        this.imprimirTipos(this.desecho.children[this.valor]);
        //Lanza todos los desechos
    }
    },

    regularDisparos:function(){
        if(this.tiros>=3){
            permitirDisparo=false;
            this.shotline.height+=this.treinta*3.9/100;
        }
 if(this.shotline.height>this.noventa){
    this.tiros=0;
    permitirDisparo=true;
 }
       //Limita el numero de disparos consecutivos a 3
    },
    agregarDetalles: function() {
        this.desechoLayer=this.desecho.children[this.valor].reset(this.can.x, this.can.top);
        //
    },
    moverBasureros: function(parametro) {

        for (var i = 0; i < this.basureros.length; i++) {
            this.basureros[i].x +=parametro;
            if (this.basureros[i].x > game.width+100) {
                this.basureros[i].x = -game.width*1024/100;
            }
        }
    },
    imprimirTipos: function(objeto) {

        if (objeto.id == 0) {
            this.tipoBasuraLayer = game.add.sprite(game.width/2, game.height*90.9/100, 'o');
            this.tipoBasuraLayer.inputEnabled= true;
            this.tipoBasuraLayer.events.onInputDown.add(this.tocandoDesecho,this);
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.width=game.width*10/100;
            this.tipoBasuraLayer.height=game.width*10/100;


            this.change=game.world.bringToTop(this.desechoLayer.key);
        }
        if (objeto.id == 1) {
           this.tipoBasuraLayer = game.add.sprite(game.width/2, game.height*90.9/100, 'v');
           this.tipoBasuraLayer.inputEnabled= true;
            this.tipoBasuraLayer.events.onInputDown.add(this.tocandoDesecho,this);
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.width=game.width*10/100;
            this.tipoBasuraLayer.height=game.width*10/100;

 this.change=game.world.bringToTop(this.desechoLayer.key);
        }
        if (objeto.id == 2) {
           this.tipoBasuraLayer = game.add.sprite(game.width/2, game.height*90.9/100, 'e');
           this.tipoBasuraLayer.inputEnabled= true;
            this.tipoBasuraLayer.events.onInputDown.add(this.tocandoDesecho,this);
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.width=game.width*10/100;
            this.tipoBasuraLayer.height=game.width*10/100;

             this.change=game.world.bringToTop(this.desechoLayer.key);
        }
        if (objeto.id == 3) {
            this.tipoBasuraLayer = game.add.sprite(game.width/2, game.height*90.9/100, 'p');
            this.tipoBasuraLayer.inputEnabled= true;
            this.tipoBasuraLayer.events.onInputDown.add(this.tocandoDesecho,this);
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.width=game.width*10/100;
            this.tipoBasuraLayer.height=game.width*10/100;
             this.change=game.world.bringToTop(this.desechoLayer.key);
        }
        if (objeto.id == 4) {
            this.tipoBasuraLayer = game.add.sprite(game.width/2, game.height*90.9/100, 'a');
            this.tipoBasuraLayer.inputEnabled= true;
            this.tipoBasuraLayer.events.onInputDown.add(this.tocandoDesecho,this);
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.width=game.width*10/100;
            this.tipoBasuraLayer.height=game.width*10/100;

            this.change=game.world.bringToTop(this.desechoLayer.key);
        }
        if (objeto.id == 5) {
            this.tipoBasuraLayer = game.add.sprite(game.width/2, game.height*90.9/100, 'te');
            this.tipoBasuraLayer.inputEnabled= true;
            this.tipoBasuraLayer.events.onInputDown.add(this.tocandoDesecho,this);
            this.tipoBasuraLayer.anchor.setTo(0.5);
            this.tipoBasuraLayer.width=game.width*10/100;
            this.tipoBasuraLayer.height=game.width*10/100;

            this.change=game.world.bringToTop(this.desechoLayer.key);
        }

    },

    agregarbasureros: function() {
        var posicionX = -game.width*1070/100;
        for (var i = 0; i < this.secuencia.length; i++) {
            var rndNum = game.rnd.integerInRange(this.scaleBasureroWidth*1.2,this.scaleBasureroWidth*2.2);
            this.basurero = game.add.sprite(posicionX+=rndNum, this.scaleDistInYBasurero, this.secuencia[i].idImage);
            this.basurero.id = this.secuencia[i].id;
            this.basurero.name = "basurero" + i;
            this.basurero.anchor.setTo(0.5, 0.5);
            this.basurero.width=this.scaleBasureroWidth;
            this.basurero.height=this.scaleBasureroHeight;
           // this.basurero.scale.setTo(0.072, 0.072);
            // this.basurero.bounds=this.getBoundsBasurero(this.basurero);
            this.basureros[i] = this.basurero;

        }

    },
    getBoundsBasurero: function(currentBasurero) {
        var x0 = currentBasurero.x - Math.abs(currentBasurero.width) / 4;
        var width = Math.abs(currentBasurero.width) / 4;
        var y0 = currentBasurero.y - currentBasurero.height - 12;
        var height = currentBasurero.height;
        return new Phaser.Rectangle(x0, y0, width, height);
    },
    getBoundsDesecho: function(currentDesecho) {
        var x0 = currentDesecho.x - Math.abs(currentDesecho.width) / 2;
        var width = Math.abs(currentDesecho.width) / 2;
        var y0 = currentDesecho.y - currentDesecho.height;
        var height = currentDesecho.height;

        return new Phaser.Rectangle(x0, y0, width, height);
    },
    getBoundsBarra: function(currentBarra) {
        var x0 = currentBarra.x - Math.abs(currentBarra.width);
        var width = Math.abs(currentBarra.width);
        var y0 = currentBarra.y - currentBarra.height;
        var height = currentBarra.height;
        return new Phaser.Rectangle(x0, y0, width, height);
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
    isRectanglesOverlapping2: function(rect1, rect2) {
        if (rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) {
            return false;
        }
        if (rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height) {
            return false;
        }
        return true;
    },
    crearpoolDesechos: function() {
        for (var i = 0; i < this.secuenciaDesechos.length; i++) {
            var desechos = this.desecho.create(0, 0, this.secuenciaDesechos[i].idImage);
            desechos.anchor.setTo(0.5, 0.5);
          desechos.width=game.width*8/100;
          desechos.height=game.width*13/100;
            desechos.inputEnabled = true;
            desechos.id = this.secuenciaDesechos[i].id;
            desechos.body.allowGravity = false;
            desechos.kill();
        }
    },

    agregarDesechos: function() {
        for (var i = 0; i < this.secuenciaDesechos.length; i++) {
            var desechos = this.desecho.getFirstDead();
            this.desechosArreglo.push(desechos);

        }

        this.desecho.children[this.valor].reset(this.can.x,this.can.top);
        this.desecho.children[this.valor].visible = false;
        this.agregarDetalles();

        this.imprimirTipos(this.desecho.children[this.valor]);

    },

    crearSecuenciaDesecho: function() {
        // se crea una secuencia de basureros random
        for (var i = 0; i < 40; i++) {
            var number = game.rnd.integerInRange(0, 5);
            var indice = game.rnd.integerInRange(0, 5);
            var indice2 = game.rnd.integerInRange(0, 5);
            var indice3 = game.rnd.integerInRange(0, 5);
            var indice4 = game.rnd.integerInRange(0, 5);
            var indice5 = game.rnd.integerInRange(0, 5);
            var indice6 = game.rnd.integerInRange(0, 5);
            if (number == 0) {

                this.secuenciaDesechos.push(desechoOrganicos[indice]);
                this.secuencia.push(basureros_array[0]);
            }
            if (number == 1) {

                this.secuenciaDesechos.push(desechoPapel[indice2]);
                this.secuencia.push(basureros_array[1]);
            }
            if (number == 2) {

                this.secuenciaDesechos.push(desechoEspecial[indice3]);
                this.secuencia.push(basureros_array[2]);

            }
            if (number == 3) {

                this.secuenciaDesechos.push(desechoLata[indice4]);
                this.secuencia.push(basureros_array[3]);
            }
            if (number == 4) {

                this.secuenciaDesechos.push(desechoVidrio[indice5]);
                this.secuencia.push(basureros_array[4]);
            }
            if (number == 5) {
                this.secuencia.push(basureros_array[5]);
                this.secuenciaDesechos.push(desechoEnvase[indice6]);
            }
        }

    },

    crearSecuencia: function() {
        // se crea una secuencia de basureros random
        for (var i = 0; i < 20; i++) {
            var number = game.rnd.integerInRange(0, 5);
            if (number == 0) {
                this.secuencia.push(basureros_array[0]);
            }
            if (number == 1) {
                this.secuencia.push(basureros_array[1]);
            }
            if (number == 2) {
                this.secuencia.push(basureros_array[2]);
            }
            if (number == 3) {
                this.secuencia.push(basureros_array[3]);
            }
            if (number == 4) {
                this.secuencia.push(basureros_array[4]);
            }
            if (number == 5) {
                this.secuencia.push(basureros_array[5]);
            }
        }


    },
     moverCan:function(){
    if(this.derecha)
    {
      this.can.x+=game.width*1/100;
     this.desechoLayer.x+=game.width*1/100;
      if( this.can.x>game.width-10){
        this.derecha=false;
        this.izquierda=true;
      }
    }
     if(this.izquierda)
    {
      this.can.x-=game.width*1/100;
      this.desechoLayer.x-=game.width*1/100;
      if( this.can.x<game.width-game.width+10){
        this.izquierda=false;
        this.derecha=true;
      }
    }
    },
    moverMan:function(){
    if(this.derecha2)
    {
      this.manito.x+=game.width*0.25/100;

      if( this.manito.x>game.width/2-game.width*8/100){
        this.derecha2=false;
        this.izquierda2=true;
      }
    }
     if(this.izquierda2)
    {
      this.manito.x-=game.width*0.25/100;
      if( this.manito.x<game.width/2-game.width*14/100){
        this.izquierda2=false;
        this.derecha2=true;
      }
    }
    },
    moverBarra:function(){
     for (var i = 0; i < this.basureros.length; i++) {
            this.barra.x += game.width*0.03/100;
            if (this.barra.x > game.width+100) {
                this.barraRan=game.rnd.integerInRange(game.width*2.4,game.width*3.4);
                this.barraRan2=game.rnd.integerInRange(game.height*30/100,game.height*55/100);
                this.barra.x =-this.barraRan;
                this.barra.y =this.barraRan2;
            }
        }
    },
    compararObjetos: function(objeto1, objeto2, int1, int2x) {
        if(this.nivel1){velocidadBarra=7}
        if(this.nivel2){velocidadBarra=5}
        if(this.nivel3){velocidadBarra=3}
        if(this.nivel4){velocidadBarra=3}
        if (objeto1.id == objeto2.id) {
            this.sumarPuntos();
            this.cien.visible = true;
            this.restarBarra(-game.width*7/100);
            var tween = game.add.tween(this.cien);
            tween.to({ x: objeto2.x, y: 25 }, 1000, Phaser.Easing.Exponential.Out);
            tween.start();
            this.lanzado=false;
            this.desecho.children[int1].kill();
            console.log(""+velocidadBarra);

        } else {
            this.restarPuntos();
            this.cincuenta.visible = true;
            var tween = game.add.tween(this.cincuenta);
            tween.to({ x: objeto2.x, y: 25 }, 1000, Phaser.Easing.Exponential.Out);
            tween.start();
            this.lanzado=false;
            //  this.desecho.children[int1].kill();
            var tweenDesecho = game.add.tween(this.desecho.children[int1]);
            var x = game.rnd.integerInRange(game.width*10/100,game.width*90/100);
        var y = game.rnd.integerInRange(game.height*20/100,game.height*60/100);
            tweenDesecho.to({ x: x, y: y }, 1500, Phaser.Easing.Exponential.Out);
            tweenDesecho.start();
            this.lanzado=false;
            this.contaminacion = game.add.sprite(x, y, this.desecho.children[int1].key);
            this.contaminacion.width=game.width*8/100;
            this.contaminacion.height=game.width*12/100;

        }

    },

    update: function() {
        switch (stateGame) {
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_OVER:
            this.loopMusic.stop();
                game.state.start("gameOver");

                break;

            case STATE_GAME_WIN:

                break;

            case STATE_GAME_MENU:

                break;

            case STATE_GAME_PLAYING:
                this.moverMan();
                this.regularDisparos();


                if(this.nivel1){
                this.desbloquearNivel2();
                this.moverBasureros(game.width*0.4/100);
                }

                if(this.nivel2){
               this.moverCan();
               this.desbloquearNivel3();
               this.moverBasureros(game.width*0.46/100);
           }
                if(this.nivel3){
               this.moverCan();
               this.desbloquearNivel4();
               this.moverBasureros(game.width*0.46/100);
               this.restarBarra(game.width*0.01/100);
           }
           if(this.nivel4){
             //this.moverBarra();
             this.moverCan();
             this.moverBasureros(game.width*0.5/100);
             this.restarBarra(game.width*0.02/100)
           }
                if(this.lanzado){
                this.monitorearDesecho();
                    }
                if (this.cincuenta.y < 26) {
                    this.cincuenta.visible = false;
                    this.cincuenta.x = 120;
                    this.cincuenta.y = 50;
                }
                if (this.cien.y < 26) {
                    this.cien.visible = false;
                    this.cien.x = game.width/2;
                    this.cien.y = 50;
                }
                for (var i = 0; i < this.secuenciaDesechos.length; i++) {

                    for (var j = 0; j < this.secuencia.length; j++) {
                        var rectBasurero = this.getBoundsBasurero(this.basureros[j]);
                        var rectDesecho = this.getBoundsDesecho(this.desecho.children[i]);
                        if (this.desecho.children[i].visible && this.isRectanglesOverlapping(rectDesecho, rectBasurero)) {
                            this.compararObjetos(this.basureros[j], this.desecho.children[i], i, j);
                            this.desecho.children[i].visible = false;
                            this.lanzado=false;
                            this.desecho.children[i].kill();
                        }
                    }
                }
                 for (var i = 0; i < this.secuenciaDesechos.length; i++) {
                     var rectDesecho = this.getBoundsDesecho(this.desecho.children[i]);
                     var rectBarra = this.getBoundsBarra(this.barra);
                     if (this.desecho.children[i].visible && this.isRectanglesOverlapping2(rectDesecho, rectBarra)) {
                           this.desecho.children[i].visible = false;

                     }
                 }
                break;
        }

    }

}

//var game = new Phaser.Game(500, 800, Phaser.AUTO);
//var game = new Phaser.Game("100%", "100%", Phaser.AUTO);
game.state.add("gameplayParque", GamePlayParque);
//game.state.add("InicioParque", empezarJuego);
game.state.add("gameOver", GameOverManager);
//game.state.start("gameplay");
//game.state.start("gameplayParque");
