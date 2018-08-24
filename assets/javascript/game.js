"use strict";
var game = {
    name: 'wordGuessGame',
    categories: 'animals',
    words: ['terrapin','bear','dire wolf','china cat','bird song', 'carrion crow'],
    computerPick: '',
    wordBlank: '',
    guesses: '',
    rightGuesses: '',
    wrongGuesses: '',
    arrWrong: [], //empty array
    initialGuesses: 9,
    remainingGuesses: 9,
    wins: 0,
    losses: 0,

    randomWord: function() {
        game.computerPick = game.words[Math.floor(Math.random() * Math.floor(game.words.length))];
    },

    lettersGuessed: function(ltr) {
        if (game.guesses === "") {
            game.guesses = ltr;
        } else {
            game.guesses = game.guesses + ', ' + ltr;
        }
        
    },

    updateWordMask: function(str, str2='') {
        //str = the random word
        //str2 = all of the guesses

        //initialize variable because if you don't reset wordBlank it will repeat in the display
        game.wordBlank="";
        for (var i=0; i<str.length; i++) {
    
            //spaces in word phrases are displayes as spaces.  Letters are displyed as underscores
            if (str.charAt(i) === " ") {
                game.wordBlank = game.wordBlank + '\xa0\xa0'; // /xa0 is js shorthand for a nonbreaking space.  ie &nbsp;
    
                //else test to see if the user's choices so far are in the computer pick
            } else if (str2.indexOf(str.charAt(i)) >= 0) {
                game.wordBlank = game.wordBlank +  '\xa0' + str.charAt(i);
                
            } else {
                game.wordBlank = game.wordBlank + " _";
            }
        }
        //remove the first character as it is a blank space
        game.wordBlank = game.wordBlank.substring(1);
        return game.wordBlank;
    },

    buildWrongGuesses: function(str, str2) {
        //str = the random word
        //str2 = all of the guesses

        //initialize variable
        game.wrongGuesses = "";
        game.arrWrong = [];

        //turn guesses into an array
        var arrGuesses = str2.split(", ");

        //sort the array in alpha order for dispay purposes
        arrGuesses.sort();

        //run through the array of guesses to identify wrong guesses
        for (var i=0; i<arrGuesses.length; i++) {

            //if array of guesses is not in computer word then add it to wrong guesses string
            //also reduce # of remaining guesses
            if (str.indexOf(arrGuesses[i]) < 0) {
                game.wrongGuesses = game.wrongGuesses + ", " + arrGuesses[i];

                //build array of wrong guesses
                game.arrWrong.push(arrGuesses[i]);
            }
        }
        //remove the first character as it is a comma
        game.wrongGuesses = game.wrongGuesses.substring(1);
        return game.wrongGuesses;
    },

    calcRemainingGuesses: function() {
        //initial guesses is 9 and the array contains all the wrong guesses; so, math...(I didn't invent math!)
        game.remainingGuesses = game.initialGuesses - game.arrWrong.length;
    },

    resetGame: function() {
        /*NOTE DON'T FORGET TO RESET THE DISPLAY TOO!!*/

        //reset variables
            game.guesses =  '';
            game.rightGuesses =  '';
            game.wrongGuesses= '';
            game.arrWrong = []; //empty array
            game.remainingGuesses = game.initialGuesses;
            game.randomWord();
            game.updateWordMask(game.computerPick, game.guesses);
                
    }

} //close object

//function for random computer choice
game.computerPick = game.words[Math.floor(Math.random() * Math.floor(game.words.length))],
game.randomWord();
document.onkeyup = function(event) {
    //capture what the user typed and evluate it to elimate anything that isn't a valid letter
    var userChoice = event.key.toLowerCase();
    
    //*Ignore anything except letters and ignore duplicate choices*//
    if (userChoice.length === 1 
            && userChoice >= "a" 
            && userChoice <= "z" 
            && game.guesses.indexOf(userChoice) < 0) {

            game.lettersGuessed(userChoice);

            game.updateWordMask(game.computerPick, game.guesses);
            game.buildWrongGuesses(game.computerPick, game.guesses);
            game.calcRemainingGuesses();
            console.log('computerPick: '+ game.computerPick);
            //console.log('guesses: '+ game.guesses); //all guesses, right and wrong
            //console.log('wordBlank: '+ game.wordBlank);  //word mask showing right guesses
            //console.log('wrongGuesses: '+ game.wrongGuesses); //string of wrong guesses in alph order separated by a comma
            //console.log('remainingGuesses: '+ game.remainingGuesses); //Calc of remaining guesses

       
            
    }//close ingore bad typing

    //is the game over?
    //test to see if win;  a win has no more underscores in the mask.
    if (game.wordBlank.indexOf("_") < 0) {
         //game over - win
         game.wins = game.wins + 1;
         console.log("Win!!!!! " +  game.wins);
         game.resetGame();
    } else if (game.remainingGuesses === 0) {
        game.losses = game.losses + 1;
        console.log("Looser! " + game.losses);
        game.resetGame();
    } //end win/loss test

}

  