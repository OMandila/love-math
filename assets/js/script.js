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
    document.getElementById("answer-box").addEventListener("keydown", function(event){
        if (event.key === "Enter"){
            checkAnswer();
        }
    })

    runGame('add');

});

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType){

    document.getElementById('answer-box').value = "";
    document.getElementById('answer-box').focus();
    //Create two random numbers between 1 and 20
    let num1 = Math.floor(Math.random() * 20) + 1; //add 1 to avoid a zero being generated by the floor function
    let num2 = Math.floor(Math.random() * 20) + 1;

    if (gameType === "add"){
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply"){
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract"){
        displaySubtractQuestion(num1, num2);
    } else {
        displayDivideQuestion(num1, num2);
    }
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
        alert("That's correct! You got it right :D");
        incrementScore();
    } else {
        alert(`You answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}. Try again!`);
        incrementWrongAnswer();
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
    } else if (operator === 'x'){
        return [operand1 * operand2, 'multiply'];
    } else if (operator === '-'){
        return [operand1 - operand2, 'subtract'];
    } else {
        return [operand1 / operand2, 'divide'];
    }
}

/**
 * Get the current score from the DOM and increment it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerHTML);
    document.getElementById('score').textContent = ++oldScore;
}

/**
 * Get the current tally of incorrect answers from the DOM and increment it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerHTML);
    document.getElementById('incorrect').textContent = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operator').textContent = '+';
    document.getElementById('operand2').textContent = operand2;
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operator').textContent = '-';
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operator').textContent = 'x';
    document.getElementById('operand2').textContent = operand2;
}

function displayDivideQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1*operand2;
    document.getElementById('operator').textContent = '/';
    document.getElementById('operand2').textContent = operand2;
}