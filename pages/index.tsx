import type { NextPage } from 'next'
import Head from 'next/head'

import { useAppSelector, useAppDispatch } from '../store'
import { increment, decrement } from '../store/modules/counter'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(st => st.counter)

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
        <h2>Count is: {count}</h2>
        <button className='p-4 bg-indigo-200 mr-4' onClick={() => dispatch(decrement(1))}>
          -
        </button>
        <button className='p-4 bg-indigo-200' onClick={() => dispatch(increment(1))}>
          +
        </button>
      </main>
    </div>
  )
}

export default Home
