import fetcher from '@Lib/fetcher'
import { categoryList, difficultyList } from '@Lib/quizData'
import type { GetServerSidePropsContext } from 'next'

export default function Quiz({ data }:{ data:QuizApiResponse[] }) {
  return (
    <div>
      {data.map((question, key1) => (
        <div key={key1}>
          <h1>{question.question}</h1>
          <ul>
            {Object.keys(question.answers).map((answer, key2) => (
              <li key={key2}>
                {question.answers[answer as keyof typeof question.answers]}
                {/* All of this will be replaced by different objects, this is just for testing */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

interface QuizApiResponse {
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
  multiple_correct_answers: boolean
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

export const getServerSideProps = async ({ query }:GetServerSidePropsContext) => {
  const { category, difficulty } = query

  if((typeof category === 'string') && (typeof difficulty === 'string')){ //If parameters exist and are strings
    if(categoryList.includes(category) && difficultyList.includes(difficulty)) { //And said parameters are included in the lists
      
      //Then proceed to fetch the quiz
      const params:{ [key:string] : string|number } = {
        apiKey: process.env.QUIZ_KEY as string,
        limit: 10
      }

      if(category !== 'any') params['category'] = category
      if(difficulty !== 'any') params['difficulty'] = difficulty

      const data = await fetcher<QuizApiResponse[]>(process.env.QUIZ_API as string, params)

      if(data) {
        return { props: { data } }
      }
    }
  }

  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}