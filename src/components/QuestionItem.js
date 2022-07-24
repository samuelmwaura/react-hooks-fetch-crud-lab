import React from "react";

function QuestionItem({ question,deleteItem,updateAnswer }) {
  const { id, prompt,answers,correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


  function handleQuestionDelete(){
  
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:'DELETE'
    })
    .then(response=>response.json())
    .then(data=>deleteItem(question))
    .catch(error=>console.log(error));

  }

  function handleChoiceChange(event){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'Application/json',
        "Accept":"Application/json"
      },
      body:JSON.stringify({...question,correctIndex:event.target.value})
    })
    .then(response=>response.json())
    .then(data=>updateAnswer(data))
    .catch(error=>console.log(error))
  }


  //there is the state that is responsible for displaying all the questions, that is the one that should just be updated and not creating another one here.
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChoiceChange}>{options}</select>
      </label>
      <button onClick={handleQuestionDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
