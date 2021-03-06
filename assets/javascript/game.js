"use strict";
var game = {
    name: 'wordGuessGame',
    categories: 'animals',
    words: ['terrapin','bear','dire wolf','china cat','bird song', 'carrion crow',"monkey"],
    titles: ['_ _ _ _ _ _ _ _ Station','Katie Mae','Dire Wolf','China Cat Sunflower','Bird Song', 'Mountains of the Moon', "Monkey and The Engineer"],
    audiotitles: [
        'assets/audio/gd977611d1_06_Terrapin_Station_Medley-__Part_1-_Lady_with_a_Fan_Terrapin_Station_Terrapin_Terrapin_Transit_At_A_Dising_Terrapin_Flyer__Refrain.mp3'
        ,'assets/audio/gd440060d1_01_Katie_Mae.mp3'
        ,'assets/audio/gd977505d1_01_Dire_Wolf.mp3'
        ,'assets/audio/gd150705d1_01_China_Cat_Sunflower.mp3'
        ,'assets/audio/gd977505d1_15_Bird_Song.mp3'
        ,'assets/audio/gd690426d1_02_Mountains_Of_The_Moon.mp3'
        ,'assets/audio/gd977505d1_28_Monkey_And_The_Engineer.mp3'
    ],
    mp3titles: '',
    //Katie Mae is the 1st track on side 1 of the album History of the Grateful Dead, Volume One (Bear's Choice)
    initialComputerPick: '_ _ _ _ _ _ _ _ _ ',
    computerPick: '',
    computerPick_i: '',
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
        //get index of computer pick so the index can also be used elsewhere in game
        game.computerPick_i = Math.floor(Math.random() * game.words.length);
        game.computerPick = game.words[game.computerPick_i];
        game.titlePick = game.titles[game.computerPick_i];
        game.mp3titles = game.audiotitles[game.computerPick_i];
        //console.log(game.mp3titles);
               
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

    //Note:  Not using this yet -- considering how to use as a function efficiently rather than just swapping one line of code for a different line of code elsewhere
    changeDisplay: function(elementId, elementVal){
        document.getElementById(elementID).textContent = elementVal;
    },

    //Note:  Not using this yet -- it wont work!!!
    audio: function(elementVal) {
        //document.getElementById("audioPick").src = game.elementVal;

    },

    resetGame: function() {
            document.getElementById("lastWord").textContent = game.computerPick;
            document.getElementById("guessesLeft").textContent = game.initialGuesses;
            
            game.guesses =  '';
            game.rightGuesses =  '';
            game.wrongGuesses= '';
            game.arrWrong = []; //empty array
            game.remainingGuesses = game.initialGuesses;
            document.getElementById("wrongGuesses").textContent = game.wrongGuesses;
            document.getElementById("wordBlanks").textContent = game.initialComputerPick;
            game.randomWord();    
            document.getElementById("audioPick").src = game.mp3titles;            
    },

} //close object

//function for random computer choice
//game.computerPick = game.words[Math.floor(Math.random() * Math.floor(game.words.length))],
//game.randomWord();

window.onload = function(){
    game.randomWord();
    console.log(game.mp3titles);
    document.getElementById("audioPick").src = game.mp3titles;
}


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
            

            //Update the display (note: consider if this can be in a function)

            document.getElementById("computerPick").textContent = game.computerPick;
            document.getElementById("songTitle").textContent = game.titlePick;
            document.getElementById("wordBlanks").textContent = game.wordBlank;
            document.getElementById("wrongGuesses").textContent = game.wrongGuesses;
            document.getElementById("emoji").textContent = game.emoji;
            document.getElementById("emoji1").textContent = game.emoji1;
            document.getElementById("guessesLeft").textContent = game.remainingGuesses;


        //is the game over?
        //test to see if win;  a win has no more underscores in the mask.
        if (game.wordBlank.indexOf("_") < 0) {
            //game over - win
            game.wins = game.wins + 1;
    //      game.changeDisplay("winCounter", game.wins);
            document.getElementById("winCounter").textContent = game.wins;
            game.resetGame();
        } else if (game.remainingGuesses === 0) {
            game.losses = game.losses + 1;
    //        game.changeDisplay("lossCounter", game.losses);
            document.getElementById("lossCounter").textContent = game.losses;
            game.resetGame();
        } //end win/loss test

    }//close ingore bad typing

}

  