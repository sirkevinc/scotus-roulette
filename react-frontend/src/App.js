import React, { Component } from 'react';
import gavel from './Assets/gavel.png';
import getFutureDate from './randomizer';

import './App.css';

class App extends Component {
  state = {
    spinning: false,
    date: getFutureDate(2018, 2030),
  }

  toggleSpin() {
    this.setState({ spinning: !this.state.spinning });
  }

  render() {
    const spinning = this.state.spinning;
    return (
      <div>
        <h1>Supreme Court Roulette!</h1>
        {spinning && <img src={gavel} alt="gavel" className="spinning" />}
        {!spinning && <img src={gavel} alt="gavel" className="notspinning" />}
        <button onClick={() => this.toggleSpin()}>Spin!</button>
      </div>
    );
  }
}

export default App;
