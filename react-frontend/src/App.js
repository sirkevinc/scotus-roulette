import React, { Component } from 'react';
import gavel from './Assets/gavel.png';
import { getFutureDate, randomizeParty, checkJudgeAge, getRandomJudge, getRandomIndex, getRandomMessage } from './randomizer';
import Judges from './data/judgeData';
import RedX from './Assets/redx.png';
import Messages from './data/messages';

import './App.css';

class App extends Component {
  state = {
    paused: true,
    date: 2017,
    congress: 'Republican',
    presidency: 'Republican',
    judges: Judges.CurrentJustices,
    repJudges: Judges.RepJudges,
    demJudges: Judges.DemJudges,
    removed: [],
    replacements: [],
    buttonTitles: ['Remove', 'Replace', 'THIS WILL NOT Reset'],
    buttonIndex: 0
  }
    
  // getJudges(date) {
  //   const removed = [...this.state.removed];
  //   const staying = this.state.judges.filter(judge => {
  //     if (checkJudgeAge(judge, date) < 80) {
  //       return judge;
  //     }
  //     removed.push(judge);
  //   })

  //   this.setState({removed: removed});
  //   return staying;
  // }

  // getReplacements(date) {
  //   const replacements = [];
  //   let repJudges = [...this.state.repJudges];
  //   let demJudges = [...this.state.demJudges];
  //   let replacementNum = this.state.removed.length;
  //   // get parties
  //   // if (date > 2020) {
  //   //   this.setState({
  //   //   presidency: randomizeParty(),
  //   //   congress: randomizeParty(),
  //   //   })
  //   // }
  //   if (this.state.presidency !== this.state.congress) {
  //     alert("You just got Merrick Garland'd!")
  //   } else {
  //     while (replacementNum > 0) {
  //       if (this.state.presidency === "Republican") {
  //         const replacement = getRandomJudge(repJudges);
  //         const newRepJudges = repJudges.filter(judge => {
  //           return judge.name !== replacement.name
  //         });
  //         replacements.push(replacement);
  //         repJudges = [...newRepJudges];
  //       }
  //       else {
  //         const replacement = getRandomJudge(demJudges);
  //         const newDemJudges = demJudges.filter(judge => {
  //           return judge.name !== replacement.name
  //         });
  //         replacements.push(replacement);
  //         demJudges = [...newDemJudges];
  //       }
  //       replacementNum -= 1;
  //     }
  //   }
  //   this.setState({ replacements: replacements });
  //   console.log(this.state);
  //   // }
  // }

  removeJustices(judges, date) {
    const removed = [...this.state.removed];
    const staying = judges.filter(judge => {
      if (checkJudgeAge(judge, date) < 86) {
        return judge;
      }
      removed.push(judge);
    })

    this.setState({removed: removed});
    return staying;
  }

  appointJustice(originalsLeft, replacementsArr, side) {
      const repJudges = [...this.state.repJudges];
      const demJudges = [...this.state.demJudges];

      while (originalsLeft + replacementsArr.length < 9) {
        if (side === 'Republican') {
          replacementsArr.push(repJudges.splice(getRandomIndex(repJudges.length), 1)[0]);
        } else {
          replacementsArr.push(demJudges.splice(getRandomIndex(demJudges.length), 1)[0]);
        }
      }

      this.setState({ repJudges: repJudges, demJudges: demJudges})
    }

  getCourtBalance() {
    let redCount= 0;
    let blueCount=0;
    let judges = [...this.state.judges, ...this.state.replacements];
    judges.forEach((judge) => {
      if (judge.party === "r") {
        redCount++;
      } else {
        blueCount++;
      }
    });
  if (this.state.date < 2019) {
    return "";      
    } else {
    return redCount > blueCount ?  getRandomMessage(Messages, "r"): getRandomMessage(Messages, "d");
    }
  }
  
  reset() {
    this.setState({
      date: getFutureDate(2018, 2030), 
      judges: Judges.CurrentJustices,
      congress: randomizeParty(),
      presidency: randomizeParty(),
      removed: [],
      replacements: []
    });
  }

  toggleSpin(event, date) {
    // event.preventDefault();
    // this.setState({ judges: this.getJudges(date) });
    this.setState({ paused: !this.state.paused });
    // this.setState({ buttonIndex: this.state.buttonIndex === 2 ? 0 : this.state.buttonIndex + 1})
    // {this.state.buttonIndex === 1 ? this.getReplacements(this.state.date) : null }
    // {this.state.buttonIndex === 2 ? this.reset() : null }
  }

  takeStep(currentJustices, date) {
    this.toggleSpin();
    // check if any justices retired
    const justices = this.removeJustices([...currentJustices], date);

    // check if congress has shifted (every 2 years)
    const difference = date - 2018;
    let newCongress = false;
    if (difference > 0 && difference % 2 === 0) {
      newCongress = randomizeParty();
    }

    // check if presidency has shifted (every 4 years)
    let newPresidency = false;
    if (difference > 0 && date % 4 === 0) {
      newPresidency = randomizeParty();
    }

    // appoint new justice(s), if needed
    const replacements = [...this.state.replacements];
    if ((newCongress || this.state.congress) === (newPresidency || this.state.presidency)) {
      this.appointJustice(justices.length, replacements, newCongress || this.state.congress);
    } else {
      alert("You just got Merrick Garland'd!");
    }
    this.setState({ judges: justices, replacements: replacements, congress: newCongress || this.state.congress, presidency: newPresidency || this.state.presidency, date: date })

  }

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
    const currentJustices = [...this.state.judges];
    return (
      <div>
        <h1>Supreme Court Roulette!</h1>
        <h3>Year: {this.state.date}</h3>
        <h3>Presidency: {this.state.presidency}</h3>
        <h3>Congress: {this.state.congress}</h3>
        <p>{this.getCourtBalance()}</p>
        <button onClick={(event) => this.takeStep(currentJustices, date + 1)} className="button">
          {paused && <img src={gavel} alt="gavel" className={this.returnClassNames(paused)} /> }
          {!paused && <img src={gavel} alt="gavel" className={this.returnClassNames(paused)} /> }
        </button>
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
                  <img src={RedX} alt="redx" height="200" className="RedX" />
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
