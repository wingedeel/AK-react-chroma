/*
App contains:
- button. when clicked it tells 
- swatch maker to darken the current color
- and display a new set of swatches.
*/

import React, { Component } from 'react';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      swatches: []
    }

    
    //-----------
    // Iniialize Chroma.
    const chromaColor = chroma("#0161b2");
    const steps = 5;
    const colorList = [];

    // Create a monchromatic color scheme.
    for (var i = 0; i < steps; i++) {
        colorList[i] = chromaColor.darken(i);
    }

  for (var j = 0; j < colorList.length; j++) {
        const color = colorList[j];
        const style = {backgroundColor: color };
        this.state.swatches.push (
          <div key={colorList[j]} style={style}>color</div>
        )
    }
  }

  

  render() {
    
    return (
      <div>{this.state.swatches}
      </div>
    )
  }
}


export default App;

