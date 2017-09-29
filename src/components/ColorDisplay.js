import React, { Component } from 'react';
import {StaggeredMotion, Motion, spring, presets} from 'react-motion';

class ColorDisplay extends Component{

  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      colorElements: [],
      yOff: 0,
      colors: [
        {color: '#ffffff'},
        {color: '#ffffff'},
        {color: '#ffffff'},
        {color: '#ffffff'},
        {color: '#ffffff'}
      ]
    }

    this.updateColors = this.updateColors.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.move = this.move.bind(this);
   
  }

  move(e) {
    if(this.state.yOff>99) {
      this.setState({
        yOff: 0
      })
    } else {
      this.setState({
        yOff: 100
      })
    }
  }

  updateColors() {
    
    const chromaColor = chroma.random();
    const steps = 5;

    // Create new array of colours
    const colorList = [];
    for (var i = 0; i < steps; i++) {
        let color = chromaColor.darken(i).hex();
        colorList.push({color:color});
    }
    this.setState({colors: colorList});
  }


  handleKeyPress (e) {
    const spacebar = 32;
    if (e.charCode == spacebar) {
      this.updateColors();
      this.move();
    }
  }
  
  componentDidMount(){
    this.refs.dummyButton.focus();
  }

  render() {
    const items = this.state.colors;

    return (
      <div>
      <button ref='dummyButton'className='dummyButton' onKeyPress={this.handleKeyPress} ></button>
      <h2 className ='subheader'>Press the Spacebar to change the colours</h2> 
      <div className='container-fluid text-center'>

        <StaggeredMotion
          // Set default style for each to 0
          defaultStyles={items.map(e=>({translateY:0}))} 

          styles={prevInterpolated => prevInterpolated.map((e,i) => {
            return i===0
              ? {translateY: spring(this.state.yOff)}
              : {translateY: spring(prevInterpolated[i-1].translateY)}
          })}
          >
          {interpolated =>
            <div>
              {interpolated.map((style,i) => (
                 <div key={i}
                  className='colorItem col-6 col-sm-2'
                  style={
                    {
                      transform: 'translateY('+style.translateY+'px)',
                      backgroundColor: items[i].color,
                    }
                  }>
                  {items[i].color}
                </div>
               
          ))}
            </div>
          }
        </StaggeredMotion>

      </div>
      </div>
    )
  }
}


export default ColorDisplay;