const quizQuestions = [
  { question: "What does diversification help an investor do?", options: ["Concentrate all money in one stock", "Spread investments across different assets", "Guarantee a fixed return", "Avoid every type of risk"], correct: 1, explanation: "Diversification spreads exposure across investments. It can reduce concentration risk, but it cannot eliminate all risk or guarantee returns." },
  { question: "Which statement best describes the risk-return relationship?", options: ["Higher expected return can involve higher risk", "Every risky investment earns more", "Risk never affects investment decisions", "Returns are always guaranteed"], correct: 0, explanation: "Higher expected returns often come with higher risk, but higher returns are not guaranteed." },
  { question: "What is the main purpose of a financial budget?", options: ["Predict exact stock prices", "Remove all expenses permanently", "Plan income and expenses", "Guarantee investment profits"], correct: 2, explanation: "A budget helps plan and track income and expenses so financial decisions can be made more deliberately." }
];
let currentQuestion = 0;
let answered = false;
let score = 0;
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const restartQuiz = document.getElementById("restartQuiz");
const questionCount = document.getElementById("questionCount");
const quizProgress = document.getElementById("quizProgress");

function renderQuestion() {
  answered = false;
  const q = quizQuestions[currentQuestion];
  questionCount.textContent = `QUESTION ${currentQuestion + 1} OF ${quizQuestions.length}`;
  quizProgress.style.width = `${(currentQuestion / quizQuestions.length) * 100}%`;
  questionText.textContent = q.question;
  answerOptions.innerHTML = "";
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  nextQuestion.disabled = true;
  nextQuestion.textContent = currentQuestion === quizQuestions.length - 1 ? "See my score →" : "Next question →";
  restartQuiz.hidden = true;
  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);
    const label = document.createElement("span");
    label.textContent = option;
    button.append(letter, label);
    button.addEventListener("click", () => chooseAnswer(index));
    answerOptions.appendChild(button);
  });
}
function chooseAnswer(index) {
  if (answered) return;
  answered = true;
  const q = quizQuestions[currentQuestion];
  const buttons = [...answerOptions.querySelectorAll("button")];
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === q.correct) button.classList.add("correct");
    if (i === index && i !== q.correct) button.classList.add("incorrect");
  });
  if (index === q.correct) {
    score++;
    quizFeedback.textContent = `That's right. ${q.explanation}`;
  } else {
    quizFeedback.textContent = `Not quite. ${q.explanation}`;
    quizFeedback.classList.add("error");
  }
  nextQuestion.disabled = false;
  quizProgress.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;
}
nextQuestion.addEventListener("click", () => {
  if (!answered) return;
  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    questionCount.textContent = "QUIZ COMPLETE";
    questionText.textContent = `You scored ${score} out of ${quizQuestions.length}`;
    answerOptions.innerHTML = "";
    quizFeedback.className = "quiz-feedback";
    quizFeedback.textContent = score === quizQuestions.length
      ? "Excellent work. Keep revising and practising."
      : "Good effort. Review the explanations, then try again to strengthen your understanding.";
    quizProgress.style.width = "100%";
    nextQuestion.disabled = true;
    nextQuestion.textContent = "Completed";
    restartQuiz.hidden = false;
  }
});
restartQuiz.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  renderQuestion();
});
renderQuestion();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.getElementById("year").textContent = new Date().getFullYear();
const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}
document.querySelectorAll(".video-link").forEach(link => link.addEventListener("click", event => {
  event.preventDefault();
  showToast("Add your YouTube URL to this video card before publishing.");
}));

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const topic = form.elements.topic.value;
  const message = form.elements.message.value.trim();
  // Replace this placeholder with the academy's real email before publishing.
  const destination = document.getElementById("contactEmail").textContent.trim();
  if (!destination || destination === "your-email@example.com") {
    showToast("Please set your real contact email in index.html first.");
    return;
  }
  const subject = encodeURIComponent(`Website enquiry: ${topic}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`);
  window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
});

const languageButtons = document.querySelectorAll("[data-en][data-hi]");
let currentLanguage = "en";
function setLanguage(lang) {
  currentLanguage = lang;
  languageButtons.forEach(element => {
    const value = element.dataset[lang];
    if (value) element.innerHTML = value;
  });
}
const languageToggle = document.getElementById("languageToggle");
languageToggle.addEventListener("click", () => {
  const nextLanguage = currentLanguage === "en" ? "hi" : "en";
  setLanguage(nextLanguage);
  languageToggle.textContent = nextLanguage === "en" ? "हिंदी" : "English";
  document.documentElement.lang = nextLanguage;
});
