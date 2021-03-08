// Multiple choice quiz
// Credit: https://code-boxx.com/simple-javascript-quiz/

var quiz = {
    // (A) PROPERTIES 
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [
        {
            q: "In which country is St. Patrick the patron saint?",
            o: [
                "Scotland",
                "Germany",
                "Ireland",
                "Iceland"
            ],
            a: 2
        },
        {
            q: "What animal did St. Patrick drive out of Ireland?",
            o: [
                "Snake",
                "Scorpion",
                "Spider",
                "Rat"
            ],
            a: 0
        },
        {
            q: "What happens if you don't wear Green on St. Patrick's Day ?",
            o: [
                "Pinched",
                "Kissed",
                "Punched",
                "Bad-Luck"
            ],
            a: 0
        },
        {
            q: "How many leaves does a shamrock have?",
            o: [
                "One Leaf",
                "Two Leaves",
                "Three Leaves",
                "Four Leaves"
            ],
            a: 2
        },
        {
            q: "What colour was originally associated with St. Patrick's day?",
            o: [
                "Yellow",
                "Green",
                "Purple",
                "Blue"
            ],
            a: 3
        },
        {
            q: "St Patrick used shamrocks to explain what to the Irish people?",
            o: [
                "Farming",
                "Christianity",
                "Mathematics",
                "Literacy"
            ],
            a: 1
        },
        {
            q: "Which city dyes their river green for st patrick's day?",
            o: [
                "Dublin",
                "Boston",
                "Belfast",
                "Chicago"
            ],
            a: 3
        },
        {
            q: "What was St Patrick's name at birth?",
            o: [
                "John Snow",
                "Alden Becket",
                "Merwyn McGeet",
                "Maewyn Succat"
            ],
            a: 3
        },
        {
            q: "When was the first st Patrick's parade?",
            o: [
                "1762",
                "2001",
                "1809",
                "1982"
            ],
            a: 0
        },
        {
            q: "How many pints of Guinness are consumed globally on St Patrick's day?",
            o: [
                "5 million",
                "1 million",
                "31 million",
                "13 million"
            ],
            a: 3
        }
    ],

    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper

    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score

    // (B) INIT QUIZ HTML
    init: function () {
        // (B1) WRAPPER
        quiz.hWrap = document.getElementById("quizWrap");

        // (B2) QUESTIONS SECTION
        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        // (B3) ANSWERS SECTION
        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        // (B4) GO!
        quiz.draw();
    },

    // (C) DRAW QUESTION
    draw: function () {
        // (C1) QUESTION
        quiz.hQn.innerHTML = quiz.data[quiz.now].q;

        // (C2) OPTIONS
        quiz.hAns.innerHTML = "";
        for (let i in quiz.data[quiz.now].o) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.id = "quizo" + i;
            quiz.hAns.appendChild(radio);
            let label = document.createElement("label");
            label.innerHTML = quiz.data[quiz.now].o[i];
            label.setAttribute("for", "quizo" + i);
            label.dataset.idx = i;
            label.addEventListener("click", quiz.select);
            quiz.hAns.appendChild(label);
        }
    },

    // (D) OPTION SELECTED
    select: function () {
        // (D1) DETACH ALL ONCLICK
        let all = quiz.hAns.getElementsByTagName("label");
        for (let label of all) {
            label.removeEventListener("click", quiz.select);
        }

        // (D2) CHECK IF CORRECT
        let correct = this.dataset.idx == quiz.data[quiz.now].a;
        if (correct) {
            quiz.score++;
            this.classList.add("correct");
        } else {
            this.classList.add("wrong");
        }

        // (D3) NEXT QUESTION OR END GAME
        quiz.now++;
        setTimeout(function () {
            if (quiz.now < quiz.data.length) { quiz.draw(); }
            else {
                quiz.hQn.innerHTML = `You total score is ${quiz.score}`;
                quiz.hAns.innerHTML = "";
                let totalScore = document.querySelector('#score');

                totalScore.value = quiz.score;
            }

        }, 1000);
    }
};

window.addEventListener("load", quiz.init);
