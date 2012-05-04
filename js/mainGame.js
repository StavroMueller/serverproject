mapgame.game = { player:{}, };

(function () {
    mapgame.game.init = function() {
        // init stuff goes here
        // Crafty.init(stuff);
    };

    mapgame.game.Actor = function (hp, pp, location) {
       this.maxhp = hp;
       this.hp = hp;

       // for 'people power'
       this.maxpp = pp;
       this.pp = pp;

       this.location = location; 

       var type = "temp";

       this.pictureUrl = "../static/images/classes" + type + ".png";

       this.inventory = {
        food: 10,
        drink: 10,

       };

       this.move = function () {
       };

    };

    function messageBoxChange(message) {
      if(!message) {
        // clear the box
        // innerHTML
        document.getElemenyByID("messagebox").value = '';
      }
      else
      {
        // put the message in the box
        // innerHTML
        document.getElementByID("messagebox").value = message;
      }
    }

    // TODO: This could be abstracted down a bit. Also, I feel like it could be done a lot better.
    // This is set up so that if it is called without arguments, it will just
    // add one to the amount of food the player has. I've set them up so that the 
    // code will be self-documenting, I guess. in other words, you will see
    // magame.game.changeFoodAmount("add", 10); I dunno if this is the right practice or not,
    // but whatever, I do what I want!
    mapgame.game.changeFoodAmount = function (addOrSubtract, amount) {
      if (addOrSubtract) {
        if (addOrSubtract == "add") {
          if (amount) {
            mapgame.game.player.inventory.food += amount;
          }
          else {
            mapgame.game.player.inventory.food++;
          }
        }
        else if (addOrSubtract == "sub") {
          if (amount) {
            mapgame.game.player.inventory.food += amount;
          }
          else {
            mapgame.game.player.inventory.food--;
          }
        }
      }
      else {
        if(amount) {
          mapgame.game.player.inventory.food += amount;
        }
        else {
          mapgame.game.plaeyr.inventory.food++;
        }
      }
    };

    // Here is where the main loop of the game will go - I'm thinking of a tick that increases each time, 
    // with 

    mapgame.game.player = new mapgame.game.Actor(10,10,1);

    console.log(mapgame.game.player.hp);



})()