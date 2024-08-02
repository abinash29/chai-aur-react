import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed , setcharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass =""
    let char=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@#$%^&*()_{}[]"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,characterAllowed, setPassword])

    
    const copyPasswordTOClipBoard = useCallback(() => {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(() =>{
    passwordGenerator()
  }, [length,numberAllowed,characterAllowed,passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md bg-gray-500 mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500'> 
        <h1 className='text-white text-center my-3'>PassWord Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
           type="text" 
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='Password'
           readOnly
           ref={passwordRef}
           />
           
           <button 
           onClick={copyPasswordTOClipBoard}
           className=' outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100} 
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
             />

             <label>Length: {length}</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() =>{
                setnumberAllowed((prev) => !prev);
              }}
              />
              <label>Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={characterAllowed}
              id='characterInput'
              onChange={() =>{
                setcharacterAllowed((prev) => !prev);
              }}
              />
              <label>Characters</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
