import React from 'react';
import { connect } from 'react-redux';

let component = ({ children }) => {
  return (
    <div>
      <h2>Party</h2>
      { children }
    </div>
  )
}

const mapStateToProps = (state, ownProps ) => {
  return { children: ownProps.children }
}

const Component =  connect(
  mapStateToProps
)(component);

export default Component;
