import './GamePage.scss';
import { Component } from 'react';
import Grimoire from '../components/Grimoire';
import GrimoireState from '../components/GrimoireState';
import PlayerState from '../components/PlayerState';

class GamePage extends Component {
  render() {

    let grimoireState = new GrimoireState([
      new PlayerState("Sami", "Virgin", "Good"),
      new PlayerState("Michael", "Imp", "Evil"),
      new PlayerState("Evan", "Spy", "Evil"),
      new PlayerState("Samir", "Fortune Teller", "Good")
    ]);

    return (
      <div className="GamePage">
        <div className='header'>The One With the Damsel</div>
        <Grimoire state= {grimoireState}/>
      </div>
    );
  }
}

export default GamePage;