const start_btn = document.querySelector(".start_btn button"),
info_box = document.querySelector(".info-box"),
exit_btn = info_box.querySelector(".buttons .quit"),
continue_btn = info_box.querySelector(".buttons .restart"),
quiz_box = document.querySelector(".quiz_box"),
option_list = document.querySelector(".option_list"),
timeCount = document.querySelector(".time_sec"),
timeLine = document.querySelector(".time_line"),
time_text = document.querySelector(".time_text"),
next_btn = document.querySelector(".next_btn"),
result_box = document.querySelector(".result_box"),
score_text = result_box.querySelector(".score_text"),
restart_btn = result_box.querySelector(".buttons .restart"),
quit_btn = result_box.querySelector(".buttons .quit");

let que_count = 0,
counter,
timeValue = 15,
widthValue = 0,
userScore = 0;


/* ======== All buttons events ======== */
start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
}

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestion(0);
  startTimer(timeValue);
  TimeLine(widthValue);
}

restart_btn.onclick = () => {
  result_box.classList.remove("activeResult");
  quiz_box.classList.add("activeQuiz");
  time_text.textContent = "Time Left";

  let que_count = 0,
  counter,
  timeValue = 15,
  widthValue = 0,
  userScore = 0;

  showQuestion(que_count);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  TimeLine(widthValue);
  next_btn.style.display = "none";

}

quit_btn.onclick = () => {
  window.location.reload();
}
/* ======== End all buttons events ======== */


function showQuestion(index) {
  const que_text = document.querySelector(".que_text span");
  let total_que_counter = document.querySelector(".total_que");
  let questions_length = questions.length;

  // Insert Text
  let que_tag = questions[index].numb + ". " + questions[index].question;
  let option_tag =  `<div class="option"><span></span></div>`
                    + `<div class="option"><span></span></div>`
                    + `<div class="option"><span></span></div>`
                    + `<div class="option"><span></span></div>`
  // + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
                  // cả hai cách trên dưới đều inner đc, tùy trường hợp mà linh hạt sử dụng
           
  que_text.textContent = que_tag;
  option_list.innerHTML = option_tag;
  total_que_counter.innerHTML = `<span><p>${que_count + 1}</p>of ${questions_length} </  p>Questions</span>`;
  
  // Onclick in each option
  const options= document.querySelectorAll(".option");
  const options_span = document.querySelectorAll(".option span");

  for (let i = 0; i < options_span.length; i++) {
    options_span[i].textContent = questions[index].options[i];
    options[i].setAttribute("onclick", "optionSelected(this)");
  }
}


let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;

function optionSelected(answer) {
  // Reset TimeLine and countDown
  clearInterval(counter);
  clearInterval(counterLine);
  
  let userAnswer = answer.textContent;
  let correctAnswer = questions[que_count].answer;
  let optionLength = option_list.children.length;
  
  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
    userScore += 1;
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    autoChooseAnswer();
  }

  // Disable answer and open next btn
  for (let i = 0; i < optionLength; i++) {
    option_list.children[i].classList.add("disable");
  }
  next_btn.style.display = "block";
}

// Auto choose correct answer if user choose incorrect answer
function autoChooseAnswer () {
  let correctAnswer = questions[que_count].answer;
  let optionLength = option_list.children.length;

  for (let i = 0; i < optionLength; i++) {
  if (option_list.children[i].textContent == correctAnswer) {
    option_list.children[i].setAttribute("class", "option correct");
    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
  }
}
}

next_btn.onclick = () => {
  if(que_count < questions.length - 1) {
    que_count++;
    time_text.textContent = "Time Left";
    showQuestion(que_count);

    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    TimeLine(widthValue);

    next_btn.style.display = "none";
  } else {
    que_count = 0;
    clearInterval(counter);
    clearInterval(counterLine);
    showResultBox();
  }
};


/*======== CountDown Time Function ========*/
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;

    if(time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }

    if(time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      time_text.textContent = "Time Off";
      autoChooseAnswer();
      // Disable answer and open next btn
      let optionLength = option_list.children.length;
      for (let i = 0; i < optionLength; i++) {
        option_list.children[i].classList.add("disable");
      }
      next_btn.style.display = "block";
    } 
  }
}
/*======== End CountDown Time Function ========*/

/*======== TimLine Function ========*/
function TimeLine(time) {
  counterLine = setInterval(timer, 30);
  function timer() {
    time += 0.197;
    timeLine.style.width = time + "%";

    if(time >= 100) {
      clearInterval(counterLine);
    } 
  }
}
/*======== End TimLine Function ========*/

// Show Result Box
function showResultBox() {
  let optionLength = option_list.children.length;

  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  
  if(userScore > 3) {
    let scoreText = `<span>and congrats, You got only <p>${userScore}</p> out of <p>${optionLength + 1}</p></span>`;
    score_text.innerHTML = scoreText;
  } else if(userScore > 1) {
    let scoreText = `<span>and nice, You got only <p>${userScore}</p> out of <p>${optionLength + 1}</p></span>`;
    score_text.innerHTML = scoreText;
  } else { 
    let scoreText = `<span>and sorry, You got only <p>${userScore}</p> out of <p>${optionLength + 1}</p></span>`;
    score_text.innerHTML = scoreText;
  }
}
/*======== End Show Result Box ========*/





