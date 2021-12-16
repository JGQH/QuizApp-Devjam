import Button from '@Components/Button'
import Link from 'next/link'

interface QuizEndScreenProps {
  score: number
  totalPages: number
  timeElapsed: string
}

export default function QuizEndScreen({ score, totalPages, timeElapsed }:QuizEndScreenProps) {
  const percentage = Math.round(100 * score / totalPages)

  return (
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
  )
}