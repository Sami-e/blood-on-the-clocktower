import PlayerState from './PlayerState';

class GrimoireState {
  constructor (id){
    const db = require('../sampleGames/OfficialBOTCDatabase.json');   
    this.id = id;
    this.players = db.games[id].grimoire.players.map((player, _) =>
      new PlayerState(player.name, player.role, player.allignment)
    )
  }
}

export default GrimoireState;