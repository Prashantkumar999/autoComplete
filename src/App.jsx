import { useDebugValue, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchData = async () => {
        const data = await fetch("https://dummyjson.com/recipes/search?q="+input);
        const json = await data.json()
        setApiData(json.recipes)
      }
      if (input.trim() !== "") {
        fetchData();
      } else {
        setApiData([])
      }
    }, 500)
    return () => clearTimeout(timer);

  }, [input])
  console.log(apiData)
  return (
    <>
      <div className='main-container'>
        <div className='input-container'>
          <input className='input-tag' type='text' placeholder='search here' value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        {
          input && <div className='results-div'>
          {
            apiData.map((data) => <div className='recommendation' key={data.id}>
              {data.name}
            </div>)
          }
        </div>
        }
      </div>
    </>
  )
}

export default App
