var numOfPlayers = 0;
var currentPlayer = 1;
var tempScore = 0;
var turnScore = 0;
var playerScore1 = 0;
var playerScore2 = 0;
var playerScore3 = 0;
var playerScore4 = 0;
var playerScore5 = 0;
var playerScore6 = 0;
var playerScore7 = 0;
var playerScore8 = 0;
var diceCountVal1 = 0;
var diceCountVal2 = 0;
var diceCountVal3 = 0;
var diceCountVal4 = 0;
var diceCountVal5 = 0;
var diceCountVal6 = 0;
var rollDiceCount = 0;
var bankRollCount = 0;
var bankDiceCount = 0;
var selectedCount = 0;
var gameStarted = 0;


function rules(){
    alert(
        "First one to 5000 points wins!\n\n5s = 50 point\n1s = 100 points\nThree 1s = 300 points\nThree 2s = 200 points\nThree 3s = 300 points\nThree 4s = 400 points\nThree 5s = 500 points\nThree 6s = 600 points\nFour of a Kind = 1,000 points\nFive of a Kind = 2,000 points\nSix of a Kind = 3,000 points\nA Straight = 1,500 points"
    )
}

function startGame(){
    if(gameStarted == 1){
        location.reload();
    }
    var pp = prompt("Up to 8 players can play...\nHow many players are playing?");
    var playerCount = ["2", "3", "4", "5", "6", "7", "8"];
    if(playerCount.includes(pp)){
        numOfPlayers = pp;
        for(i=1; i<=numOfPlayers; i++){
            var playerNum = "#player" + i;
            $(playerNum).show();
        }
        gameStarted ++;
        $("#start-game").val("Reset Game")
        $("#roll-dice").show();
        $("#bank-roll").show();
        $("#bank-dice").show();
        currentPlayerStyle();
    }
    else{
        alert("Value must be 2-8!");
    }
}

function currentPlayerStyle(){
    var player = "#player" + currentPlayer;
    $(player).addClass("currentPlayer")
}

function rollDice(){
    if(rollDiceCount == 1){
        return;
    }else{
        rollDiceCount ++;
        var audio = new Audio('dice-sound.mp3');
        audio.play();    
        for(i=1; i<=6; i++){
            var diceSpot = "#die" + i;
            if (!$(diceSpot).hasClass("scoredDice")){
                var random = Math.floor(Math.random() * 6 + 1)
                var diceRoll = "die" + random + ".png";        
                $(diceSpot).attr("src", diceRoll).val(random);
                if(random == 1){
                    diceCountVal1 ++;
                }else if(random == 2){
                    diceCountVal2 ++;
                }else if(random == 3){
                    diceCountVal3 ++;
                }else if(random == 4){
                    diceCountVal4 ++;
                }else if(random == 5){
                    diceCountVal5 ++;
                }else{
                    diceCountVal6 ++;
                }
            }
        }
        checkFarkle();
        bankRollCount = 0;
        bankDiceCount = 0;
    }
}

function checkFarkle(){
    if(diceCountVal1 == 0 && diceCountVal5 == 0 && diceCountVal2 < 3 && diceCountVal3 < 3 && diceCountVal4 < 3 && diceCountVal6 < 3){
        var audio = new Audio('farkle.mp3');
        audio.play();
        tempScore = 0;
        turnScore = 0;
        bankDice();
    }
    clearDiceCounts();
}

function selectDice(clicked){
    if(rollDiceCount == 1){
        $(clicked).toggleClass("selectedDice");
        selectedCount ++;
    }
}

function bankRoll(){
    if(bankRollCount == 1 || selectedCount == 0){
        return;
    }
    bankRollCount ++;
    var audio = new Audio('cha-ching.mp3');
    audio.play();
    $(".selectedDice").each(function(i, obj){
        var elementVal = this.value;
        if(elementVal == 1){
            diceCountVal1 ++;
        }else if(elementVal == 2){
            diceCountVal2 ++;
        }else if(elementVal == 3){
            diceCountVal3 ++;
        }else if(elementVal == 4){
            diceCountVal4 ++;
        }else if(elementVal == 5){
            diceCountVal5 ++;
        }else{
            diceCountVal6 ++;
        }
        $(this).removeClass("selectedDice").addClass("scoredDice");
    });
    checkSelectedScore();
    turnScore = turnScore + tempScore;
    tempScore = 0;
    rollDiceCount = 0;
    selectedCount = 0;
    clearDiceCounts();
    $("#dice-bank").show();
    $("#dice-bank-spot").html(turnScore);
} 

