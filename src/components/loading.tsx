import { NextPage } from 'next'

interface Props {}

const Loader: NextPage<Props> = ({}) => {
  return <div className='grid h-screen items-center'>
<div className="text-center">
  <div
    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black-500  dark:border-white-500 mx-auto"
  ></div>
  <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
  <p className="text-zinc-600 dark:text-zinc-400">
    
  </p>
</div>

  </div>
}

export default Loader