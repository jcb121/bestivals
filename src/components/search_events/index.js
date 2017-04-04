import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearch } from './index.actions';

import './index.css';


class _Component extends Component {

  constructor(props){
    super(props)
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);

  }

  handleChange(evt) {
    this.setState({query: evt.target.value});
    this.search( this.state.query );
  }

  search(){
    this.props.dispatch(setSearch(this.state.query));
  }

  render(){
    return (
      <div>
        <input type="text" onChange={ this.handleChange } value={ this.state.query } />
      </div>
    )
  }
}

export default connect()(_Component);
