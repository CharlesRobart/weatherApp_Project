import './App.scss'
import { Routes , Route } from 'react-router-dom'
import CityPage from './pages/CityPage/CityPage'
import HomePage from './pages/HomePage/HomePage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cityPage' element={<CityPage />} />
      </Routes>
    </>
  )
}

export default App
