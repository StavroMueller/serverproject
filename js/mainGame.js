mapgame.game = { player:{}, mechanics:{}, };

(function () {
    function random(number) {
      return Math.floor((Math.random()*number) + 1);
    }

    mapgame.game.init = function() {
        // init stuff goes here
        // Crafty.init(stuff);
        mapgame.game.player = new mapgame.game.Ship(10,10,1);
    };

    mapgame.game.mechanics.moveForward = function() {
      // Here will go the stuff that happens when the player wants to 
      // continue on down the line.
      if(debug) {
        console.log(mapgame.game.player.inventory.food);
        mapgame.game.changeFoodAmount("add", random(10));
      }


      // Determine random combat chance

      // Determine whether or not the destination is reached

    }

    mapgame.game.Ship = function (hp, pp, location) {
       this.maxhp = hp;
       this.hp = hp;

       // for 'people power'
       this.maxpp = pp;
       this.pp = pp;

       this.location = location; 

       var type = "temp";

       this.pictureUrl = "../static/images/classes" + type + ".png";

       // Here will go the crew array.
       // TODO: Make this an array of objects to hold images and 
       // such. OR you can make em players! wow!
       this.crew = [];

       this.crew[0] = true // Captain
       this.crew[1] = true // First mate. How appropriate, they've zero-indexed sailing hierarchy!
       this.crew[2] = true // Crow's nest guy - used for buffer

       this.inventory = {
        food: 10,
        drink: 10,

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
        // something tells me this logic is a bit convoluted
        if (addOrSubtract == "add" || addOrSubtract != "sub") {
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
          mapgame.game.player.inventory.food++;
        }
      }
    };

})()