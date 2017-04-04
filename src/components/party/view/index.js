import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'

import Friend from '../../entry/friend';
import EventRow from '../../entry/event';

import { getParty } from './index.actions';

class _Component extends Component {

  constructor(props) {
    super(props)
    this.events = this.events.bind(this);
    this.attending = this.attending.bind(this);
    this.invited = this.invited.bind(this);

    if(!props.party){
      props.dispatch(getParty(props.params.id));
    }
  }

  events(){
    if(this.props.party.events){
      return (
        <div>
          <h3>Events</h3>
          { this.props.party.events.map(id => {
            return <EventRow key={id} id={id} />
          }) }
        </div>
      )
    }
    else{
      return (
        <button>No Events</button>
      )
    }
  }

  attending(){
    if(this.props.party.attending){
      return (
        <div>
          <h3>Attending</h3>
          { this.props.party.attending.map(id => {
            return <Friend key={id} id={id} />
          }) }
        </div>
      )
    }
    else{
      return (
        <button>No Attendees</button>
      )
    }
  }

  invited(){
    if(this.props.party.invited){
      console.log(this.props.party);
      return (
        <div>
          <h3>Invited</h3>
          { this.props.party.invited.map(id => {
            return <Friend key={id} id={id} />
          }) }
        </div>
      )
    }
    else{
      return (
        <button>No Invites</button>
      )
    }
  }

  render(){
    console.log(this.props.party);
    if(this.props.party){
      return (
        <div>
          <h2>{this.props.party.name}</h2>
          <button onClick={() => { browserHistory.push('/partys') }}>Back</button>
          <Link to={ '/party/' + this.props.id + '/edit' }>Edit Event</Link>
          {this.events()}
          {this.attending()}
          {this.invited()}
        </div>
      )
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    party: state.partys.partys[ownProps.params.id],
    id: ownProps.params.id
  }
}

export default connect(mapStateToProps)(_Component);
