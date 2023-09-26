import { Component } from 'react';
import { Link } from 'react-router-dom';
import GameBrief from './GameBrief';

class GamesList extends Component {
  constructor(props){
    super(props);
    const db = require('../sampleGames/OfficialBOTCDatabase.json');
    this.games = db.games.map( (game, id) => {
      return <GameBrief id={id} script={game.brief.script} date={game.brief.date} brief={game.title} winner={game.brief.winner}/>
    });
  }
  

  render(){
    let listHeader = 
    <div className='gameBrief'>
      <div className='briefItem'>Script</div>
      <div className='briefItem'>Date</div>
      <div className='briefItem'>Brief</div>
      <div className='briefItem'>Winner</div>
    </div>;

    let listFooter = 
    <Link to={`/games/edit/${this.games.length}`} className='createGameButton'> Create New Game </Link> 
    
    let gameBrief = [];
    for (let i = 0; i < this.games.length; i++) {
      gameBrief.push(<Link to={`/games/view/${i}`}> {this.games[i]} </Link>)
    }
    return (<> 
      <div className='gamesList'>{listHeader}{gameBrief}</div>
      {listFooter}
    </>)
    
  }
}

export default GamesList;