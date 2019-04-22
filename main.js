// Global Variables 640

// game definition, 100% of browser window dimension
/*var game = new Phaser.Game("100%","100%",Phaser.CANVAS,"",{
   preload:onPreload,
   create:onCreate,
   resize:onResize // <- this will be called each time the game is resized
 }),*/
 var game = new Phaser.Game(360, 640, Phaser.AUTO),
    Main = function() {};
    
Main.prototype = {
    init:function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    preload: function() {
        game.load.image('stars', 'assets/img/pantallaCarga/pantallaCargaInicial_2.png');
        //game.load.image('loading','assets/img/pantallaCarga/loading.png');
        game.load.image('brand', 'assets/img/pantallaCarga/logoITM.png');

        game.load.script('polyfill', 'src/librerias/polyfill.js');
        game.load.script('utils', 'src/librerias/utils.js');
        game.load.script('splash', 'src/pantallas/PantallaCarga.js');
    },

    create: function() {
        
        game.state.add('PantallaCarga', PantallaCarga);
        game.state.start('PantallaCarga');
    }

};

game.state.add('Main', Main);
game.state.start('Main');