// Listening for the DOM to finish loading before running the game
// Then get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function(){
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons){
        button.addEventListener('click', function(){
            if (this.getAttribute("data-type")=='submit'){
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    runGame('add')
});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType){

    //Create two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "add"){
        displayAdditionQuestion(num1, num2);
    } else {}
}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer(){
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect){
        alert("That's correct! You got it right :D")
    } else {
        alert(`You answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}. Try again!`)
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Get the operands (the numbers) and the operator (plus, minus, etc.)
 * directly from the DOM and return the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operator = document.getElementById('operator').innerText;
    let operand2 = parseInt(document.getElementById('operand2').innerHTML);

    if (operator === '+'){
        return [operand1 + operand2, 'add'];
    } else {
        alert(`Unimplemented operation ${operator}`);
        throw `Unimplemented operation ${operator}.Aborting!`;
    }
}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operator').textContent = '+';
    document.getElementById('operand2').textContent = operand2;
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {
    
}