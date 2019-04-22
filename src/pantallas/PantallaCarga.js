var escalar;
var PantallaCarga = function() {};
var sone = true;

PantallaCarga.prototype = { //Cargar toda la pantalla

    loadScripts: function() {
        game.load.script('style', 'src/librerias/style.js');
        game.load.script('WebFont', 'src/librerias/webfontloader.js');
        game.load.script('menuprincipal', 'src/pantallas/MenuPrincipal.js');
        game.load.script('planetas', 'src/pantallas/PlanetasMenu.js');
        game.load.script('planetasmenu', 'src/pantallas/MenuPrincipal.js');
        game.load.script('menuconfiguracion', 'src/pantallas/MenuConfiguracion.js');
        game.load.script('GamePlayCiudad', 'src/pantallas/GamePlayCiudad.js');
        game.load.script('GamePlayManglar', 'src/pantallas/GamePlayManglar.js');
        game.load.script('GamePlayParque', 'src/pantallas/GamePlayParque.js');
        game.load.script('GamePlayPlaya', 'src/pantallas/GamePlayPlaya.js');
        game.load.script('StateTransition', 'phaser-state-transition.js');
    },

    //Para cargar la musica del juego
    loadBgm: function() {
        //game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
        //#region Sonidos
        game.load.audio('loopMusic', 'assets/Sonidos/Principal.mp3');
        game.load.audio('aplausos', 'assets/Sonidos/aplausos.wav');
        //#endregion
        //Menu
        game.load.audio('MenuMusica', 'assets/Sonidos/Spooky-Island.mp3');
        game.load.audio('loopMusica', 'assets/Sonidos/Principal.mp3');
        game.load.audio('win', 'assets/Sonidos/aplausos.wav');
        game.load.audio('PlanetasMusica', 'assets/Sonidos/Cyber-Dream-Loop.mp3');
        game.load.audio('clickk', 'assets/Sonidos/Mouse Click Sound-23037-Free-Loops.com.mp3');
    },

    // cargar background de las pantallas
    loadImages: function() {
        //Pantalla de menu de inicio
        game.load.image('menu-principal-bg', 'assets/img/menuPrincipal/fondoMenuInicio.png');
        game.load.spritesheet('botonJugarC', 'assets/img/menuPrincipal/botonJugarMenuPrincipal.png', 294, 94);
        game.load.spritesheet('botonSalir', 'assets/img/menuPrincipal/botonSalirMenuPrincipal.png', 294, 94);
        game.load.spritesheet('botonConfiguracion', 'assets/img/menuPrincipal/configMenuPrincipal.png', 52, 52);
        game.load.spritesheet('botonConfiguracion2', 'assets/img/menuPrincipal/configMenuPrincipalBlok.png', 52, 52);
        //Pantalla de
        game.load.image('botonUniversal', 'assets/img/pantallaNiveles/planetas.png');
        game.load.image('fondoPlanetaPlaya', 'assets/img/pantallaNiveles/playa_03.png');
        game.load.image('fondoPlanetaParque', 'assets/img/pantallaNiveles/parque_02.png');
        game.load.image('fondoPlanetaManglar', 'assets/img/pantallaNiveles/manglar_04,1.png');
        game.load.image('fondoPlanetaCiudad', 'assets/img/pantallaNiveles/ciudad_01.png');

        game.load.image('background_inicio', 'assets/img/juegoBasketball/FondoInicio/FondoInicio.png');

        //Botones inferiores de salida
        game.load.image('volverPrincipalPlanetas', 'assets/img/pantallaNiveles/salir.png');
        game.load.image('salirConfig', 'assets/img/pantallaNiveles/salir.png');
        game.load.image('configMenu', 'assets/img/pantallaNiveles/salir.png');

        game.load.image('background', 'assets/img/pantallaNiveles/background.png');
        game.load.image('botonUniversal', 'assets/img/pantallaNiveles/planetas.png');
        game.load.image('volver', 'assets/img/pantallaNiveles/salir.png');


        game.load.spritesheet('mundo1', 'assets/img/pantallaNiveles/Ciudad.png', 265, 257);
        game.load.spritesheet('mundo3', 'assets/img/pantallaNiveles/Playa.png', 265, 186);
        game.load.spritesheet('mundo4', 'assets/img/pantallaNiveles/Manglar.png', 265, 223);
        game.load.spritesheet('mundo2', 'assets/img/pantallaNiveles/parque.png', 265, 257);

        /*********Interactua mapa********/
        //Fondo
        //Fondo
        game.load.image('fondoLimpio', 'assets/img/mapaInteractivo/fondo/fondo_limpio.png');
        game.load.image('fondoGanar', 'assets/img/mapaInteractivo/fondo/fondoGanaste.png');
        game.load.image('fondoPerder', 'assets/img/mapaInteractivo/fondo/fondoPerdiste.png');
        game.load.image('fondoInicio', 'assets/img/mapaInteractivo/fondo/fondoInicio.png');
        game.load.image('fondoDesktop', 'assets/img/mapaInteractivo/fondo/fondoPC.png');

        //Plataformas sprites
        //game.load.image('platLimpio0', 'assets/img/mapaInteractivo/plataformas/platLimpio0.png');
        game.load.image('platLimpio1', 'assets/img/mapaInteractivo/plataformas/platLimpio1.png');
        game.load.image('platLimpio2', 'assets/img/mapaInteractivo/plataformas/platLimpio2.png');
        game.load.image('platLimpio3', 'assets/img/mapaInteractivo/plataformas/platLimpio3.png');
        game.load.image('platLimpio4', 'assets/img/mapaInteractivo/plataformas/platLimpio4.png');
        game.load.image('platLimpio5', 'assets/img/mapaInteractivo/plataformas/platLimpio5.png');
        game.load.image('platBas1', 'assets/img/mapaInteractivo/plataformas/platBas1.png');
        game.load.image('platBas2', 'assets/img/mapaInteractivo/plataformas/platBas2.png');
        //Tronco
        game.load.image('tronco', 'assets/img/mapaInteractivo/troncos/tronco2.png');
        game.load.image('tronco2', 'assets/img/mapaInteractivo/troncos/tronco2.png');
        game.load.image('tronco3', 'assets/img/mapaInteractivo/troncos/tronco2.png');
        //Basureros
        game.load.spritesheet('basureros', 'assets/img/mapaInteractivo/basureros/basureros2.png', 129, 142);
        //Basura
        game.load.spritesheet('basuras', 'assets/img/mapaInteractivo/basuras/basuras.png', 170.12, 172);
        //Remolinos
        game.load.image('remolino', 'assets/img/mapaInteractivo/remolinos/remolino.png');
        //lagarto
        game.load.spritesheet('lagarto', 'assets/img/mapaInteractivo/lagarto/lagarto.png', 690.5, 348);
        //Barra de tiempo
        game.load.image('barraTiempo', 'assets/img/mapaInteractivo/interfaz/barraTiempo.png');
        //Reloj
        game.load.image('reloj', 'assets/img/mapaInteractivo/interfaz/reloj.png');
        //Botones de pantallas
        //Plataformas sprites
        game.load.image('plat0', 'assets/img/mapaInteractivo/plataformas/nivel3/plat0.png');
        game.load.image('plat1', 'assets/img/mapaInteractivo/plataformas/nivel3/plat1.png');
        game.load.image('plat2', 'assets/img/mapaInteractivo/plataformas/nivel3/plat2.png');
        game.load.image('plat3', 'assets/img/mapaInteractivo/plataformas/nivel3/plat3.png');
        game.load.image('plat4', 'assets/img/mapaInteractivo/plataformas/nivel3/plat4.png');
        game.load.image('platFondo', 'assets/img/mapaInteractivo/plataformas/nivel3/platFondo.png');
        game.load.image('platBloqueo', 'assets/img/mapaInteractivo/plataformas/platBloqueo.png');


        //Remolino
        game.load.image('remolinoMorado', 'assets/img/mapaInteractivo/remolinos/remolinoMorado.png');
        game.load.spritesheet('lagartoReversa', 'assets/img/mapaInteractivo/lagarto/lagartoReversa.png', 716, 351);

        game.load.image('boton1', 'assets/img/mapaInteractivo/botones/botonNivel1.png');
        game.load.image('boton2', 'assets/img/mapaInteractivo/botones/botonNivel2.png');
        game.load.image('boton3', 'assets/img/mapaInteractivo/botones/botonNivel3.png');
        game.load.image('boton_salir', 'assets/img/mapaInteractivo/botones/botonSalir.png');
        game.load.image('boton_reinicar', 'assets/img/mapaInteractivo/botones/botonReinicio.png');
        game.load.image('boton_sig', 'assets/img/mapaInteractivo/botones/botonSalir.png');
        game.load.image('boton_mundos', 'assets/img/mapaInteractivo/botones/botonMundos.png');
        game.load.image('botonInstrucciones', 'assets/img/mapaInteractivo/botones/botonInstrucciones.png');
        game.load.image('botonSonido', 'assets/img/mapaInteractivo/botones/botonSonido.png');
        game.load.image('fondoIstrucciones', 'assets/img/mapaInteractivo/fondo/instruccionesTrasfall.png');


        //Ciudad
        //#region Personaje

        // game.load.atlasJSONArray('personajeCaminandoArriba', 'assets/img/recolectaBasura/personajeCaminandoArriba.png', 'assets/img/recolectaBasura/personajeCaminandoArriba.json');
        // game.load.atlasJSONArray('personajeCaminandoDerecha', 'assets/img/recolectaBasura/personajeCaminandoDerecha.png', 'assets/img/recolectaBasura/personajeCaminandoDerecha.json');
        // game.load.atlasJSONArray('personajeCaminandoIzquierda', 'assets/img/recolectaBasura/personajeCaminandoIzquierda.png', 'assets/img/recolectaBasura/personajeCaminandoIzquierda.json');
        // game.load.atlasJSONArray('personajeCaminandoAbajo', 'assets/img/recolectaBasura/PersonajeCaminandoAbajo.png', 'assets/img/recolectaBasura/PersonajeCaminandoAbajo.json');
        game.load.atlasJSONArray('personajeCaminandoDerecha', 'assets/img/recolectaBasura/personaCaminandoDerecha.png', 'assets/img/recolectaBasura/personaCaminandoDerecha.json');
        game.load.atlasJSONArray('personajeCaminandoArriba', 'assets/img/recolectaBasura/personaCaminandoArriba.png', 'assets/img/recolectaBasura/personaCaminandoArriba.json');
        game.load.atlasJSONArray('personajeCaminandoArriba2', 'assets/img/recolectaBasura/personaCaminandoArriba2.png', 'assets/img/recolectaBasura/personaCaminandoArriba2.json');
        game.load.atlasJSONArray('personajeCaminandoDerecha2', 'assets/img/recolectaBasura/personaCaminandoDerecha2.png', 'assets/img/recolectaBasura/personaCaminandoDerecha2.json');
        game.load.atlasJSONArray('personajeCaminandoAbajo', 'assets/img/recolectaBasura/personaCaminandoAbajo.png', 'assets/img/recolectaBasura/personaCaminandoAbajo.json');
        game.load.atlasJSONArray('personajeCaminandoAbajo2', 'assets/img/recolectaBasura/personaCaminandoAbajo2.png', 'assets/img/recolectaBasura/personaCaminandoAbajo2.json');

        //#endregion 

        //#region Desechos
        game.load.image('manzana', 'assets/img/recolectaBasura/manzana.png');
        game.load.image('celular', 'assets/img/recolectaBasura/celular.png');
        game.load.image('botella', 'assets/img/recolectaBasura/botella.png');
        game.load.image('vasoCarton', 'assets/img/recolectaBasura/carton.png');
        game.load.image('espejo', 'assets/img/recolectaBasura/espejo.png');
        game.load.image('lata', 'assets/img/recolectaBasura/lata.png');

        //#endregion
        //#region Mapas
        game.load.image('mapaLVL1', 'assets/img/recolectaBasura/mapa3.png');
        game.load.image('mapaLVL2', 'assets/img/recolectaBasura/mapaLVL2.png');
        game.load.image('mapaLVL3', 'assets/img/recolectaBasura/mapaLVL3.jpg');
        //#endregion
        //#region Seleccion de niveles
        game.load.atlasJSONArray('nivelDesbloqueado', 'assets/img/recolectaBasura/nivelesDesbloqueados.png', 'assets/img/recolectaBasura/nivelesDesbloqueados.json');
        game.load.atlasJSONArray('nivelBloqueado', 'assets/img/recolectaBasura/nivelesBloqueados.png', 'assets/img/recolectaBasura/nivelesBloqueados.json');
        game.load.atlasJSONArray('instrucciones', 'assets/img/recolectaBasura/instrucciones.png', 'assets/img/recolectaBasura/instrucciones.json');
        game.load.atlasJSONArray('audio', 'assets/img/recolectaBasura/audio.png', 'assets/img/recolectaBasura/audio.json');
        game.load.atlasJSONArray('ajustes', 'assets/img/recolectaBasura/ajustes.png', 'assets/img/recolectaBasura/ajustes.json');
        game.load.image('instruccionesJuego', 'assets/img/recolectaBasura/instruccionesJuego.png');
        //#endregion
        //#region Botones
        game.load.atlasJSONArray('BotonRecargar', 'assets/img/recolectaBasura/recargar.png', 'assets/img/recolectaBasura/recargar.json');

        game.load.atlasJSONArray('botonAtras', 'assets/img/recolectaBasura/btnAtras.png', 'assets/img/recolectaBasura/btnAtras.json');

        //#endregion
        game.load.image('boton1', 'assets/img/mapaInteractivo/botones/botonNivel1.png');
        game.load.image('boton2', 'assets/img/mapaInteractivo/botones/botonNivel2.png');
        game.load.image('boton3', 'assets/img/mapaInteractivo/botones/botonNivel3.png');
        game.load.image('boton_salir', 'assets/img/mapaInteractivo/botones/botonSalir.png');
        game.load.image('boton_reinicar', 'assets/img/mapaInteractivo/botones/botonReinicio.png');
        game.load.image('boton_sig', 'assets/img/mapaInteractivo/botones/botonSalir.png');
        game.load.image('boton_mundos', 'assets/img/mapaInteractivo/botones/botonMundos.png');
    },

    loadFonts: function() {
        //Para cargar tipografias
        WebFontConfig = {
            custom: {
                families: ['TheMinion'],
                urls: ['assets/style/theminion.css']
            }
        }
    },

    init: function() { //orientacion x ,orientacion y, Recibe la img llamada en main.js(brand y loading)
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        // game.width=360;
        // game.height=640;
    },

    preload: function() {
        // game.scale.forceOrientation(false, true);
        this.FondoInicio = game.add.sprite(0, 0, 'stars');
        
        // if(window.innerWidth>578)
        // {
        //     this.FondoInicio.width = 360;
        //     this.FondoInicio.height = 640;console.log("dcdcd"+game.width);
        // }
        this.FondoInicio.width = game.width;
        this.FondoInicio.height = game.height;
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();

    },

    addGameStates: function() {

        game.state.add("MenuPrincipal", MenuPrincipal);
        game.state.add("PlanetasMenu", PlanetasMenu);
        game.state.add("MenuConfiguracion", MenuConfiguracion);
        game.state.add("GamePlayManglar", GamePlayManglar);
        game.state.add("GamePlayCiudad", GamePlayCiudad);
        game.state.add("GamePlayParque", GamePlayParque);
        game.state.add("GamePlayPlaya", GamePlayPlaya);
    },

    /*addGameMusic: function () {
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    },*/

    create: function() {
        this.addGameStates();
        //this.addGameMusic();     -----> Agrega el cargarMusica

        setTimeout(function() {
            game.state.start("MenuPrincipal");
        }, 1500);
    }
};