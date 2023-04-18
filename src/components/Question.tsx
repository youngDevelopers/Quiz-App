import React from 'react';

//importing types
import { AnswerObjectType } from "../App";



type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObjectType | undefined ;
  questionNr: number;
  totalQuestions: number;
};

const Question: React.FC<Props> = ({question, answers, callback,userAnswer, questionNr, totalQuestions}) => {
  return (
    <div>
      <p className="question-number">
          Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />{/*dangerouslySetHTML since it is injected from an api or in html form */}
      <div>
          {answers && answers.map( (answer) =>(
              <div key={answer}>
                  <button disabled={userAnswer ? true : false } value={answer} onClick={callback}>{/*button is disabled depending on whether if the user has made a choice or not that it why it is boolean  */}
                      <span dangerouslySetInnerHTML={{ __html: answer }} />
                  </button>
              </div>
        ))}
      </div>
    </div>
  )
}

export default Question
