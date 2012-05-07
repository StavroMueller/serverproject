mapgame.game = { storyEvent:{}, player:{}, mechanics:{}, monsters:[], ui:{}, };


(function () {
    mapgame.game.random = function(number, zeroIndexed) {
      return zeroIndexed ? Math.floor(Math.random()*number) : Math.floor((Math.random()*number) + 1);
    }

    mapgame.game.init = function() {
        // init stuff goes here
        // Crafty.init(stuff);
        mapgame.game.ui.clearUI();
        mapgame.game.currentPoint = 0;
        mapgame.game.combatFlag = false;
        mapgame.game.monsterMessages = 2; // Number of each messages the monsters has, for focus.
        mapgame.game.lastMonster = null; // The last monster you interacted with
        mapgame.game.ui.initMainImage();
        mapgame.game.storyPoint = 0;
        mapgame.game.monstersKilled = 0; // For leveling up?
        mapgame.game.player = new mapgame.game.Ship(20,10,10,1,5, 1);

        // See? Snake!
        mapgame.game.monsters.push(new mapgame.game.Monster("Terrifying sea snake" ,7,1,6,null, {
                                                            hit: [ "The snake takes a bite",
                                                                   "The snake hisses. You get scared and fall over."
                                                                 ],
                                                            miss:[ "The snake tried to bite, but misses",
                                                                   "The snake tries to bite, but slips, because snakes are slimy."
                                                                 ],
                                                            }));
        mapgame.game.monsters.push(new mapgame.game.Monster("Incrediby adorable seahorse", 10, 2, 8, null, {
                                                            hit: [ "It looks at you adorably. You think it deserves a chance, so you hit yourself.",
                                                                   "You find a nearby sea saw and give it a whack."
                                                                 ],
                                                            miss:[ "It misses.",
                                                                   "It rears back to attack, but then stops because it's a male and has to take care of babies. What a tool."
                                                                 ],
                                                            }));
        mapgame.game.monsters.push(new mapgame.game.Monster("Giant Enemy Crab", 15, 3, 9, null, {
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
      return mapgame.game.random(10) < 6 ? true : false;
    }

    function updateInfoPane() {
      // This should turn red when low. But that's a moderate rewrite that I don't quite have time for right now.
      dojo.byId("infopane").innerHTML = "HP: " + mapgame.game.player.hp + "  " +
                                        "PP: " + mapgame.game.player.pp + "  " +
                                        "Food: " + mapgame.game.player.inventory.food + "  " +
                                        "Drink: " + mapgame.game.player.inventory.drink + "  " +
                                        "Money: " + mapgame.game.player.money;
      if (mapgame.game.player.hp <= 10) {
        dojo.byId("infopane").setAttribute("style", "background-color:red");
      }
      else if (mapgame.game.player.hp <= 15) {
        dojo.byId("infopane").setAttribute("style", "background-color:yellow");
      }
      else {
        dojo.byId("infopane").removeAttribute("style");
      }
    }

    function haveEnoughMoney(amountToCheckFor) {
      // This checks to see if you still have money
      if(amountToCheckFor) {
        return mapgame.game.player.money < amountToCheckFor ? false : true;
      }
      return mapgame.game.player.money <= 0 ? false : true;
    }

    function gameWin() {

      // Stuff that happens when you win the game.

    }

    // This returns a bool to tell whether or not to enter combat on this turn.
    // I made this because I didn't want to make another whole object for these.
    // Yeah, I know...messy.
    function createStoryPointPage(id) {
      mapgame.game.ui.clearUI();
      switch(id) {
        case 0: firstEncounter();
                return false;
                break;
        case 3: secondEncounter();
                return false;
                break;
        case 7: thirdEncounter();
                return false;
                break;
        case 8: fourthEncounter();
                return false;
                break;
        case 9: fifthEncounter();
                return false;
                break;
        case 13: sixthEncounter();
                 return false;
                 break;
        case 15: seventhEncounter();
                 return false;
                 break;
        case 17: eighthEncounter();
                 return false;
                 break;
        case 26: ninthEncounter();
                 return false;
                 break;
        case 28: tenthEncounter();
                 return false;
                 break;
        default:return true;
      }
    }

    // All of these stupid functions could be better organised as arrays of objects, I think.
    // Oh well, I'll do that later.

    function firstEncounter() {

      //change the scene image here
      drawSceneImage(0);
      message("An interesting occurance", "titlebox");
      message("Your name is Hernano Combino de Johnson Jr. You are walking along one day in Palos, Spain when " +
              "along comes a guy looking worried. You ask him, \"Hey bub, what's eating you?\"");
      message("\"I'm short one crew member! I need someone to take his spot! Will you?");
      message("Being of a nomadic nature, but mostly because you are low on money, you accept his offer and " +
              "join his expedition.");
      addButton("storyButton", "accept", "mapgame.game.buttonDispacher(1,true)");
      addButton("storyButton", "deny", "mapgame.game.buttonDispacher(1,false)");

    }

    function firstResults(accept) {
      if(accept) {
        //get goin on the main game
        drawSceneImage(1);
        mapgame.game.ui.clearUI();
        message(" \"Excellent! Here, have a weird hat! We are leaving tommorow, but " + // WHOA SUSPENSE

                "you should probably go get some shopping done while we're in port.\""); //phew
        message("Oh, and by the way, my name is Christopher Columbus.");
        message("You wonder why he is speaking in english. Also, why you are thinking in english. Oh well, " +
                "time to get shopping!");
        addButton("storyButton", "Let's go!", "mapgame.game.buttonDispacher(\"store\")");
      }
      else {
        gameoverman("Really? Okay, in that case: You tell Columbus no, and contiunue on to live a fairly mediocre " +
                    "life with a wife and 2.4 kids. Your heritage spreads through the generations as people who are " +
                    "known for being no-good lowlifes until one of your distant kin makes the ultimate mistake by clicking " +
                    "the \"Deny\" button on an online mapping game and thus being relegated to the life of a complete loser." +
                    " Ha! Bet you didn't see that one coming.");
      }
    }

    function secondEncounter() {
      drawSceneImage(2);
      message("Phew, that was fun! Can we go back now?", "titlebox");
      message("Your first port of call is at the Canary islands!");
      addButton("storyButton", "Awesome.", "mapgame.game.buttonDispacher(2)");
      // Also, this disabled mockery should be replaced with a nice toggle function.
      mapgame.game.goOnButton.disabled = true;
    }

    function secondResults() {
      mapgame.game.ui.clearUI();
      mapgame.game.goOnButton.disabled = false;
      message("Righto. We'll be on our way.");
    }

    function thirdEncounter() {
      drawSceneImage(3);
      message("Gettin' lonely out here...", "titlebox");
      message("You've been sailing for a while, and you start to doubt the ship is " +
              "going in the right direction. You aren't alone, too. The rest of the crew strikes " +
              "a deal with Captain Columbus: If land isn't sighted within the next three days, " +
              "you will head back to Spain.");
      addButton("storyButton", "Sounds Ominous!", "mapgame.game.buttonDispacher(3)");
      mapgame.game.goOnButton.disabled = true;
      // This is where the morale goes down in october
    }

    function thirdResults() {
      mapgame.game.ui.clearUI();
      mapgame.game.goOnButton.disabled = false;
      message("You continue on, secretly doubting your captain, and wanting to head home.");
    }

    function fourthEncounter () {
      // This is where land is sighted
      drawSceneImage(4);
      message("Excuse me? Land what?", "titlebox");
      message("Land ho! Rodrigo de Triana, on the Pinta, has sighted land! And just in time, too, almost two days " +
              "after we started doubing that you'd ever find it!");
      addButton("storyButton", "Woohoo!", "mapgame.game.buttonDispacher(4)");
      mapgame.game.goOnButton.disabled = true;
    }

    function fourthResults() {
      mapgame.game.ui.clearUI();
      message("You can't wait to get your feet on land.");
      mapgame.game.goOnButton.disabled = false;
    }

    function fifthEncounter() {
      // This is where port is called in 
      drawSceneImage(5);
      message("Portin' it up, yo.", "titlebox");
      message("You land, finally, on an island called Guanahani. That's what the natives call it, anyway. " +
              "It's a pretty stupid name, and they're natives anyway - what do they know? Columbus decides " +
              "to call this place San Salvador.");
      addButton("storyButton", "Fair Enough", "mapgame.game.buttonDispacher(5)");
      mapgame.game.goOnButton.disabled = true;
    }

    function fifthResults() {
      mapgame.game.ui.clearUI();
      mapgame.game.goOnButton.disabled = false;
      message("You have a generally good time with the natives, trading and conversing. Oh, and you don't " +
              "know your way around here, so you kidnap a few, just to show you around.");
    }

    function sixthEncounter() {
      // Landing in cuba
      drawSceneImage(6);
      message("Cubatime!", "titlebox");
      mapgame.game.goOnButton.disabled = true;
      message("You land in Bariay Bay, Cuba. Here you spend weeks with Columbus, searching for a lost" +
              " civilization mentioned by Marco Polo. Oh, and searching for gold. Really, just hope you find some gold.");
      addButton("storyButton", "Have fun", "mapgame.game.buttonDispacher(6)");
    }

    function sixthResults () {
      // Maybe add some stuff to inventory here.
      mapgame.game.ui.clearUI();
      mapgame.game.goOnButton.disabled = false;
      var moneyAmount = random(20);
      message("You get going, pocketing " + moneyAmount +"gold for yourself. Unfortunately, a day later, the Santa Maria grounds on a reef! Columbus, being the " +
              "resourceful explorer he is, builds a fort on the shore with the remains. Too bad for those guys, though - " +
              "your boat, the Nina, is too small to hold them all. You leave 40 people behind to await your return from Spain. Yeah. right.");
    }

    function seventhEncounter() {
      // losing the pinta
      drawSceneImage(7);
      message("Hang on a sec...", "titlebox");
      mapgame.game.goOnButton.disabled = true;
      message("Whoa, hold the phone - er, letter - where in god's flat earth did the Pinta go? You could've sworn it was sailing right by you.");
      addButton("storyButton", "Ay dios mio", "mapgame.game.buttonDispacher(7)");
    }

    function seventhResults() {
      mapgame.game.ui.clearUI();
      mapgame.game.goOnButton.disabled = false
      message("You keep going, wondering what happened to the Pinta.");
    }

    function eighthEncounter() {
      // meet up with pinta, happy have another ship
      drawSceneImage(8);
      message("There it is!", "titlebox");
      mapgame.game.goOnButton.disabled = true;
      message("Holy crap! There's the Pinta! Turns out Martin Alonzo Pinzon, the captain, decided to go explore on his own. That rebel! Seems like" +
              " he wanted to explore the island \"Babeque\", where he had heard there was a lot of gold. What a rascal. " + 
              "Columbus is mad, but not too much - now you have an extra ship to pick up those sailors left on the shore!");
      addButton("storyButton", "Go get 'em", "mapgame.game.buttonDispacher(8)");
    }

    function eighthResults() {
      mapgame.game.ui.clearUI();
      mapgame.game.goOnButton.disabled = false;
      message("You pick up the sailors, and head on back to Spain, departing from Samana Bay.");
      // depart back to spain
    }

    function ninthEncounter() {
      //make port in lisbon, argue with mayor
      drawSceneImage(9);
      message("Back on our side of the pond!");
      mapgame.game.goOnButton.disabled = true;
      message("Finally! You reach port in Lisbon, Portugal. ");
    }

    function ninthResults() {
    }

    function tenthEncounter() {
      //back home, win the game
      drawSceneImage(10);
    } 

    function tenthResults() {
    }

    function addButton(cssClass, value, onclick) {
      var buttonPlace = document.getElementById("buttonbox");
      var newButton = document.createElement("input");
      newButton.setAttribute("type", "button");
      newButton.setAttribute("class", cssClass);
      newButton.setAttribute("value", value);
      newButton.setAttribute("onclick", onclick);

      buttonPlace.appendChild(newButton);
    }


    function createStorePage() {
      mapgame.game.ui.clearUI();
      message("The store!", "titlebox");
      message("Welcome to \"The Store\"! All we have right now is food and water, and the food doesn't do anything right now." +
              " The water will heal you! You should probably spend all your money on that.");

      addButton("storeButton", "Buy you some jerky.(1 money)", "mapgame.game.changeFoodAmount(\"add\", 1, 1)");

      addButton("storeButton", "Get some water.(1 money)", "mapgame.game.changeDrinkAmount(\"add\",1,1)");

      addButton("storeButton", "Done!", "mapgame.game.storeDone();");
    }

    mapgame.game.ui.initMainImage = function() {

      mapgame.game.ui.mainImage = document.getElementById("bigimage");
      mapgame.game.ui.mainImage.setAttribute("src", "static/images/bigImages/placeholderImage2.png");

    };

    function drawOceanImage() {

    }

    function drawSceneImage(scene) {
      mapgame.game.ui.mainImage.setAttribute("src", "static/images/bigImages/scenes/" + scene + ".png");
    }

    function drawMonsterImage(id) {
      mapgame.game.ui.mainImage.setAttribute("src", "static/images/bigImages/monsters/" + id + ".png");
    }

    function addStoreButton() { 
      mapgame.game.goOnButton = document.createElement("input");
      mapgame.game.goOnButton.setAttribute("type", "button");
      mapgame.game.goOnButton.setAttribute("value", "Onward!");
      mapgame.game.goOnButton.setAttribute("id", "goOnButton");
      mapgame.game.goOnButton.setAttribute("onclick", "mapgame.game.mechanics.moveForward()");
      document.getElementById("informationContainer").appendChild(mapgame.game.goOnButton);
    }

    var makeStoreButton = _.once(addStoreButton);

    mapgame.game.storeDone = function () {

      makeStoreButton();
      mapgame.game.ui.clearMessages();
      mapgame.game.ui.clearButtons();
      mapgame.game.currentPoint = 1;
    };

    function createBattlePage(monsterNumber) {
      // Maybe calculate the distance here?
      drawMonsterImage(monsterNumber);
      updateInfoPane();
      mapgame.game.ui.clearTitle();
      mapgame.game.ui.clearMessages();
      message(mapgame.game.monsters[monsterNumber].desc, "titlebox");
      message("Uh oh! You've encountered a " + mapgame.game.monsters[monsterNumber].desc + "! Quick, hit it with something!");

      addButton("battleButton", "Hit The " + mapgame.game.monsters[monsterNumber].desc + " Monster!", "mapgame.game.hitMonster(" + monsterNumber + ")");

      addButton("battleButton", "Take a drink", "mapgame.game.takeDrink(" + monsterNumber + ")");

      addButton("battleButton", "Try to run away", "mapgame.game.runAway(" + monsterNumber + ")");


    }

    mapgame.game.takeDrink = function (monsterNumber) {
      mapgame.game.ui.clearMessages();
      message("You take a drink. Refreshing!");
      mapgame.game.changeDrinkAmount("sub");
      mapgame.game.player.hp += 2 + mapgame.game.random(3);
      var monsterDamage = monsterTurn(monsterNumber);
        // damage the player here
      if(monsterDamage) {
       mapgame.game.player.damageMe(monsterDamage);
       message( mapgame.game.monsters[monsterNumber].messages.hit[mapgame.game.random(mapgame.game.monsterMessages, true)]);
      }
      else {
        message(mapgame.game.monsters[monsterNumber].messages.miss[mapgame.game.random(mapgame.game.monsterMessages, true)]);
      }

      updateInfoPane();
    }

    mapgame.game.runAway = function(monsterNumber) {

      if (mapgame.game.player.chanceToHit < mapgame.game.random(10)) {
        mapgame.game.combatFlag = false;
        exitCombat(true);
      }
      else {
        mapgame.game.ui.clearMessages();
        message("You try to run away, but you don't make it.");
        var monsterDamage = monsterTurn(monsterNumber);
          // damage the player here
        if(monsterDamage) {
         mapgame.game.player.damageMe(monsterDamage);
         message( mapgame.game.monsters[monsterNumber].messages.hit[mapgame.game.random(mapgame.game.monsterMessages, true)]);
        }
        else {
          message(mapgame.game.monsters[monsterNumber].messages.miss[mapgame.game.random(mapgame.game.monsterMessages, true)]);
        }

        updateInfoPane();
      }

      // This will determine a chace to run away

    };


    function playerTurn() {

      if (mapgame.game.random(10, false) <= mapgame.game.player.chanceToHit) { //Player hits

        var playerDamage = mapgame.game.player.baseDamage + mapgame.game.random(5); //from 0 to 2

      }
      else {
        var playerDamage = false;
      }

      return playerDamage;
    }

    // This is used for all the choice events - I can get away with just bool because there will always 
    // be just an accept / deny choice, I think. 
    // We (er, I mean, I) can also take advantage of dynamic typing here, and pass in either a number
    // or a string to tell where to go. Yeah, I know, I could just use an incredibly high number...but the 
    // problem there is shut up.
    mapgame.game.buttonDispacher = function(buttonID, bool) {
      switch(buttonID) {
        case 1: firstResults(bool);
                break; 
        case 2: secondResults();
                break;
        case 3: thirdResults();
                break;
        case 4: fourthResults();
                break;
        case 5: fifthResults();
                break;
        case 6: sixthResults();
                break;
        case 7: seventhResults();
                break;
        case 8: eighthResults();
                break;
        case 9: ninthResults();
                break;
        case 10:tenthResults();
                break;
        case "store": createStorePage();
                break;
      }

    }

    mapgame.game.hitMonster = function(monsterNumber) {
      if(mapgame.game.combatFlag) {
        mapgame.game.ui.clearMessages();
        var playerDamage = playerTurn();
        if(playerDamage) { 
          // Damage the monster
          mapgame.game.monsters[monsterNumber].damageMe(playerDamage, monsterNumber);
          message("You hit the " + mapgame.game.monsters[monsterNumber].desc + " for " + playerDamage + " damage!");
          if (playerDamage > 7) {
            message("Whoa! Critical hit!");
          }
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

    function gameoverman(gameOverMessage) {
      mapgame.map.esriMap.destroy();
      mapgame.game.ui.clearUI();
      //set the background url of the map to something
      if(mapgame.game.goOnButton) {
        mapgame.game.goOnButton.disabled = true;
        mapgame.game.goOnButton.setAttribute("value", "You can't go on, BECAUSE YOU'RE DEAD!");
      }
      if(gameOverMessage) {
        message(gameOverMessage);// message message message
      }
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
      mapgame.game.ui.clearTitle();
      mapgame.game.ui.clearMessages();
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
      if (element == "titlebox") {
        // for positioning reasons
        document.getElementById(element).innerHTML = message;
        return;
      }
      else {
        var messageArea = document.getElementById(element);
        if (!message) {
          message = document.createTextNode('');
        }

        var lineBreak = document.createElement("br");
        var messageText = document.createTextNode(message);

        messageArea.appendChild(lineBreak);
        messageArea.appendChild(messageText);
      }

    }

    mapgame.game.mechanics.moveForward = function() {
      // This clears all of the graphics currently drawn on the map.
      message("The open ocean", "titlebox");
      drawSceneImage("atsea");
      var combat = true;
      mapgame.game.ui.clearUI();
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
      log(mapgame.game.stopPoints[mapgame.game.currentPoint].event);

      if(mapgame.game.stopPoints[mapgame.game.currentPoint].event == "true") {
        createStoryPointPage(mapgame.game.stopPoints[mapgame.game.currentPoint].id);
        combat = false;
      }
      log(combat);
      if (combatHappens() && combat){
        mapgame.game.combatFlag = true;
        if(!debug) {
          mapgame.game.goOnButton.disabled = true;
        }
        enterCombat(mapgame.game.random(mapgame.game.monsters.length, true)); // The random determines the monster in the function
      }
      else if (!combat) {
        // Do nothing! 
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

    function exitCombat(ranAway) {
      mapgame.game.goOnButton.disabled = false;
      mapgame.game.monstersKilled++;
      mapgame.game.ui.clearMessages();
      mapgame.game.ui.clearTitle();
      mapgame.game.ui.clearButtons();
      message("The open ocean", "titlebox");
      if (ranAway) {
        message("You run away. Go you! Coward.");
      }
      else {
        var moneyAmount = mapgame.game.random(5);
        mapgame.game.player.money += moneyAmount;
        message("You defeat the " + mapgame.game.lastMonster + "! You find " + moneyAmount + " coins lying around on the corpse. I mean, " +
                "not actually lying - it's called personification.");
        if (mapgame.game.monstersKilled == 2) {
          message("You feel slightly stronger! You begin to flex, but 'ol sailor John winks at you. You stop.");
          mapgame.game.player.baseDamage++;
          mapgame.game.player.chanceToHit++;
        }
        if (mapgame.game.monstersKilled == 4) {
          message("You get stronger still! All this killing is freakin' awesome.");
          mapgame.game.player.baseDamage++;
          mapgame.game.player.chanceToHit++;
        }

      }
      updateInfoPane();
    }

    // Why no id to use to identify the monster? At this point, the place in the main array is the unique identifier.
    mapgame.game.Monster = function (desc, hp, baseDamage, chanceToHit, distance, messages) {
      this.desc = desc;
      this.maxhp = hp;
      this.hp = hp;
      this.baseDamage = baseDamage;
      this.chanceToHit = chanceToHit;
      this.distance = distance;
      this.messages = messages;
      this.damageMe = function(amount, id) {

        mapgame.game.monsters[id].hp -= amount;

        if(mapgame.game.monsters[id].hp <= 0) {
          mapgame.game.combatFlag = false;
          mapgame.game.monsters[id].hp = mapgame.game.monsters[id].maxhp;
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
        mapgame.game.player.hp -= amount;

        if (mapgame.game.player.hp <= 0) {
          if (mapgame.game.random(10, false) <= 3) {
            message("You feel an angellic presence");
            message("You suddenly feel better.");
            mapgame.game.player.hp = 5 + mapgame.game.random(2); // You were saved!
          }
          else
          {
            gameoverman("You were killed by " + mapgame.game.lastMonster + ".");
            return;
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
    mapgame.game.changeFoodAmount = function(addOrSubtract, amount, cost) {
      // This will use the glbal story point variable.
      if(cost) {
        if(haveEnoughMoney(amount)) {
          mapgame.game.player.money -= cost;
        }
        else {
          mapgame.game.clearMessages();
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