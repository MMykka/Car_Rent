import { Footer, Navbar } from '@/components'
import './globals.css'


export const metadata = {
  title: 'Car Rent',
  description: 'Discover the best cars in the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='relative'>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
