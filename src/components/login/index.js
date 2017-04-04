import React from 'react';
import { connect } from 'react-redux';
import { fbLogin } from './index.actions.js';


let login = ({ fbLogin }) => {

  function login(){
    fbLogin();
  }

  return (
    <div>
      <h1>Log into Facebook</h1>
      <button className="" onClick={login}>Login</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fbLogin:()=>{
      dispatch(fbLogin())
    }
  }
}

const Login =  connect(
  mapStateToProps,
  mapDispatchToProps
)(login);

export default Login;
