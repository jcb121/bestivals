import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

import Friend from '../../entry/friend';
import EventRow from '../../entry/event';
import Friends from '../../friends';
import Events from '../../events';
import SearchEvents from '../../search_events';


import { getParty, addFriend, addEvent, removeEvent, saveParty } from './index.actions';
import './index.css';


class _Component extends Component {

  constructor(props) {
    super(props)
    this.events = this.events.bind(this);
    this.invited = this.invited.bind(this);
    this.save = this.save.bind(this);

    if(!props.party){
      props.dispatch(getParty(props.id));
    }
  }

  componentWillUpdate(nextProps, nextState){
    if( String(nextProps.party.id) !== String(nextProps.id)){
      nextProps.dispatch(getParty(nextProps.id));
    }
  }

  events(){
    return(
      <div className="">
        <h3>Events</h3>
        <div className="events">
          { this.props.party.events.map(id => {
            return <EventRow key={id} id={id} action={ removeEvent } label="Remove Event" />
          }) }
        </div>
        <h3>Add Events</h3>
        <div>
          <SearchEvents />
          <Events action={ addEvent } label="Add Event" filter={this.props.party.events} />
        </div>
      </div>
    )
  }

  invited(){
    return(
      <div className="">
        <h3>Invited</h3>

        <div>
          { this.props.party.attending.map(id => {
            return <Friend key={ id } id={ id } />
          }) }
        </div>
        <div>
          { this.props.party.invited.map(id => {
            return <Friend key={ id } id={ id } />
          }) }
        </div>

        <h3>Invite More</h3>
        <div>
          <Friends action={ addFriend } label="Add Event" />
        </div>
      </div>
    )
  }

  save(){
    this.props.dispatch(saveParty());
    browserHistory.push('/party/' + this.props.party.id)
  }

  render(){
    if(!this.props.party){
      return (
        <div>Loading</div>
      );
    }
    return (
      <div>
        <h2>Edit - { this.props.party.name }</h2>

        <button onClick={ () => { browserHistory.push('/party/' + this.props.party.id) } }>Back</button>
        <button onClick={ this.save }>Save</button>

        { this.events() }
        { this.invited() }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    party: state.party.party,
    id: ownProps.params.id
  }
}

export default connect(mapStateToProps)(_Component);
