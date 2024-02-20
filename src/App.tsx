import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Counter } from './components/Counter';
import { DummyRequestNotification } from './components/DummyRequestNotification';

const App = () =>{
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
