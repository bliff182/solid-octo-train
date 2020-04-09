$(document).ready(function () {
  // VARIABLE DECLARATION
  // ===================================================================

  const characters = {
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
  let attacker;
  // Populated with all the characters the player didn't select
  const combatants = [];
  // Will be populated when the player chooses an opponent
  let defender;
  // Will keep track of turns during combat. Used for calculating player damage
  let turnCounter = 1;
  // Tracks number of defeated opponents
  let killCount = 0;

  // FUNCTIONS
  // ===================================================================

  // Function to render character cards to page
  // Character rendered, area rendered to, and their statys is determined by the arguments passed in
  const renderCharacter = (character, renderArea) => {
    // This block of code builds the character card and renders it to the page
    const charDiv = $(`<div class='character' data-name='${character.name}'>`);
    const charName = $("<div class='character-name'>").text(character.name);
    const charImage = $("<img alt='image' class='character-image'>").attr(
      "src",
      character.imageUrl
    );
    const charHealth = $("<div class='character-health'>").text(
      character.health
    );
    charDiv.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(charDiv);
  };

  // This function will load all the characters into the character section to be selected
  const initializeGame = () => {
    // Loop through the characters object and call the renderCharacter function on each character to render their card
    for (let key in characters) {
      renderCharacter(characters[key], "#characters-section");
    }
  };

  initializeGame();

  // This function handles updating the selected player or the current defender
  // If there is no selected player / defender this function will also place the character based on the areaRender chosen (e.g. #selected-character or #defender)
  const updateCharacter = (charObj, areaRender) => {
    // First, we empty the area so that we can re-render the new object
    $(areaRender).empty();
    renderCharacter(charObj, areaRender);
  };

  // This function will render the available-to-attack enemies
  // This should be run once after a character has been selected
  const renderEnemies = (enemyArr) => {
    for (let i = 0; i < enemyArr.length; i++) {
      renderCharacter(enemyArr[i], "#available-to-attack-section");
    }
  };

  // Function to handle rendering game messages
  const renderMessage = (message) => {
    // Builds the message and appends it to the page
    const gameMessageSet = $("#game-message");
    const newMessage = $("<div>").text(message);
    gameMessageSet.append(newMessage);
  };

  // Function to handle restarting the game after victory or defeat
  const restartGame = (resultMessage) => {
    // When the Restart button is clicked, reload the page
    const restart = $("<button>Restart</button>").click(function () {
      location.reload();
    });

    // Build div that will display the victory/defeat message
    const gameState = $("<div>").text(resultMessage);

    // Render the restart button and victory/defeat message to the page
    $("body").append(gameState);
    $("body").append(restart);
  };

  // Function to clear the game message section
  const clearMessage = () => {
    const gameMessage = $("#game-message");
    gameMessage.text("");
  };

  // ===================================================================

  // On click event for selecting our character
  $("#characters-section").on("click", ".character", function () {
    // Saving the clicked character's name
    const name = $(this).attr("data-name");

    // If a player character has not yet been chosen...
    if (!attacker) {
      // We populate attacker with the seclected character's information
      attacker = characters[name];
      // We then loop through the remaining characters and push them to the combatants array
      for (let key in characters) {
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

  // Creates an onClick event for each enemy
  $("#available-to-attack-section").on("click", ".character", function () {
    // Saving the opponent's name
    const name = $(this).attr("data-name");

    // If there is no defender, the clicked enemy will become the defender
    if ($("#defender").children().length === 0) {
      defender = characters[name];
      updateCharacter(defender, "#defender");

      // Remove element as it will now be a new defender
      $(this).remove();
      clearMessage();
    }
  });

  // When you click the attack button, run the following game logic...
  $("#attack-button").on("click", function () {
    // If there is a defender, combar will occur
    if ($("#defender").children().length !== 0) {
      // Creates messages for our attack and our opponents counter attack
      const attackMessage = `You attacked ${defender.name} for ${
        attacker.attack * turnCounter
      } damage!`;
      const counterAttackMessage = `${defender.name} attacked you back for ${defender.enemyAttackBack} damage!`;
      clearMessage();

      // Reduce defender's health by your attack value
      defender.health -= attacker.attack * turnCounter;

      // If the enemy still has health...
      if (defender.health > 0) {
        // Render the enemy's updated character card
        updateCharacter(defender, "#defender");

        // Render the combat messages
        renderMessage(attackMessage);
        renderMessage(counterAttackMessage);

        // Reduce your health by the opponent's attack value
        attacker.health -= defender.enemyAttackBack;

        // Render the player's updated character card
        updateCharacter(attacker, "#selected-character");

        // If you have less than zero health, game ends
        // Call the restartGame function to allow the user to restart the game and play again
        if (attacker.health <= 0) {
          clearMessage();
          restartGame("You SUCK!!! GAME OVER!!!!");
          $("#attack-button").off("click");
        }
      } else {
        // If the enemy has less than zero health, they're defeated
        // Remove your opponent's character card
        $("#defender").empty();

        const gameStateMessage = `You have defeated ${defender.name}, you can choose to fight another enemy.`;
        renderMessage(gameStateMessage);

        // Increment your kill count
        killCount++;

        // If you have killed all of your opponents, you win!
        // Call the restartGame function to allow the user to restart the game and play again
        if (killCount >= combatants.length) {
          clearMessage();
          $("#attack-button").off("click");
          restartGame("You won! Good job!!!");
        }
      }
      // Increment turn counter
      // This is used for determing how much damage the player does
      turnCounter++;
    } else {
      // If there is no defender, render an error message
      clearMessage();
      renderMessage("No enemy here.");
    }
  });
});
