import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router'

import { getPartys } from './index.actions';

import './index.css';


class _Component extends Component {

  constructor(props) {
    super(props)
    props.getPartys();
  }

  componentWillUpdate(nextProps, nextState){
    if(Object.keys(nextProps.partys).length === 0 && nextProps.state === 'READY'){
      browserHistory.push('/partys/empty');
    }
  }

  render(){
    return (
      <div>
        <h2>Your Partys</h2>
        <button onClick={() => { browserHistory.push('/partys/create') }}>Create Party</button>
        {Object.keys(this.props.partys).map(id => {
          return <div key={id} className="events-partys">
            <Link to={ '/party/' + id }>
                { this.props.partys[id].name }
            </Link>
          </div>
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    partys: state.partys.partys,
    state: state.partys.state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPartys:()=>{
      dispatch(getPartys())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Component);
