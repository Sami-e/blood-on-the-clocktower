import { Component } from 'react';
import GrimoireView from './GrimoireView';

class GameLog extends Component {
  constructor(props){
    super(props);
    this.players = [];
    this.events = [];
    this.finalGrimoire = GrimoireView;
  }
}

export default GameLog;