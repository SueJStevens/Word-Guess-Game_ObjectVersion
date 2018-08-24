# Word-Guess-Game Object Version PsuedoCode

## Object: Game
## Properties of Game
* Category: Animals, Weather, ...etc
* Words: Terripin, Crow, Bear, etc.
* Computer Pick: Changes with method
* Right Guesses: changes with method
* Wrong Guesses: changes with method
* Remaining Guesses: changes with method
* Wins: changes with method
* Losses: changes with method

## Methods
* Get random word
* Change Display
* Reset Game
* Mask Word
* Evaluate Keypress

## Events
* Start or Restart Game
* Keypress

Populate Computer Pick happens when Pick a Random Word is call
* Mask Display of Random Word happens with 

## Start The Game
*Note: The functions needed to start the game can be reused to reset the game after the word has been guessed or the user has used up all guesses.*
* Choose a random word
  * Random word comes from array of words
  * Pick one of the words in the array using random math functions

## Play The Game
* Capture user keystroke
* Test capture
  * Ignore anything except letters and ignore duplicate entries.  *Note: there should be a variable that contains the list of user entries.  It will be empty at the start of the game*
  * Test keystroke against the random word
  * Branch into a right choice / wrong choice
    * Wrong Choice
      * Display User Choice with format of comma in between letters
      * Decrease guesses left by one
      * Test to see if there are any gusses left 
        * If End of Game
          * Increment Losses Counter by 1
          * Reset Game
    * Right Choice
      * Update Random Word Display
      * Display to User
      * Test to see End of Game because word complete
        * If End of Game 
          * Increment Wins Counter by 1
          * Reset Game
          