import React, { Component } from 'react';
import { connect } from 'react-redux';

import Events from '../events';
import Friends from '../friends';
import Partys from '../partys';


class _Component extends Component {
  render(){
    return (
      <div>
        <h1>Home</h1>
        <img/>
        <h2>Your blockers</h2>

        <h2>Your friends on Bestivals</h2>
        <Friends></Friends>
        <h2>Your Events</h2>
        <Events></Events>
        <h2>Your partys</h2>
        <Partys></Partys>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    friends: state.friends.friends,
    events: state.events.events
  }
}

export default connect(mapStateToProps)(_Component);
