import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setEvents, addEvents } from './index.actions';
import EntryRow from '../entry/event';

import './index.css';

class _Component extends Component {

  constructor(props) {
    super(props)

    if(!this.props.events.length){
      this.props.dispatch(setEvents());
    }
  }

  componentWillUpdate(nextProps, nextState){
    /* Keep filtered results in state?? */
    if(nextProps.filter){
      var filtered = nextProps.events.filter((id) => {
        return nextProps.filter.indexOf(id) === -1;
      })
      if(filtered.length < 3){
        nextProps.dispatch(addEvents())
      }
    }
  }

  render(){

    var events;

    if(this.props.filter) {
      events = this.props.events
      .filter((id) => {
        return this.props.filter.indexOf(id) === -1;
      })
      .map((id) => {
        return <EntryRow key={id} id={id} label={this.props.label} action={this.props.action}/>
      })
    }
    else {
      events = this.props.events
      .map((id) => {
        return <EntryRow key={id} id={id} label={this.props.label} action={this.props.action}/>
      })
    }

    return (
      <div>
        <div className="events">
          { events }
        </div>
        <button onClick={ () => this.props.dispatch(addEvents()) }>Load more</button>
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
