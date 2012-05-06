mapgame.game = { player:{}, mechanics:{}, monsters:[], };


(function () {
    function random(number) {
      return Math.floor((Math.random()*number) + 1);
    }

    mapgame.game.init = function() {
        // init stuff goes here
        // Crafty.init(stuff);
        mapgame.game.currentPoint = 0;
        mapgame.game.player = new mapgame.game.Ship(10,10,10,10,100, 1);

        mapgame.game.monsters.push(new mapgame.game.Monster("Terrifying sea snake" ,10,3,5));
        mapgame.game.monsters.push(new mapgame.game.Monster("Something else", 10, 5, 5));
        mapgame.game.monsters.push(new mapgame.game.Monster("Aaand something else", 10, 5, 5));

        showIntro();
        updateInfoPane();
        if (debug) {
          // createBattlePage(1);
          createStorePage();
        }
    };

    // I'm thinking this function will go away in lieu of explicitly declared functions,
    // for history's sake.
    function eventHappens() {
      return random(10) < 7 ? true : false;
    }

    function combatHappens() {
      return random(10) < 7 ? true : false;
    }

    function updateInfoPane() {
      dojo.byId("infopane").innerHTML = "HP: " + mapgame.game.player.hp + "  " +
                                        "PP: " + mapgame.game.player.pp + "  " +
                                        "Food: " + mapgame.game.player.inventory.food + "  " +
                                        "Drink: " + mapgame.game.player.inventory.drink + "  " +
                                        "Money: " + mapgame.game.player.money;
    }

    function showIntro() {

      message("Your name is Hammond Cortez de Leon jr. You've just been hired to work on at ship!" +
              "You get ready for the journey. When you are ready to go, click \"Go Forward\"." )

    }

    function moneyCheck() {
      // This checks to see if you still have money
    }

    function createStorePage() {
      message("Hey, you should probably stock up before leaving.")
      buttonBox = document.getElementById("buttonbox");

      var jerkyButton = document.createElement("input");
      jerkyButton.setAttribute("type", "button");
      jerkyButton.setAttribute("class", "storeButton");
      jerkyButton.setAttribute("value", "Buy you some beef jerky.");
      jerkyButton.setAttribute("onclick", "mapgame.game.changeFoodAmount(\"add\", 1, 1)");

      var doneButton = document.createElement("input");
      doneButton.setAttribute("type", "button");
      doneButton.setAttribute("class", "storeButton");
      doneButton.setAttribute("value", "Done");
      doneButton.setAttribute("onclick", "mapgame.game.storeDone()");

      buttonBox.appendChild(jerkyButton);
      buttonBox.appendChild(doneButton);
    }

    mapgame.game.storeDone = function () {
      clearDiv("buttonbox");
    }

    function createBattlePage(monsterNumber) {
      // Don't need these anymore - using a seperate div for the buttons. 
      /*
      messageBox = document.getElementById("messagebox");
      mapgame.game.previousMessage = messageBox.innerHTML;
      */

      buttonBox = document.getElementById("buttonbox");

      var hitButton = document.createElement("input");
      hitButton.setAttribute("type", "button");
      hitButton.setAttribute("class", "battleButton");
      hitButton.setAttribute("value", "Hit The " + mapgame.game.monsters[1].desc + " Monster!");
      hitButton.setAttribute("onclick", "mapgame.game.hitMonster(" + monsterNumber + ")")

      var runButton = document.createElement("input");
      runButton.setAttribute("type", "button");
      runButton.setAttribute("class", "battleButton");
      runButton.setAttribute("value", "Try to run away");
      runButton.setAttribute("onclick", "mapgame.game.runAway(" + monsterNumber + ")")

      buttonBox.appendChild(hitButton);

    }

    mapgame.game.hitMonster = function(monsterNumber) {

      //Here is the code for hitting the monster

    }
   

    function clearDiv(element) { //Huh huh.

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

      mapgame.map.drawPointOnMap(mapgame.game.currentPoint);
      // mapgame.map.centerMapOnPoint(mapgame.game.currentPoint,   0.00000005);
      mapgame.game.currentPoint++;
      if(debug) {
        log(mapgame.game.player.inventory.food);
        mapgame.game.changeFoodAmount("add", random(10));
      }


      updateInfoPane();
      if (combatHappens()){
        enterCombat(random(3)); // The random determines the monster in the function
      }
      /*
      else if (eventHappens()) {
        enterEvent(random(5));  // The random determines the event in the function
      }
      */


      //center the map at the new location using centerat

      // Determine random combat chance - if combat, mayber center and zoom to make more exciting

      // Determine whether or not the destination is reached

    }

    function addItem (item, cost) {

    }

    function enterCombat(monster) {

        createBattlePage(monster)

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
    mapgame.game.changeFoodAmount = function (addOrSubtract, amount, cost) {
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
      if(cost) {
        mapgame.game.player.money -= cost;
      }
      updateInfoPane();
    };

    mapgame.game.changeDrinkAmount = function (addOrSubtract, amount) {
      if (addOrSubtract) {
        // something tells me this logic is a bit convoluted
        if (addOrSubtract == "add" || addOrSubtract != "sub") {
          if (amount) {
            mapgame.game.player.inventory.drink = amount;
          }
          else {
            mapgame.game.player.inventory.drink++;
          }
        }
        else if (addOrSubtract == "sub") {
          if (amount) {
            mapgame.game.player.inventory.drink += amount;
          }
          else {
            mapgame.game.player.inventory.drink--;
          }
        }
      }
      else {
        if(amount) {
          mapgame.game.player.inventory.drink += amount;
        }
        else {
          mapgame.game.player.inventory.drink++;
        }
      }
      if (cost) {
        mapgame.game.player.money -= cost;
      }
      updateInfoPane();
    };
})()