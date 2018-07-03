import React, { Component } from 'react';
import RedX from './Assets/redx.png';
import SadTrombone from './Assets/Sad-trombone.mp3';
import dundun from './Assets/dun_dun_1.mp3'
import gavel from './Assets/gavel.png';
import New from './Assets/New.png'
import { getFutureDate, randomizeParty, checkJudgeAge, getRandomIndex, getRandomMessage } from './randomizer';
import Judges from './data/judgeData';
import Messages from './data/messages';
import InfoModal from './Modal';

import './App.css';

class App extends Component {
  state = {
    paused: true,
    date: 2018,
    congress: 'Republican',
    presidency: 'Republican',
    judges: Judges.CurrentJustices,
    repJudges: Judges.RepJudges,
    demJudges: Judges.DemJudges,
    removed: [...Judges.Removed],
    replacements: [],
    buttonTitles: ['Remove', 'Replace', 'THIS WILL NOT Reset'],
    buttonIndex: 0,
    trombone: new Audio(SadTrombone),
    dunDun: new Audio(dundun),
    modalToggle: false,
  }

  toggleModal = (event) => {
    event.stopPropagation();
    this.setState({ modalToggle: !this.state.modalToggle });
  }

  removeJustices(judges, date) {
    const removed = [...this.state.removed];
    const staying = judges.filter((judge) => {
      if (checkJudgeAge(judge, date) < 86) {
        return judge;
      }
      removed.push(judge);
      return false
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
    return ["", redCount, blueCount];      
    } else {
    return redCount > blueCount ?  [ getRandomMessage(Messages, "r"), redCount, blueCount ] : 
    [ getRandomMessage(Messages, "d"), redCount, blueCount ];
    }
  }
  
  reset = () => {
    this.setState({
      date: 2018, 
      judges: Judges.CurrentJustices,
      congress: 'Republican',
      presidency: 'Republican',
      removed: [...Judges.Removed],
      replacements: [],
      repJudges: Judges.RepJudges,
      demJudges: Judges.DemJudges,
    });
  }

  toggleSpin(event, date) {
    // event.preventDefault();
    // this.setState({ judges: this.getJudges(date) });
    this.setState({ paused: !this.state.paused });
    this.state.dunDun.play();
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
    } else if (replacements.length + justices.length < 9) {
      this.state.trombone.play();
      setTimeout(() => alert("You just got Merrick Garland'd! \n The government is split and deadlocked over the supreme court nominee"), 1000);
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
    const { date, paused, } = this.state;
    const currentJustices = [...this.state.judges];
    const message = this.getCourtBalance()[0];
    const redCount = this.getCourtBalance()[1];
    const blueCount = this.getCourtBalance()[2];

    return (
      <div>
        <h2 className="title">Supreme Court Roulette!</h2>
          <hr width="60%" align="left" />
          <div className="slug">
            <p> It's the year, {this.state.date}, the president is {this.state.presidency}&nbsp;
            and the legislative branch is {this.state.congress}. {this.state.removed[this.state.removed.length - 1].name} has left the bench.
            { this.state.replacements.length > 0 ? `The president's latest appointment to the bench is ${this.state.replacements[this.state.replacements.length - 1].name}` : null}.&nbsp;
            This makes for {redCount} republicans and {blueCount} democrats. {message}</p>
            <div className="cta">
            <p>Bang the gavel to see what happens next year.
            </p>
            <p>&nbsp;</p>
            <button onClick={(event) => this.takeStep(currentJustices, date + 1)} className="button">
              {paused && <img src={gavel} alt="gavel" className={this.returnClassNames(paused)} /> }
              {!paused && <img src={gavel} alt="gavel" className={this.returnClassNames(paused)} /> }
            </button>
            <button className="reset-btn" onClick={this.reset}>Reset</button>
            </div>
          </div>
          <div className="judge-container">
            {this.state.replacements.map(judge => {
              return (
                <div className="judge" key={judge.id+'a'}>
                  <img src={judge.picture} height="200" alt={judge.name} className={`judge-pic__${judge.party}`}/>
                    <img src={New} alt="New" className="New" height="100"/>
                    {/* <p align="center"><em>{judge.name}</em></p> */}
                    <InfoModal judge={judge.name} id={judge.id} />

                </div>
              )
            })}
            {this.state.judges.map(judge => {
              return (
                <div className="judge" key={judge.id+'a'}>
                  <img src={judge.picture} height="200" alt={judge.name} className={`judge-pic__${judge.party}`} />
                    <InfoModal judge={judge.name} id={judge.id} />
                    {/* <p align="center"><em>{judge.name}</em></p> */}
                </div>
            )
            })}
            {this.state.removed.map(judge => {
              return (
                <div className="judge" key={judge.id+'d'}>
                  <img src={judge.picture} height="200" alt={judge.name} className={`judge-pic__${judge.party}`} />
                  <img src={RedX} alt="redx" height="200" className="RedX" />
                    {/* <p align="center"><em>{judge.name}</em></p> */}
                    <InfoModal judge={judge.name} id={judge.id} />
                </div>
            )
            })}
          </div>
      </div>
    );
  }
}

export default App;


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