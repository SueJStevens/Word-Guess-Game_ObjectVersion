"use strict";
var game = {
    name: 'wordGuessGame',
    categories: 'animals',
    words: ['terrapin','bear','dire wolf','china cat','bird song', 'carrion crow'],
    initialComputerPick: '_ _ _ _ _ _ _ _ _ ',
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
    arrEmoji: ['\u0028', '\u00D7', '\u005F', '\u00D7', '\u003B', '\u0029', '\u23A7' + '\xa0', '\u23A7' + '\xa0'+ '\xa0' + '\u23AB','\xa0' + '\u23A7' + 'RIP' + '\u23AB' + '\xa0'],
    emoji: "",
    emoji1: "",

    randomWord: function() {
        //don't need to round this function again!
        //game.computerPick = game.words[Math.floor(Math.random() * Math.floor(game.words.length))];
        game.computerPick = game.words[Math.floor(Math.random() * game.words.length)];
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

    buildEmoji: function(int){
        game.emoji = "";
        game.emoji1 = "";

        //clear variables & display
        document.getElementById("emoji").textContent = game.emoji;
        document.getElementById("emoji1").textContent = game.emoji1;

        //run through the emoji array and build the emoji
        var g = game.initialGuesses - int;
        for (var i=0; i<g; i++){
            if (i<=5) {
                game.emoji = game.emoji + game.arrEmoji[i];
            } else {                
                game.emoji1 = game.arrEmoji[i];
            }
        }

        //Update the display
        document.getElementById("emoji").textContent = game.emoji;
        document.getElementById("emoji1").textContent = game.emoji1;
    },

    resetGame: function() {
        /*NOTE DON'T FORGET TO RESET THE DISPLAY TOO!!*/
            document.getElementById("lastWord").textContent = game.computerPick;
            document.getElementById("guessesLeft").textContent = game.initialGuesses;

        //reset variables
            game.guesses =  '';
            game.rightGuesses =  '';
            game.wrongGuesses= '';
            game.arrWrong = []; //empty array
            game.remainingGuesses = game.initialGuesses;
            document.getElementById("wrongGuesses").textContent = game.wrongGuesses;
            document.getElementById("wordBlanks").textContent = game.initialComputerPick;
            game.randomWord();                
    },

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
            game.buildEmoji(game.remainingGuesses);

            document.getElementById("computerPick").textContent = game.computerPick;
            document.getElementById("wordBlanks").textContent = game.wordBlank;
            document.getElementById("wrongGuesses").textContent = game.wrongGuesses;
            document.getElementById("emoji").textContent = game.emoji;
            document.getElementById("emoji1").textContent = game.emoji1;
            document.getElementById("guessesLeft").textContent = game.remainingGuesses;


       
            
    }//close ingore bad typing

    //is the game over?
    //test to see if win;  a win has no more underscores in the mask.
    if (game.wordBlank.indexOf("_") < 0) {
         //game over - win
         game.wins = game.wins + 1;
         //console.log("Win!!!!! " +  game.wins);
//         game.changeDisplay("winCounter", game.wins);
         document.getElementById("winCounter").textContent = game.wins;
         game.resetGame();
    } else if (game.remainingGuesses === 0) {
        game.losses = game.losses + 1;
        //console.log("Looser! " + game.losses);
//        game.changeDisplay("lossCounter", game.losses);
        document.getElementById("lossCounter").textContent = game.losses;
        game.resetGame();
    } //end win/loss test

}

  