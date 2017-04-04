import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'


import { createParty } from './index.actions';

class _Component extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.createParty = this.createParty.bind(this)
    this.state = {
      post_title: ''
    }
  }

  handleChange(event) {
    this.setState({post_title: event.target.value});
  }

  createParty(){
    this.props.dispatch(createParty(this.state));
  }

  componentWillMount(){
    this.props.dispatch({
      type: 'SET_CURRENT_PARTY'
    })
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.party){
      this.props.dispatch({ type: 'PARTYS_READY' });
      browserHistory.push('/party/' + nextProps.party.id + '/edit');
    }
  }

  render(){
    return (
      <div>
        <h3>Create a new Party</h3>
        <button onClick={() => { browserHistory.push('/partys') }}>Back</button>

        <p>Party name: </p>
        <input type="text" value={this.state.post_title} onChange={this.handleChange} />
        <button onClick={this.createParty}>Create</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.partys.state,
    party: state.party.party,
    id: state.partys.current
  }
}

export default connect(mapStateToProps)(_Component);
