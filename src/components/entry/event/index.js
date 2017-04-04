import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';
import { getEvent } from './index.actions';


class _Component extends Component {

  constructor(props) {
    super(props)
    if(!props.event){
      props.dispatch(getEvent(props.id))
    }
  }

  imageURL(){
    if(this.props.event.picture){
      return this.props.event.picture.data.url;
    };
    return `https://graph.facebook.com/v2.8/${ this.props.event.id }/picture?access_token=${ this.props.accessToken }`;
  }

  getDate(timestamp){
    let months = ['January', 'February', 'March','April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December' ];
    let time = new Date(timestamp);
    return time.getDate() + ' ' + months[time.getMonth()];
  }

  dateRange(){
    if(this.props.event.start_time){
      return (
        <div className="entry__date">
          {this.getDate(this.props.event.start_time)} - {this.getDate(this.props.event.end_time)}
        </div>
      )
    }
  }

  description(){
    if(this.props.event.description){
      return (
        <p className="entry__desc">{this.props.event.description}</p>
      )
    }
  }

  action(){
    if(this.props.action && this.props.label){
      return (
        <div className="entry__action">
          <button onClick={ ()=>{ this.props.dispatch(this.props.action(this.props.event)) }}>
          { this.props.label }
          </button>
        </div>
      )
    }
  }

  render(){
    if(!this.props.event){
      return <div>Loading</div>
    }
    return(
      <div className="entry">
        <img className="entry__thumb" alt="festival" src={ this.imageURL() }/>
        <div className="entry__text">
          <div className="entry__name">{this.props.event.name}</div>
          { this.dateRange() }
          { this.description() }
          { this.action() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: state.facebook.accessToken,
    event: state.events.cache[ownProps.id],
    action: ownProps.action
  }
}

export default connect(mapStateToProps)(_Component);
