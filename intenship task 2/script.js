let quiz = [];

function addQuestion() {
  const question = document.getElementById('question').value;
  const options = [
    document.getElementById('option1').value,
    document.getElementById('option2').value,
    document.getElementById('option3').value,
    document.getElementById('option4').value,
  ];
  const correct = parseInt(document.getElementById('correct').value) - 1;

  quiz.push({ question, options, correct });
  alert('Question added!');
  localStorage.setItem('quiz', JSON.stringify(quiz));
}

function startQuiz() {
  const savedQuiz = JSON.parse(localStorage.getItem('quiz')) || [];
  let quizHTML = '';
  savedQuiz.forEach((q, index) => {
    quizHTML += `<div class="quiz-card">
      <h3>${q.question}</h3>
      ${q.options.map((opt, i) => `
        <label><input type="radio" name="q${index}" value="${i}">${opt}</label>
      `).join('')}
    </div>`;
  });
  quizHTML += `<button class="btn" onclick="submitQuiz()">Submit Quiz</button>`;
  document.getElementById('quiz').innerHTML = quizHTML;
}

function submitQuiz() {
  const savedQuiz = JSON.parse(localStorage.getItem('quiz')) || [];
  let score = 0;
  savedQuiz.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.correct) {
      score++;
    }
  });
  alert(`Your score is ${score}/${savedQuiz.length}`);
}
