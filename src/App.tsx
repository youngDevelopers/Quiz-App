import React, {useState} from 'react';

//Import Components
import Question from './components/Question';

//Importing types
import { QuestionsState, difficulty_tpye, fetchQuizQuestions } from "./api";

export type AnswerObjectType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] =useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObjectType[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TOTAL_QUESTIONS = 10;
  //console.log(fetchQuizQuestions(TOTAL_QUESTIONS, difficulty_tpye.EASY));

  const startQuiz = async () => { //function for api call wen we start the quiz
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(//await this function since it fetches data from the api
      TOTAL_QUESTIONS,
      difficulty_tpye.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const selectAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {//we need kto specify the type of the event
    
  };

  const nextQuestion = () => {//a function triggered for the next question

  };



  return (
    <div className="App">
      <h1>QUIZ GAME</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && (
        <div>
          <p>Loading Questions.....</p>
          <p>Add a Spinner</p>
        </div>
      )}
      {!loading && !gameOver && (
        <Question
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={selectAnswer}
        />
      )}
      {
        !gameOver && !loading && userAnswers.length === number +1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null
      }
    </div>
  );
}

export default App;
