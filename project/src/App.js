import * as React from 'react';
import './App.css';

import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'

function App() {

  return (
    <div className="App">
      <Navbar />
      <Main />
      <Footer />
    </div>
    
  );
}

export default App;
