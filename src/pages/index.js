import Header from '@/components/ui/Header'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Header></Header>
  
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga est libero beatae totam possimus rerum officia perspiciatis harum, praesentium inventore dolores eligendi suscipit. Dignissimos corrupti velit aspernatur ducimus, sunt suscipit.</h1>
    </main>
  )
}
