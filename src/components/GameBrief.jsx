import { Component } from 'react';

class GameBrief extends Component {
  render() {
    return(<div className='gameBrief'>
      <div className='briefItem'>{this.props.script}</div>
      <div className='briefItem'>{this.props.date}</div>
      <div className='briefItem'>{this.props.brief}</div>
      <div className='briefItem'>{this.props.winner}</div>
    </div>);
  }
}

export default GameBrief;