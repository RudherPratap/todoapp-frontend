import { useState } from 'react'
import Head from './components/todohead'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div><Head/></div>
    </>
  )
}

export default App
