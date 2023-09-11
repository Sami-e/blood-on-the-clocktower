import '../css/GamePage.scss';
import { Component } from 'react';
import Grimoire from '../components/Grimoire';
import GrimoireState from '../components/GrimoireState';
import withRouter from '../higher-order-components/withRouter';

class GamePage extends Component {

  render() {
    const { id } = this.props.id;
    let grimoireState = new GrimoireState(id);

    return (
      <div className="GamePage">
        <div className='header'>{grimoireState.title}</div>
        <Grimoire state= {grimoireState}/>
      </div>
    );
  }
}

export default withRouter(GamePage);

