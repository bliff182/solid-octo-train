// $(document).ready(function() {

// // GLOBAL VARIABLES AND ARRAYS
// // =======================================================

//     // character variables
//     var characters = {
//         luke: {
//             health: 100,
//             attack: 10,
//             counter: 5
//         },
//         obiWan : {
//             health: 100,
//             attack: 10,
//             counter: 5
//         },
//         vader: {
//             health: 150,
//             attack: 6,
//             counter: 20
//         },
//         darthMaul: {
//             health: 180,
//             attack: 4,
//             counter: 25
//         }
//     };
//     var characterChoice;
//     var attacker;
//     var enemyChoice;
//     var defender;

//     // Game counters
//     var wins = 0;
//     var losses = 0;

//     // Booleans
//     var isCharacterChosen = false;
//     var isEnemyChosen = false;

// // FUNCTIONS
// // =======================================================

//     // Choose character
//     function chooseCharacter () {
//         isCharacterChosen = true;
//         $(".character-div").attr("health", this.health).attr("attack", this.attack).attr("counter", this.counter);
//     }

// // MAIN PROCESS
// // =======================================================

//     $(".character-div").on("click", function(){
//         if (!isCharacterChosen) {
//             $(".character-div").attr()
//         }
//     })

// });

// Execute this code when the DOM has fully loaded
$(document).ready(function () {
  // VARIABLE DECLARATION
  // ===================================================================

  // Hold all characters in an object
  var characters = {
    "Obi-Wan Kenobi": {
      name: "Obi-Wan Kenobi",
      health: 120,
      attack: 8,
      imageUrl: "assets/images/obi-wan.jpg",
      enemyAttackBack: 15,
    },
    "Luke Skywalker": {
      name: "Luke Skywalker",
      health: 100,
      attack: 14,
      imageUrl: "assets/images/luke-skywalker.jpg",
      enemyAttackBack: 5,
    },
    "Emperor Palpatine": {
      name: "Emperor Palpatine",
      health: 150,
      attack: 8,
      imageUrl: "assets/images/darth-sidious.png",
      enemyAttackBack: 20,
    },
    "Darth Maul": {
      name: "Darth Maul",
      health: 180,
      attack: 7,
      imageUrl: "assets/images/darth-maul.jpg",
      enemyAttackBack: 25,
    },
  };

  // Will be populated when the player selects a character
  var attacker;
  // Populated with all the characters the player didn't select
  var combatants = [];
  // Will be populated when the player chooses an opponent
  var defender;
  // Will keep track of turns during combat. Used for calculating player damage
  var turnCounter = 1;
  // Tracks number of defeated opponents
  var killCount = 0;

  // FUNCTIONS
  // ===================================================================

  // Function to render character cards to page
  // Character rendered, area rendered to, and their statys is determined by the arguments passed in
  var renderCharacter = function (character, renderArea) {
    // This block of code builds the character card and renders it to the page
    var charDiv = $(`<div class=character' data-name='${character.name}'>`);
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $('<img alt="image" class="character-image">').attr(
      "src",
      character.imageUrl
    );
    var charHealth = $('<div class="character-health">').text(character.health);
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
  };

  // This function will load all the characters into the character section to be selected
  var initializeGame = function () {
    // Loop through the characters object and call the renderCharacter function on each character to render their card
    for (var key in characters) {
      renderCharacter(characters[key], "#characters-section");
    }
  };

  initializeGame();

  // This function handles updating the selected player or the current defender
  // If there is no selected player / defender this function will also place the character based on the areaRender chosen (e.g. #selected-character or #defender)
  var updateCharacter = function (charObj, areaRender) {
    // First, we empty the area so that we can re-render the new object
    $(areaRender).empty();
    renderCharacter(charObj, areaRender);
  };

  // This function will render the available-to-attack enemies
  // This should be run once after a character has been selected
  var renderEnemies = function (enemyArr) {
    for (var i = 0; i < enemyArr.length; i++) {
      renderCharacter(enemyArr[i], "#available-to-attack-section");
    }
  };

  // Function to handle rendering game messages
  var renderMessage = function (message) {
    // Builds the message and appends it to the page
    var gameMessageSet = $("#game-message");
    var newMessage = $("<div>").text(message);
    gameMessageSet.append(newMessage);
  };

  // Function to handle restarting the game after victory or defeat
  var restartGame = function (resultMessage) {
    // When the Restart button is clicked, reload the page
    var restart = $("<button>Restart</button>").click(function () {
      location.reload();
    });

    // Build div that will display the victory/defeat message
    var gameState = $("<div>").text(resultMessage);

    // Render the restart button and victory/defeat message to the page
    $("body").append(gameState);
    $("body").append(restart);
  };

  // Function to clear the game message section
  var clearMessage = function () {
    var gameMessage = $("#game-message");
    gameMessage.text("");
  };

  // ===================================================================

  // On click event for selecting our character
  $("#characters-section").on("click", ".character", function () {
    // Saving the clicked character's name
    var name = $(this).attr("data-name");

    // If a player character has not yet been chosen...
    if (!attacker) {
      // We populate attacker with the seclected character's information
      attacker = characters[name];
      // We then loop through the remaining characters and push them to the combatants array
      for (var key in characters) {
        if (key !== name) {
          combatants.push(characters[key]);
        }
      }

      // Hide the character select div
      $("#characters-section").hide();

      // Then render our selected character and our combatants
      updateCharacter(attacker, "#selected-character");
      renderEnemies(combatants);
    }
  });
});
