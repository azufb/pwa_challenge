import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Counter } from './components/Counter';
import { DummyRequestNotification } from './components/DummyRequestNotification';
import { urlBase64ToUint8Array } from './tools';

const App = () =>{

  setInterval(() => {
    const today: Date = new Date();
    const hour: number = today.getHours();
    const minute: number = today.getMinutes();
    const second: number = today.getSeconds();
    console.log("hour", hour)
    console.log("minute", minute)
    console.log("second", second);
    
    navigator.serviceWorker.register("./service-worker.js")
    .then(async (registration) =>{
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        return subscription;
      }

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/vapidPublicKey`);
      const vapidPublicKey = await response.text();
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });
    }).then((subscription: PushSubscription | undefined) => {
      fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          subscription: subscription
        })
      })

      // プッシュ通知
      fetch(`${process.env.REACT_APP_BASE_URL}/pushNotification`, {
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

      // if (hour === 12 && minute === 0) {
      //   // プッシュ通知
      //   fetch(`${process.env.REACT_APP_BASE_URL}/pushNotification`, {
      //     method: "post",
      //     headers: {
      //       "Content-type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       subscription: subscription
      //     })
      //   }).then((response) => {
      //     console.log("response", response);
      //   })
      // }
    })
  }, 10000)

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
