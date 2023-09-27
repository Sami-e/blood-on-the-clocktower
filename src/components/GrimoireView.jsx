import "../css/Tokens.scss"
import GrimoireCommon from './GrimoireCommon';
class GrimoireView extends GrimoireCommon {
  render() {
    const characterTokens = this.createTokens();
    const reminderTokens = this.createReminderTokens();
    return (<div ref={this.ref} className='grimoire'>
      {characterTokens} {reminderTokens}
    </div>);
  }
}



export default GrimoireView;