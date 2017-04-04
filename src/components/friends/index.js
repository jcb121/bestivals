import React from 'react';
import { connect } from 'react-redux';

import { setFriends, addFriends } from './index.actions';
import Friend from '../entry/friend';


import './index.css';


let friends = ({ friends = [], setFriends, addFriends, action }) => {

  if(!friends.length){
    setFriends()
  }

  return (
    <div>
      {friends.map((id)=>{
        return <Friend key={id} id={id} action={action}/>
      })}
      <button onClick={addFriends}>Load more</button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    friends: state.friends.friends,
    action: ownProps.action
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFriends:() => {
      dispatch(setFriends())
    },
    addFriends:() => {
      dispatch(addFriends())
    }
  }
}

const Friends =  connect(
  mapStateToProps,
  mapDispatchToProps
)(friends);

export default Friends;
