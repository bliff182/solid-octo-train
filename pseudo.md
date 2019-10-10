1. Player is presented with four characters to choose from.
2. For each character, create variables to store the following:
    * Total health - HP
    * Attack power - AP
    * Counter power - CP
3. The player CLICKS a character to fight with for the rest of the game.
4. The remaining characters become enemies for the player to fight. 
    * They are moved to the Enemies area
5. The player CLICKS an enemy to fight
    * The enemy is moved to the Defender area
6. The player CLICKS the Attack button
    * The enemy takes damage
        - The player-character's AP is subtracted from the enemy's HP
    * The enemy immediately counters
        - The enemy's CP is subtracted from the player-character's HP
    * The player-character's AP is increased after each attack
        - The increase is equal to the original AP, ex. starting AP = 6, it will increase to 12, then 18 etc.
7. IF the enemy's HP is 0 or less:
    * Enemy is defeated
    * They are removed from the game
    * The player is informed they have defeated the enemy and to select the next enemy
8. The player CLICKS the next enemy to fight
9. The fight process repeats.
    * The player's AP continues increasing exponentially
10. IF all enemies are defeated: 
    * Player is informed that they have won the game
    * Game ends
11. ELSE IF the player-character's HP is 0 or less:
    * Player is informed that they have been defeated
    * Game ends
12. IF player CLICKS the Restart button
    * All variables reset to original values
    * All characters return to their original positions

