import Hero from '@/components/hero'
import Loading from '@/components/loading'
import { NextPage } from 'next'


interface Props {}


const Page: NextPage<Props> =async ({}) => {
  return (
    <Hero/>
    // <Loading/>
  )
}

export default Page