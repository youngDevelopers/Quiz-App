import React from 'react';

//importing types
import { AnswerObjectType } from "../App";

// importing Styles
import { Wrapper, ButtonWrapper } from './Question.styles';


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
    <Wrapper>
      <p className="number">
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      {/*dangerouslySetHTML since it is injected from an api or in html form */}
      <div>
        {answers &&
          answers.map((answer) => (
            <ButtonWrapper
              key={answer}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
            >
              <button
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
              >
                {/*button is disabled depending on whether if the user has made a choice or not that it why it is boolean  */}
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </ButtonWrapper>
          ))}
        -
      </div>
    </Wrapper>
  );
}

export default Question
