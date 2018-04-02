// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

function highlightChoice(checkedChoice) {
  const parentSection = checkedChoice.parentNode;
  for (const choice of parentSection.querySelectorAll('div')) {
    if (choice !== checkedChoice) {
      choice.classList.remove('highlighted');
      choice.classList.add('unhighlighted');
      choice.querySelector(".checkbox").src = "images/unchecked.png";
    }
  }
  checkedChoice.classList.remove('unhighlighted');
  checkedChoice.classList.add('highlighted');
  const checkedCheckbox = checkedChoice.querySelector('.checkbox');
  checkedCheckbox.src = "images/checked.png";
}

function restartQuiz() {
  console.log('quiz restarted');
  sectionsAvailable = [];
  for (const choice of sectionChoices) {
    choice.addEventListener('click', recordChoice);
    choice.classList.add('.unanswered');
    choice.classList.remove('highlighted');
    choice.classList.remove('unhighlighted');
    choice.querySelector(".checkbox").src = "images/unchecked.png";
  }
  if (document.querySelector('#resultSection') !== null) {
    document.querySelector('#resultSection').innerHTML = '';
  }
}

function printQuizResult(title, text) {
  const resultSection = document.querySelector('#resultSection');
  const resultDiv = document.createElement('div')
  const resultTitle = document.createElement('h1');
  resultTitle.textContent = title;
  const resultText = document.createElement('p');
  resultText.textContent= text;
  const restartButton = document.createElement('div');
  restartButton.textContent = "Restart Quiz";
  restartButton.addEventListener('click', restartQuiz);
  restartButton.id="restartButton";
  resultDiv.appendChild(resultTitle);
  resultDiv.appendChild(resultText);
  resultSection.appendChild(resultDiv);
  resultSection.appendChild(restartButton);
  for (const element of resultSection.querySelectorAll("div, p, h1")) {
    element.classList.add("resultElement");
  }

}
function calculateResult (choicesDict, one, two, three) {
  if (choicesDict[three] === choicesDict[two]) {
    return RESULTS_MAP[choicesDict[two]];
  } else {
    return RESULTS_MAP[choicesDict[one]];
  }
}
function quizCompleted() {
  console.log('Quiz Completed!');
  for (const choice of sectionChoices) {
    choice.removeEventListener('click', recordChoice);
  }
  const result = calculateResult(choicesDict, 'one', 'two', 'three');
  printQuizResult(result['title'], result['contents']);
}

function recordChoice(event) {
  const choice = event.currentTarget;
  choicesDict[choice.dataset.questionId]=choice.dataset.choiceId;
  sectionOfChoice = choice.parentNode;
  highlightChoice(choice);
  for (const completedSection of sectionsAvailable) {
    if (completedSection === sectionOfChoice) {
      return;
    }
  }
  sectionsAvailable.push(sectionOfChoice);
  if (sectionsAvailable.length >= 3) {
    quizCompleted();
  }
}

const sectionChoices = document.querySelectorAll('.choice-grid div');
const choicesDict = {}
let sectionsAvailable = [];
restartQuiz();
