//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

const usedIndexes = new Set();
let socau = 40;
let gioihan = 1000;

var che = ["Em có thực sự đang học không vậy?", "Sai nữa à ?", "Ơ kìa, câu này nó dễ thế cơ mà", "Ayyyy, Silba!!!!", "Anh nghĩ chúng ta nên ôn lại ớ", "Thiệt sự là anh không biết nói gì", "ủa bé, mai bé thi rồi á", "1+1=2 nó còn khó hơn câu này!", "Sau con anh dạy!", "Khum sao, ai cũng có sai lầm"]
var khen = ["Giỏi quáaaa!", "Đây mới là người yêu anh nè!", "Xuất sắc bé iu ơi!!", "Quá chuẩn luôn", "Ráng phát huy nhaaaaaaa", "Đúng rùi nè!!!!!", "Mai không 10 hơi phí", "Ráng lên có ngay trà sữa", "Cóc vàng liền em ey", "Câu sau chắc chắn là B"]

// if startQuiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = () => {
    socau = document.getElementById("sc").value;
    gioihan = document.getElementById("gh").value;
    console.log(socau, gioihan);
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(99); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue = 99;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 99;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    // next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
    if (que_numb < socau) { //if question count is less than total question length
        que_count = getUniqueRandomNumber(gioihan); //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        // next_btn.classList.remove("show"); //hide the next button
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");
    let option_tag = '';
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';

    for (i = 0; i < questions[index].options.length; i++) {
        option_tag += '<div class="option"><span>' + questions[index].options[i] + '</span></div>'
    }

    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    next_btn.classList.add("show");

    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
        let num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        let num1 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);

        let img = "../../img/{}.jpg".format(num);
        document.getElementById("myImg").src = img;
        console.log(khen[num])
        document.getElementById("txt").innerHTML = khen[num + num1 - 1];

    } else {
        let num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        let num1 = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }

        let img = "../../img/{}.jpg".format(-num);
        document.getElementById("myImg").src = img;
        document.getElementById("txt").innerHTML = che[num + num1 - 1];

    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    //show the next button if user selected any option
}

function showResult() {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > socau % 4) { // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>' + userScore + '</p> out of <p>' + socau + '</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if (userScore > socau % 2) { // if user scored more than 1
        let scoreTag = '<span>and nice try 😐 , You got <p>' + userScore + '</p> out of <p>' + socau + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scored less than 1
        let scoreTag = '<span>and sorry 😒, You got only <p>' + userScore + '</p> out of <p>' + socau + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + socau + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function getUniqueRandomNumber(x) {
    const index = Math.floor(Math.random() * (x));
    if (usedIndexes.has(index)) {
        return getUniqueRandomNumber(x);
    } else {
        usedIndexes.add(index);
        return index
    }
}

String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};