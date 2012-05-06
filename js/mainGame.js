mapgame.game = { player:{}, mechanics:{}, monsters:[], ui:{}, };


(function () {
    mapgame.game.random = function(number, zeroIndexed) {
      return zeroIndexed ? Math.floor(Math.random()*number) : Math.floor((Math.random()*number) + 1);
    }

    mapgame.game.init = function() {
        // init stuff goes here
        // Crafty.init(stuff);
        mapgame.game.ui.clearMessages();
        mapgame.game.currentPoint = 0;
        mapgame.game.combatFlag = false;
        mapgame.game.monsterMessages = 2; // Number of each messages the monsters has, for focus.
        mapgame.game.lastMonster = null; // The last monster you interacted with
        mapgame.game.ui.initMainImage();
        mapgame.game.storyPoint = 0;
        mapgame.game.player = new mapgame.game.Ship(20,10,10,1,5, 1);

        mapgame.game.monsters.push(new mapgame.game.Monster("Terrifying sea snake" ,3,1,6, {
                                                            hit: [ "The snake takes a bite",
                                                                   "The snake hisses. You get scared and fall over."
                                                                 ],
                                                            miss:[ "The snake tried to bite, but misses",
                                                                   "The snake tries to bite, but slips, because snakes are slimy."
                                                                 ],
                                                            }));
        mapgame.game.monsters.push(new mapgame.game.Monster("Incrediby adorable seahorse", 5, 2, 8, {
                                                            hit: [ "It looks at you adorably. You think it deserves a chance, so you hit yourself.",
                                                                   "The something else does something else."
                                                                 ],
                                                            miss:[ "It misses.",
                                                                   "Wooo another message about missing"
                                                                 ],
                                                            }));
        mapgame.game.monsters.push(new mapgame.game.Monster("Giant Enemy Crab", 6, 3, 9, {
                                                            hit: [ "The giant enemy crab snips off a part of your ear.",
                                                                   "The giant crab does something to hurt you."
                                                                 ],
                                                            miss:[ "The crab tries to snip you, but it doesn't for some reason.",
                                                                   "The crab misses"
                                                                 ],
                                                            }));

        createStoryPointPage(mapgame.game.storyPoint);
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

    function haveEnoughMoney(amountToCheckFor) {
      // This checks to see if you still have money
      if(amountToCheckFor) {
        return mapgame.game.player.money < amountToCheckFor ? false : true;
      }
      return mapgame.game.player.money <= 0 ? false : true;
    }

    function createStoryPointPage() {
      // This will use the glbal story point variable.
      mapgame.game.ui.clearTitle();
      mapgame.game.ui.clearMessages();
      mapgame.game.ui.clearButtons();
      buttonBox = document.getElementById("buttonbox");
      switch(mapgame.game.storyPoint) {
        case 0: message("This is the first encounter");
                message("Your...first...encounter!", "titlebox");
                // change the scene image here too
                break;
        case 1: message("Ths is the second encoiunter");
                message("secondthyme", "titlebox");
                break;
      }
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

    mapgame.game.ui.initMainImage = function() {

      mapgame.game.ui.mainImage = document.getElementById("bigimage");
      mapgame.game.ui.mainImage.setAttribute("src", "static/images/bigImages/placeholderImage.png");

    };

    function drawSceneImage(scene) {
      mapgame.game.ui.mainImage.setAttribute("src", "static/images/bigImages/scenes/" + scene + ".png");
    }

    function drawMonsterImage(id) {
      mapgame.game.ui.mainImage.setAttribute("src", "static/images/bigImages/monsters/" + id + ".png");
    }

    mapgame.game.storeDone = function () {
      mapgame.game.ui.clearMessages();
      mapgame.game.ui.clearButtons();
    };

    function createBattlePage(monsterNumber) {
      // Don't need these anymore - using a seperate div for the buttons. 
      /*
      messageBox = document.getElementById("messagebox");
      mapgame.game.previousMessage = messageBox.innerHTML;
      */
      mapgame.game.ui.clearTitle();
      mapgame.game.ui.clearMessages();
      message(mapgame.game.monsters[monsterNumber].desc, "titlebox");
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
      if(mapgame.game.combatFlag) {
        mapgame.game.ui.clearMessages();
        var playerDamage = playerTurn();
        if(playerDamage) { 
          // Damage the monster
          mapgame.game.monsters[monsterNumber].damageMe(playerDamage, monsterNumber);
          message("You hit the " + mapgame.game.monsters[monsterNumber].desc + " for " + playerDamage + " damage!");
        }
        else {
          message("You miss it.");
        }
        // now it's the monster's turn
        var monsterDamage = monsterTurn(monsterNumber);
        // damage the player here
        if(monsterDamage) {
          mapgame.game.player.damageMe(monsterDamage);
          message( mapgame.game.monsters[monsterNumber].messages.hit[mapgame.game.random(mapgame.game.monsterMessages, true)]);
        }
        else {
          message(mapgame.game.monsters[monsterNumber].messages.miss[mapgame.game.random(mapgame.game.monsterMessages, true)]);
        }

        // message out the entire thing right here
        updateInfoPane();
      }
      else {
        exitCombat();
      }
    }

    function monsterTurn(monsterNumber) {
      if(mapgame.game.random(10) <= mapgame.game.monsters[monsterNumber].chanceToHit) { // Monster hits
        var monsterDamage = mapgame.game.monsters[monsterNumber].baseDamage;

      }
      else {
        var monsterDamage = false; // monster misses
      }

      return monsterDamage;
    }

    function gameoverman() {
      mapgame.map.esriMap.destroy();
      // message game over here and start over
    }
   

    mapgame.game.ui.clearButtons = function() {
      clearDiv("buttonbox");
    };

    mapgame.game.ui.clearTitle = function() {
      clearDiv("titlebox");
    };

    mapgame.game.ui.clearMessages = function() {
      clearDiv("messagebox");
    };

    function clearDiv(element) { 

      // This does what it needs; howver, just in case I don't want to use dojo, I'll leave the function.
      if(element) {
        dojo.empty(element);
      }
      else {
        dojo.empty("messagebox");
      }

    }

    mapgame.game.ui.clearUI = function() {
      mapgame.game.ui.clearInfoPane();
      mapgame.game.ui.clearButtons();
    };

    mapgame.game.ui.clearInfoPane = function() {
      clearDiv("infopane");
    };

    // Clears the message box if no argument there. 
    function message(message, element) {
      if(!element) {
        var element = "messagebox";
      }
      var messageArea = document.getElementById(element);
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
      mapgame.game.ui.clearMessages();
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
        mapgame.game.combatFlag = true;
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
        mapgame.game.lastMonster = mapgame.game.monsters[monster].desc;
        createBattlePage(monster);
        mapgame.map.drawMonsterOnMap(monster);
        mapgame.combatFlag = true;
    }

    function exitCombat() {
      mapgame.game.ui.clearMessages();
      mapgame.game.ui.clearTitle();
      mapgame.game.ui.clearButtons();
      message("The open ocean", "titlebox");
      message("You defeat the " + mapgame.game.lastMonster + "! You gather the spoils.");
      mapgame.game.player.money += mapgame.game.random(5);
      updateInfoPane();
    }

    // Why no id to use to identify the monster? At this point, the place in the main array is the unique identifier.
    mapgame.game.Monster = function (desc, hp, baseDamage, chanceToHit, messages) {
      this.desc = desc;
      this.maxhp = hp;
      this.hp = hp;
      this.baseDamage = baseDamage;
      this.chanceToHit = chanceToHit;
      this.messages = messages;
      this.damageMe = function(amount, id) {

        mapgame.game.monsters[id].hp -= amount;

        if(mapgame.game.monsters[id].hp <= 0) {
          mapgame.game.combatFlag = false;
        }
      };
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
        log(mapgame.game.player.hp);
        log(amount);
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