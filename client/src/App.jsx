import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"

function App() {
  return (
    <div className='bg-orange-500'>
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
