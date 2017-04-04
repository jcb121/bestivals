import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setEvents, addEvents } from '../events/index.actions';
import ReactSwipe from 'react-swipe';

import './index.css';

class _Component extends Component {

  constructor(props) {
    super(props)

    console.log(props);

    if(!this.props.events.length){
      this.props.dispatch(setEvents());
    }
  }

  next() {
    this.refs.reactSwipe.next();
  }

  prev() {
    this.refs.reactSwipe.prev();
  }

  render(){
    return (
      <div>
        Fresh Events
        <ReactSwipe ref="reactSwipe" className="carousel" swipeOptions={{continuous: false}}>
          <div>PANE 1</div>
          <div>PANE 2</div>
          <div>PANE 3</div>
        </ReactSwipe>

        <div>
          <button type="button" onClick={this.prev.bind(this)}>Prev</button>
          <button type="button" onClick={this.next.bind(this)}>Next</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events
  }
}

export default connect(mapStateToProps)(_Component);
