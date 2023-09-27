import { Component, createRef } from "react";
import PlayerState from "./PlayerState";
import "../css/Tokens.scss"
import Token from "./Token";
class GrimoireEdit extends Component {
  
  constructor(props) {
    super(props);
    this.characterCount = props.state.players.length;
    this.state = {
      width: 0, height: 0, top: 0, left: 0,
      addCharacter: -1, addReminder: [],
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
  
  addOrUpdateCharacter(idx, token, alignment) {
    var players = this.state.players;
    if (this.characterCount > idx) {
        players[idx].token = token;
        players[idx].alignment = alignment;
    } else {
        players.push(new PlayerState("Undefined", token, alignment));
        this.characterCount++;
    }
    this.setState({players: players});
  }

  addOrUpdateReminder(charIdx, remindIdx, token) {
    var players = this.state.players;
    if (players[charIdx].reminderTokens.length > remindIdx) {
        players[charIdx].reminderTokens[remindIdx] = token;
    } else {
        players[charIdx].reminderTokens.push(token);
    }
    this.setState({players: players});
  }


  removeCharacter(idx) {
    let players = this.state.players;
    players.splice(idx, 1);
    this.characterCount--;
    this.setState({players: players});
  }

  removeReminder(charIdx, remindIdx) {
    let players = this.state.players;
    players[charIdx].reminderTokens.splice(remindIdx, 1);
    this.setState({players: players});
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
    const step = (2*Math.PI) / (this.characterCount + 1);
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

      const onMouseEnter = ()=> {this.setState({addReminder: [i]})}

      characterTokens.push(
        <div className="character"style={{
          left: charX + "px", 
          top: charY + "px"
        }}>
          <input className="player-name" type="text" placeholder={this.state.players[i].name}/>

          <Token type={"token " + playerInfo.token} radius={charRadius} addDeadMarker={!playerInfo.isAlive}
            onRemove={(e) => {this.removeCharacter(i); e.stopPropagation()}}
            onClick={() => {this.setState({addCharacter: i})}}
            onMouseEnter={onMouseEnter}/>

        </div>
      );
    }

    const addCharX = Math.round(this.state.left + this.state.width/2 + (tableRadius * Math.cos(startingAngle + (this.characterCount * step))) - charRadius/2);
    const addCharY = Math.round(this.state.top + this.state.height/2 + (tableRadius * Math.sin(startingAngle + (this.characterCount * step)))- charRadius/2);
      
    characterTokens.push(
      <div className="character"style={{
        left: addCharX + "px", 
        top: addCharY + "px"
      }}>
        <div className="player-name">{`Seat ${this.characterCount}`}</div>

        <Token type={"token Add-Character"} radius={charRadius} 
          onClick={() => {this.setState({addCharacter: this.characterCount})}}/>
      </div>
    );

    return characterTokens;
  }

  createReminderTokens(){
    const [tableRadius, startingAngle, step, charRadius] = this.tableVariables()
    const reminderTokens = [];
    const remindRadius = charRadius * 0.4;

    const calculateCoords = (i, j) => {
      const isReminderAdd = this.state.addReminder[0] === i;
      const tokenCount = this.state.players[i].reminderTokens.length + (isReminderAdd ? 1 : 0);
      const offset = ((j === tokenCount - 1 && tokenCount % 2 === 1) ? 0 
        : j % 2 === 0 ? - (remindRadius + 10)
        : (remindRadius + 10))
      const distanceFromCenter = tableRadius - (charRadius) - (remindRadius * Math.floor(j / 2)) - (10 * Math.floor(j / 2));
      const offsetAngle = (Math.asin((offset / (4 * distanceFromCenter)))) * 2
      const remindX = Math.round(this.state.left + this.state.width/2 + (distanceFromCenter * Math.cos(startingAngle + (i * step) + offsetAngle)) - remindRadius/2);
      const remindY = Math.round(this.state.top + this.state.height/2 + (distanceFromCenter * Math.sin(startingAngle + (i * step) + offsetAngle))- remindRadius/2);
      return [remindX, remindY]
    }

    for (let i = 0; i < this.characterCount; i++){
      const isReminderAdd = this.state.addReminder[0] === i;

      const tokenCount = this.state.players[i].reminderTokens.length + (isReminderAdd ? 1 : 0);
      this.state.players[i].reminderTokens.forEach((token, j) => {
        const [remindX, remindY] = calculateCoords(i, j)
        const onMouseEnter = ()=> {this.setState({addReminder: [i]})}
        reminderTokens.push(
          <Token type={'token ' + token} radius={remindRadius} x={remindX} y={remindY}
            onClick={() => {this.setState({addReminder: [i, j]})}}
            onMouseEnter={onMouseEnter}
            onRemove={(e) => {this.removeReminder(i); e.stopPropagation()}}/>
        );
      });

      if (isReminderAdd) {
        const [remindX, remindY] = calculateCoords(i, tokenCount - 1)
        reminderTokens.push(
          <Token type={"token Add-Character"} radius={remindRadius} x={remindX} y={remindY}
              onClick={() => {this.setState({addReminder: [i, tokenCount - 1]})}}/>
        );
      }
      
    }
    return reminderTokens;
  }

  createModal() {
    let onclick = () => {};
    if (this.state.addCharacter >= 0) {
        onclick = () => {this.setState({addCharacter: -1})};
    }   

    const addChar = (token) => {
      this.addOrUpdateCharacter(this.state.addCharacter, token, "Good");
      this.setState({addCharacter: -1});
    }

    const addReminder = (token) => {
      const [charIdx, remindIdx] = this.state.addReminder
      this.addOrUpdateReminder(charIdx, remindIdx, token);
      this.setState({addReminder: []});
    }

    const createTokens = (tokenNames, callback) => {
        return <div className="tokenList">
            {
            tokenNames.map((token) => {
              return <div onClick={() => callback(token)} className={(`small-token ${token}`)}/>
            })
            }
        </div>
    }

    const townsfolk = ["Washerwoman", "Librarian", "Investigator", "Chef",
        "Empath", "Fortune-Teller", "Undertaker", "Monk", "Ravenkeeper",
        "Virgin", "Slayer", "Soldier", "Mayor" 
    ];
    const outsider = ["Butler", "Drunk", "Recluse", "Saint"];
    const minions = ["Poisoner", "Spy", "Scarlet-Woman", "Baron"];
    const demons = ["Imp"];

    

    const characterModal = <div onClick={onclick} className={"modal " + (this.state.addCharacter >= 0 ? "shown": "")}>
        <div onClick={(e) => {e.stopPropagation();}} className="modal-content">
            {createTokens(townsfolk, addChar)} {createTokens(outsider, addChar)} 
            {createTokens(minions, addChar)} {createTokens(demons, addChar)}
        </div>
    </div>    

    const reminderTokens = [
      "Butler-Master", "Drunk-Is-The-Drunk", "Fortune-Teller-Red-Herring", "Imp-Dead", "Investigator-Minion", "Investigator-Wrong",
      "Librarian-Outsider", "Librarian-Wrong", "Monk_Safe", "Poisoner-Poisoned", "Scarlet-Woman-Is-The-Demon", "Slayer-No-Ability",
      "Undertaker-Died-Today", "Virgin-No-Ability", "Washerwoman-Townsfolk", "Washerwoman-Wrong"
    ]

    const reminderModal = <div onClick={onclick} className={"modal " + (this.state.addReminder.length === 2 ? "shown": "")}>
        <div onClick={(e) => {e.stopPropagation();}} className="modal-content">
            {createTokens(reminderTokens, addReminder)}
        </div>
    </div>  

    return [characterModal, reminderModal];
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



export default GrimoireEdit;