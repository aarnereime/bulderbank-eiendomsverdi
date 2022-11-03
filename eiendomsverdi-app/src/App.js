import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import BankID from "./components/bankid/BankID";
import Boligverdi from "./components/boligverdi/Boligverdi";
import BoligverdiInfo from "./components/boligverdi-info/BoligverdiInfo";
import Email from "./components/emailside/Email";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/bankid" element={<BankID />} />
          <Route path="/boligverdi" element={<Boligverdi />} />
          <Route path="/boligverdiInfo" element={<BoligverdiInfo />} />
          <Route path="/email" element={<Email />} />
          <Route path="/*" element={<BankID />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
