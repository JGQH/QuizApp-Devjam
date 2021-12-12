import Button from '@Components/Button'
import Select from '@Components/Select'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className='justify-self-center self-center container'>
      <h1 className='sm:text-6xl text-3xl font-bold text-center'>QuizApp - Devjam</h1>
      <div className='py-3 flex flex-col'>
        <div className='p-3 flex flex-col items-center'>
          <h1 className='text-center'>Select topic: </h1>
          <Select options={['Linux', 'PHP', 'JavaScript']} className='w-full' />
        </div>
        <div className='p-3 flex flex-col items-center'>
          <h1 className='text-center'>Select difficulty: </h1>
          <Select options={['Any', 'Easy', 'Medium', 'Hard']} className='w-full' />
        </div>
      </div>
      <div className='text-center'>
        <Button>
          Start Quiz!
        </Button>
      </div>
    </div>
  )
}

export default Home
