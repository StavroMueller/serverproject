mapgame.game = {};

(function () {
    mapgame.game.init = function() {
        // init stuff goes here
    };

    mapgame.game.player = function (hp, sp, location) {
       this.hp = hp;

       this.sp = sp;

       this.location = location; 

    };

    var player = new mapgame.game.player(10,10,1);

    console.log(player.hp);



})()