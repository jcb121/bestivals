import React, { Component } from 'react';
import { connect } from 'react-redux';

import './index.css';
import { getFriend } from './index.actions';


class _Component extends Component {

  constructor(props) {
    super(props)
    if(!props.friend){
      props.dispatch(getFriend(props.id));
    }
  }

  imageURL(){
    if(typeof this.props.friend.picture !== 'undefined'){
      return this.props.friend.picture.data.url;
    }
    else{
      return `https://graph.facebook.com/v2.8/${ this.props.id }/picture?access_token=${ this.props.accessToken }`;
    }
  }

  action(){
    if(this.props.action){
      return (
        <div className="entry__action">
          <button onClick={()=>{ this.props.action.action(this.props.friend) }}>
          { this.props.action.text }
          </button>
        </div>
      )
    }
  }

  render(){
    if(this.props.friend){
      return(
        <div className="entry">
          <img className="entry__thumb" alt="festival" src={ this.imageURL() }/>
          <div className="entry__text">
            <div className="entry__name">{this.props.friend.name}</div>
            { this.action() }
          </div>
        </div>
      )
    }
    return null;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: state.facebook.accessToken,
    friend: state.friends.cache[ownProps.id],
    action: ownProps.action
  }
}

export default connect(mapStateToProps)(_Component);
