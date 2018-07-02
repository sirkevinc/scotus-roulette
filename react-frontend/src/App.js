import React, { Component } from 'react';
import gavel from './Assets/gavel.png';
import { getFutureDate, randomizeParty, checkJudgeAge, getRandomJudge } from './randomizer';
import Judges from './data/judgeData';
import RedX from './Assets/redx.png';

import './App.css';

class App extends Component {
  state = {
    paused: true,
    date: getFutureDate(2018, 2030),
    congress: randomizeParty(),
    presidency: randomizeParty(),
    judges: Judges.CurrentJustices,
    repJudges: Judges.RepJudges,
    demJudges: Judges.DemJudges,
    removed: [],
    replacements: [],
    buttonTitles: ['Remove', 'Replace', 'THIS WILL NOT Reset'],
    buttonIndex: 0
  }
    
  getJudges(date) {
    const removed = [...this.state.removed];
    const staying = this.state.judges.filter(judge => {
      if (checkJudgeAge(judge, date) < 80) {
        return judge;
      }
      removed.push(judge);
    })

    this.setState({removed: removed});
    return staying;
  }

  getReplacements(date) {
    const replacements = [];
    let repJudges = [...this.state.repJudges];
    let demJudges = [...this.state.demJudges];
    let replacementNum = this.state.removed.length;
    // get parties
    if (date > 2020) {
      this.setState({
      presidency: randomizeParty(),
      congress: randomizeParty(),
      })
    }
    if (this.state.presidency !== this.state.congress) {
      alert("You just got Merrick Garland'd!")
    } else {
      while (replacementNum > 0) {
        if (this.state.presidency === "Republican") {
          const replacement = getRandomJudge(repJudges);
          const newRepJudges = repJudges.filter(judge => {
            return judge.name !== replacement.name
          });
          replacements.push(replacement);
          repJudges = [...newRepJudges];
        }
        else {
          const replacement = getRandomJudge(demJudges);
          const newDemJudges = demJudges.filter(judge => {
            return judge.name !== replacement.name
          });
          replacements.push(replacement);
          demJudges = [...newDemJudges];
        }
        replacementNum -= 1;
      }
    }
    this.setState({ replacements: replacements });
    console.log(this.state);
    // }
  }

  toggleSpin(date) {
    this.setState({ date: getFutureDate(2018, 2030) });
    this.setState({ judges: this.getJudges(date) });
    this.setState({ paused: !this.state.paused });
    this.setState({ buttonIndex: this.state.buttonIndex === 2 ? 0 : this.state.buttonIndex + 1})
    {this.state.buttonIndex === 1 ? this.getReplacements(this.state.date) : null }
  }

  /* 
  takeStep() {
    // check if any justices retired

    // check if congress has shifted (every 2 years)

    // check if presidency has shifted (every 4 years)
  }
  
  */

  returnClassNames(paused) {
    if (paused) {
      return 'spinning paused';
    }
    return 'spinning';
  }  

  render() {
    // console.log(Judges);
    const { date, paused } = this.state;
    const buttonTitle = this.state.buttonTitles[this.state.buttonIndex];
    return (
      <div>
        <h1>Supreme Court Roulette!</h1>
        <h3>Year: {this.state.date}</h3>
        <h3>Presidency: {this.state.presidency}</h3>
        <h3>Congress: {this.state.congress}</h3>
        <img src={gavel} alt="gavel" className={this.returnClassNames(paused)} />
        <button onClick={() => this.toggleSpin(date)}>{buttonTitle}!</button>
          <div className="judge-container">
            {this.state.replacements.map(judge => {
              return (
                <div className="judge" key={judge.id+'a'}>
                  <img src={judge.picture} height="200" alt={judge.name} className={`judge-pic__${judge.party}`}/>
                    <p>New!!!!</p>
                    <p>{judge.name}</p>
                    <p></p>
                </div>
              )
            })}
            {this.state.judges.map(judge => {
              return (
                <div className="judge" key={judge.id+'a'}>
                  <img src={judge.picture} height="200" alt={judge.name} className={`judge-pic__${judge.party}`} />
                    <p>{judge.name}</p>
                </div>
            )
            })}
            {this.state.removed.map(judge => {
              return (
                <div className="judge" key={judge.id+'d'}>
                  <img src={judge.picture} height="200" alt={judge.name} className={`judge-pic__${judge.party}`} />
                  <img src={RedX} height="200" className="RedX" />
                    <p>{judge.name}</p>
                </div>
            )
            })}
          </div>
      </div>
    );
  }
}

export default App;
