import './Home.scss';
import GamesList from '../components/GamesList'
import { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className='header'>Blood On The ClockTower Stats</div>
        <GamesList/>
      </div>
    );
  }
}

export default Home;
