import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [length, setLegth] = useState(8);

  const ref = useRef();
  const generatePassword = useCallback(() => {

    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) str += '1234567890'
    if (character) str += '`@#$%^&*()+><?{}~';

    for (let i = 0; i <= length; i++) {

      let num = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(num);

    }
    setPassword(pass)

  }, [number, character, length, setPassword])

  const copyToClipbord = ()=>{
    ref.current?.select();
    ref.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password);
    
  }
  useEffect(() => {
    generatePassword();
  }, [length, number, character, generatePassword])


  return (
    <>
      <h1>Password Generator</h1>
      <div className="container">
        <div className='password-container'>
          <input type="text"
            placeholder='Password'
            value={password}
            readOnly
            ref={ref}

          />
          <button
          onClick={copyToClipbord}
          >Copy</button>
        </div>
        <div className="box">
          <input id='range' type="range"
            min={8}
            max={100}
            onChange={(e) => setLegth(e.target.value)}
          />
          <label htmlFor="range">Length:{length}</label>
          <input id='number' type="checkbox"
            defaultChecked={number}
            onChange={() => setNumber((prev) => !prev)}
          />
          <label htmlFor="number">Numbers</label>
          <input id='character' type="checkbox"
            defaultChecked={character}
            onChange={() => setCharacter((prev) => !prev)}
          />

          <label htmlFor="character">Characters</label>
        </div>
      </div>

    </>
  )
}

export default App
