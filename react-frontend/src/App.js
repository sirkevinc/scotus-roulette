import React, { Component } from 'react';
import gavel from './Assets/gavel.png';
import { getFutureDate } from './randomizer';
import Judges from './data/judgeData';

import './App.css';

class App extends Component {
  state = {
    spinning: false,
    date: getFutureDate(2018, 2030),
    congress: "Republican",
    presidency: "Republican"
  }

  toggleSpin() {
    this.setState({ spinning: !this.state.spinning });
  }

  render() {
    console.log(Judges);
    const spinning = this.state.spinning;
    return (
      <div>
        <h1>Supreme Court Roulette!</h1>
        {spinning && <img src={gavel} alt="gavel" className="spinning" />}
        {!spinning && <img src={gavel} alt="gavel" className="notspinning" />}
          <div className="judge-container">
            {Judges.CurrentJustices.map(judge => {
              return (
                <div className="judge">
                  <img src={judge.picture} height="200" />
                    <p>{judge.name}</p>
                </div>
            )
            })}
          </div>
        <button onClick={() => this.toggleSpin()}>Spin!</button>
      </div>
    );
  }
}

export default App;
