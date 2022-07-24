import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions]=useState([])

useEffect(()=>{
fetch('http://localhost:4000/questions')
.then(response=>response.json())
.then(data=> {
  console.log(data);
  setQuestions(data)})
.catch(error=>console.log(error))
},[]);


function handleNewQuestionAdd(newQuestion){
  setQuestions([...questions,newQuestion])
  console.log(newQuestion);
}

function deleteItem(deletedQuestion){
setQuestions(()=>questions.filter(question=>question.id !== deletedQuestion.id))
}

function updateAnswer(updatedAnswer){
setQuestions(questions.map(question=>{
  if(question.id === updatedAnswer.id) return updatedAnswer
 return question;
}));
}



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleNewQuestionAdd={handleNewQuestionAdd}/> : <QuestionList questions={questions} deleteItem={deleteItem} updateAnswer={updateAnswer}/>}
    </main>
  );
}

export default App;
