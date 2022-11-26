import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Authentication from "./components/bankid/Authentication";
import Boligverdi from "./components/boligverdi/Boligverdi";
import BoligverdiInfo from "./components/boligverdi-info/BoligverdiInfo";
import Email from "./components/emailside/Email";
import ScrollToTop from "./components/scrollToTop";
import StopPage from "./components/stopPage/StopPage";
import mixpanel from 'mixpanel-browser';

function App() {
  mixpanel.init('243fa50cf85ae67fa64d352af6399dcb', {debug: true});
  mixpanel.track('Sign up');
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/bankid" element={<Authentication />} />
          <Route path="/boligverdi" element={<Boligverdi />} />
          <Route path="/boligverdiInfo" element={<BoligverdiInfo />} />
          <Route path="/email" element={<Email />} />
          <Route path="/stopPage" element={<StopPage />} />
          <Route path="/*" element={<Authentication />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
