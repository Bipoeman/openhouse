import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import logo from './KNACKSATlogo-removebg-preview.png'

import { Facebook, Instagram } from "react-feather";

ReactDOM.render(
  <React.StrictMode>
    <header>
      <a style={{ textDecoration: 'none' }} href="" className="logo">
        <img src={logo} alt="KNACKSAT logo" className='m-2' style={{ width: '65px', height: 'auto' }} />
      </a>
      <ul style={{ display: 'flex' }}>
        <a
          href="https://www.instagram.com/knacksat3"
          target="_blank"
          rel="noreferrer"
          title="intragram"
        >
          <Instagram color="#ffffff" size={28} />
        </a> {'    '}
        <a
          href="https://www.facebook.com/KNACKSAT3"
          target="_blank"
          rel="noreferrer"
          title="facebook"
        >
          <Facebook color="#ffffff" size={28} />
        </a>
      </ul>
    </header>
    <body>
      <App />
    </body>
    <footer>Made with ❤️ by <a
      href="https://www.instagram.com/gtar.18"
      target="_blank"
      rel="noreferrer">gtar.18</a></footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();