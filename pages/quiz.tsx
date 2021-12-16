import QuizEndScreen from '@Components/QuizEndScreen'
import QuizDisplay from '@Components/QuizDisplay'
import useTimer from '@Hooks/useTimer'
import useQuiz, { QuizApiResponse } from '@Hooks/useQuiz'
import fetcher from '@Lib/fetcher'
import { categoryList, difficultyList, validateTags } from '@Lib/quizData'
import type { GetServerSidePropsContext } from 'next'

export default function Quiz({ data }:{ data:QuizApiResponse[] }) {
  const [ page, totalPages, answerList, question, options, multipleAnswers, questionState, score, isOver, toggleAnswer, submitAnswers, nextQuestion ] = useQuiz(data)

  const [ timeElapsed, { end } ] = useTimer(true)

  return (
    <div className='justify-self-center self-center container'>
      {isOver ?
      <QuizEndScreen {...{ score, totalPages, timeElapsed }} />
      :
      <QuizDisplay {...{ page, totalPages, answerList, question, options, multipleAnswers, questionState, toggleAnswer, submitAnswers, nextQuestion, end }} />
      }
    </div>
  )
}

export const getServerSideProps = async ({ query }:GetServerSidePropsContext) => {
  const { category, difficulty, tags } = query

  if((typeof category === 'string') && (typeof difficulty === 'string') && (typeof tags === 'string')){ //If parameters exist and are strings
    if(categoryList.includes(category) && difficultyList.includes(difficulty) && validateTags(tags) ) { //And said parameters are included in the lists
      
      //Then proceed to fetch the quiz
      const params:{ [key:string] : string|number } = {
        apiKey: process.env.QUIZ_KEY as string,
        limit: 10
      }

      if(category !== 'any') params['category'] = category
      if(difficulty !== 'any') params['difficulty'] = difficulty
      if(tags !== 'none') params['tags'] = tags

      const data = await fetcher<QuizApiResponse[]>(process.env.QUIZ_API as string, params)

      if(data) {
        return { props: { data } }
      }
    }
  }

  return {
    props: {},
    redirect: {
      destination: '/?error=true',
      permanent: false
    }
  }
}