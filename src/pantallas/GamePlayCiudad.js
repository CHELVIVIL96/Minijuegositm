var STATE_GAME_NONE = 0;
var STATE_GAME_LOADING = 1;
var STATE_GAME_PLAYING = 2;
var STATE_GAME_GAME_OVER = 3;
var STATE_GAME_WIN = 4;
var STATE_GAME_MENU = 5;
var STATE_GAME_LEVEL1 = 6;
var STATE_GAME_LEVEL2 = 7;
var STATE_GAME_LEVEL3 = 8;
var stateGame = STATE_GAME_NONE;
var bool=0;
var bool2=0;
var bool3=0;
var entrar=0;

GamePlayCiudad = {
    init: function() {
   
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        this.numero = 0;
    },
    preload: function() {
        stateGame = STATE_GAME_LOADING;
        //#region Funciones especificas
        game.load.image("logoJuego", 'assets/img/recolectaBasura/logo001.png');
        game.load.image('inicioFondo', 'assets/img/recolectaBasura/FondoStartNormales.jpg');
        game.load.image('scoreFondo', 'assets/img/recolectaBasura/score.png');
        game.load.image('tiempo', 'assets/img/recolectaBasura/time.png');
        game.load.image('barraTiempo', 'assets/img/recolectaBasura/timeBar.png');
        game.load.image('statsFinal', 'assets/img/recolectaBasura/stats.png');
        game.load.image('estrella', 'assets/img/recolectaBasura/estrella.png');
        game.load.image('estrellaVacia', 'assets/img/recolectaBasura/estrellaVacia.png');
        game.load.image('estrellaLlena', 'assets/img/recolectaBasura/estrella.png');
        //#endregion 
        game.load.audio('loopMusic', 'assets/Sonidos/Principal.mp3');
    },
    create: function() {
        // this.personasRe = [];
        // this.personasMuertas = [];

        this.fondoInicio = game.add.sprite(0, 0, 'inicioFondo');
        this.fondoInicio.anchor.setTo(0);
        this.fondoInicio.width = game.width;
        this.fondoInicio.height = game.height;
        this.logo = game.add.sprite(game.width / 2, game.height / 7.5, 'logoJuego');
        this.logo.anchor.setTo(0.5);

        this.estrellasMenuVacia = game.add.group();
        this.estrellasMenuLlena = game.add.group();
        PuntajeLvl1 = localStorage.getItem("PuntajeLvl1");
        PuntajeLvl2 = localStorage.getItem("PuntajeLvl2");
        PuntajeLvl3 = localStorage.getItem("PuntajeLvl3");


        this.nivel1 = game.add.button(game.width / 3.5, game.height / 2.2, 'nivelDesbloqueado', this.level1, this, 'desbloqueado001', 'desbloqueado001', 'desbloqueado002');
        this.nivel1.scale.setTo(0.8);
        this.nivel1.anchor.setTo(0.5);
     
         if (PuntajeLvl1 >= 100 && PuntajeLvl1 < 400) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 6, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 3.4, game.height / 1.7, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 2.4, game.height / 1.7, 'estrellaVacia');

        } else if (PuntajeLvl1 >= 400 && PuntajeLvl1 < 700) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 6, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 3.4, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 2.4, game.height / 1.7, 'estrellaVacia');

        } else if (PuntajeLvl1 >= 700) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 6, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 3.4, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 2.4, game.height / 1.7, 'estrellaLlena');

        } else {
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 6, game.height / 1.7, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 3.4, game.height / 1.7, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 2.4, game.height / 1.7, 'estrellaVacia');

        }

        if (PuntajeLvl1 >= 700) {
            this.nivel2 = game.add.button(game.width / 1.4, game.height / 2.2, 'nivelDesbloqueado', this.level2, this, 'desbloqueado001', 'desbloqueado001', 'desbloqueado002');
            this.nivel2.inputEnabled = true;
            this.nivel2.scale.setTo(0.8);
            this.nivel2.anchor.setTo(0.5);
        } else {
            this.nivel2 = game.add.button(game.width / 1.4, game.height / 2.2, 'nivelBloqueado', this.level2, this, 'bloqueado001', 'bloqueado001', 'bloqueado002-13');
            this.nivel2.inputEnabled = false;
            this.nivel2.scale.setTo(0.8);
            this.nivel2.anchor.setTo(0.5);
        }



        if (PuntajeLvl2 >= 100 && PuntajeLvl2 < 400) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 1.7, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.4, game.height / 1.7, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.2, game.height / 1.7, 'estrellaVacia');

        } else if (PuntajeLvl2 >= 400 && PuntajeLvl2 < 700) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 1.7, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 1.4, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.2, game.height / 1.7, 'estrellaVacia');

        } else if (PuntajeLvl2 >= 700) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 1.7, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 1.4, game.height / 1.7, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 1.2, game.height / 1.7, 'estrellaLlena');

        } else {
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.7, game.height / 1.7, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.4, game.height / 1.7, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.2, game.height / 1.7, 'estrellaVacia');

        }

        if (PuntajeLvl2 >= 700) {
            this.nivel3 = game.add.button(game.width / 2, game.height / 1.3, 'nivelDesbloqueado', this.level3, this, 'desbloqueado001', 'desbloqueado001', 'desbloqueado002');
        this.nivel3.inputEnabled = true;
        this.nivel3.scale.setTo(0.8);
        this.nivel3.anchor.setTo(0.5);
        } else {
            this.nivel3 = game.add.button(game.width / 2, game.height / 1.3, 'nivelBloqueado', this.level2, this, 'bloqueado001', 'bloqueado001', 'bloqueado002-13');
        this.nivel3.inputEnabled = false;
        this.nivel3.scale.setTo(0.8);
        this.nivel3.anchor.setTo(0.5);
        }


        if (PuntajeLvl3 >= 100 && PuntajeLvl3 < 400) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 2, game.height / 1.1, 'estrellaLlena');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.6, game.height / 1.1, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 2.7, game.height / 1.1, 'estrellaVacia');

        } else if (PuntajeLvl3 >= 400 && PuntajeLvl3 < 700) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 2, game.height / 1.1, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 1.6, game.height / 1.1, 'estrellaLlena');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 2.7, game.height / 1.1, 'estrellaVacia');

        } else if (PuntajeLvl3 >= 700) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 2, game.height / 1.1, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 1.6, game.height / 1.1, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(game.width / 2.7, game.height / 1.1, 'estrellaLlena');

        } else {
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 2, game.height / 1.1, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.6, game.height / 1.1, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 2.7, game.height / 1.1, 'estrellaVacia');

        }

        this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 2, game.height / 1.1, 'estrellaVacia');
     
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.6, game.height / 1.1, 'estrellaVacia');
     
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 2.7, game.height / 1.1, 'estrellaVacia');
     

        // this.nivel4 = game.add.button(game.width / 1.4, game.height / 1.3, 'nivelBloqueado', this.level2, this, 'bloqueado001', 'bloqueado001', 'bloqueado002-13');
        // this.nivel4.inputEnabled = false;
        // this.nivel4.scale.setTo(0.8);
        // this.nivel4.anchor.setTo(0.5);
        // this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.4, game.height / 1.1, 'estrellaVacia');
      
        // this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.7, game.height / 1.1, 'estrellaVacia');
       
        // this.estrellaMenuVacia = this.estrellasMenuVacia.create(game.width / 1.2, game.height / 1.1, 'estrellaVacia');
       
        for (x = 0; x < this.estrellasMenuVacia.length; x++) {
            this.estrellasMenuVacia.children[x].anchor.setTo(0.5);
            this.estrellasMenuVacia.children[x].scale.setTo(0.5);
        }
        for (x = 0; x < this.estrellasMenuLlena.length; x++) {
            this.estrellasMenuLlena.children[x].anchor.setTo(0.5);
            this.estrellasMenuLlena.children[x].scale.setTo(0.5);
        }

        this.botonAtras = game.add.button(game.width / 13, game.height / 22, 'botonAtras', this.salir, this, '001-02', '001-02', '002-02');
        this.botonAtras.scale.setTo(0.22);
        this.botonAtras.anchor.setTo(0.5);
        // Crear musica y sfx
        this.sfxGameOver = game.add.audio('aplausos');
        this.loopMusic = game.add.audio('loopMusic');
        this.audioA = game.add.button(game.width / 1.1, game.height / 9, 'audio', this.audio, this, 'audioActivo1', 'audioActivo1', 'audioActivo2');
        this.audioA.anchor.setTo(0.5);
        this.audioA.scale.setTo(0.8);
        this.audioA.visible = false;
        this.audioM = game.add.button(game.width / 1.1, game.height / 9, 'audio', this.audio, this, 'audioMute1', 'audioMute1', 'audioMute2');
        this.audioM.anchor.setTo(0.5);
        this.audioM.scale.setTo(0.8);
        this.audioM.visible = false;
        this.ajustes = game.add.button(game.width / 1.1, game.height / 25, 'ajustes',

            function() {

                if (!menu) {
                    this.instrucciones.visible = true;
                    menu = true;
                    if (sonido) {
                        this.audioA.visible = true;

                    } else {
                        this.audioM.visible = true;


                    }

                   
                } else {
                    this.instrucciones.visible = false;
                    
                    menu = false;
                    if (sonido) {
                        this.audioA.visible = false;

                    } else {
                        this.audioM.visible = false;


                    }
                   
                }

            }, this, 'ajustes1', 'ajustes1', 'ajustes2');
        this.ajustes.scale.setTo(0.8);
        this.ajustes.anchor.setTo(0.5);
        this.instrucciones = game.add.button(game.width / 1.1, game.height / 5.5, 'instrucciones',
            function() {
                this.fondoInstrucciones = game.add.sprite(0, 0, 'inicioFondo');
                this.fondoInstrucciones.anchor.setTo(0);
                this.fondoInstrucciones.width = game.width;
                this.fondoInstrucciones.height = game.height;
                this.nivel1.visible = false;
                this.nivel2.visible = false;
                this.nivel3.visible = false;
                this.nivel4.visible = false;
                this.instruccionesJuego = game.add.sprite(game.width / 2, game.height / 2, 'instruccionesJuego');
                this.instruccionesJuego.anchor.setTo(0.5);
                this.botonAtrasMenu = game.add.button(game.width / 2, game.height / 1.1, 'botonAtras', function() {
                    this.fondoInstrucciones.visible = false;
                    this.nivel1.visible = true;
                    this.nivel2.visible = true;
                    this.nivel3.visible = true;
                    
                    //this.nivel4.visible = true;
                    this.botonAtrasMenu.visible = false;
                    this.instruccionesJuego.visible = false;
                }, this, '001-02', '001-02', '002-02');
                this.botonAtrasMenu.scale.setTo(0.22);
                this.botonAtrasMenu.anchor.setTo(0.5);
            }, this, 'instrucciones1', 'instrucciones1', 'instrucciones2');
        this.instrucciones.scale.setTo(0.8);
        this.instrucciones.anchor.setTo(0.5);
        this.instrucciones.visible = false;
    },

    //#region Metodos de funcionamiento del juego
    salir: function() { //Metodo para salir del juego y volver a la seleccion de juego

        game.state.start("PlanetasMenu");
    },

    restart: function() { // Metodo para reiniciar el juego
       
        game.state.start('gameplayCiudad');

    },

    gameOver: function() { // Metodo que termian el juego
        entrar=0;
        stateGame = STATE_GAME_GAME_OVER;
        
        if(numeroPersonas ==8){
            
            // this.startLevel1().remove();
            if(PuntajeLvl1<this.currentScore){
                PuntajeLvl1 = this.currentScore;
                localStorage.setItem("PuntajeLvl1", PuntajeLvl1);
            }
          
        }
       else if(numeroPersonas ==12){
           if(PuntajeLvl2<this.currentScore){
            PuntajeLvl2 = this.currentScore;
            localStorage.setItem("PuntajeLvl2", PuntajeLvl2);
           }
           
        }else{
            if(PuntajeLvl3<this.currentScore){
                PuntajeLvl3 = this.currentScore;
            localStorage.setItem("PuntajeLvl3", PuntajeLvl3);
            }
            
        }
        
        this.desecho.remove();
        this.persona.remove();
        this.tiempo.kill();
        this.scoreF.kill();
        this.loopMusic.stop();
        this.fondogameOver = game.add.sprite(0, 0, 'inicioFondo');
        this.fondogameOver.anchor.setTo(0);
        this.fondogameOver.width = game.width;
        this.fondogameOver.height = game.height;
        this.fondogameOver.alpha = 1;

        // se reproduce el efecto de aplausos
        this.sfxGameOver.play();
        this.textfield.destroy();
        // this.fondo.alpha = 0;
        this.statsFinal = game.add.sprite(game.width / 2, (game.height / 2) - 30, 'statsFinal');
        this.statsFinal.alpha = 0;

        game.add.tween(this.statsFinal).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        this.statsFinal.anchor.setTo(0.5);
        this.statsFinal.scale.setTo(1);
        this.desecho.scale.setTo(0.8);
        this.estrella = game.add.group();

        this.estrella.scale.setTo(1);

        this.estrellaVacia = game.add.group();

        this.estrellaVacia.scale.setTo(1);

        var style = {
            font: 'bold 20pt Arial',
            fill: 'white',
            align: 'center'
        }
        var styleVelocidad = {
            font: 'bold 17pt Arial',
            fill: 'yellow',
            align: 'center'
        }
        this.textfield = game.add.text(game.width/4.5,game.height/1.29, "Puntaje: " + this.currentScore.toString(), style);
        
        this.estrella.alpha = 0;
        this.estrellaVacia.alpha = 0;
        game.add.tween(this.estrella).to({ alpha: 5 }, 2000, Phaser.Easing.Linear.None, true);
        if (this.currentScore >= 100 && this.currentScore < 400) {
            this.estrellas = this.estrella.create(game.width / 3, game.height / 2.1, 'estrella');
            this.estrella.children[0].anchor.setTo(0.5);
            this.estrellas = this.estrella.create(game.width / 2, game.height / 2.3, 'estrellaVacia');
            this.estrella.children[1].anchor.setTo(0.5);
            this.estrellas= this.estrella.create(game.width / 1.48, game.height / 2.1, 'estrellaVacia');
            this.estrella.children[2].anchor.setTo(0.5);
            this.velocidad = game.add.text(game.width/1.6, game.height/1.72, "VELOCIDAD", styleVelocidad);
            this.velocidad.anchor.setTo(0.5);
            this.velocidadObtenida = game.add.text(game.width/1.6,game.height/1.48, "TORTUGA", style);
            this.velocidadObtenida.anchor.setTo(0.5);
            if(numeroPersonas==8){
                
                this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){this.level1();entrar=1;this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
            this.restarB.scale.setTo(0.15);
            this.restarB.anchor.setTo(0.5);
           
            }
            else if(numeroPersonas==20){
                this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){this.level3();entrar=1;this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
                this.restarB.scale.setTo(0.15);
                this.restarB.anchor.setTo(0.5);
            }
            else{
             
                this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){this.level2();entrar=1;this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
            this.restarB.scale.setTo(0.15);
            this.restarB.anchor.setTo(0.5);
            }
        } else if (this.currentScore >= 400 && this.currentScore < 700) {
            this.estrellas = this.estrella.create(game.width / 3, game.height / 2.1, 'estrella');
            this.estrella.children[0].anchor.setTo(0.5);
            this.estrellas = this.estrella.create(game.width / 2, game.height / 2.3, 'estrella');
            this.estrella.children[1].anchor.setTo(0.5);
            this.estrellas= this.estrella.create(game.width / 1.48, game.height / 2.1, 'estrellaVacia');
            this.estrella.children[2].anchor.setTo(0.5);
            this.velocidad = game.add.text(game.width/1.6, game.height/1.72, "VELOCIDAD", styleVelocidad);
            this.velocidad.anchor.setTo(0.5);
            this.velocidadObtenida = game.add.text(game.width/1.6,game.height/1.48, "AVESTRUZ", style);
            this.velocidadObtenida.anchor.setTo(0.5);
            if(numeroPersonas==8){
                
                this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){this.level1();entrar=1;this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
            this.restarB.scale.setTo(0.15);
            this.restarB.anchor.setTo(0.5);
           
            }
            else if(numeroPersonas==20){
                this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){this.level3();entrar=1;this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
                this.restarB.scale.setTo(0.15);
                this.restarB.anchor.setTo(0.5);
            }
            else{
             
                this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){this.level2();entrar=1;this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
            this.restarB.scale.setTo(0.15);
            this.restarB.anchor.setTo(0.5);
            }
        } else if (this.currentScore >= 700) {
            this.estrellas = this.estrella.create(game.width / 3, game.height / 2.1, 'estrella');
            this.estrella.children[0].anchor.setTo(0.5);
            this.estrellas = this.estrella.create(game.width / 2, game.height / 2.3, 'estrella');
            this.estrella.children[1].anchor.setTo(0.5);
            this.estrellas= this.estrella.create(game.width / 1.48, game.height / 2.1, 'estrella');
            this.estrella.children[2].anchor.setTo(0.5);
            this.velocidad = game.add.text(game.width/1.6, game.height/1.72, "VELOCIDAD", styleVelocidad);
        this.velocidad.anchor.setTo(0.5);
        this.velocidadObtenida = game.add.text(game.width/1.6,game.height/1.48, "LIEBRE", style);
        this.velocidadObtenida.anchor.setTo(0.5);
        if(numeroPersonas==8){
            this.botonSiguienteNivel = game.add.button(game.width / 1.4, game.height / 1.1, 'botonAtras', function(){entrar=1;this.level2();bool=0; bool2=0; bool3=0;this.botonSiguienteNivel.visible=false;this.restarB.visible=false;},this,'001-02','001-02','002-02');
            this.botonSiguienteNivel.scale.setTo(-0.3,0.3);   
            this.botonSiguienteNivel.anchor.setTo(0.5); 
            this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){this.level1();entrar=1;this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
        this.restarB.scale.setTo(0.15);
        this.restarB.anchor.setTo(0.5);
       
        }
        else if(numeroPersonas==20){
            this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){entrar=1;this.level3();this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
            this.restarB.scale.setTo(0.15);
            this.restarB.anchor.setTo(0.5);
        }
        else{
            this.botonSiguienteNivel = game.add.button(game.width / 1.4, game.height / 1.1, 'botonAtras', function(){this.level3();entrar=1;bool=0; bool2=0; bool3=0;this.botonSiguienteNivel.visible=false;this.restarB.visible=false;},this,'001-02','001-02','002-02');
            this.botonSiguienteNivel.scale.setTo(-0.3,0.3);   
            this.botonSiguienteNivel.anchor.setTo(0.5); 
            
            this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){entrar=1;this.level2();this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
        this.restarB.scale.setTo(0.15);
        this.restarB.anchor.setTo(0.5);
        }
      
        }
        // this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){this.desecho.kill();this.level1();this.restarB.visible=false;this.botonSiguienteNivel.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
        // this.restarB.scale.setTo(0.15);
        // this.restarB.anchor.setTo(0.5);
        else{
            this.velocidad = game.add.text(game.width/1.6, game.height/1.72, "VELOCIDAD", styleVelocidad);
            this.velocidad.anchor.setTo(0.5);
            this.velocidadObtenida = game.add.text(game.width/1.6,game.height/1.48, "CARACOL", style);
            this.velocidadObtenida.anchor.setTo(0.5);   
            this.estrellas = this.estrella.create(game.width / 3, game.height / 2.1, 'estrellaVacia');
            this.estrella.children[0].anchor.setTo(0.5);
            this.estrellas = this.estrella.create(game.width / 2, game.height / 2.3, 'estrellaVacia');
            this.estrella.children[1].anchor.setTo(0.5);
            this.estrellas= this.estrella.create(game.width / 1.48, game.height / 2.1, 'estrellaVacia');
            this.estrella.children[2].anchor.setTo(0.5); 
            if(numeroPersonas==8){
                this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){this.level1();entrar=1;this.restarB.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
            this.restarB.scale.setTo(0.15);
            this.restarB.anchor.setTo(0.5);
            }
            else if(numeroPersonas==12){
                this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){entrar=1;this.level2();this.restarB.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
            this.restarB.scale.setTo(0.15);
            this.restarB.anchor.setTo(0.5);
            }
            else{
                this.restarB = game.add.button(game.width / 3, game.height / 1.1, 'BotonRecargar', function(){entrar=1;this.level3();this.restarB.visible=false;}, this, 'recargar1', 'recargar1', 'recargar2');
            this.restarB.scale.setTo(0.15);
            this.restarB.anchor.setTo(0.5);
            }

        }
        this.botonAtrasSeleccionMenu = game.add.button(game.width / 13, game.height / 22, 'botonAtras', function(){this.botonAtrasSeleccionMenu.visible=false;bool=0; bool2=0; bool3=0;this.botonAtrasSeleccionMenu.inputEnabled=false; game.state.start("gameplayCiudad");}, this, '001-02', '001-02', '002-02');
        this.botonAtrasSeleccionMenu.scale.setTo(0.22);
        this.botonAtrasSeleccionMenu.anchor.setTo(0.5);

    },
    //#endregion

    //#region Metodos controladores de tiempo y puntaje
    increaseScore: function(nombre) { // Metodo para incrementar el puntaje
        if (nombre == "manzana") {
            this.currentScore += 50;
            this.textfield.text = this.currentScore.toString();
        } else if(nombre == "vasoCarton"){
            this.currentScore += 100;
            this.textfield.text = this.currentScore.toString();
        }
        else if(nombre == "botella"){
            this.currentScore += 150;
            this.textfield.text = this.currentScore.toString();
        }
        else{
            this.currentScore += 800;
            this.textfield.text = this.currentScore.toString();
        }

    },

    barraTiempo: function(value) { // Metodo de la barra de tiempo
        // calcular el nuevo tamaÃ±o de la barra (tamaÃ±o actual + valor que entra por parametro)
        var newWidth = this.bar.width + value;
        // si la barra se pasa del ancho de la pantalla se le asigna el ancho de la pantalla
        if (newWidth > game.width / 2.6) {
            newWidth = game.width / 2.6;
        }
        // si la barra es menor que 0 se le asigna el valor de 0 y se acaba el juego
        if (newWidth <= 0) {
            newWidth = 0;
            this.gameOver();

        }
        // actualizar el tamaÃ±o de la barra con el nuevo tamaÃ±o
        this.bar.width = newWidth;
    },
    //#endregion

    //#region Metodos de los personajes: Crear, Caminar, Mover

    crearPersona: function(cantPersonas) { // Crea la cantidad de personas dependiendo del nivel
        numeroPersonas = cantPersonas;
        this.distancia = 50;
        // lvl1
        if (cantPersonas <= 8) {
            for (var i = 0; i < numeroPersonas; i++) {
                let rumbo = game.rnd.integerInRange(0, 1);
                 var tipoPersona = game.rnd.integerInRange(0, 1);
                // let numberX = game.rnd.integerInRange(200, 500);
                if(tipoPersona ==0){
                    var personas = this.persona.create(game.width / 2.25, game.height + game.height / 64 + this.distancia, 'personajeCaminandoArriba');
                }
                else{
                    var personas = this.persona.create(game.width / 2.25, game.height + game.height / 64 + this.distancia, 'personajeCaminandoArriba2');
               
                }
                this.distancia += 35;
                personas.name = "persona" + i;
                personas.caminando = false;
                personas.direccion = 0;
                personas.rumbo = rumbo;
                personas.aumentarY = 0;
                personas.aumentarX = 0;
                personas.anchor.setTo(0.5, 1);
                personas.tipo = tipoPersona;
                console.log('lvl 1');
            }
        }
        // lvl1
        else if (cantPersonas <= 12) {
            for (var i = 0; i < numeroPersonas; i++) {
                let rumbo = game.rnd.integerInRange(0, 1);
                var tipoPersona = game.rnd.integerInRange(0, 1);
                // let numberX = game.rnd.integerInRange(200, 500);
                if(tipoPersona ==0){
                    var personas = this.persona.create(game.width / 1.698, game.height + game.height / 64 + this.distancia, 'personajeCaminandoAbajo');
                }
                else{
                    var personas = this.persona.create(game.width / 1.698, game.height + game.height / 64 + this.distancia, 'personajeCaminandoAbajo2');
               
                }
                this.distancia += 30; 
                personas.name = "persona" + i;
                personas.caminando = false;
                personas.direccion = 0;
                personas.rumbo = rumbo;
                personas.aumentarY = 0;
                personas.aumentarX = 0;
                personas.anchor.setTo(0.5, 1);
                personas.tipo = tipoPersona;
                personas.giro=0;

            }
            console.log('lvl 2');
        } else if (cantPersonas <= 20) {
            for (var i = 0; i < numeroPersonas; i++) {
                let rumbo = game.rnd.integerInRange(0, 2);
                 var tipoPersona = game.rnd.integerInRange(0, 1);
                // let numberX = game.rnd.integerInRange(200, 500);
                if(tipoPersona ==0){
                    var personas = this.persona.create(game.width / 1.2, game.height + game.height / 64 + this.distancia, 'personajeCaminandoArriba');
                }
                else{
                    var personas = this.persona.create(game.width / 1.2, game.height + game.height / 64 + this.distancia, 'personajeCaminandoArriba2');
               
                }
                this.distancia += 35;
                personas.name = "persona" + i;
                personas.caminando = false;
                personas.direccion = 0;
                personas.rumbo = rumbo;
                personas.aumentarY = 0;
                personas.aumentarX = 0;
                personas.anchor.setTo(0.5, 1);
                personas.tipo = tipoPersona;
                personas.giro=0;
                
            }

            console.log('lvl3');

        } else {
            console.log('lvl4');

        }
    },

    moverPersonajeArriba: function(personaje) { // Metodo que anima para que el personaje camine hacia arriba
        if(this.persona.children[personaje].tipo==0){
            this.persona.children[personaje].loadTexture("personajeCaminandoArriba");
        this.persona.children[personaje].animations.add('personajeCaminandoArriba', Phaser.Animation.generateFrameNames('personajeCaminandoArriba', ['A1', 'A2', 'A4', 'A1']), 5, true);
        this.persona.children[personaje].animations.play('personajeCaminandoArriba');
        this.persona.children[personaje].scale.setTo(0.3);
        }
        else{
            this.persona.children[personaje].loadTexture("personajeCaminandoArriba2");
            this.persona.children[personaje].animations.add('personajeCaminandoArriba2', Phaser.Animation.generateFrameNames('personajeCaminandoArriba', ['A1', 'A2', 'A4', 'A1']), 5, true);
            this.persona.children[personaje].animations.play('personajeCaminandoArriba2');
            this.persona.children[personaje].scale.setTo(0.3);
        }
        
        
    },
    moverPersonajeDerecha: function(personaje) { // Metodo que anima para que el personaje camine hacia abajo
        if(this.persona.children[personaje].tipo==0){
            
            
            this.persona.children[personaje].loadTexture("personajeCaminandoDerecha");
        this.persona.children[personaje].animations.add('personajeCaminandoDerecha', Phaser.Animation.generateFrameNames('personajeCaminandoDerecha', ['D1', 'D2', 'D4', 'D1']), 5, true);
        this.persona.children[personaje].animations.play('personajeCaminandoDerecha');
        this.persona.children[personaje].scale.setTo(0.3);
        }
        else{
     
            this.persona.children[personaje].loadTexture("personajeCaminandoDerecha2");
        this.persona.children[personaje].animations.add('personajeCaminandoDerecha2', Phaser.Animation.generateFrameNames('personajeCaminandoDerecha', ['D1', 'D2', 'D4', 'D1']), 5, true);
        this.persona.children[personaje].animations.play('personajeCaminandoDerecha2');
        this.persona.children[personaje].scale.setTo(0.3);
        }
        
    },
    moverPersonajeIzquierda: function(personaje) { // Metodo que anima para que el personaje camine hacia abajo

        if(this.persona.children[personaje].tipo==0){
            
            
            this.persona.children[personaje].loadTexture("personajeCaminandoDerecha");
        this.persona.children[personaje].animations.add('personajeCaminandoDerecha', Phaser.Animation.generateFrameNames('personajeCaminandoDerecha', ['D1', 'D2', 'D4', 'D1']), 5, true);
        this.persona.children[personaje].animations.play('personajeCaminandoDerecha');
        // this.persona.children[personaje].scale.setTo(0.3);
        this.persona.children[personaje].scale.setTo(-0.3,0.3);
        }
        else{
     
            this.persona.children[personaje].loadTexture("personajeCaminandoDerecha2");
        this.persona.children[personaje].animations.add('personajeCaminandoDerecha2', Phaser.Animation.generateFrameNames('personajeCaminandoDerecha', ['D1', 'D2', 'D4', 'D1']), 5, true);
        this.persona.children[personaje].animations.play('personajeCaminandoDerecha2');
        // this.persona.children[personaje].scale.setTo(0.3);
        this.persona.children[personaje].scale.setTo(-0.3,0.3);
        }

    },

   moverPersonajeAbajo:function(personaje){
    if(this.persona.children[personaje].tipo==0){
        this.persona.children[personaje].loadTexture("personajeCaminandoAbajo");
    this.persona.children[personaje].animations.add('personajeCaminandoAbajo', Phaser.Animation.generateFrameNames('personajeCaminandoAbajo', ['Ab1', 'Ab2', 'Ab4', 'Ab1']), 5, true);
    this.persona.children[personaje].animations.play('personajeCaminandoAbajo');
    this.persona.children[personaje].scale.setTo(0.3);
    }
    else{
        this.persona.children[personaje].loadTexture("personajeCaminandoAbajo2");
        this.persona.children[personaje].animations.add('personajeCaminandoAbajo2', Phaser.Animation.generateFrameNames('personajeCaminandoAbajo2', ['Ab1', 'Ab2', 'Ab4', 'Ab1']), 5, true);
        this.persona.children[personaje].animations.play('personajeCaminandoAbajo2');
        this.persona.children[personaje].scale.setTo(0.3);
        }
    },

    caminar: function() { // Metodo que hace caminar los personajes

        for (i = 0; i < numeroPersonas; i++) {
            if (!this.persona.children[i].caminando) {
                numeroY = Math.random() * (1 - 0.7) + 0.7;
                numeroX = Math.random() * (1 - 0) + 0;
                this.persona.children[i].aumentarX = 1;
                this.persona.children[i].aumentarY = 0.7;
                this.persona.children[i].caminando = true;
            } else {
                
            }
        }



    },
    //#endregion

    //#region Metodos de los desechos

    crearDesecho: function() { // Crea los desechos
        // lvl1
       if(entrar==1)
       {
        
        if (numeroPersonas <= 8) {
            console.log(this.desecho.length);
            // this.desecho.children=50;
            console.log(this.desecho);
            for (var i = 0; i < 2; i++) {
                this.randomDesecho = game.rnd.integerInRange(0, 1);
                if (this.randomDesecho == 0) {
                    this.desechos = this.desecho.create(0, 0, 'manzana');
                    this.desechos.name = "manzana";
                    this.desechos.vida = 1;
                    this.desechos.vidaInicial = 1;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                } else {
                    this.desechos = this.desecho.create(0, 0, 'vasoCarton');
                    this.desechos.name = "vasoCarton";
                    this.desechos.vida = 2;
                    this.desechos.vidaInicial = 2;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                }

            }
        }
        // lvl1
        else if (numeroPersonas <= 12) {
            for (var i = 0; i < numeroPersonas; i++) {
                this.randomDesecho = game.rnd.integerInRange(0, 2);
                if (this.randomDesecho == 0) {
                    this.desechos = this.desecho.create(0, 0, 'manzana');
                    this.desechos.name = "manzana";
                    this.desechos.vida = 1;
                    this.desechos.vidaInicial = 1;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                } else if(this.randomDesecho == 1){
                    this.desechos = this.desecho.create(0, 0, 'vasoCarton');
                    this.desechos.name = "vasoCarton";
                    this.desechos.vida = 2;
                    this.desechos.vidaInicial = 2;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                }
                else{
                    this.desechos = this.desecho.create(0, 0, 'botella');
                    this.desechos.name = "botella";
                    this.desechos.vida = 3;
                    this.desechos.vidaInicial = 3;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                }

            }

        } else if (numeroPersonas <= 20) {

            for (var i = 0; i < numeroPersonas; i++) {
                this.randomDesecho = game.rnd.integerInRange(0, 3);
                if (this.randomDesecho == 0) {
                    this.desechos = this.desecho.create(0, 0, 'manzana');
                    this.desechos.name = "manzana";
                    this.desechos.vida = 1;
                    this.desechos.vidaInicial = 1;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                } else if(this.randomDesecho == 1){
                    this.desechos = this.desecho.create(0, 0, 'vasoCarton');
                    this.desechos.name = "vasoCarton";
                    this.desechos.vida = 2;
                    this.desechos.vidaInicial = 2;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                }
                else{
                    this.desechos = this.desecho.create(0, 0, 'celular');
                    this.desechos.name = "botella";
                    this.desechos.vida = 7;
                    this.desechos.vidaInicial = 7;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                }

            }
            console.log('lvl3');

        } else {
            console.log('lvl4');

        }

    }




    },

    pintarDesecho: function() { // Pinta en pantalla los desechos
        
        this.crearDesecho();
        this.desechoP = this.desecho.getFirstDead();
     
        if(numeroPersonas == 8){
            this.numeroP = game.rnd.integerInRange(0, 7);
        }
        else if(numeroPersonas==12){
            this.numeroP = game.rnd.integerInRange(0, 11);
        }
        else{
            this.numeroP = game.rnd.integerInRange(0, 19); 
        }
       

        this.desechoP.reset(this.persona.children[this.numeroP].x, this.persona.children[this.numeroP].y);



    },

    quitarvida: function() { // Metodo que le quita vida a los desechos
        this.desecho.onChildInputDown.add(function onDown(sprite) {
           
            if (sprite.vida > 1) {
                sprite.vida -= 1;
            } else {
                sprite.kill();
                sprite.vida = sprite.vidaInicial;
                this.increaseScore(sprite.name);
            }
        }, this);
    },
    //#endregion

    //#region Nivel 1
    audio: function() {
        if (sonido) {
            this.audioA.visible = false;
            this.audioM.visible = true;
            this.loopMusic.stop();
            reproducir = false;
            sonido = false;
        } else {
            this.audioM.visible = false;
            this.audioA.visible = true;
            sonido = true;
            reproducir = true;

        }
    },
    level1: function() {
        entrar=1;
        this.cantPersonas = 0;

       
        
        this.fondo = game.add.sprite(0, 0, 'mapaLVL1');
        this.fondo.anchor.setTo(0);
        this.fondo.width = game.width;
        this.fondo.height = game.height;

        this.persona = game.add.group();
        this.crearPersona(8);
        
        this.desecho = game.add.group();
        
        // console.log(this.desecho);
       for(var i = 0; i< this.desecho.length;i++){
            this.desecho.remove(this.desecho.children[i]);
        }
        this.desecho.inputEnableChildren = true;
        this.scoreF = game.add.sprite(game.width / 10, game.width / 6, 'scoreFondo');
        this.scoreF.scale.setTo(0.8);
        this.tiempo = game.add.sprite(game.width / 180, game.width / 36, 'tiempo');
        this.tiempo.scale.setTo(0.8);
        var style = {
            font: 'bold 20pt Arial',
            fill: 'white',
            align: 'center'
        }
        this.currentScore = 0;
        this.textfield = game.add.text(game.width / 3, game.height / 7.3, this.currentScore.toString(), style);
        this.textfield.anchor.setTo(0.5)
        this.bar = game.add.sprite(game.width / 6.8, game.height / 29, 'barraTiempo');
        this.bar.scale.setTo(0.8);
        this.bar.anchor.setTo(0);
        // darle tamaÃ±o a la barra
        this.bar.width = game.width / 2.6;
        // this.bar.height = 20;
        
        
        this.startLevel1();
       
        
    },

    startLevel1: function() { // Inicia el nivel 1
      


        if(entrar==1)
        {
        stateGame = STATE_GAME_LEVEL1;
        menu=true;
        if(menu) {
             this.instrucciones.visible = false;
             
             menu = false;
             if (sonido) {
                 this.audioA.visible = false;
 
             } else {
                 this.audioM.visible = false;
 
 
             }
            
         }
 
 
        
        if (reproducir) {
            this.loopMusic.loop = true;
            this.loopMusic.play();
        }

        this.bar.width = game.width;
        // this.personasRe = [];
        // this.personasMuertas = [];
        bool++;
        console.log(bool);
        if(bool==1)
        {
            game.time.events.loop(Phaser.Timer.SECOND, this.pintarDesecho, this);
        }
        // this.pintarDesecho();
        for (i = 0; i < numeroPersonas; i++) {
            if (this.persona.children[i].rumbo == 0) {
                console.log("rumbo Arriba = 0 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name+ " direccio : " + this.persona.children[i].direccion);
                this.moverPersonajeArriba(i);
            } else {
                console.log("rumbo derecha = 1 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name+ " direccio : " + this.persona.children[i].direccion);
                this.persona.children[i].reset(-50 - this.distancia, 226, 'personajeCaminandoDerecha');
                this.distancia -= 50;
            }

        }

        this.caminar();
        this.quitarvida();
        this.nivel1.visible = false;
        this.nivel1.inputEnabled = false;
        this.nivel2.visible = false;
        this.nivel2.inputEnabled = false;
        this.nivel3.inputEnabled = false;
        this.nivel3.visible = false;
        this.botonAtras.visible = false;
        this.botonAtras.inputEnabled= false;
        this.ajustes.inputEnabled=false;
    }
    },
    //#endregion

    //#region Nivel 2
    level2: function() {
        entrar=1;
        this.fondolvl2 = game.add.sprite(0, 0, 'mapaLVL2');
        this.fondolvl2.anchor.setTo(0);
        this.fondolvl2.width = game.width;
        this.fondolvl2.height = game.height;
        this.persona = game.add.group();
        this.crearPersona(12);
        this.desecho = game.add.group();
        this.desecho.inputEnableChildren = true;
        this.scoreF = game.add.sprite(game.width / 10, game.width / 6, 'scoreFondo');
        this.scoreF.scale.setTo(0.8);
        this.tiempo = game.add.sprite(game.width / 180, game.width / 36, 'tiempo');
        this.tiempo.scale.setTo(0.8);
        var style = {
            font: 'bold 20pt Arial',
            fill: 'white',
            align: 'center'
        }
        this.currentScore = 0;
        this.textfield = game.add.text(game.width / 3, game.height / 7.3, this.currentScore.toString(), style);
        this.textfield.anchor.setTo(0.5)
        this.bar = game.add.sprite(game.width / 6.8, game.height / 29, 'barraTiempo');
        this.bar.scale.setTo(0.8);
        this.bar.anchor.setTo(0);
        // darle tamaÃ±o a la barra
        this.bar.width = game.width / 2.6;
        // this.bar.height = 20;

        this.startLevel2();
    },
    startLevel2: function() {
        if(entrar==1)
        {
        
        stateGame = STATE_GAME_LEVEL2;
        menu=true;
        if(menu) {
             this.instrucciones.visible = false;
             
             menu = false;
             if (sonido) {
                 this.audioA.visible = false;
 
             } else {
                 this.audioM.visible = false;
 
 
             }
            
         }
        if (reproducir) {
            this.loopMusic.loop = true;
            this.loopMusic.play();
        }

        this.bar.width = game.width;
        // this.personasRe = [];
        // this.personasMuertas = [];
        bool2++;
        console.log(bool2);
        if(bool2==1)
        {
            game.time.events.loop(Phaser.Timer.SECOND*1.1, this.pintarDesecho, this);
        }
        for (i = 0; i < numeroPersonas; i++) {
            if (this.persona.children[i].rumbo == 0) {
                console.log("rumbo Arriba = 0 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name+ " direccio : " + this.persona.children[i].direccion);
                this.moverPersonajeArriba(i);
            } else {
                console.log("rumbo abajo = 1 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name+ " direccio : " + this.persona.children[i].direccion);
                this.persona.children[i].reset(game.width/2 , 0- this.distancia, 'personajeCaminandoAbajo');
                this.moverPersonajeAbajo(i);
                this.distancia -= 50;
            }

        }

        this.caminar();
        this.quitarvida();
        this.nivel1.visible = false;
        this.nivel1.inputEnabled = false;
        this.nivel2.visible = false;
        this.nivel2.inputEnabled = false;
        this.nivel3.inputEnabled = false;
        this.nivel3.visible = false;
        this.botonAtras.visible = false;
        this.botonAtras.inputEnabled= false;
        this.ajustes.inputEnabled=false;
        }
    },



    level3: function() {
        entrar=1;
        this.fondo = game.add.sprite(0, 0, 'mapaLVL3');
        this.fondo.anchor.setTo(0);
        this.fondo.width = game.width;
        this.fondo.height = game.height;

        this.persona = game.add.group();
        this.crearPersona(20);
        this.desecho = game.add.group();
        this.desecho.inputEnableChildren = true;
        this.scoreF = game.add.sprite(game.width / 10, game.width / 6, 'scoreFondo');
        this.scoreF.scale.setTo(0.8);
        this.tiempo = game.add.sprite(game.width / 180, game.width / 36, 'tiempo');
        this.tiempo.scale.setTo(0.8);
        var style = {
            font: 'bold 20pt Arial',
            fill: 'white',
            align: 'center'
        }
        this.currentScore = 0;
        this.textfield = game.add.text(game.width / 3, game.height / 7.3, this.currentScore.toString(), style);
        this.textfield.anchor.setTo(0.5)
        this.bar = game.add.sprite(game.width / 6.8, game.height / 29, 'barraTiempo');
        this.bar.scale.setTo(0.8);
        this.bar.anchor.setTo(0);
        // darle tamaÃ±o a la barra
        this.bar.width = game.width / 2.6;
        // this.bar.height = 20;

        this.startLevel3();
    },

    startLevel3: function() { // Inicia el nivel 1
        if(entrar==1)
        {
        stateGame = STATE_GAME_LEVEL3;
        menu=true;
        if(menu) {
             this.instrucciones.visible = false;
             
             menu = false;
             if (sonido) {
                 this.audioA.visible = false;
 
             } else {
                 this.audioM.visible = false;
 
 
             }
            
         }
        
        if (reproducir) {
            this.loopMusic.loop = true;
            this.loopMusic.play();
        }

        this.bar.width = game.width;
        // this.personasRe = [];
        // this.personasMuertas = [];
        bool3++;
        console.log(bool3);
        if(bool3==1)
        {
        game.time.events.loop(Phaser.Timer.SECOND, this.pintarDesecho, this);
    }
        for (i = 0; i < numeroPersonas; i++) {
            if (this.persona.children[i].rumbo == 0) {
                console.log("rumbo Arriba = 0 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name+ " direccio : " + this.persona.children[i].direccion);
                this.moverPersonajeArriba(i);
            } else if(this.persona.children[i].rumbo==1){
                console.log("rumbo derecha = 1 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name+ " direccio : " + this.persona.children[i].direccion);
                this.persona.children[i].reset(-50 - this.distancia, 226, 'personajeCaminandoDerecha');
                this.distancia -= 50;
            }
            else if(this.persona.children[i].rumbo==2){
                console.log("rumbo DERECHA total = 2 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name+ " direccio : " + this.persona.children[i].direccion);
               console.log('entro a rumbo3');
               
                this.persona.children[i].reset(-50 - this.distancia, game.height/1.17, 'personajeCaminandoDerecha');
                this.distancia -= 50;
            
        }

        }

        this.caminar();
        this.quitarvida();
        this.nivel1.visible = false;
        this.nivel1.inputEnabled = false;
        this.nivel2.visible = false;
        this.nivel2.inputEnabled = false;
        this.nivel3.inputEnabled = false;
        this.nivel3.visible = false;
        this.botonAtras.visible = false;
        this.botonAtras.inputEnabled= false;
        this.ajustes.inputEnabled=false;
        }
    },

    //#endregion

    update: function() {

        switch (stateGame) {
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_PLAYING:

                break;

            case STATE_GAME_GAME_OVER:

                break;

            case STATE_GAME_WIN:

                break;
            case STATE_GAME_MENU:

                break;
            case STATE_GAME_LEVEL1:
                this.barraTiempo(-0.1);
                // this.pintarDesecho();
                // game.time.events.loop(Phaser.Timer.SECOND, this.pintarDesecho, this);
                //#region Mover personajes y cambiar orientacion
                for (i = 0; i < numeroPersonas; i++) {
                    // console.log('direccion'+this.persona.children[i].direccion);
                    if (this.persona.children[i].caminando && this.persona.children[i].y >= game.height/1.4 && this.persona.children[i].rumbo == 0) {
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;
                    } 
                    else if (this.persona.children[i].caminando && this.persona.children[i].x >= game.width/1.68 && this.persona.children[i].rumbo == 1) {
                        if (this.persona.children[i].direccion == 1) {
                   
                            this.moverPersonajeArriba(i);
                            this.persona.children[i].direccion = 0;
                          
                        }
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;
                    } 
                    else {
                        if (this.persona.children[i].direccion == 0 ) {
                            this.moverPersonajeDerecha(i);
                            
                        }
                        
                        this.persona.children[i].direccion = 1;
                      
                        direccion = 1;
                        this.persona.children[i].x += this.persona.children[i].aumentarY;
                    }
                }
                //#endregion
                break;
            case STATE_GAME_LEVEL2:
                this.barraTiempo(-0.09);
               
                
               var temp=0;
                for (i = 0; i < numeroPersonas; i++) {
                  
                    if (this.persona.children[i].caminando && this.persona.children[i].y >= game.height/1.5 && this.persona.children[i].rumbo == 0) {
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;
                        
                    } 
                    else if (this.persona.children[i].caminando && this.persona.children[i].y <= game.height/3.36 && this.persona.children[i].rumbo == 1) {
                        
                   
                        
                        this.persona.children[i].y += this.persona.children[i].aumentarY;
                       
                        
                    } 
                   else if (this.persona.children[i].giro==1 && this.persona.children[i].rumbo==1) {
                      
                        this.persona.children[i].x += this.persona.children[i].aumentarY;
                   
                    }
                    else {
                        if (this.persona.children[i].direccion == 0 && this.persona.children[i].rumbo==0) {
                            
                            this.moverPersonajeIzquierda(i);
                            this.persona.children[i].direccion = 1;
                            this.persona.children[i].giro=1;
                            // this.persona.children[i].x -= this.persona.children[i].aumentarY;
                           
                        }
                        else if (this.persona.children[i].giro==1 && this.persona.children[i].rumbo==0) {
                            this.persona.children[i].x -= this.persona.children[i].aumentarY;
                        }
                       
                        
                        else if(this.persona.children[i].direccion == 0 && this.persona.children[i].rumbo==1){
                            this.moverPersonajeDerecha(i);
                            this.persona.children[i].direccion = 1;
                            this.persona.children[i].giro=1;
                           
                            
                        }
                       
                   
                        
                       
                    }
                }
                break;
                case STATE_GAME_LEVEL3:
                // console.log('entro al level 3');
                this.barraTiempo(-0.09);
                //#region Mover personajes y cambiar orientacion
                for (i = 0; i < numeroPersonas; i++) {
                    // console.log('direccion'+this.persona.children[i].direccion);
                    if (this.persona.children[i].caminando  && this.persona.children[i].rumbo == 0) {
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;
                    } 
                    else if (this.persona.children[i].caminando && this.persona.children[i].x >= game.width/1.68 && this.persona.children[i].rumbo == 1) {
                        if (this.persona.children[i].direccion == 1) {
                   
                            this.moverPersonajeArriba(i);
                            this.persona.children[i].direccion = 0;
                          
                        }
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;
                    } 
                    else {
                        if (this.persona.children[i].direccion == 0) {
                            this.moverPersonajeDerecha(i);
                            
                        }
                        
                        this.persona.children[i].direccion = 1;
                      
                        direccion = 1;
                        this.persona.children[i].x += this.persona.children[i].aumentarY;
                    }
                }

                break;
        }





    },
    // render: function() {

    //     // Input debug info
    //     game.debug.inputInfo(32, 32);
    //     // game.debug.spriteInputInfo(sprite, 32, 130);
    //     game.debug.pointer( game.input.activePointer );


    // }
}

// Variables Globales
var numeroX = 0;
var numeroY = 0;
var desecho;
var personas;
var personas1 = 0;
var personas2= 0;
var numeroPersonas;
var direccion = 0;
var sonido = true;
var menu = false;
var reproducir = true;
var PuntajeLvl1;
var PuntajeLvl2;
var PuntajeLvl3;
// Variables Globales

game.state.add("gameplayCiudad", GamePlayCiudad);
