import { Component } from 'react';
import { Link } from 'react-router-dom';
import GameBrief from './GameBrief';

class GamesList extends Component {
  constructor(props){
    super(props);
    this.games = [
      <GameBrief id={0} script={"TB"} date={"August 20th"} brief={"The one with the Damsel"} winner={"Good"}/>,
      <GameBrief id={1} script={"TB"} date={"August 20th"} brief={"The one with the Damsel"} winner={"Bad"}/>,
      <GameBrief id={2} script={"TB"} date={"August 20th"} brief={"The one with the Damsel"} winner={"Good"}/>,
      <GameBrief id={3} script={"TB"} date={"August 20th"} brief={"The one with the Damsel"} winner={"Bad"}/>,
      <GameBrief id={4} script={"TB"} date={"August 20th"} brief={"The one with the Damsel"} winner={"Good"}/>
    ];
  }
  

  render(){
    let listHeader = 
    <div className='gameBrief'>
      <div className='briefItem'>Script</div>
      <div className='briefItem'>Date</div>
      <div className='briefItem'>Brief</div>
      <div className='briefItem'>Winner</div>
    </div>;
    
    let gameBrief = [];
    for (let i = 0; i < this.games.length; i++) {
      gameBrief.push(<Link to={`/games/${i}`}> {this.games[i]} </Link>)
    }
    return(<div className='gamesList'>{listHeader}{gameBrief}</div>)
    
  }
}

export default GamesList;