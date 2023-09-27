import { Component, createRef } from "react";
import "../css/Tokens.scss"
import Token from "./Token";
class GrimoireCommon extends Component {
  
  constructor(props) {
    super(props);
    this.characterCount = props.state.players.length;
    this.state = {
      width: 0, height: 0, top: 0, left: 0,
      players: this.props.state.players
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
        left: this.ref.current.offsetLeft,
      })
    }
  }

  componentDidMount(){
    this.setSize();
    window.addEventListener("resize", this.setSize)
  }

  componentWillUnmount(){
    this.props.state.players = this.state.players;
    this.props.state.saveGrimoireToDatabase();
    window.addEventListener("resize", null);
  }

  tableVariables() {
    const tableRadius = Math.min(this.state.width, this.state.height) * 0.4;
    const startingAngle = Math.PI / 2;
    const step = (2*Math.PI) / (this.characterCount);
    const charRadius = tableRadius * 0.4;

    return [tableRadius, startingAngle, step, charRadius]
  }

  createTokens(){  
    const [tableRadius, startingAngle, step, charRadius] = this.tableVariables()
    const characterTokens = [];
    
    for (let i = 0; i < this.characterCount; i++){
      const charX = Math.round(this.state.left + this.state.width/2 + (tableRadius * Math.cos(startingAngle + (i * step))) - charRadius/2);
      const charY = Math.round(this.state.top + this.state.height/2 + (tableRadius * Math.sin(startingAngle + (i * step)))- charRadius/2);
      
      const playerInfo = this.state.players[i];

      characterTokens.push(
        <div className="character"style={{
          left: charX + "px", 
          top: charY + "px"
        }}>
          <input className="player-name" type="text" placeholder={this.state.players[i].name}/>

          <Token charIdx={i} type={"token " + playerInfo.token} radius={charRadius} addDeadMarker={!playerInfo.isAlive}/>
        </div>
      );
    }
    return characterTokens;
  }

  getReminderTokenCount(i) {
    return this.state.players[i].reminderTokens.length;
  }

  calculateCoords(i, j, tokenCount) {
    const [tableRadius, startingAngle, step, charRadius] = this.tableVariables()
    const remindRadius = charRadius * 0.4; 
    const offset = ((j === tokenCount - 1 && tokenCount % 2 === 1) ? 0 
      : j % 2 === 0 ? - (remindRadius + 10)
      : (remindRadius + 10))
    const distanceFromCenter = tableRadius - (charRadius) - (remindRadius * Math.floor(j / 2)) - (10 * Math.floor(j / 2));
    const offsetAngle = (Math.asin((offset / (4 * distanceFromCenter)))) * 2
    const remindX = Math.round(this.state.left + this.state.width/2 + (distanceFromCenter * Math.cos(startingAngle + (i * step) + offsetAngle)) - remindRadius/2);
    const remindY = Math.round(this.state.top + this.state.height/2 + (distanceFromCenter * Math.sin(startingAngle + (i * step) + offsetAngle))- remindRadius/2);
    return [remindRadius, remindX, remindY]
  }

  createReminderTokens(){
    const reminderTokens = [];

    for (let i = 0; i < this.characterCount; i++){
      const tokenCount = this.getReminderTokenCount(i);

      this.state.players[i].reminderTokens.forEach((token, j) => {
        const [remindRadius, remindX, remindY] = this.calculateCoords(i, j, tokenCount)
        reminderTokens.push(
          <Token charIdx={i} remindIdx={j} 
            type={'token ' + token} radius={remindRadius} x={remindX} y={remindY}/>
        );
      });

    }
    return reminderTokens;
  }

  render() {
    const characterTokens = this.createTokens();
    const reminderTokens = this.createReminderTokens();
    const modal = this.createModal()
    console.log(this.state.addReminder)
    return (<div ref={this.ref}  className="grimoire">
      {characterTokens} {reminderTokens} {modal}
    </div>);
  }
}



export default GrimoireCommon;