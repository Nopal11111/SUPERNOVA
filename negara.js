const questions = [
  {
    flag: 'img/indonesia.png',
    choices: ['Malaysia', 'Indonesia', 'Polandia', 'Monako'],
    correct: 'Indonesia'
  },
  {
    flag: 'img/japan.png',
    choices: ['Korea Selatan', 'Tiongkok', 'Singapura', 'Jepang'],
    correct: 'Jepang'
  },
  {
    flag: 'img/italy.png',
    choices: ['Italia', 'Meksiko', 'Irlandia', 'Perancis'],
    correct: 'Italia'
  },
  {
    flag: 'img/usa.png',
    choices: ['Australia', 'Kanada', 'Amerika Serikat', 'Inggris'],
    correct: 'Amerika Serikat'
  },
  {
    flag: 'img/uk.png',
    choices: ['Kanada', 'Skotlandia', 'Inggris', 'Irlandia'],
    correct: 'Inggris'
  },
  {
    flag: 'img/france.png',
    choices: ['Perancis', 'Belanda', 'Rusia', 'Italia'],
    correct: 'Perancis'
  },
  {
    flag: 'img/monaco.png',
    choices: ['monako', 'indonesia', 'singapura', 'kamboja'],
    correct: 'monako'
  },
  {
    flag: 'img/germany.png',
    choices: ['Perancis', 'belgia', 'jerman', 'amerika'],
    correct: 'jerman'
  },
  {
    flag: 'img/chad.png',
    choices: ['romania', 'chad', 'Rusia', 'andora'],
    correct: 'chad'
  },
  {
    flag: 'img/romania.png',
    choices: ['andora', 'Belanda', 'chad', 'romania'],
    correct: 'romania'
  }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result").textContent = "";
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("score").innerText = score;
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const flagElement = document.getElementById("flag-image");
  const choicesContainer = document.getElementById("choices");
  const questionElement = document.getElementById("question");

  flagElement.src = currentQuestion.flag;
  questionElement.textContent = `Soal ${currentQuestionIndex + 1}: Negara apa dari bendera ini?`;
  choicesContainer.innerHTML = "";

  currentQuestion.choices.forEach(choice => {
    const button = document.createElement("button");
    button.innerText = choice;
    button.onclick = () => checkAnswer(button, currentQuestion.correct);
    choicesContainer.appendChild(button);
  });
}

function checkAnswer(selectedButton, correctAnswer) {
  const allButtons = document.querySelectorAll("#choices button");

  allButtons.forEach(button => {
    button.disabled = true;
    if (button.innerText === correctAnswer) {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("wrong");
    }
  });

  if (selectedButton.innerText === correctAnswer) {
    score++;
    document.getElementById("score").innerText = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showFinalResult();
    }
  }, 1000);
}

function showFinalResult() {
  const result = document.getElementById("result");
  result.textContent = `Quiz selesai! Skor akhir kamu: ${score} dari ${questions.length}`;
}

function stopQuiz() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
  document.getElementById("result").textContent = "";
}
