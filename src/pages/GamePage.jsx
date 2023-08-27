import './GamePage.scss';
import { Component } from 'react';
import Grimoire from '../components/Grimoire';
import GrimoireState from '../components/GrimoireState';
import withRouter from '../higher-order-components/withRouter';

class GamePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props.id;
    console.log(id);
    let grimoireState = new GrimoireState(id);

    return (
      <div className="GamePage">
        <div className='header'>The One With the Damsel</div>
        <Grimoire state= {grimoireState}/>
      </div>
    );
  }
}

export default withRouter(GamePage);

