import './App.scss'
import { Routes , Route } from 'react-router-dom'
import CityPage from './pages/CityPage/CityPage'
import HomePage from './pages/HomePage/HomePage'

function App() {

  return (
    <main className='main-content'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/city/:lat/:lon' element={<CityPage />} />
      </Routes>
    </main>
  )
}

export default App
