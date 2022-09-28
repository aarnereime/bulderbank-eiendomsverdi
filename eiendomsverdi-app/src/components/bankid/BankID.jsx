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
          <label>
            <input onChange={handleInput} className='fødselsnummer-login' type="text" placeholder='11 siffer' maxLength='11'/>
          </label>
        </form>

        <Link to=''>
          <button onClick={logValue} className="fødselsnummer-neste">
            Neste
          </button>
        </Link>
  
      </div>

    </div>

  )
}

export default BankID