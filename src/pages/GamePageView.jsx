import '../css/GamePage.scss';
import { Component } from 'react';
import GrimoireState from '../components/GrimoireState';
import withRouter from '../higher-order-components/withRouter';
import GrimoireView from '../components/GrimoireView';

class GamePageView extends Component {

  render() {
    const { id } = this.props.id;
    const grimoireState = new GrimoireState(id);
    return (
      <div className="GamePage">
        <div className='header'>{grimoireState.title}</div>
        <GrimoireView state= {grimoireState}/>
      </div>
    );
  }
}

export default withRouter(GamePageView);

