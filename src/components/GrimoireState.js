import PlayerState from './PlayerState';

class GrimoireState {
  constructor (id){
    const db = require('../sampleGames/OfficialBOTCDatabase.json');   
    this.id = id;
    this.title = db.games[id].title;
    this.players = db.games[id].grimoire.players.map((player, _) =>
      new PlayerState(player.name, player.token, player.allignment, player.reminderTokens, player.isAlive)
    )
  }
}

export default GrimoireState;