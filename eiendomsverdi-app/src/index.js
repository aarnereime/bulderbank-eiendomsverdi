import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mixpanel from 'mixpanel-browser';

const root = ReactDOM.createRoot(document.getElementById('root'));

mixpanel.init('243fa50cf85ae67fa64d352af6399dcb', {debug: false});
mixpanel.track('Sign up');

//decide if you want reacts strictmode on or off.
let smode = true;

smode ? root.render(
  <React.StrictMode>
    <App mixpanel = {mixpanel}/>
  </React.StrictMode>
) : root.render(<App mixpanel = {mixpanel}/>)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();