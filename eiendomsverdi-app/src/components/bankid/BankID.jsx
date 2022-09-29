import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './bankid.css'

const BankID = () => {

  const [name, setName] = useState('');


  const handleInput = event => {
    setName(event.target.value);
  };

  const logValue = () => {
    console.log(name);
  };

  // Gjør det bare mulig å taste inn tall i inputen
  const allowOnlyNumbersInput = event => {
    !/[0-9]/.test(event.key) && event.preventDefault()
  }

  return (
    <div className='bankid'>

      <div className='bb-bankid'>
        <Link to='/' className='linkMain'>Gå tilbake til mainpage</Link>
      </div>

      <div className='bb-innlogging'>
        <h1>Innlogging til Bulder Bank</h1>
      </div>

      <div className='bb-fødselsnummer'>
        <form>
          <h2>Hva er ditt fødselsnummer:</h2>
        
            <input onChange={handleInput} className='fødselsnummer-login' type="text"
              placeholder='11 siffer' maxLength='11' required='true' onKeyPress={allowOnlyNumbersInput} />
      
          <Link to=''>
          <button onClick={logValue} className="fødselsnummer-neste">
            Neste
          </button>
        </Link>
        </form>
  
      </div>

    </div>

  )
}

export default BankID