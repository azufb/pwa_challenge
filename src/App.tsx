import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Counter } from './components/Counter';
import { DummyRequestNotification } from './components/DummyRequestNotification';

const App = () =>{

  setInterval(() => {
    const today: Date = new Date();
    const hour: number = today.getHours();
    const minute: number = today.getMinutes();
    
    navigator.serviceWorker.ready.then((registration) =>{
      return registration.pushManager.getSubscription().then(async (subscription) => {
        if (subscription) {
          const response = await fetch("./vapidPublicKey");
          const vapidPublicKey = await response.text();
          const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
          
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
          });
        }
      });
    }).then((subscription: PushSubscription | undefined) => {
      if (subscription) {
        fetch("./register", {
          method: "post",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            subscription: subscription
          })
        })

        if (hour === 12 && minute === 0) {
          // プッシュ通知
          fetch("./pushNotification", {
            method: "post",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              subscription: subscription
            })
          }).then((response) => {
            console.log("response", response);
          })
        }
      }
    })
  }, 1000)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World!
        </p>
      </header>
      <Counter />
      <DummyRequestNotification />
    </div>
  );
}

export default App;
