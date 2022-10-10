import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import BankID from './components/bankid/BankID'
import Test from "./components/test";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/bankid" element={<BankID />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
