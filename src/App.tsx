import React, {useState} from 'react';
import { Circles } from 'react-loader-spinner';

//Import Components
import Question from './components/Question';

//Importing types
import { QuestionsState, difficulty_tpye, fetchQuizQuestions } from "./api";

//Importing styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObjectType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] =useState(0);//NB the numbers start at zero since our array indexes start at zero
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
    if(!gameOver){
      //Answer from the user
      const answer = e.currentTarget.value;

      //check the answer if correct
      const correct = questions[number].correct_answer === answer;

      //add score if answer is correct
      if(correct){
        setScore( prev => prev + 1)
      };

      //Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };

      //an array of userANSWERS
      setUserAnswers(prev => [...prev, answerObject]); 
    }
  };

  //console.log(userAnswers)

  const nextQuestion = () => {//a function triggered for the next question
    //-set the value of the next questiom
    const nextQuestionNumber: number = number + 1;

    //check if the next question number is not greater than the number of questions
    if( nextQuestionNumber === TOTAL_QUESTIONS ){
      setGameOver(true);
    }else{
      setNumber(nextQuestionNumber);
    }

  };



  return (
    <>
      <GlobalStyle />
      <Wrapper>
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
            <Circles
              height="80"
              width="80"
              color="#fff"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
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
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
