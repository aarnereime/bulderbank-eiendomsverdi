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


function App(props) {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Main mixpanel={props.mixpanel}/>} />
          <Route path="/bankid" element={<Authentication mixpanel={props.mixpanel}/>} />
          <Route path="/boligverdi" element={<Boligverdi mixpanel={props.mixpanel}/>} />
          <Route path="/boligverdiInfo" element={<BoligverdiInfo mixpanel={props.mixpanel}/>} />
          <Route path="/email" element={<Email mixpanel={props.mixpanel}/>} />
          <Route path="/stopPage" element={<StopPage mixpanel={props.mixpanel}/>} />
          <Route path="/*" element={<Authentication mixpanel={props.mixpanel}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
