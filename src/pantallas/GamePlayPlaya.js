/*Minijuego Memoria*/

var clickUno = 0,
    clickDos = 0;
var puntosGanar = 0;
var timeUp = 0;
var tapar = 1;
var click1 = 0;
var click2 = 0;
var cartaClickeada1;
var cartaClickeada1nombre;
var mismaCarta = 0;
var play = false;
var first_click = false;
var nivel = 1;
var dificultad = 1;
var music_play = false;

var posiciones = {

    posXPosY: [
        { x: (game.width / 2) - 100, y: (game.height / 2) - 180 },
        { x: (game.width / 2) - 60, y: (game.height / 2) - 180 },
        { x: (game.width / 2) - 20, y: (game.height / 2) - 180 },
        { x: (game.width / 2) + 20, y: (game.height / 2) - 180 },
        { x: (game.width / 2) + 60, y: (game.height / 2) - 180 },
        { x: (game.width / 2) + 100, y: (game.height / 2) - 180 },

        { x: (game.width / 2) - 100, y: (game.height / 2) + 140 },
        { x: (game.width / 2) - 60, y: (game.height / 2) + 140 },
        { x: (game.width / 2) - 20, y: (game.height / 2) + 140 },
        { x: (game.width / 2) + 20, y: (game.height / 2) + 140 },
        { x: (game.width / 2) + 60, y: (game.height / 2) + 140 },
        { x: (game.width / 2) + 100, y: (game.height / 2) + 140 },
    ],

    posXPosY2: [
        { x: (game.width / 2) - 100, y: (game.height / 2) - 180 },
        { x: (game.width / 2) - 60, y: (game.height / 2) - 180 },
        { x: (game.width / 2) - 20, y: (game.height / 2) - 180 },
        { x: (game.width / 2) + 20, y: (game.height / 2) - 180 },
        { x: (game.width / 2) + 60, y: (game.height / 2) - 180 },
        { x: (game.width / 2) + 100, y: (game.height / 2) - 180 },

        { x: (game.width / 2) - 100, y: (game.height / 2) - 20 },
        { x: (game.width / 2) - 60, y: (game.height / 2) - 20 },
        { x: (game.width / 2) - 20, y: (game.height / 2) - 20 },
        { x: (game.width / 2) + 20, y: (game.height / 2) - 20 },
        { x: (game.width / 2) + 60, y: (game.height / 2) - 20 },
        { x: (game.width / 2) + 100, y: (game.height / 2) - 20 },

        { x: (game.width / 2) - 100, y: (game.height / 2) + 140 },
        { x: (game.width / 2) - 60, y: (game.height / 2) + 140 },
        { x: (game.width / 2) - 20, y: (game.height / 2) + 140 },
        { x: (game.width / 2) + 20, y: (game.height / 2) + 140 },
        { x: (game.width / 2) + 60, y: (game.height / 2) + 140 },
        { x: (game.width / 2) + 100, y: (game.height / 2) + 140 },
    ],

    posXPosY3: [
        { x: (game.width / 2) - 100, y: (game.height / 2) - 180 },
        { x: (game.width / 2) - 60, y: (game.height / 2) - 180 },
        { x: (game.width / 2) - 20, y: (game.height / 2) - 180 },
        { x: (game.width / 2) + 20, y: (game.height / 2) - 180 },
        { x: (game.width / 2) + 60, y: (game.height / 2) - 180 },
        { x: (game.width / 2) + 100, y: (game.height / 2) - 180 },

        { x: (game.width / 2) - 100, y: (game.height / 2) - 100 },
        { x: (game.width / 2) - 60, y: (game.height / 2) - 100 },
        { x: (game.width / 2) - 20, y: (game.height / 2) - 100 },
        { x: (game.width / 2) + 20, y: (game.height / 2) - 100 },
        { x: (game.width / 2) + 60, y: (game.height / 2) - 100 },
        { x: (game.width / 2) + 100, y: (game.height / 2) - 100 },

        { x: (game.width / 2) - 100, y: (game.height / 2) - 20 },
        { x: (game.width / 2) - 60, y: (game.height / 2) - 20 },
        { x: (game.width / 2) - 20, y: (game.height / 2) - 20 },
        { x: (game.width / 2) + 20, y: (game.height / 2) - 20 },
        { x: (game.width / 2) + 60, y: (game.height / 2) - 20 },
        { x: (game.width / 2) + 100, y: (game.height / 2) - 20 },

        { x: (game.width / 2) - 100, y: (game.height / 2) + 60 },
        { x: (game.width / 2) - 60, y: (game.height / 2) + 60 },
        { x: (game.width / 2) - 20, y: (game.height / 2) + 60 },
        { x: (game.width / 2) + 20, y: (game.height / 2) + 60 },
        { x: (game.width / 2) + 60, y: (game.height / 2) + 60 },
        { x: (game.width / 2) + 100, y: (game.height / 2) + 60 },

        { x: (game.width / 2) - 100, y: (game.height / 2) + 140 },
        { x: (game.width / 2) - 60, y: (game.height / 2) + 140 },
        { x: (game.width / 2) - 20, y: (game.height / 2) + 140 },
        { x: (game.width / 2) + 20, y: (game.height / 2) + 140 },
        { x: (game.width / 2) + 60, y: (game.height / 2) + 140 },
        { x: (game.width / 2) + 100, y: (game.height / 2) + 140 },
    ],
}

