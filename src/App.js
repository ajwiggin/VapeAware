import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const isDowloaded = window.matchMedia('(display-mode: standalone)').matches;

  if (isDowloaded) {
    return (
      <div className="App">
        <header className="App-header">
          NEAT Vaping Lab!
        </header>
      </div>
    );
  } else {
    return <h1>Add to homescreen!</h1>
  }
}

export default App;
