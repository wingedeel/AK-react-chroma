import React, { Component } from 'react';
import ColorDisplay from './ColorDisplay';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
      return (
        <div>
          <ColorDisplay />
        </div>
      )
  }
}

export default App;
