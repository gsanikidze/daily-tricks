import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Daily Tricks</title>
        <meta name="description" content="Daily Tricks" />
      </Head>

      <main>
        <h1 className="text-indigo-600 font-bold">
          Some Code Samples
        </h1>
      </main>
    </div>
  )
}

export default Home
