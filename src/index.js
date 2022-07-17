import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { Provider } from 'react-redux';
import store from "./store/index"

const firebaseConfig = {
  apiKey: "AIzaSyBWj_nJvti6XzJWBpOd97jy_1cdMkfPPVw",
  authDomain: "webchat-905cc.firebaseapp.com",
  projectId: "webchat-905cc",
  storageBucket: "webchat-905cc.appspot.com",
  messagingSenderId: "725730094103",
  appId: "1:725730094103:web:3c0526b0321d34bdcbc052",
  measurementId: "G-WKJGN0FGTQ"
};

const app = initializeApp(firebaseConfig);

window.store = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
