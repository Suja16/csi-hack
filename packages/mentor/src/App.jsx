import { useState } from 'react'
import './App.css'
import MentorsTable from './components/MentorsTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MentorsTable/>
    </>
  )
}

export default App
