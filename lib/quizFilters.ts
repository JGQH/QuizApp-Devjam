import type { QuizApiResponse } from '@Hooks/useQuiz'

export function quizOptions({ answers }:QuizApiResponse) {
  //From the answers object, get the possible answers that are not null
  return Object.entries(answers).map(([_, option]) => option).filter(function (v): v is string {
    return v !== null
  })
}

export function quizAnswers({ correct_answers }:QuizApiResponse) {
  //Returns index of all answers that are true

  const answers = Object.entries(correct_answers).map(([_, val], index) => [index, val] as const)

  return answers.filter(([_, v]) => v === 'true').map(([ i ]) => i)
}

export function quizValidateAnswers(markedAnswers:number[], correctAnswers:number[]) {
  //If the amount of answers doesn't match, it is already false
  if(markedAnswers.length !== correctAnswers.length) return false

  //All marked answers must match the list of correct answers
  return markedAnswers.every(v => correctAnswers.includes(v))
}