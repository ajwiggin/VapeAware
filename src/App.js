import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.isDowloaded = window.matchMedia('(display-mode: standalone)').matches;
  }

  render() {
    if (this.isDowloaded) {
      return (
        <div className="App">
          <header className="App-header">
            NEAT Vaping Lab!
          </header>
        </div>
      );
    }
    return <h1>Add to homescreen!</h1>;
  }
}

export default App;