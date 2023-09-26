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

  removeCharacter(idx) {
    let players = this.state.players;
    players.splice(idx, 1);
    this.characterCount--;
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

  createTokens(){  
    const tableRadius = Math.min(this.state.width, this.state.height) * 0.4;
    const angle = Math.PI / 2;
    const step = (2*Math.PI) / (this.characterCount + 1);
    const characterTokens = [];
    const charRadius = tableRadius * 0.4;
    
    for (let i = 0; i < this.characterCount; i++){
      const charX = Math.round(this.state.left + this.state.width/2 + (tableRadius * Math.cos(angle + (i * step))) - charRadius/2);
      const charY = Math.round(this.state.top + this.state.height/2 + (tableRadius * Math.sin(angle + (i * step)))- charRadius/2);
      
      const playerInfo = this.state.players[i];
      characterTokens.push(
        <div className="character"style={{
          left: charX + "px", 
          top: charY + "px"
        }}>
          <input className="player-name" type="text" placeholder={this.state.players[i].name}/>

          <Token type={"token " + playerInfo.token} radius={charRadius} addDeadMarker={!playerInfo.isAlive}
            onRemove={(e) => {this.removeCharacter(i); e.stopPropagation()}}
            onClick={() => {this.setState({addCharacter: i})}}/>

        </div>
      );
    }

    const addCharX = Math.round(this.state.left + this.state.width/2 + (tableRadius * Math.cos(angle + (this.characterCount * step))) - charRadius/2);
    const addCharY = Math.round(this.state.top + this.state.height/2 + (tableRadius * Math.sin(angle + (this.characterCount * step)))- charRadius/2);
      
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
    const tableRadius = Math.min(this.state.width, this.state.height) * 0.4;
    const angle = Math.PI / 2;
    const step = (2*Math.PI) / (this.characterCount + 1);
    const reminderTokens = [];
    const charRadius = tableRadius * 0.4;
    const remindRadius = charRadius * 0.4;
    for (let i = 0; i < this.characterCount; i++){
      const tokenCount = this.state.players[i].reminderTokens.length;
      this.state.players[i].reminderTokens.forEach((token, j) => {
        const offset = (j === tokenCount - 1 ? 0 
                          : j % 2 === 0 ? - (remindRadius + 10)
                          : (remindRadius + 10))
        const distanceFromCenter = tableRadius - (charRadius) - (remindRadius * Math.floor(j / 2)) - (10 * Math.floor(j / 2));
        const offsetAngle = (Math.asin((offset / (4 * distanceFromCenter)))) * 2
        const remindX = Math.round(this.state.left + this.state.width/2 + (distanceFromCenter * Math.cos(angle + (i * step) + offsetAngle)) - remindRadius/2);
        const remindY = Math.round(this.state.top + this.state.height/2 + (distanceFromCenter * Math.sin(angle + (i * step) + offsetAngle))- remindRadius/2);
        reminderTokens.push(
          <Token type={"token"} radius={remindRadius} x={remindX} y={remindY} text={token}/>
        );
      });
    }
    return reminderTokens;
  }

  createModal() {
    let onclick = () => {};
    if (this.state.addCharacter >= 0) {
        onclick = () => {this.setState({addCharacter: -1})};
    }   

    const createTokens = (tokenNames) => {
        return <div className="tokenList">
            {
            tokenNames.map((token) => {
                const addChar = () => {
                    this.addOrUpdateCharacter(this.state.addCharacter, token, "Good");
                    this.setState({addCharacter: -1});
                }
                return <div onClick={addChar} className={(`small-token ${token}`)}/>
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
    return <div onClick={onclick} className={"modal " + (this.state.addCharacter >= 0 ? "shown": "")}>
        <div onClick={(e) => {e.stopPropagation();}} className="modal-content">
            {createTokens(townsfolk)} {createTokens(outsider)} 
            {createTokens(minions)} {createTokens(demons)}
        </div>
    </div>    
  }


  render() {
    console.log(this.state.players)
    const characterTokens = this.createTokens();
    const reminderTokens = this.createReminderTokens();
    const modal = this.createModal()
    return (<div ref={this.ref}  className="grimoire">
      {characterTokens} {reminderTokens} {modal}
    </div>);
  }
}



export default GrimoireEdit;