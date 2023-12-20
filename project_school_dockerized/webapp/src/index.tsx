import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { useEffect, useState } from "react";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);




const AuthProvider = ()=>{
  const AuthContext = React.createContext<Boolean | null>(false);
  const [auth, setAuth] = useState<Boolean>(false);

  function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

  useEffect(()=>{
      const token = getCookie('token');
      if(token != ""){
          setAuth(true);
      } 

      console.log(auth)
  });

  return(
    <AuthContext.Provider value={auth}>
        <App/>
    </AuthContext.Provider>
  );
}

root.render(
  <React.StrictMode>
        <AuthProvider/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
