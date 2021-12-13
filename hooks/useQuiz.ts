import { useState } from 'react'
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

  function nextQuestion() {
    const newIndex = index + 1
    if(data.length === newIndex){
      doOver()
    } else {
      setIndex(newIndex)
    }
  }

  const currentQuestion = data[index]

  const answers = Object.entries(currentQuestion.answers).map(([_, answer]) => answer).filter(notEmpty)

  return [ currentQuestion.question, answers, currentQuestion.multiple_correct_answers === 'true', nextQuestion, isOver ] as const
}