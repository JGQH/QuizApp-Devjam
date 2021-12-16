import Button from '@Components/Button'
import CheckBox from '@Components/CheckBox'

interface QuizDisplayProps {
  page: number
  totalPages: number
  answerList: number[]
  question: string
  options: string[]
  multipleAnswers: boolean
  questionState: 'unanswered'|'correct'|'incorrect'
  toggleAnswer: (index:number, isMarked:boolean) => void
  submitAnswers: () => void
  nextQuestion: () => boolean
  end: () => void
}

export default function QuizDisplay({ page, totalPages, answerList, question, options, multipleAnswers, questionState, toggleAnswer, submitAnswers, nextQuestion, end }:QuizDisplayProps) {

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
  )
}