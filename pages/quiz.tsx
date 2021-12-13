import fetcher from '@Lib/fetcher'
import { categoryList, difficultyList, validateTags } from '@Lib/quizData'
import useQuiz, { QuizApiResponse } from '@Hooks/useQuiz'
import type { GetServerSidePropsContext } from 'next'
import Button from '@Components/Button'

export default function Quiz({ data }:{ data:QuizApiResponse[] }) {
  const [ question, answers, multipleAnswers, nextQuestion, isOver ] = useQuiz(data)

  return (
    <div className='justify-self-center self-center container'>
      <div className='font-bold text-center'>
        <h1 className='sm:text-5xl font-bold text-center'>Question:</h1>
        <h1 className='sm:text-6xl text-3xl font-bold text-center'>{question}</h1>
        {multipleAnswers && <p>Note: Multiple answers allowed</p>}
      </div>
      <div className='flex flex-col sm:flex-row flex-wrap p-3 gap-3'>
        {answers.map((answer, key) => (
          <div key={key} className='basis-1/3 grow text-center'>
            {answer}
          </div>
        ))}
      </div>
      <div className='text-center p-3'>
        <Button onClick={nextQuestion} disabled={isOver}>
          Next Question
        </Button>
      </div>
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