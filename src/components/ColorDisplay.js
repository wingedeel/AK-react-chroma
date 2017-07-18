/*
App contains:
- button. when clicked it tells 
- swatch maker to darken the current color
- and display a new set of swatches.
*/

import React, { Component } from 'react';

class ColorDisplay extends Component{

  constructor(props) {
    super(props);
    this.state = {
      swatches: [],
      color: "#0161b2"
    }

    this.updateColors = this.updateColors.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
   
  }

  updateColors() {
    console.log('updateColors'); 
    // chroma.random();
    //const chromaColor = chroma(this.state.color);
    const chromaColor = chroma.random();
    const steps = 5;

    // Create new array of colours
    const colorList = [];
    for (var i = 0; i < steps; i++) {
        colorList[i] = chromaColor.darken(i);
    }

    // Create a new element for each color
    const elements = []
    for (var j = 0; j < colorList.length; j++) {
        const color = colorList[j];
        const style = {backgroundColor: color };
        elements.push (
          <div key={colorList[j]} style={style}>color</div>
        )
    }
    
    // Update swatches in state
    this.setState({ swatches: elements});
  }


  handleKeyPress (e) {
      if (e.charCode == 13) {
        alert('Enter... ');
      }
      if (e.charCode == 32) {
        //alert('Spacebar... ');
        this.updateColors();
      }
  }
  

  render() {
    
    return (
      <div>
      {this.state.swatches}
      <input type="text" id="one" onKeyPress={this.handleKeyPress} />
      </div>
    )
  }
}


export default ColorDisplay;

