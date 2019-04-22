var botonJugar, botonSalir, botonCreditos, botonConfig, escalarAncho, escalarAlto, posicionY, botonesX, botonJugarY, botonSalirY, botonConfigY;
var tamanioBotonesH, tamanioBotonesW;
var MenuPrincipal = function() {};

MenuPrincipal.prototype = {

    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        this.titleText = game.make.text(game.world.centerX, 100, "ITM GAMES", {
            font: 'bold 35pt TheMinion',
            fill: '#fff',
            align: 'center'
        });
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    },
    create: function() {
        this.clickk = game.add.audio('clickk');
        this.musicaMenu = game.add.audio('MenuMusica');
        this.musicaMenu.loop = true;
        this.musicaMenu.stop();
        game.width=360;
        game.height=640;

         // if (360 < 630) {
        //     //Mobile
        //     escalarAncho = 360;
        //     escalarAlto = 640;
        //     posicionY = 0;
        //     tamanioBotonesJugarSalir = 0.65;
        // } else {
        //     //Tablet
        //     escalarAncho = 360;
        //     escalarAlto = 640 + 110;
        //     posicionY = -50;
        //     tamanioBotonesJugarSalir = 1;
        // }
        // this.FondoInicio = game.add.sprite(0, 0, 'menu-principal-bg');
        // this.FondoInicio.width = 360;
        // this.FondoInicio.height = 640;

        // botonesX = 360 / 2 - 95;
        // if (640 > 590) {
        //     botonJugarY = 640 / 2 + 60;
        //     botonSalirY = 640 / 2 + 145;
        //     botonConfigY = 640 - 125;

        //     if (360 > 750) {
        //         botonesX = 360 / 2 - 140;
        //         botonJugarY = 640 / 2 + 45;
        //         botonSalirY = 640 / 2 + 170;
        //         botonConfigY = 640 - 125;
        //     }
        // } else {
        //     if (640 > 540) {
        //         botonJugarY = 640 / 2;
        //         botonSalirY = 640 / 2 + 75;
        //         botonConfigY = 640 - 110;
        //     } else {
        //         botonJugarY = 640 / 2;
        //         botonSalirY = 640 / 2 + 70;
        //         botonConfigY = 640 - 85;
        //     }
        // }

        if (game.width < 630) {
            //Mobile
            escalarAncho = game.width;
            escalarAlto = game.height;
            posicionY = 0;
            tamanioBotonesJugarSalir = 0.65;
        } else {
            //Tablet
            escalarAncho = game.width;
            escalarAlto = game.height + 110;
            posicionY = -50;
            tamanioBotonesJugarSalir = 1;
        }
        this.FondoInicio = game.add.sprite(0, 0, 'menu-principal-bg');
        this.FondoInicio.width = game.width;
        this.FondoInicio.height = game.height;

        botonesX = game.width / 2 - 95;
        
        if (game.height > 590) {
            botonJugarY = game.height / 2 + 60;
            botonSalirY = game.height / 2 + 145;
            botonConfigY = game.height - 125;

            if (game.width > 750) {
                botonesX = game.width / 2 - 140;
                botonJugarY = game.height / 2 + 45;
                botonSalirY = game.height / 2 + 170;
                botonConfigY = game.height - 125;
            }
        } else {
            if (game.height > 540) {
                botonJugarY = game.height / 2;
                botonSalirY = game.height / 2 + 75;
                botonConfigY = game.height - 110;
            } else {
                botonJugarY = game.height / 2;
                botonSalirY = game.height / 2 + 70;
                botonConfigY = game.height - 85;
            }
        }
        botonJugar = game.add.button(botonesX, botonJugarY, 'botonJugarC', clickJugar, this);
        botonSalir = game.add.button(botonesX, botonSalirY, 'botonSalir', clickSalir, this);
        botonJugar.scale.setTo(tamanioBotonesJugarSalir, tamanioBotonesJugarSalir);
        botonSalir.scale.setTo(tamanioBotonesJugarSalir, tamanioBotonesJugarSalir);

        this.audioA = game.add.button(20, botonConfigY, 'botonConfiguracion', menuConfigClick, this);
        this.audioA.visible = true;
        this.audioM = game.add.button(20, botonConfigY, 'botonConfiguracion2', menuConfigClick, this);
        this.audioM.visible = false;

        if (sone) {
            this.musicaMenu.play();
        } else {
            this.audioA.visible = false;
            this.audioM.visible = true;
            console.log("object");
        }
    },
};

function clickJugar() {
    this.clickk.play();
    game.state.start("PlanetasMenu");
    this.musicaMenu.stop();
}

function clickSalir() {
    this.clickk.play();
    if (confirm("Deseas salir?")) {
        game.destroy();
        window.close();
    }
}

function menuConfigClick() {
    this.clickk.play();
    if (sone) {
        this.audioA.visible = false;
        this.audioM.visible = true;
        sone = false;
        this.musicaMenu.stop();
    } else {
        this.audioA.visible = true;
        this.audioM.visible = false;
        sone = true;
        this.musicaMenu.play();
    }
}

//Phaser.Utils.mixinPrototype(MenuPrincipal.prototype);