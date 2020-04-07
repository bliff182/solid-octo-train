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
});