function bankDice(){
    checkVictory();
    if(bankDiceCount != 0 && rollDiceCount == 0){
        return;
    }
    bankDiceCount ++;
    var audio = new Audio('pop.mp3');
    audio.play();
    var playerScored = "#player-score-spot" + currentPlayer;
    var player = "#player" + currentPlayer;
    if(currentPlayer == 1){
        playerScore1 = playerScore1 + turnScore; 
        $(playerScored).html(playerScore1);
    }else if(currentPlayer == 2){
        playerScore2 = playerScore2 + turnScore;
        $(playerScored).html(playerScore2);
    }else if(currentPlayer == 3){
        playerScore3 = playerScore3 + turnScore;
        $(playerScored).html(playerScore3);
    }else if(currentPlayer == 4){
        playerScore4 = playerScore4 + turnScore;
        $(playerScored).html(playerScore4);
    }else if(currentPlayer == 5){
        playerScore5 = playerScore5 + turnScore;
        $(playerScored).html(playerScore5);
    }else if(currentPlayer == 6){
        playerScore6 = playerScore6 + turnScore;
        $(playerScored).html(playerScore6);
    }else if(currentPlayer == 7){
        playerScore7 = playerScore7 + turnScore;
        $(playerScored).html(playerScore7);
    }else{
        playerScore8 = playerScore8 + turnScore;
        $(playerScored).html(playerScore8);
    }
    checkVictory();
    $("#dice-bank").hide();
    $(player).removeClass("currentPlayer");
    rollDiceCount = 0;
    bankRollCount = 0;
    turnScore = 0;
    for(i=1; i<=6; i++){
        die = "#die" + i;
        $(die).removeClass("scoredDice");
    }
    currentPlayer ++;
    if(currentPlayer > numOfPlayers){
        currentPlayer = 1;   
    }
    currentPlayerStyle();
}

function checkVictory(){
    if(playerScore1 >= 5000 || playerScore2 >= 5000 || playerScore3 >= 5000 || playerScore4 >= 5000 || playerScore5 >= 5000 || playerScore6 >= 5000 || playerScore7 == 5000 ||playerScore8 == 5000){
        alert("Player " + currentPlayer + " is the Winner!")
        location.reload();
    }
}

function clearDiceCounts(){
    diceCountVal1 = 0;
    diceCountVal2 = 0;
    diceCountVal3 = 0;
    diceCountVal4 = 0;
    diceCountVal5 = 0;
    diceCountVal6 = 0;
}

function checkSelectedScore(){
    for(i=1; i<=6; i++){
        var diceCountVal = "diceCountVal" + i;
    }
    // Straight
    if(diceCountVal1===1 && diceCountVal2===1 && diceCountVal3===1 && diceCountVal4===1 && diceCountVal5===1 && diceCountVal6===1){
        tempScore = tempScore + 1500;
    }
    // Six of a kind
    if(diceCountVal1===6 || diceCountVal2===6 || diceCountVal3===6 || diceCountVal4===6 || diceCountVal5===6 || diceCountVal6===6){
        tempScore = tempScore + 3000;
    }
    // Five of a kind
    if(diceCountVal1===5 || diceCountVal2===5 || diceCountVal3===5 || diceCountVal4===5 || diceCountVal5===5 || diceCountVal6===5){
        tempScore = tempScore + 2000;
    }
    // Four of a kind
    if(diceCountVal1===4 || diceCountVal2===4 || diceCountVal3===4 || diceCountVal4===4 || diceCountVal5===4 || diceCountVal6===4){
        tempScore = tempScore + 1000;
    }
    // Three of a kind on 6
    if(diceCountVal6===3){
        tempScore = tempScore + 600;
    }
    // Three of a kind on 5
    if(diceCountVal5===3){
        tempScore = tempScore + 500; 
    }
    // Three of a kind on 4
    if(diceCountVal4===3){
        tempScore = tempScore + 400;
    }
    // Three of a kind on 3
    if(diceCountVal3===3){
        tempScore = tempScore + 300;
    }
    // Three of a kind on 2
    if(diceCountVal2===3){
        tempScore = tempScore + 200;
    }
    // Three of a kind on 1
    if(diceCountVal1===3){
        tempScore = tempScore + 300;
    }
    // pair of 1's
    if(diceCountVal1===2){
        tempScore = tempScore + 200;
    }
    // 1
    if(diceCountVal1===1){
        tempScore = tempScore + 100;
    }
    // pair of 5's 
    if(diceCountVal5===2){
        tempScore = tempScore + 100;
    }
    // 5
    if(diceCountVal5===1){
        tempScore = tempScore + 50;
    }
}  

