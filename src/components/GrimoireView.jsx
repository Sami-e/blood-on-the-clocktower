import { Component, createRef } from 'react';
import "../css/Tokens.scss"
import Token from './Token';
class GrimoireView extends Component {
  
  constructor(props) {
    super(props);
    this.characterCount = props.state.players.length;
    this.state = {
      width: 0, height: 0, top: 0, left: 0
    }
    this.ref = createRef()
    this.setSize = this.setSize.bind(this);


  }

  setSize(){
    if (this.ref.current) {
      this.setState({
        width: this.ref.current.offsetWidth,
        height: this.ref.current.offsetHeight,
        top: this.ref.current.offsetTop,
        left:this.ref.current.offsetLeft,
      })
    }
  }
  
  componentDidMount(){
    this.setSize();
    window.addEventListener('resize', this.setSize)
  }

  componentWillUnmount(){
    window.addEventListener("resize", null);
  }


  createTokens(){  
    const tableRadius = Math.min(this.state.width, this.state.height) * 0.4;
    const angle = Math.PI / 2;
    const step = (2*Math.PI) / this.characterCount;
    const characterTokens = [];
    const charRadius = tableRadius * 0.4;
    
    for (let i = 0; i < this.characterCount; i++){
      const charX = Math.round(this.state.left + this.state.width/2 + (tableRadius * Math.cos(angle + (i * step))) - charRadius/2);
      const charY = Math.round(this.state.top + this.state.height/2 + (tableRadius * Math.sin(angle + (i * step)))- charRadius/2);
      
      const playerInfo = this.props.state.players[i];
      characterTokens.push(
        <div className='character'style={{
          left: charX + 'px', 
          top: charY + 'px'
        }}>
          <div className='player-name'>{this.props.state.players[i].name}</div>

          <Token type={"token " + playerInfo.token} radius={charRadius} addDeadMarker={!playerInfo.isAlive}/>
        </div>
        
      );
    }
    return characterTokens;
  }

  createReminderTokens(){
    const tableRadius = Math.min(this.state.width, this.state.height) * 0.4;
    const angle = Math.PI / 2;
    const step = (2*Math.PI) / this.characterCount;
    const reminderTokens = [];
    const charRadius = tableRadius * 0.4;
    const remindRadius = charRadius * 0.4;
    for (let i = 0; i < this.characterCount; i++){
      const tokenCount = this.props.state.players[i].reminderTokens.length;
      this.props.state.players[i].reminderTokens.forEach((token, j) => {
        const offset = (j === tokenCount - 1 ? 0 
                          : j % 2 === 0 ? - (remindRadius + 10)
                          : (remindRadius + 10))
        const distanceFromCenter = tableRadius - (charRadius) - (remindRadius * Math.floor(j / 2)) - (10 * Math.floor(j / 2));
        const offsetAngle = (Math.asin((offset / (4 * distanceFromCenter)))) * 2
        const remindX = Math.round(this.state.left + this.state.width/2 + (distanceFromCenter * Math.cos(angle + (i * step) + offsetAngle)) - remindRadius/2);
        const remindY = Math.round(this.state.top + this.state.height/2 + (distanceFromCenter * Math.sin(angle + (i * step) + offsetAngle))- remindRadius/2);
        reminderTokens.push(
          <Token type={'token ' + token} radius={remindRadius} x={remindX} y={remindY}/>
        );
      });
    }
    return reminderTokens;
  }

  render() {
    const characterTokens = this.createTokens();
    const reminderTokens = this.createReminderTokens();
    return (<div ref={this.ref} className='grimoire'>
      {characterTokens} {reminderTokens}
    </div>);
  }
}



export default GrimoireView;