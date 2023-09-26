
class PlayerState {
  constructor(name, token, allignment, reminderTokens = [], isAlive = true) {
    this.name = name;
    this.token = token;
    this.allignment = allignment;
    this.reminderTokens = reminderTokens;
    this.isAlive = isAlive
  }
}

export default PlayerState