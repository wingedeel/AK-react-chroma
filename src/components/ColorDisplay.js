/*
App contains:
- button. when clicked it tells 
- swatch maker to darken the current color
- and display a new set of swatches.
*/

import React, { Component } from 'react';
import {StaggeredMotion, Motion, spring, presets} from 'react-motion';

class ColorDisplay extends Component{

  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      colorElements: [],
      yOff: 0,
       items: [
        {text: 'j4q2q7lu'},
        {text: 'j4q2q9rq'},
        {text: 'j4q2qb7k'},
        {text: 'j4q2q7lu'},
        {text: 'j4q2q9rq'},
        {text: 'j4q2qb7k'}
      ],
      colors2: [
        {text: '#e7260d'},
        {text: '#ac0000'},
        {text: '#750000'},
        {text: '#4d0000'},
        {text: '#400000'}
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
    console.log('updateColors'); 
    // chroma.random();
    //const chromaColor = chroma(this.state.color);
    const chromaColor = chroma.random();
    const steps = 5;

    // Create new array of colours
    const colorList = [];
    for (var i = 0; i < steps; i++) {
        let color = chromaColor.darken(i).hex();
        colorList.push({color:color});
        //colorList[i] = chromaColor.darken(i);
    }
    this.setState({colors: colorList});
    console.log(colorList.toString())

    // Create a new element for each color
    const elements = []
    for (var j = 0; j < colorList.length; j++) {
        const color = colorList[j].color;
        console.log('color', color);
        const style = {backgroundColor: color };
        const key = color + Math.random(10);
        elements.push (
          <div key={key} style={style}>color</div>
        )
    }
    
    // Update swatches in state
    this.setState({ colorElements: elements});
  }


  handleKeyPress (e) {
    const spacebar = 32;
    if (e.charCode == spacebar) {
      this.updateColors();
      this.move();
    }
  }
  

  render() {
    //const items = this.state.colors;
    //const items = this.state.items;
    const items = this.state.colors2;

    return (
      <div>
      {this.state.colorElements}
      <input type="text" id="one" onKeyPress={this.handleKeyPress} />

      <div className='container-fluid text-center ani-show'>

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
            <div className='container-fluid row block-center'>
              {interpolated.map((style,i) => (
                 <div key={i}
                  className='item2 col-6 col-sm-2'
                  style={
                    {
                      transform: 'translateY('+style.translateY+'px)',
                      backgroundColor: items[i].text
                    }
                  }>
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

/*
 <div key={i}
                  className='item2 col-6 col-sm-2'
                  style={
                    {
                      transform: 'translateY('+style.translateY+'px)',
                      backgroundColor: this.state.colors[i]
                    }
                  }>
                </div>


*/