var GamePlayPlaya = function() {};

GamePlayPlaya.prototype = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },

    preload: function() {
        game.load.image('background1', 'assets/img/playa/images/fondo1.png');
        game.load.image('background2', 'assets/img/playa/images/fondo2.png');
        game.load.image('background3', 'assets/img/playa/images/fondo3.png');
        game.load.image('background4', 'assets/img/playa/images/fondo4.png');

        game.load.image('background_inicio', 'assets/img/playa/images/start_screen.png');
        game.load.image('background_selector', 'assets/img/playa/images/menu_niveles.png');

        game.load.image('boton_play', 'assets/img/playa/images/inicio.png');
        game.load.spritesheet('cuadros1', 'assets/img/playa/images/cuadros1.png', 179, 299);
        game.load.spritesheet('boton_start', 'assets/img/playa/images/boton_inicio.png', 74, 29);
        game.load.image('boton_inst', 'assets/img/playa/images/instrucciones.png');
        game.load.image('inst_screen', 'assets/img/playa/images/reglas.png');
        game.load.image('boton_back', 'assets/img/playa/images/back.png');
        game.load.image('recarga', 'assets/img/playa/images/reload.png');
        game.load.image('home', 'assets/img/playa/images/home.png');
        game.load.image('home_principal', 'assets/img/playa/images/home_principal.png');

        game.load.image('pausa', 'assets/img/playa/images/pausa.png');
        game.load.image('pausa_screen', 'assets/img/playa/images/pausa_screen.png');
        game.load.image('resume', 'assets/img/playa/images/resume.png');
        game.load.image('si', 'assets/img/playa/images/si.png');
        game.load.image('no', 'assets/img/playa/images/no.png');

        game.load.image('boton_nivel', 'assets/img/playa/images/nivel.png');
        game.load.image('boton_nivel2', 'assets/img/playa/images/nivel2.png');
        game.load.image('boton_nivel3', 'assets/img/playa/images/nivel3.png');
        game.load.image('boton_nivel4', 'assets/img/playa/images/nivel4.png');

        game.load.image('victoria0', 'assets/img/playa/images/victoria.png');
        game.load.image('victoria1', 'assets/img/playa/images/victoria1.png');
        game.load.image('victoria2', 'assets/img/playa/images/victoria2.png');
        game.load.image('victoria3', 'assets/img/playa/images/victoria3.png');

        game.load.image('derrota0', 'assets/img/playa/images/derrota0.png');
        game.load.image('derrota1', 'assets/img/playa/images/derrota1.png');
        game.load.image('derrota2', 'assets/img/playa/images/derrota2.png');
        game.load.image('derrota3', 'assets/img/playa/images/derrota3.png');

        game.load.audio('soundtrack', 'assets/img/playa/images/sonidos/sountrack.mp3');
        game.load.audio('win_sound', 'assets/img/playa/images/sonidos/aplausos.wav');
        game.load.audio('fail_sound', 'assets/img/playa/images/sonidos/buuuu.mp3');
    },

    create: function() {

        this.win_sound = game.add.audio('win_sound');
        this.fail_sound = game.add.audio('fail_sound');

        if (music_play == false) {
            this.musica = game.add.audio('soundtrack');
            this.musica.loop = true;
            this.musica.play();
            music_play = true;
        }

        game.time.events.remove(this.timerGameOver);
        game.paused = false;
        var style = {
            font: '20pt Impact',
            fill: '#FF4000'
        }

        var fondo_inicio = game.add.sprite(0, 0, 'background_inicio');
        fondo_inicio.width = game.width;
        fondo_inicio.height = game.height;

        boton_start = game.add.button(game.width / 1.52, game.height / 1.15, 'boton_start', this.mostrar_niveles, this);
        boton_inst = game.add.button(game.width / 1.12, game.height / 1.15, 'boton_inst', this.showInstrucciones, this);
        boton_return_menu = game.add.button(game.width / 1.12, (game.height / 2) + 210, 'home_principal', volverMenuPrincipalConfig, this);

        function volverMenuPrincipalConfig() {
            game.state.start("PlanetasMenu");
            this.musica.stop();
            music_play = false;
        }

        if (play) {

            if (nivel == 1) {
                var fondo = game.add.sprite(0, 0, 'background1');
                this.totalTime = 120; /*120*/
                var tipo = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
            } else if (nivel == 2) {
                var fondo = game.add.sprite(0, 0, 'background2');
                this.totalTime = 160; /*160*/
                dificultad = 2;
                var tipo = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
            } else if (nivel == 3) {
                var fondo = game.add.sprite(0, 0, 'background3');
                this.totalTime = 260; /*260*/
                dificultad = 3;
                var tipo = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14];
            } else if (nivel == 4) {
                var fondo = game.add.sprite(0, 0, 'background4');
                this.totalTime = 240; /*240*/
                dificultad = 3;
                var tipo = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14];
            } else {
                console.log("Error al cargar");
            }

            fondo.width = game.width;
            fondo.height = game.height;
            this.cartas = game.add.group();
            this.cartas.inputEnableChildren = true;
            var numero = 0;

            if (dificultad == 1) {
                do {
                    this.posicionCarta = Math.floor(Math.random() * (12 - 0)) + 0;
                    if (posiciones.posXPosY[numero] != null && tipo[this.posicionCarta] != null) {
                        // console.log("x: "+posiciones.posXPosY[this.posicionCarta].x+" y: "+posiciones.posXPosY[this.posicionCarta].y);
                        this.carta = this.cartas.create(posiciones.posXPosY[numero].x, posiciones.posXPosY[numero].y, 'cuadros1');
                        this.carta.anchor.setTo(0.5);
                        this.carta.frame = 15;
                        this.carta.bloqueo = false;
                        this.carta.encontrada = false;
                        this.carta.inputEnabled = true;
                        this.carta.name = "carta" + numero;
                        this.carta.scale.setTo(0.2);
                        this.carta.tipo = tipo[this.posicionCarta];
                        tipo[this.posicionCarta] = null;
                        numero++;
                    }
                } while (numero < 12);
            }
            if (dificultad == 2) {
                do {
                    this.posicionCarta = Math.floor(Math.random() * (18 - 0)) + 0;
                    // console.log(this.posicionCarta);
                    if (posiciones.posXPosY2[numero] != null && tipo[this.posicionCarta] != null) {
                        // console.log("x: "+posiciones.posXPosY[this.posicionCarta].x+" y: "+posiciones.posXPosY[this.posicionCarta].y);
                        this.carta = this.cartas.create(posiciones.posXPosY2[numero].x, posiciones.posXPosY2[numero].y, 'cuadros1');
                        this.carta.anchor.setTo(0.5);
                        this.carta.frame = 15;
                        this.carta.bloqueo = false;
                        this.carta.encontrada = false;
                        this.carta.inputEnabled = true;
                        this.carta.name = "carta" + numero;
                        this.carta.scale.setTo(0.2);
                        this.carta.tipo = tipo[this.posicionCarta];
                        tipo[this.posicionCarta] = null;
                        numero++;
                    }
                } while (numero < 18);
            }
            if (dificultad == 3) {
                do {
                    this.posicionCarta = Math.floor(Math.random() * (30 - 0)) + 0;
                    // console.log(this.posicionCarta);
                    if (posiciones.posXPosY3[numero] != null && tipo[this.posicionCarta] != null) {
                        // console.log("x: "+posiciones.posXPosY[this.posicionCarta].x+" y: "+posiciones.posXPosY[this.posicionCarta].y);
                        this.carta = this.cartas.create(posiciones.posXPosY3[numero].x, posiciones.posXPosY3[numero].y, 'cuadros1');
                        this.carta.anchor.setTo(0.5);
                        this.carta.frame = 15;
                        this.carta.bloqueo = false;
                        this.carta.encontrada = false;
                        this.carta.inputEnabled = true;
                        this.carta.name = "carta" + numero;
                        this.carta.scale.setTo(0.2);
                        this.carta.tipo = tipo[this.posicionCarta];
                        tipo[this.posicionCarta] = null;
                        numero++;
                    }
                } while (numero < 30);
            }

            this.cartas.onChildInputDown.add(function onDown(sprite) {
                // console.log(sprite.tipo);
                // console.log(sprite.name);
                sprite.loadTexture('cuadros1', sprite.tipo, false);
                if (click1 == 0 && click2 == 0 && sprite.encontrada == false) {

                    click1 = 1;
                    mismaCarta = sprite.name;
                    console.log("primer Click: " + click1 + "segundo Click: " + click2);
                    cartaClickeada1 = sprite.tipo;
                    cartaClickeada1nombre = sprite.name;
                    //    console.log( this.cartas);
                } else if (click1 == 1 /*&& click2==0*/ && sprite.encontrada == false && !sprite.bloqueo && mismaCarta != sprite.name) {
                    click2 = 1;
                    console.log("primer aaClick: " + click1 + " segundo aaClick: " + click2);
                    // console.log(this.volteada1.frame+" "+this.volteada2.frame);
                    if (cartaClickeada1 == sprite.tipo && sprite.encontrada == false) {
                        this.increaseScore();
                        for (var i = 0; i < this.cartas.length; i++) {
                            if (this.cartas.children[i].name == cartaClickeada1nombre) {
                                this.cartas.children[i].encontrada = true;

                            }
                        }

                        sprite.encontrada = true;
                        click1 = 0;
                        click2 = 0;


                    } else {
                        this.pierdeTiempo();
                        game.time.events.add(Phaser.Timer.SECOND / 4, function() {
                            if (click1 == 1 && click2 == 1 && sprite.encontrada == false) {
                                for (var i = 0; i < this.cartas.length; i++) {
                                    if (this.cartas.children[i].name == cartaClickeada1nombre) {
                                        this.cartas.children[i].frame = 15;
                                        this.cartaClickeada1 = null; /*Quiza sirva */
                                    }
                                }
                                sprite.frame = 15;
                                click1 = 0;
                                click2 = 0;
                            }

                        }, this);


                    }
                }
                this.cartaClickeada1 = null;
            }, this);

            this.currentScore = 0;
            this.scoreText = game.add.text(game.width / 4, 3, '0', style);

            boton_pausa = game.add.button(game.width / 1.12, 2, 'pausa', this.stop_game, this);

            this.pintarPuntos = game.add.text(game.width / 50, 2, 'Pares: ', style);
            this.pintarTiempo = game.add.text(game.width / 3.6, game.height - 70, 'Tiempo: ', style);



            this.timerText = game.add.text(game.width / 1.7, game.height - 70, this.totalTime + '', style);
            this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND, function() {
                console.log("timer");
                this.totalTime--;
                this.timerText.text = this.totalTime + '';
                if (this.totalTime <= 0) {
                    this.timerText.visible = false;
                    this.pintarTiempo.visible = false;
                    this.pintarPuntos.visible = false;
                    this.scoreText.visible = false;
                    this.showFinalMessageFail()
                    game.time.events.remove(this.timerGameOver);
                    this.cartas.kill();

                    //  this.endGame = true;
                }
            }, this);
        };


    },

    mostrar_niveles: function() {

        boton_return_menu.inputEnabled = false;
        boton_start.inputEnabled = false;
        boton_inst.inputEnabled = false;

        var fondo_seleccion = game.add.sprite(0, 0, 'background_selector');
        fondo_seleccion.width = game.width;
        fondo_seleccion.height = game.height;
        boton_nivel1 = game.add.button((game.width / 2) - 150, (game.height / 2) - 10, 'boton_nivel', this.asig_nvl1, this);
        boton_nivel2 = game.add.button((game.width / 2) + 30, (game.height / 2) + 80, 'boton_nivel2', this.asig_nvl2, this);
        boton_nivel3 = game.add.button((game.width / 2) + 70, (game.height / 2) - 100, 'boton_nivel3', this.asig_nvl3, this);
        boton_nivel4 = game.add.button((game.width / 2) + 115, (game.height / 2) + 35, 'boton_nivel4', this.asig_nvl4, this);

        boton_nivel1.scale.setTo(0.7);
        boton_nivel2.scale.setTo(0.8);
        boton_nivel3.scale.setTo(0.5);
        boton_nivel4.scale.setTo(0.8);

        boton_nivel1.anchor.setTo(0.5);
        boton_nivel2.anchor.setTo(0.5);
        boton_nivel3.anchor.setTo(0.5);
        boton_nivel4.anchor.setTo(0.5);
    },

    asig_nvl1: function() {
        nivel = 1;
        boton_nivel1.inputEnabled = false;
        boton_nivel2.inputEnabled = false;
        boton_nivel3.inputEnabled = false;
        boton_nivel4.inputEnabled = false;
        this.onTap();
    },
    asig_nvl2: function() {
        nivel = 2;
        boton_nivel1.inputEnabled = false;
        boton_nivel2.inputEnabled = false;
        boton_nivel3.inputEnabled = false;
        boton_nivel4.inputEnabled = false;
        this.onTap();
    },
    asig_nvl3: function() {
        nivel = 3;
        boton_nivel1.inputEnabled = false;
        boton_nivel2.inputEnabled = false;
        boton_nivel3.inputEnabled = false;
        boton_nivel4.inputEnabled = false;
        this.onTap();
    },
    asig_nvl4: function() {
        nivel = 4;
        boton_nivel1.inputEnabled = false;
        boton_nivel2.inputEnabled = false;
        boton_nivel3.inputEnabled = false;
        boton_nivel4.inputEnabled = false;
        this.onTap();
    },

    onTap: function() {
        play = true;
        if (first_click == false) {
            this.create();
            first_click = true;
            console.log("primerclick");
        };

        console.log("escucha el lalalala click " + play);
    },

    stop_game: function() {
        game.paused = true;
        this.cartas.kill();
        this.show_pausa();
    },

    continue_game: function() {
        game.paused = false;
        this.cartas.revive();
        boton_pausa.revive();
        boton_pausa.inputEnabled = true;
        boton_si.kill();
        boton_si.inputEnabled = false;
        boton_no.kill();
        boton_no.inputEnabled = false;
        pausa_screen.kill();
        boton_home.kill();
        boton_reload.kill();
        boton_resume.kill();
        bg.kill();
    },

    return_home: function() {
        play = false;
        first_click = false;
        nivel = 1;
        dificultad = 1;
        this.musica.stop();
        music_play = false;
        this.create();
    },

    pierdeTiempo: function() {
        this.totalTime -= 10;
        this.timerText.text = this.totalTime + ''
        if (this.totalTime <= 0) {
            this.timerText.text = '0';
        }

    },

    increaseScore: function() {
        this.currentScore += 1;
        this.scoreText.text = this.currentScore;

        this.puntosGanar = this.currentScore;

        if (this.puntosGanar == 6 && dificultad == 1) {
            this.showFinalMessage()
            game.time.events.remove(this.timerGameOver);
            this.timerText.visible = false;
            this.pintarTiempo.visible = false;
            this.pintarPuntos.visible = false;
            this.scoreText.visible = false;
            nivel += 1;
        }
        if (this.puntosGanar == 9 && dificultad == 2) {
            this.showFinalMessage()
            game.time.events.remove(this.timerGameOver);
            this.timerText.visible = false;
            this.pintarTiempo.visible = false;
            this.pintarPuntos.visible = false;
            this.scoreText.visible = false;
            nivel += 1;
        }
        if (this.puntosGanar == 15 && dificultad == 3) {
            this.showFinalMessage()
            game.time.events.remove(this.timerGameOver);
            this.timerText.visible = false;
            this.pintarTiempo.visible = false;
            this.pintarPuntos.visible = false;
            this.scoreText.visible = false;
            nivel += 1;
        }
    },

    showFinalMessage: function(msg) {

        this.musica.stop();
        music_play = false;
        this.win_sound.play();

        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0, 0, game.width, game.height);

        var bg = game.add.sprite(0, 0, bgAlpha);
        bg.alpha = 0.5;


        var num_pantalla = Math.floor((Math.random() * 3) + 0);

        var victoria_screen = game.add.sprite(game.width / 2, game.height / 2, 'victoria' + num_pantalla);
        victoria_screen.anchor.setTo(0.5);
        boton_pausa.kill();

        if (nivel <= 3) {
            boton_home = game.add.button((game.width / 2) + 15, (game.height / 2) + 115, 'home', this.return_home, this);
            boton_resume = game.add.button((game.width / 2) - 20, (game.height / 2) + 115, 'resume', this.create, this);
        } else {
            boton_home = game.add.button((game.width / 2) + 15, (game.height / 2) + 115, 'home', this.return_home, this);
        }
    },

    showFinalMessageFail: function(msg) {

        this.musica.stop();
        music_play = false;
        this.fail_sound.play();

        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0, 0, game.width, game.height);

        var bg = game.add.sprite(0, 0, bgAlpha);
        bg.alpha = 0.5;


        var num_pantalla = Math.floor((Math.random() * 3) + 0);

        console.log(num_pantalla);

        var derrota_screen = game.add.sprite(game.width / 2, game.height / 2, 'derrota' + num_pantalla);
        derrota_screen.anchor.setTo(0.5);

        boton_home = game.add.button((game.width / 2) + 15, (game.height / 2) + 115, 'home', this.return_home, this);
        boton_reload = game.add.button((game.width / 2) + 49, (game.height / 2) + 115, 'recarga', this.create, this);
        boton_pausa.kill();
    },

    showInstrucciones: function(msg) {

        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0, 0, game.width, game.height);

        var bg = game.add.sprite(0, 0, bgAlpha);
        bg.alpha = 0.5;

        var instrucciones_screen = game.add.sprite(game.width / 2, game.height / 2, 'inst_screen');
        instrucciones_screen.anchor.setTo(0.5);
        instrucciones_screen.width = game.width;
        instrucciones_screen.height = game.height;

        boton_back = game.add.button(game.width / 1.12, game.height / 1.15, 'boton_back', this.create, this);
    },

    show_pausa: function(msg) {

        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0, 0, game.width, game.height);

        bg = game.add.sprite(0, 0, bgAlpha);
        bg.alpha = 0.5;

        pausa_screen = game.add.sprite(game.width / 2, game.height / 2, 'pausa_screen');
        pausa_screen.anchor.setTo(0.5);
        boton_home = game.add.button((game.width / 2) + 20, (game.height / 2) + 115, 'home', this.return_home, this);
        boton_reload = game.add.button((game.width / 2) - 15, (game.height / 2) + 115, 'recarga', this.create, this);
        boton_resume = game.add.button((game.width / 2) - 49, (game.height / 2) + 115, 'resume', this.continue_game, this);

        boton_si = game.add.button((game.width / 2), (game.height / 2), 'si', seguir_musica, this);
        boton_si.scale.setTo(0.5);
        boton_no = game.add.button((game.width / 2) - 129, (game.height / 2), 'no', parar_musica, this);
        boton_no.scale.setTo(0.5);

        function parar_musica() {
            this.musica.stop();
            this.continue_game();
        }

        function seguir_musica() {
            this.musica.play();
            this.continue_game();
        }

        boton_pausa.input.stop();
        boton_pausa.kill();
    },

    update: function() {


        /*    cuadroAzul.scale.setTo(0.5,0.5);
            this.cuadroAzul.scale.setTo(0.5,0.5);
            cuadroRojo.scale.setTo(0.5,0.5);*/
        //this.carta.scale.setTo(0.1,0.1);
    }
}

//var game = new Phaser.Game(500, 800, Phaser.CANVAS);

game.state.add("gameplayPlaya", GamePlayPlaya);
//game.state.start("gameplay");