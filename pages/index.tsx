import Button from '@Components/Button'
import Select from '@Components/Select'
import MultiSelect from '@Components/MultiSelect'
import Link from 'next/link'
import { categoryList, difficultyList, tagList } from '@Lib/quizData'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import useToggle from '@Hooks/useToggle'

export default function Home() {
  const { query:{ error } } = useRouter()

  const [ category, setCategory ] = useState(categoryList[0])
  const [ difficulty, setDifficulty ] = useState(difficultyList[0])
  const [ tags, setTags ] = useState<string[]>([])

  const [ loading, toggleLoading ] = useToggle(true)

  useEffect(() => {
    toggleLoading()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div className='justify-self-center self-center container'>
      <h1 className='sm:text-6xl text-3xl font-bold text-center'>QuizApp - Devjam</h1>
      <div className='py-3 flex flex-col'>
        <div className='p-3 flex flex-col items-center'>
          <h1 className='text-center'>Select topic: </h1>
          <Select options={categoryList} className='w-full' onChange={value => setCategory(value)} />
        </div>
        <div className='p-3 flex flex-col items-center'>
          <h1 className='text-center'>Select difficulty: </h1>
          <Select options={difficultyList} className='w-full' onChange={value => setDifficulty(value)} />
        </div>
        <div className='p-3 flex flex-col items-center'>
          <h1 className='text-center'>Select tags: </h1>
          <MultiSelect options={tagList} className='w-full' onChange={list => setTags(list)} />
        </div>
      </div>
      {error &&
      <div className='text-center italic pb-3'>
        <p>There`&apos;`s been an error with the quiz, try a different combination of category and tags</p>
      </div>}
      <div className='text-center p-3'>
        <Link href={`/quiz?category=${category}&difficulty=${difficulty}&tags=${tags.length > 0 ? tags.join(',') : 'none'}`}>
          <a>
            <Button onClick={() => {
              !error && toggleLoading()
              Router.push('/', undefined, { 'shallow': true })
            }} disabled={loading}>
              Start Quiz!
            </Button>
          </a>
        </Link>
      </div>
    </div>
  )
}