import Head from 'next/head'

const TITLE = 'QuizApp  Devjam'

const DESCRIPTION = 'Simple app to solve quizzes about technology'

export default function Header() {
  return (
    <Head>
      <title>{TITLE}</title>
      <meta charSet='utf-8' />
      <meta name='description' content={DESCRIPTION} />
      <meta name='theme-color' content='#000' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
  )
}