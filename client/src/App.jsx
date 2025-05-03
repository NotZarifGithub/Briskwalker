import { Router, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Journeys from './pages/Journeys'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Vision from './pages/Vision'
import Faq from './pages/Faq'

function App() {
  return (
    <div className='bg-orange-500 py-8 flex flex-col gap-5 px-6 sm:px-12'>
      <Navbar/>
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path= '/journeys' element={<Journeys/>}/>
        <Route path='/vision' element={<Vision/>}/>
        <Route path='/faq' element={<Faq/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
