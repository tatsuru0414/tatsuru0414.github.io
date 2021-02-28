use strict"

{
  //DOMの取得
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector("#result > p");

  //クイズをオブジェクトにまとめている
  const quizSet = shuffle([
    {q:"?", c:["A0", "A1", "A2"]},
    {q:"What is B?", c:["B0", "B1", "B2"]},
    {q:"What is C?", c:["C0", "C1", "C2"]},
  ]);

  //何問目のクイズを解いているのか
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  //問題文を挿入
  
  
  //問題文をランダムに並び替える
  function shuffle (arr) {
    let i = arr.length - 1;
    for(let i = arr.length - 1; i>0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j],arr[i]] =  [arr[i],arr[j]];  
    }
    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered === true){
     return;
    }
    isAnswered = true;

    if(li.textContent === quizSet[currentNum].c[0]){
      li.classList.add("correct");
      score++;
    } else{
      li.classList.add("wrong");
    }

    btn.classList.remove("disabled");
  }

 function setQuiz() {
   isAnswered = false;
   question.textContent = quizSet[currentNum].q;

   //このように（）に要素を書くと、その要素に対してFalseにならない限り続く
   while(choices.firstChild){
      choices.removeChild(choices.firstChild);
   }
   
   const shuffledChoices = shuffle([...quizSet[currentNum].c]);
   //選択肢を挿入
   shuffledChoices.forEach(choice => {
     const li = document.createElement("li");
     li.textContent = choice;
     li.addEventListener("click", () => {
       checkAnswer(li);
     });
     choices.appendChild(li);
   });

   if (currentNum === quizSet.length - 1){
     btn.textContent = "show score!";
   }
 }

 setQuiz();



 btn.addEventListener("click", () => {
   if(btn.classList.contains("disabled")){
     return;
   }
   btn.classList.add("disabled");

   if(currentNum === quizSet.length - 1){
     scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
     result.classList.remove("hidden");
   } else{
     currentNum++;
     setQuiz();
   }

 });
}
