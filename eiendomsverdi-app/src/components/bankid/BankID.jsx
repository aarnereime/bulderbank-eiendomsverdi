import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './bankid.css'

const BankID = () => {

  const navigate = useNavigate();
  const fødselsnummerRef = useRef();

  
  const handleSubmit = event => {
    // unngår å refreshe siden
    event.preventDefault(); 

    // skriver ut verdi fra input (senere bruke denne informasjonen til API)
    console.log(fødselsnummerRef.current.value);

    // fjerner det man skrev inn i input
    event.target.reset();

    //navigerer tilbake til mainpage (senere skal denne ta oss videre til visning av eiendomwverdien)
    navigate('/');
  }

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
        <form onSubmit={handleSubmit}>
          <h2>Hva er ditt fødselsnummer:</h2>
        
          <input ref={fødselsnummerRef} required="required"  className='fødselsnummer-login' type='text'
            placeholder='11 siffer' maxLength='11' minLength='11' onKeyPress={allowOnlyNumbersInput} />
      
          <button type='submit' className="fødselsnummer-neste">
            Neste
          </button>
        
        </form>
  
      </div>

    </div>

  )
}

export default BankID