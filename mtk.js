let currentAnswer = 0;
let score = 0;
let totalQuestions = 0;

function startQuiz() {
  score = 0;
  totalQuestions = 0;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("end-screen").style.display = "none";

  showQuestion();
}

function stopQuiz() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  document.getElementById("score").textContent = `Skor Anda: ${score} dari ${totalQuestions}`;
}

function getRandomQuestion() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const op = ["+", "-", "*"][Math.floor(Math.random() * 3)];

  let question = `${a} ${op} ${b}`;
  let answer = eval(question);
  return { question, answer };
}

function showQuestion() {
  const { question, answer } = getRandomQuestion();
  currentAnswer = answer;
  document.getElementById("question").textContent = `Berapakah hasil dari: ${question}?`;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  const correctIndex = Math.floor(Math.random() * 4);
  for (let i = 0; i < 4; i++) {
    const btn = document.createElement("button");
    btn.className = "choice-button";

    if (i === correctIndex) {
      btn.textContent = answer;
    } else {
      let wrong;
      do {
        wrong = answer + Math.floor(Math.random() * 10) - 5;
      } while (wrong === answer);
      btn.textContent = wrong;
    }

    btn.onclick = () => checkAnswer(parseInt(btn.textContent));
    choicesDiv.appendChild(btn);
  }
}

function checkAnswer(selected) {
  totalQuestions++;
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("benar", "salah");

  if (selected === currentAnswer) {
    score++;
    resultDiv.textContent = "Benar!";
    resultDiv.classList.add("benar");
  } else {
    resultDiv.textContent = `Salah. Jawaban yang benar adalah ${currentAnswer}`;
    resultDiv.classList.add("salah");
  }

  setTimeout(() => {
    resultDiv.textContent = "";
    resultDiv.classList.remove("benar", "salah");
    showQuestion();
  }, 1000);
}
