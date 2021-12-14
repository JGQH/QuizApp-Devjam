import { useState } from 'react'
import useList from './useList'
import useToggle from './useToggle'

export interface QuizApiResponse {
  id: number
  question: string
  description: string | null
  answers: {
    answer_a: string | null
    answer_b: string | null
    answer_c: string | null
    answer_d: string | null
    answer_e: string | null
    answer_f: string | null
  }
  multiple_correct_answers: 'true'|'false'
  correct_answers: {
    answer_a_correct: 'true'|'false'
    answer_b_correct: 'true'|'false'
    answer_c_correct: 'true'|'false'
    answer_d_correct: 'true'|'false'
    answer_e_correct: 'true'|'false'
    answer_f_correct: 'true'|'false'
  }
  explanation: string | null
  tip: null
  tags: { name: string }[]
  category: string
  difficulty: string
}

function notEmpty<T>(value:T | null): value is T {
  return value !== null
}

export default function useQuiz(data:QuizApiResponse[]) {
  const [ index, setIndex ] = useState(0)
  const [ isOver, doOver ] = useToggle(false)
  const [ markedAnswers, { clear, push, remove } ] = useList<number>()
  const [ questionState, setQuestionState ] = useState<'unanswered'|'correct'|'incorrect'>('unanswered')

  function nextQuestion() {
    const newIndex = index + 1
    if(data.length === newIndex){
      doOver()
    } else {
      clear()
      setQuestionState('unanswered')
      setIndex(newIndex)
    }
  }

  function toggleAnswer(index:number, isMarked:boolean) {
    if(isMarked) {
      push(index)
    }else{
      remove(index)
    }
  }

  const currentQuestion = data[index]

  const options = Object.entries(currentQuestion.answers).map(([_, option]) => option).filter(notEmpty)

  function submitAnswers() {
    const realAnswers = Object.entries(currentQuestion.correct_answers).map(([_, val]) => val)

    const validAnswers = realAnswers.filter(a => a === 'true').length

    //If all marked answers are true and match the amount of valid answers
    if(markedAnswers.filter(i => realAnswers[i] === 'true').length === validAnswers) {
      setQuestionState('correct')
    } else {
      setQuestionState('incorrect')
    }
  }

  return [
    index + 1,
    data.length,
    currentQuestion.question,
    options,
    currentQuestion.multiple_correct_answers === 'true',
    questionState,
    isOver,
    toggleAnswer,
    submitAnswers,
    nextQuestion
  ] as const
}