import Button from '@Components/Button'
import Select from '@Components/Select'
import Link from 'next/link'
import { categoryList, difficultyList } from '@Lib/quizData'
import { useState } from 'react'

export default function Home() {
  const [ category, setCategory ] = useState(categoryList[0])
  const [ difficulty, setDifficulty ] = useState(difficultyList[0])

  return (
    <div className='justify-self-center self-center container'>
      <h1 className='sm:text-6xl text-3xl font-bold text-center'>QuizApp - Devjam</h1>
      <div className='py-3 flex flex-col'>
        <div className='p-3 flex flex-col items-center'>
          <h1 className='text-center'>Select topic: </h1>
          <Select options={categoryList} className='w-full' onChange={index => setCategory(categoryList[index])} />
        </div>
        <div className='p-3 flex flex-col items-center'>
          <h1 className='text-center'>Select difficulty: </h1>
          <Select options={difficultyList} className='w-full' onChange={index => setDifficulty(difficultyList[index])} />
        </div>
      </div>
      <div className='text-center'>
        <Link href={`/quiz?category=${category}&difficulty=${difficulty}`}>
          <a>
            <Button>
              Start Quiz!
            </Button>
          </a>
        </Link>
      </div>
    </div>
  )
}