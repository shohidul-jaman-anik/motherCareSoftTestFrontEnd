import Header from '@/components/ui/Header'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Header></Header>
  
      <h1 className='text-center text-3xl mt-40'>Welcome to Ad-din Pharmacetucale Ltd</h1>
    </main>
  )
}
