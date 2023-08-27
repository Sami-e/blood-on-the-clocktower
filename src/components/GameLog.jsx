import { Component } from 'react';
import Grimoire from './Grimoire';

class GameLog extends Component {
  constructor(props){
    super(props);
    this.players = [];
    this.events = [];
    this.finalGrimoire = Grimoire;
  }
}

export default GameLog;