"use strict";
/*Functions that are likely to be reused in many different applications*/

//function for random computer choice
function getRandomInt(seed) {
    return Math.floor(Math.random() * Math.floor(seed));
  }

function changeDisplay(strElementID, displayValue) {
    document.getElementById(strElementID).textContent = displayValue;
}




/*Functions specific to this application*/

//variables
var initial_guessesLeft = 9;
var initial_guesses = "";
var winCounter = 0; //never gets reset back to zero
var lossCounter = 0; //never gets reset back to zero
var guessesLeft = initial_guessesLeft;
var computerPick = " ";
var userChoices = initial_guesses;
var userChoice = "";

var animals = ['terrapin','bear','dire wolf','china cat','bird song', 'carrion crow'];
var wordBlank = "";
var rightChoices = "";

//call reset function

function resetGame() {

    //reset both display and internal variables
    changeDisplay("guessesLeft", initial_guessesLeft);
    changeDisplay("wrongGuesses", initial_guesses);

    //reset guessesLeft and guesses
    guessesLeft = initial_guessesLeft;
    userChoices = initial_guesses; 
    
    //Computer Picks Random Letter and changes display
    computerPick = animals[getRandomInt(animals.length)];
    changeDisplay("computerPick", computerPick);
    
    //length of word computer picked
    
    //console.log(computerPick.length);
    stringMask(computerPick);
    changeDisplay("wordBlanks", wordBlank);

}

function stringMask(str, str2='') {
    //build display string

    //initialize variable because if you don't reset wordBlank it will repeat in the display
    wordBlank="";
    for (var i=0; i<str.length; i++) {

        //spaces in word phrases are displayes as spaces.  Letters are displyed as underscores
        if (str.charAt(i) === " ") {
            wordBlank = wordBlank + '\xa0\xa0'; // /xa0 is js shorthand for a nonbreaking space.  ie &nbsp;

            //else test to see if the user's choices so far are in the computer pick
        } else if (str2.indexOf(str.charAt(i)) >= 0) {
            wordBlank = wordBlank +  '\xa0' + str.charAt(i);
            
        } else {
            wordBlank = wordBlank + " _";
        }
    }
    //remove the first character as it is a blank space
    wordBlank = wordBlank.substring(1);
    return wordBlank;

}


//Start the game
resetGame();

//Capture user keystroke & display
document.onkeyup = function(event) {
    //capture userChoice
    userChoice = event.key;
    userChoice = userChoice.toLowerCase();
    
    //*Ignore anything except letters and ignore duplicate choices*//
    if (userChoice.length === 1 
            && userChoice >= "a" 
            && userChoice <= "z" 
            && userChoices.indexOf(userChoice) < 0) {
        //valid entry

            //is the choice right or wrong
            //indexOf will return a -1 if the letter doesn't exist in the random word
            if (computerPick.indexOf(userChoice) < 0) {

                //deal with comma 
                if (userChoices === "") {
                    userChoices = userChoice;   
                } else {
                    userChoices = userChoices + ", " + userChoice;
                }

                //decrease guesses left
                guessesLeft = guessesLeft - 1;
                changeDisplay("guessesLeft", guessesLeft);

                //test to see if game over
                if (guessesLeft === 0) {

                    //increment losses
                    lossCounter = lossCounter + 1;
                    changeDisplay("lossCounter", lossCounter);
                    resetGame()
                }
                
                //display user choices as wrong guesses
                changeDisplay("wrongGuesses", userChoices);
                //changeDisplay("userChoice", userChoice);

            } else {
                //display the user choices as right guesses in the random word display
                rightChoices = rightChoices + userChoice;
                //reformatting the mask to include the right letters entered
                changeDisplay("wordBlanks", stringMask(computerPick, rightChoices))

                //test to see if win;  a win has no more underscores in the mask.
                if (wordBlank.indexOf("_") < 0) {
                    //increment wins, change display & reset game
                    winCounter = winCounter + 1;
                    changeDisplay("winCounter", winCounter)
                    resetGame();
                }

            }

        }

} //close onkeyup function
