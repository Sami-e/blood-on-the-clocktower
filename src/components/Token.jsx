import { Component } from "react";

class Token extends Component {
  render() {
    var embellishments = [];
    if (this.props.text) {
      embellishments.push(this.props.text)
    }

    if (this.props.addDeadMarker) {
      embellishments.push(<div className="Dead"/>)
    }
      
    if (this.props.onRemove) {
      embellishments.push(<div className="closeToken" onClick={this.props.onRemove}></div>)
    }

        

    return (
    <div className={this.props.type} 
        style={{
          width: this.props.radius,
          height: this.props.radius,
          left: this.props.x + "px", 
          top: this.props.y + "px"
        }} 
        onClick={this.props.onClick}
        onMouseEnter={this.props.onMouseEnter}>
      {embellishments}
    </div>
    )
  }
}

export default Token;