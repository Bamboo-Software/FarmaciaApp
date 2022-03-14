import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import Contexto from "./contexto/contexto";

import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin';
Kommunicate.init("38ceb783203e68ee92ec14697813229cd" , {"popupWidget":true,"automaticChatOpenOnNavigation":true})
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Contexto>
        <App />
      </Contexto>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
