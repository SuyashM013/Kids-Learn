
import './App.css'

import { BrowserRouter as Router, Route, Routes,  Link } from 'react-router-dom'
import Home from './Components/Home'
import Games from './Components/Games'
import Learn from './Components/Learn'
import Progress from './Components/Progress'
import Account from './Components/Account'
import Quizes from './Components/Quizes'
import AlphabetQuiz from './Quizes/AlphabetQuiz'
import NumberQuiz from './Quizes/NumberQuiz'
import MCQQuiz from './Quizes/MCQQuiz'
import NumberMatchingGame from './Games/NumberMatchingGame'
import BalloonPop from './Games/BalloonPop'

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'



function App() {


  return (
    <div className='  flex w-screen  bg-pin'>


      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/games" element={<Games />} />
        <Route path="/quizes" element={<Quizes />} />
        <Route path="/account" element={<Account />} />


        <Route path="/quiz/1" element={<AlphabetQuiz />} />
        <Route path="/quiz/2" element={<NumberQuiz/>} />
        <Route path="/quiz/3" element={<MCQQuiz />} />


        <Route path="/games/1" element={ <NumberMatchingGame /> } />
        <Route path="/games/2" element={ <BalloonPop /> } />


      
      
        
      
      </Routes>

      {/* Main Content */}



    </div>
  )
}

export default App
