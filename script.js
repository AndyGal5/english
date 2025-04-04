const board = document.getElementById('board');
const modal = document.getElementById('modal');
const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer');
const feedbackEl = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score'); // Elemento para mostrar los puntos

let score = 0;
let currentAnswer = '';
let currentPoints = 0;

const questions = {
  "Affirmative Sentences": {
    100: { q: "He is a doctor, ___?", a: "isn't he" },
    200: { q: "You like chocolate, ___?", a: "don't you" },
    300: { q: "She can drive, ___?", a: "can't she" },
    400: { q: "They will come, ___?", a: "won't they" }
  },
  "Negative Sentences": {
    100: { q: "He isn't late, ___?", a: "is he" },
    200: { q: "You don't smoke, ___?", a: "do you" },
    300: { q: "She hasn’t finished yet, ___?", a: "has she" },
    400: { q: "They won’t mind, ___?", a: "will they" }
  },
  "Mixed Tenses": {
    100: { q: "You were at the party, ___?", a: "weren't you" },
    200: { q: "He had done his homework, ___?", a: "hadn't he" },
    300: { q: "She has been working hard, ___?", a: "hasn't she" },
    400: { q: "They had been running, ___?", a: "hadn't they" }
  },
  "Common Mistakes": {
    100: { q: "Correct this tag: 'She is your friend, isn’t it?'", a: "isn't she" },
    200: { q: "Find the mistake: 'You don’t like coffee, aren’t you?'", a: "do you" },
    300: { q: "What’s the correct tag for: 'Let’s go'?", a: "shall we" },
    400: { q: "What’s the correct tag for: 'Nobody came'?", a: "did they" }
  }
};

function createBoard() {
  for (const category in questions) {
    for (const points in questions[category]) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = `${category} ${points}`;
      cell.addEventListener('click', () => openQuestion(category, points, cell));
      board.appendChild(cell);
    }
  }
}

function openQuestion(category, points, cell) {
  if (cell.classList.contains('used')) return;
  const qData = questions[category][points];
  currentAnswer = qData.a;
  currentPoints = parseInt(points);
  questionEl.textContent = qData.q;
  modal.style.display = 'flex';
  cell.classList.add('used');
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  if (userAnswer === currentAnswer.toLowerCase()) {
    score += currentPoints;
    feedbackEl.textContent = `Correct! You've earned ${currentPoints} points.`;
  } else {
    feedbackEl.textContent = `Incorrect. The correct answer is "${currentAnswer}".`;
  }
  scoreDisplay.textContent = score;
  answerInput.value = '';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 2000);
}

createBoard();
