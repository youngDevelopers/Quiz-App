import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionsState = Question & { answers: string[] };//combining the correct and incorrect answers array

export enum difficulty_tpye {//types for difficulty level
    EASY= "easy",
    MEDIUM = "medium",
    HARD = "hard",
}


export const fetchQuizQuestions = async (amount: number, difficulty: difficulty_tpye ) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();//fetching the data and converting into json NB-Used 2 awaits firstly for the fetch and other for conversion
    return data.results.map( (question: Question) =>( //maping through each question
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers , question.correct_answer])//join incorrect_answers array and correct_answer and form a random array for answers
        }
    ))
};