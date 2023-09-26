import PlayerState from './PlayerState';

class GrimoireState {

  saveGrimoireToDatabase() {
    // Replace with some database write I don't know how to do yet
    // require('fs').writeFile(fileName, JSON.stringify(db), (error) => {
    //   if (error) {
    //       throw error;
    //   }
    // });
  }

  constructor (id){
    const fileName = "OfficialBOTCDatabase"; 
    const db = require(`../sampleGames/${fileName}.json`); // Weird string to avoid misassigned warning
    if (id < db.games.length) {
      this.id = id;
      this.title = db.games[id].title;
      this.players = db.games[id].grimoire.players.map((player, _) =>
        new PlayerState(player.name, player.token, player.allignment, player.reminderTokens, player.isAlive)
      )
    } else { 
      this.id = id;
      this.title = "Insert Title Here"
      this.players = [];

      // Filling with default values
      db.games.push(
        {
          title: this.title,
          brief: {
            script: "Insert Script Here",
            date: "Insert Date Here",
            winner: "Insert Victor Here"
          },
          description: "Insert Description Here",
          grimoire: {
            players: this.players
          }
        }
      );
      
      this.saveGrimoireToDatabase();
    }
    
  }
}

export default GrimoireState;