const quizzData = [
    
    {
        question: "Russia",
        a: "Finland",
        b: "Kazakhistan",
        c: "Ukrain",
        d: "Poland",
        correct: "d",             
    },                                           
                                      
    {                                              
        question: "Russia",      
        a: "Finland",     
        b: "Kazakhistan",   
        c: "Ukrain",   
        d: "Poland",   
        correct: "d",               
    },                                        
                                                  
    {                                         
        question: "Ukrain",                         
        a: "Poland",  
        b: "Italy",    
        c: "Romania",   
        d: "Russia",    
        correct: "b",                   
    },                 
                        
    {                       
        question: "Iran",
        a: "Oman",
        b: "Pakistan",
        c: "Afganistan",
        d: "Iraq",
        correct: "a",       
    },                                 
                                     
    {                              
        question: "Peru",   
        a: "Ecuador",
        b: "Uruguay",
        c: "Chile",
        d: "Brazil",
        correct: "b",                
    },                                 
                                      
    {                       
        question: "China",
        a: "Mongolia",
        b: "Tajikistan",
        c: "South Korea",
        d: "India",
        correct: "c",    
    },
    
    {
        question: "Niger",
        a: "Mali",
        b: "Algeria",
        c: "Libya",
        d: "Sudan",
        correct: "d",
    },
    
    {
        question: "Brasil",
        a: "Chile",
        b: "Paraguay",
        c: "Peru",
        d: "Venezuela",
        correct: "a",
    },
    
    {
        question: "USA",
        a: "Maxico",
        b: "Cuba",
        c: "Costa Rica",
        d: "Canada",
        correct: "c",
    },
    
    {
        question: "Honduras",
        a: "Costa Rica",
        b: "El Salvador",
        c: "Guatemala",
        d: "Nicaragua",
        correct: "a",
    },
    
    {
        question: "Poland",
        a: "Czehia",
        b: "Austria",
        c: "Slovakia",
        d: "Germany",
        correct: "b",
    },
    
    {
        question: "Germany",
        a: "Poland",
        b: "Austria",
        c: "Italy",
        d: "Switzerland",
        correct: "c",
    },
    
    {
        question: "Swiss",
        a: "France",
        b: "Austria",
        c: "Germany",
        d: "Andora",
        correct: "d",
    },
    
];

const  UserInfo = { user:"", score:"", time:"", points:""};
LeaderboardArr = [];

const answeredQs = [0];

const userr = document.getElementById("inputName")
const questionText = document.getElementById("question");
const AnswerText = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submit = document.getElementById("submit");

quiz.hidden = true;
headp.hidden = true;
timer.hidden = true;
leaderBoard.hidden = true;
leaderBoardTitle.hidden = true;

let score = 0;
let quizAnswered = 1;



function initTimer(){
     sec = -1;
    setInterval(tick, 1000);
}          
function tick(){
    sec++;
    document.getElementById("timer").childNodes[0].nodeValue = "Time: "+ sec + " sec";
}

function initPage(){ 
    startingP.innerText = "Press Button To Check Your Geographical Knowledge";
    startBTN.addEventListener("click", function() {
        inittpage.hidden = true;
        quiz.hidden = false;
        headp.hidden = false;
        timer.hidden = false;
        UserInfo.user = userr.value;
        randomQuizz();
        initTimer();
    })
}

function randomQuizz(){
    deselectAnswers()
    currentQuiz = Math.floor(Math.random() * 12) + 1;

    while(answeredQs.includes(currentQuiz)){
        currentQuiz = Math.floor(Math.random() * 12) + 1;
    }
   
    answeredQs.push(currentQuiz);
    const currentQuizData = quizzData[currentQuiz];
    questionText.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}
 
function deselectAnswers() {
    function chck(AnswerText){
        AnswerText.checked = false;}

    AnswerText.forEach(chck);
}

function selectAnsw(){
    let answer = undefined;

    AnswerText.forEach(Sbmt);
    function Sbmt(AnswerText){
        if (AnswerText.checked){
            answer = AnswerText.id;
        }
    }
    return answer;
}

submit.addEventListener("click", function() {
    const answer = selectAnsw();
    if (!answer) return;
    
        if (answer === quizzData[currentQuiz].correct) {
            score++;
        }

        if (quizAnswered < 5){
            randomQuizz()
            quizAnswered++;

        }else{
            submit.innerText = "Play Again";
            smal.innerText = "Right click to clear-cache ";
            headp.hidden = true;
            timer.hidden = true;
            leaderBoard.hidden = false;
            leaderBoardTitle.hidden = false;

            document.getElementById('leaderBoard').style.display = 'flex';
            document.getElementById('leaderBoard').style.boxSizing = 'border-box';  
            document.getElementById('leaderBoard').style.width = "50%"; 
            document.getElementById('leaderBoard').style.float = "left";

            quizzB.remove();

            points = score/(sec/2);
            if (points == 0){
                points -= (sec/1000);
            }


            UserInfo.score = score;
            UserInfo.time = sec;
            UserInfo.points = points;
            

            if (localStorage.length != 0){
               let Lboard = localStorage.getItem('Leaderboard');
               LeaderboardArr = JSON.parse(Lboard);
               LeaderboardArr.push(UserInfo)
               localStorage.setItem('Leaderboard', JSON.stringify(LeaderboardArr));
            }else {
                LeaderboardArr.push(UserInfo)
                localStorage.setItem('Leaderboard', JSON.stringify(LeaderboardArr));
            }
          
            const LLboard = localStorage.getItem('Leaderboard');
            LeaderboardArr = JSON.parse(LLboard);

            LeaderboardArr.sort((a, b) => a.points - b.points);

            for(let index = LeaderboardArr.length; index > 0; index--) {
                correntUserInfo = LeaderboardArr[index-1];

                const userBlock = document.createElement("tr");
                userBlock.id= index;

                const elCreator = (className) => {
                    const el = document.createElement("td")
                    el.className = className;

                    el.innerHTML = correntUserInfo[className]

                    return el;
                }

                const name = elCreator('user')
                const score =  elCreator('score')
                const time =  elCreator('time') 

                document.getElementById("tablo").appendChild(userBlock);

                const position = document.getElementById(index)

                position.appendChild(name);
                position.appendChild(score);
                position.appendChild(time);
            }


            questionText.textContent = "Your score: " + score;

            submit.addEventListener("click", () => {
                window.location.reload();
            });

            submit.addEventListener("contextmenu", (e) => {
                tablo.remove();
                localStorage.clear();
                e.preventDefault();
            });

        } 
    
});

if (quizAnswered==1) initPage()
