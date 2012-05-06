mapgame.game = { player:{}, mechanics:{}, monsters:[], };


(function () {
    function random(number) {
      return Math.floor((Math.random()*number) + 1);
    }

    mapgame.game.init = function() {
        // init stuff goes here
        // Crafty.init(stuff);
        mapgame.game.player = new mapgame.game.Ship(10,10,10,10,100, 1);

        mapgame.game.monsters.push(new mapgame.game.Monster("Terrifying sea snake" ,10,3,5));
        mapgame.game.monsters.push(new mapgame.game.Monster("Something else", 10, 5, 5));
        mapgame.game.monsters.push(new mapgame.game.Monster("Aaand something else", 10, 5, 5));

        message("Successful initialization");
        updateInfoPane();
        if (debug) {
          createBattlePage(1);
        }
    };

    function eventHappens() {
      return random(10) < 7 ? true : false;
    }

    function combatHappens() {
      return random(10) < 4 ? true : false;
    }

    function updateInfoPane() {
      dojo.byId("infopane").innerHTML = "HP: " + mapgame.game.player.hp + "<br />" +
                                        "PP: " + mapgame.game.player.pp + "<br />" +
                                        "Food: " + mapgame.game.player.inventory.food + "<br />" +
                                        "Drink: " + mapgame.game.player.inventory.drink + "<br />";
    }

    function createBattlePage(monsterNumber) {
      messageBox = document.getElementById("messagebox");
      mapgame.game.previousMessage = messageBox.innerHTML;

      var hitButton = document.createElement("input");
      hitButton.setAttribute("type", "button");
      hitButton.setAttribute("id", "battleButton");
      hitButton.setAttribute("value", "Hit The " + mapgame.game.monsters[1].desc + " Monster!");

      log(messageBox.childNodes);

      messageBox.appendChild(hitButton);

    }

    function hitMonster(monster) {
      //Here is the code for hitting the monster
    }

    function getRidOfChildren(element) { //Huh huh.

      // This does what it needs; howver, just in case I don't want to use dojo, I'll leave the function.
      dojo.empty(element);

    }

    // Clears the message box if no argument there. 
    function message(message, elementID) {
      if (!message) {
        message = '';
      }
      if (elementID) {
        dojo.byId(elementID).innerHTML = message;
      }
      else {
        dojo.byId("messagebox").innerHTML = message;
      }
    }

    mapgame.game.mechanics.moveForward = function() {
      // Here will go the stuff that happens when the player wants to 
      // continue on down the line.
      mapgame.map.drawPointOnMap(0);
      if(debug) {
        log(mapgame.game.player.inventory.food);
        mapgame.game.changeFoodAmount("add", random(10));
      }

      updateInfoPane();
      if (combatHappens()){
        enterCombat(random(3)); // The random determines the monster in the function
      }
      else if (eventHappens()) {
        enterEvent(random(5));  // The random determines the event in the function
      }


      //center the map at the new location using centerat

      // Determine random combat chance - if combat, mayber center and zoom to make more exciting

      // Determine whether or not the destination is reached

    }

    mapgame.game.mechanics.addItem = function (item, cost) {

    }

    function enterCombat(monster) {

      /*
      switch (monster) {
        case 1: 
      }
      */
    }

    // Why no id to use to identify the monster? At this point, the place in the main array is the unique identifier.
    mapgame.game.Monster = function (desc, hp, baseDamage, chanceToHit) {
      this.desc = desc;
      this.hp = hp
      this.baseDamage = baseDamage;
      this.chanceToHit = chanceToHit;
    }

    mapgame.game.Ship = function (hp, pp, money, baseDamage, chanceToHit, location) {
       this.maxhp = hp;
       this.hp = hp;
       // for 'people power'
       this.maxpp = pp;
       this.pp = pp;
       this.money = money;
       this.baseDamage = baseDamage;

       this.chanceToHit = chanceToHit;

       this.location = location; 

       this.pictureUrl = "../static/images/classes/whatevergoeshere.png";

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