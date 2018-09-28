var config = {
    type: Phaser.CANVAS,
    gameTitle: 'phaserMap',
    gameVersion: '1.0.0',
    gameURL: 'https://github.com/Silbad/phaserMap',
    width: 500,
    height: 350,
    zoom: 1,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    disableContextMenu: true,
    pixelArt: true,
    devMode: true,
    speedMult: 0.7,
    friction: 0.99 // this is the friction which will slow down the map. Must be less than 1
};

if (config.devMode) {
    console.clear();
    console.log('%c  %c  %c ' + config.gameTitle + ' v' + config.gameVersion + ' %c ' + config.gameURL, 'background: #00A510', 'background: #fff', 'color: #fff; background: #0059E0', 'background: #fff');
}

var game = new Phaser.Game(config);

function preload () {
    this.load.image('map', './assets/worlds/solaris.png');
}

function create () {
    // http://labs.phaser.io/edit.html?src=src\input\dragging\enable%20for%20drag.js
    // https://www.emanueleferonato.com/2016/01/18/how-to-create-a-html-draggable-and-scrollable-map-with-inertia-using-phaser-framework/

    var mapObject = this.add.image(config.width / 2, config.height / 2, 'map').setInteractive();
    var inputObject = this.input;

    inputObject.setDraggable(mapObject);
    inputObject.setDefaultCursor('grab');

    inputObject.on('dragstart', function (pointer, gameObject) {
        inputObject.setDefaultCursor('grabbing');
    });

    inputObject.on('drag', function (pointer, gameObject, dragX, dragY) {

        $('#coord-x').html(dragX);
        $('#coord-y').html(dragY);

        var tmpX = dragX
        if (dragX > mapObject.width / 2) {
            tmpX = mapObject.width / 2
        }
        gameObject.x = tmpX;
        gameObject.y = dragY;

    });

    inputObject.on('dragend', function (pointer, gameObject) {
        inputObject.setDefaultCursor('grab');
    });

    if (config.devMode) {
        console.log('game', game);
        console.log('mapObject', mapObject);
        console.log('inputObject', inputObject);

        $('canvas').after('<p>x : <span id="coord-x">' + mapObject.x + '</span><br />y : <span id="coord-y">' + mapObject.y + '</span><br />width scene : <span>' + config.width + '</span><br />height scene : <span>' + config.height + '</span><br />width map : <span>' + mapObject.width + '</span><br />height map : <span>' + mapObject.height + '</span></p><p><button id="refresh">refresh</button></p>');
        $('#refresh').on('click', function(){
            location.reload();
        });
    }
}

function update () {

}
