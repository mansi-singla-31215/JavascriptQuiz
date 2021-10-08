var topic = document.querySelectorAll('#topic');
var Username = document.getElementById('Username');
var name2 = document.querySelector('.name2');
var topic2 = document.querySelector('.topic2');
var enter = document.querySelector('button[type="button"]');
var container = document.querySelector('.container');
var quiz = document.querySelector('.quiz');
var restartQuiz = document.querySelector('.restart');
const quizContainer = document.querySelector('.answer');
const resultsContainer = document.querySelector('.remark');
const submitButton = document.getElementById("submit");
var timer = document.getElementById("timer");

//score
var score = 0;

// array of questions

var questions1 = [{
    question : "Who is the most deadly vampire when their humanity switch is off?",
    options: {
        a : "Stefan",
        b : "Caroline",
        c: "Damon",
        d : "Enzo"
    },
    answer: "a"
}, {
    question : "Which Mikaelson was a supernatrual creature before they were a vampire?",
    options: {
        a : "Rebeka",
        b : "Finn",
        c: "Klaus",
        d : "Elijah"
    },
    answer: "c"
}, {
    question : "Who was the first vampire Elena met?",
    options: {
        a : "Damon",
        b : "Stefan",
        c: "Katherine",
        d : "Col"
    },
    answer: "a"
}, {
    question : "What is the name of the restaurant in Mystic Falls",
    options: {
        a : "Mystic Bars",
        b : "Mystic Tavern",
        c: "Mystic Inn",
        d : "Mystic Grills"
    },
    answer: "d"
}];

var questions2 = [{
    question : "Which is the brightest planet in the universe?",
    options : {
        a : "Mercury",
        b : "Venus",
        c : "Earth", 
        d : "Saturn"
    },
    answer : "b"
}, {
    question : "The first planet outside the orbit of earth is",
    options : {
        a : "Jupiter",
        b : "Mars",
        c : "Saturn", 
        d : "Uranus"
    },
    answer : "b"
}, {
    question : "What is the gap between the orbit of mars and Jupiter called?",
    options : {
        a : "Asteroids",
        b : "Comets",
        c : "Meteor", 
        d : "Meteorite"
    },
    answer : "a"
}, {
    question : "Stars appear to move from",
    options : {
        a : "West to east",
        b : "East to west",
        c : "North to south", 
        d : "South to west"
    },
    answer : "b"
}];

var questions = questions1;

// to fill topic and name

enter.addEventListener("click", () => {
    container.style.display = "none";
    quiz.style.display = "block";
    buildQuiz();
    startTimer();
})

Username.addEventListener("input", () => {
    name2.innerText = Username.value;
  });

if(topic[0].checked){
    topic[0].addEventListener("input", () => {
        topic2.innerText = "Vampire Diaries";
    })
}else{
    topic[1].addEventListener("input", () => {
        topic2.innerText = "Space Related";
        questions = questions2;
    })
    
}


function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    questions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];
  
      // and for each available answer...
      for (key in currentQuestion.options) {
        // ...add an HTML radio button
        answers.push(
          `<label>
              <input type="radio" name="question${questionNumber}" value="${key}" class="question">
              ${currentQuestion.options[key]}
              <br>
            </label>`
        );
      }
  
      console.log(answers);
  
      // add this question and its answers to the output
      output.push(
        `<div class="question"> Q${questionNumber+1}. ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>`
      );
    });
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
    console.log(output);
  }


  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
  
    // keep track of user's answers
    let score = 0;
  
    // for each question..
    questions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
       // color the right answers green
     for(var i = 0; i < 4; i++){
        if(answerContainer.querySelectorAll('input')[i].value == currentQuestion.answer){
            answerContainer.querySelectorAll('label')[i].style.color = "rgb(5, 197, 30)";
        }
      } 
      // if answer is correct
      if (userAnswer === currentQuestion.answer) {
        // add to the number of correct answers
        score++;
      }             
      // if answer is wrong or blank
      else {
        // color the wrong answers red
        for(var i = 0; i < 4; i++){
            if(answerContainers[questionNumber].querySelectorAll('input')[i].checked){
                answerContainers[questionNumber].querySelectorAll('label')[i].style.color = "red";
            }
        }
      }
    });
    // show number of correct answers out of total
    if(score >= 3){
        resultsContainer.innerHTML = `YAY! You got ${score} out of ${questions1.length} correct Answers!!! <br> Looks like you Aced the quiz! :)`;
    }else{
        resultsContainer.innerHTML = `Oops! You got ${score} out of ${questions1.length} correct Answers! <br> Better Luck Next Time! :)`;
    }
    
  }


  submitButton.addEventListener("click", showResults);

  restartQuiz.addEventListener("click", () => {
    window.location.reload();
  });

  // timer
  function startTimer(){
      var time = new Date().getTime() + 1000*60*4;
      var interval = setInterval(function(){
        var now = new Date().getTime();
        var distance = time - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timer.innerHTML = minutes + " : " + seconds;
        if (distance <= 0) {
            clearInterval(interval);
            timer.innerHTML = "00:00";
            window.alert('Time Up!');
            showResults();
        }
      } ,1000);
  }
  