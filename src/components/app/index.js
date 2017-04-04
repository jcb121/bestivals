import React, { Component } from 'react';
import './index.css';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Bestivals</h2>
          <h3>the tool used to oragnise events and festivals</h3>
        </div>
        {this.props.children}
      </div>
    );
  }
}
