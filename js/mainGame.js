mapgame.game = { player:{}, mechanics:{}, monsters:[], };


(function () {
    mapgame.game.random = function(number, zeroIndexed) {
      return zeroIndexed ? Math.floor(Math.random()*number) : Math.floor((Math.random()*number) + 1);
    }

    mapgame.game.init = function() {
        // init stuff goes here
        // Crafty.init(stuff);
        clearDiv();
        mapgame.game.currentPoint = 0;
        mapgame.game.combatFlag = false;
        mapgame.game.player = new mapgame.game.Ship(10,10,10,1,5, 1);

        mapgame.game.monsters.push(new mapgame.game.Monster("Terrifying sea snake" ,3,1,6, {
                                                            hit: [ "The snake takes a bite",
                                                                   "The snake hisses. You get scared and fall over.",
                                                                 ],
                                                            miss:[ "The snake tried to bite, but misses",
                                                                   "The snake tries to but, but slips, because snakes are slimy."
                                                                 ],
                                                            }));
        mapgame.game.monsters.push(new mapgame.game.Monster("Incrediby adorable seahorse", 5, 2, 8, {
                                                            hit: [ "It looks at you adorably. You think it deserves a chance, so you hit yourself.",
                                                                   "The something else does something else."
                                                                 ],
                                                            miss:[ "It misses."
                                                                 ],
                                                            }));
        mapgame.game.monsters.push(new mapgame.game.Monster("Giant Enemy Crab", 6, 3, 9, {
                                                            hit: [ "The giant enemy crab snips off a part of your ear.",
                                                                 ],
                                                            miss:[ "The crab tries to snip you, but it doesn't for some reason."
                                                                 ],
                                                            }));

        showIntro();
        updateInfoPane();
        if (debug) {
          // createBattlePage(1);
          // createStorePage();
        }
    };

    // I'm thinking this function will go away in lieu of explicitly declared functions,
    // for history's sake.
    function eventHappens() {
      return mapgame.game.random(10) < 7 ? true : false;
    }

    function combatHappens() {
      return mapgame.game.random(10) < 7 ? true : false;
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
              "You get ready for the journey. When you are ready to go, click \"I'm ready!\"." );

      //var 

    }

    function haveEnoughMoney(amountToCheckFor) {
      // This checks to see if you still have money
      if(amountToCheckFor) {
        return mapgame.game.player.money < amountToCheckFor ? false : true;
      }
      return mapgame.game.player.money <= 0 ? false : true;
    }

    function hpCheck() {
      // This checks if you are still alive.

      return mapgame.game.player.hp <= 0 ? false : true;

    }

    function createStorePage() {
      message("Hey, you should probably stock up before leaving.")
      buttonBox = document.getElementById("buttonbox");

      var jerkyButton = document.createElement("input");
      jerkyButton.setAttribute("type", "button");
      jerkyButton.setAttribute("class", "storeButton");
      jerkyButton.setAttribute("value", "Buy you some beef jerky.");
      jerkyButton.setAttribute("onclick", "mapgame.game.changeFoodAmount(\"add\", 1, 1)");

      var waterButton = document.createElement("input");
      waterButton.setAttribute("type", "button");
      waterButton.setAttribute("class", "storeButton");
      waterButton.setAttribute("value", "Get some water.");
      waterButton.setAttribute("onclick", "mapgame.game.changeDrinkAmount(\"add\", 1, 1)");

      var doneButton = document.createElement("input");
      doneButton.setAttribute("type", "button");
      doneButton.setAttribute("class", "storeButton");
      doneButton.setAttribute("value", "Done");
      doneButton.setAttribute("onclick", "mapgame.game.storeDone()");

      buttonBox.appendChild(waterButton);
      buttonBox.appendChild(jerkyButton);
      buttonBox.appendChild(doneButton);
    }

    mapgame.game.initMainImage = function() {

      mapgame.game.mainImage = document.createElement("img");
      mapgame.game.mainImage.setAttribute("src", "someimage");

    }

    function changeMainImage(url) {
      mapgame.game.mainImage.setAttribute("src", url);
    }

    mapgame.game.storeDone = function () {
      message();
      clearDiv("buttonbox");
    }

    function createBattlePage(monsterNumber) {
      // Don't need these anymore - using a seperate div for the buttons. 
      /*
      messageBox = document.getElementById("messagebox");
      mapgame.game.previousMessage = messageBox.innerHTML;
      */
      message("Uh oh! You've encountered a " + mapgame.game.monsters[monsterNumber].desc + "! Quick, hit it with something!");

      buttonBox = document.getElementById("buttonbox");

      var hitButton = document.createElement("input");
      hitButton.setAttribute("type", "button");
      hitButton.setAttribute("class", "battleButton");
      hitButton.setAttribute("value", "Hit The " + mapgame.game.monsters[monsterNumber].desc + " Monster!");
      hitButton.setAttribute("onclick", "mapgame.game.hitMonster(" + monsterNumber + ")")

      var runButton = document.createElement("input");
      runButton.setAttribute("type", "button");
      runButton.setAttribute("class", "battleButton");
      runButton.setAttribute("value", "Try to run away");
      runButton.setAttribute("onclick", "mapgame.game.runAway(" + monsterNumber + ")")

      buttonBox.appendChild(hitButton);
      buttonBox.appendChild(runButton);

    }

    mapgame.game.runAway = function(monsterNumber) {

      // This will determine a chace to run away

    }


    function playerTurn() {

      if (mapgame.game.random(10, false) <= mapgame.game.player.chanceToHit) { //Player hits

        var playerDamage = mapgame.game.player.baseDamage + mapgame.game.random(2); //from 0 to 2

      }
      else {
        var playerDamage = false;
      }

      return playerDamage;
    }

    mapgame.game.hitMonster = function(monsterNumber) {
      var playerDamage = playerTurn()
      if(playerDamage) { 
        mapgame.game.monsters[monsterNumber].damageMe(playerDamage)
      }
      // damage the monster here
      // now it's the monster's turn
      var monsterDamage = monsterTurn(monsterNumber);
      // damage the player here
      if(monsterDamage) {
        mapgame.game.player.damageMe(monsterDamage);
      }

      // message out the entire thing right here
      updateInfoPane();
    }

    function monsterTurn(monsterNumber) {
      if(mapgame.game.random(10) <= mapgame.game.monsters[monsterNumber].chanceToHit) { // Monster hits
        var monsterDamage = mapgame.game.monsters[monsterNumber].baseDamage;
      }
      else {
        var monsterDamage = false; // monster misses
      }

    }

    function gameoverman() {
      mapgame.map.esriMap.destroy();
      // message game over here and start over
    }
   

    function clearDiv(element) { //Huh huh.

      // This does what it needs; howver, just in case I don't want to use dojo, I'll leave the function.
      if(element) {
        dojo.empty(element);
      }
      else {
        dojo.empty("messagebox");
      }

    }

    function clearUI() {
      clearDiv("infopane");
      clearDiv("buttonbox");
    }

    // Clears the message box if no argument there. 
    function message(message) {
      var messageArea = document.getElementById("messagebox");
      if (!message) {
        message = document.createTextNode('');
      }

      var lineBreak = document.createElement("br");
      var messageText = document.createTextNode(message);

      messageArea.appendChild(lineBreak);
      messageArea.appendChild(messageText);

    }

    mapgame.game.mechanics.moveForward = function() {
      // This clears all of the graphics currently drawn on the map.
      clearDiv();
      mapgame.map.esriMap.graphics.clear();
      // Here will go the stuff that happens when the player wants to 
      // continue on down the line.

      mapgame.map.drawShipOnMap(); // uses mapgame.game.currentPoint
      // mapgame.map.centerMapOnPoint(mapgame.game.currentPoint,   0.00000005);
      if(debug) {
        // log(mapgame.game.player.inventory.food);
        // mapgame.game.changeFoodAmount("add", random(10));
      }


      updateInfoPane();
      if (combatHappens()){
        enterCombat(mapgame.game.random(mapgame.game.monsters.length, true)); // The random determines the monster in the function
      }
      else {
        message("You move on down the line.");
      }
      /*
      else if (eventHappens()) {
        enterEvent(random(5));  // The random determines the event in the function
      }
      */


      //center the map at the new location using centerat

      // Determine random combat chance - if combat, mayber center and zoom to make more exciting

      // Determine whether or not the destination is reached

      mapgame.game.currentPoint++;
    }

    function addItem (item, cost) {

    }

    function damagePlayer(amount) {
      mapgame.game.player.hp -= amount;

      if (mapgame.game.player.hp <= 0) {
        if (mapgame.game.random(10, false) <= 3) {
        }
        else
        {
          if(!debug) {
            gameoverman();
          }
        }
      }
    }


    function enterCombat(monster) {
        createBattlePage(monster);
        mapgame.map.drawMonsterOnMap(monster);
        mapgame.combatFlag = true;
        while (mapgame.game.combatFlag) {

          // Dunno yet

        }         

    }

    // Why no id to use to identify the monster? At this point, the place in the main array is the unique identifier.
    mapgame.game.Monster = function (desc, hp, baseDamage, chanceToHit, messages) {
      this.desc = desc;
      this.maxhp = hp;
      this.hp = hp;
      this.baseDamage = baseDamage;
      this.chanceToHit = chanceToHit;
      this.messages = messages;
      this.damageMe = function(amount) {
      }
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

       this.damageMe = function(amount) {
        mapgame.game.player.hp -= amount;

        if (mapgame.game.player.hp <= 0) {
          if (mapgame.game.random(10, false) <= 3) {
            message("You suddenly feel better.");
            mapgame.game.player.hp = 5 + mapgame.game.random(2); // You were saved!
          }
          else
          {
            gameoverman();
          }
        }   
      };
    };

    // TODO: This could be abstracted down a bit. Also, I feel like it could be done a lot better.
    // This is set up so that if it is called without arguments, it will just
    // add one to the amount of food the player has. I've set them up so that the 
    // code will be self-documenting, I guess. in other words, you will see
    // magame.game.changeFoodAmount("add", 10); I dunno if this is the right practice or not,
    // but whatever, I do what I want!
    mapgame.game.changeFoodAmount = function (addOrSubtract, amount, cost) {
      if(cost) {
        if(haveEnoughMoney(amount)) {
          mapgame.game.player.money -= cost;
        }
        else {
          message("Hey bub. You're broke.");
          return;
        }
      }
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
      updateInfoPane();
    };

    mapgame.game.changeDrinkAmount = function (addOrSubtract, amount, cost) {
      if(cost) {
        if(haveEnoughMoney(amount)) {
          mapgame.game.player.money -= cost;
        }
        else {
          message("Hey bub. You're broke.");
          return;
        }
      }
      if (addOrSubtract) {
        // something tells me this logic is a bit convoluted
        if (addOrSubtract == "add" || addOrSubtract != "sub") {
          if (amount) {
            mapgame.game.player.inventory.drink += amount;
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
      updateInfoPane();
    };
})()