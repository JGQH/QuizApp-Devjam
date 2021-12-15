import Button from '@Components/Button'
import CheckBox from '@Components/CheckBox'
import fetcher from '@Lib/fetcher'
import { categoryList, difficultyList, validateTags } from '@Lib/quizData'
import useQuiz, { QuizApiResponse } from '@Hooks/useQuiz'
import type { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import useTimer from '@Hooks/useTimer'

export default function Quiz({ data }:{ data:QuizApiResponse[] }) {
  const [ page, totalPages, answerList, question, options, multipleAnswers, questionState, score, isOver, toggleAnswer, submitAnswers, nextQuestion ] = useQuiz(data)

  const [ timeElapsed, { end } ] = useTimer(true)

  const percentage = Math.round(100 * score / totalPages)
  const answered = questionState === 'unanswered'

  function handleClick() {
    if(answered) {
      submitAnswers()
      return
    }

    if(!nextQuestion()) {
      end()
    }
  }

  return (
    <div className='justify-self-center self-center container'>
      {isOver ?
      <>
        <div className='font-bold text-center'>
          <h1 className='sm:text-5xl'>Finished!</h1>
          <h1 className='sm:text-6xl text-3xl'>Score: {score}/{totalPages} ({percentage}%)</h1>
          <p className='p-3'>
            {(percentage >= 50 ?
            'Congratulations, you passed the test!'
            :
            'Hope you do better next time!')}
          </p>
          <p className='p-3'>
            Total time: {timeElapsed}
          </p>
        </div>
        <div className='text-center p-3'>
          <Link href={'/'}>
            <a>
              <Button>
                Home
              </Button>
            </a>
          </Link>
        </div>
      </>
      :
      <>
        <div className='font-bold text-center'>
          <h1 className='sm:text-5xl'>Question {page}/{totalPages}:</h1>
          <h1 className='sm:text-6xl'>{question}</h1>
          <p className='p-3'>({multipleAnswers ? 'Multiple Answer' : 'Single Answer'})</p>
        </div>
        <div className='flex flex-col sm:flex-row flex-wrap p-3 gap-3'>
          {options.map((option, key) => (
            <CheckBox key={option} className='basis-1/3 grow' onChange={value => toggleAnswer(key, value)} isCorrect={answerList.includes(key)} disabled={!answered} >
              {option}
            </CheckBox>
          ))}
        </div>
        <div className='text-center p-3'>
          <Button onClick={handleClick}>
            {answered ? 'Submit Answers' : (page === totalPages ? 'End Quiz' : 'Next Question')}
          </Button>
        </div>
        {!answered &&
          <div className='text-center p-3'>
            <h1 className='capitalize'>{questionState}</h1>
          </div>
        }
      </>
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