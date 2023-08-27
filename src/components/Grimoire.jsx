import { Component, createRef } from 'react';

class Grimoire extends Component {
  
  constructor(props) {
    super(props);
    this.characterCount = props.state.players.length;
    this.characterTokens = [];
    this.state = {
      width: 0, height: 0, top: 0, left: 0
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
        left:this.ref.current.offsetLeft,
      })
    }
  }
    

  
  componentDidMount(){
    this.setSize();
    window.addEventListener('resize', this.setSize)
  }

  componentWillUnmount(){
    window.addEventListener("resize", null);
  }


  createTokens(){  
    var tableRadius = Math.min(this.state.width, this.state.height) * 0.4;
    var angle = Math.PI / 2;
    var step = (2*Math.PI) / this.characterCount;
    var characterTokens = [];
    var tokenRadius = tableRadius * 0.3;
    for (let i = 0; i < this.characterCount; i++){
      var x = Math.round(this.state.left + this.state.width/2 + (tableRadius * Math.cos(angle + (i * step))) - tokenRadius/2);
      var y = Math.round(this.state.top + this.state.height/2 + (tableRadius * Math.sin(angle + (i * step)))- tokenRadius/2);
      console.log(this.state.width, tokenRadius, x, y)
      characterTokens.push(
        <div className='character-token' style={{
          width: tokenRadius,
          height: tokenRadius,
          left: x + 'px', 
          top: y + 'px'
        }}>
          {this.props.state.players[i].role}
        </div>
      );
      
    }
    return characterTokens;
  }

  render() {
    this.characterTokens = this.createTokens();
    return (<div ref={this.ref} className='grimoire'>
      {this.characterTokens}
    </div>);
  }
}



export default Grimoire;