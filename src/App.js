import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import cookie from 'react-cookie';

import App from './components/app'
import Loading from './components/loading'
import Login from './components/login'

import Partys from './components/partys'
import PartyCreate from './components/partys/create'
import PartyDelete from './components/partys/delete'
import PartyEmpty from './components/partys/empty'
import PartyEvents from './components/partys/events'

import Party from './components/party'
import PartyView from './components/party/view'
import PartyEdit from './components/party/edit'

import Fresh from './components/fresh'

import Me from './components/me'



import { loadSite, authSite } from './app.actions';

class _Component extends Component {

  constructor(props) {
    super(props)
    this.state = {
      location: browserHistory.getCurrentLocation().pathname
    }
    browserHistory.push('/');
    this.props.dispatch(loadSite());
  }

  componentWillMount(){
    var accessToken = cookie.load('facebookAccessToken');
    var id = cookie.load('facebookUserId');
    if(accessToken && id){
      this.props.dispatch({
        type: 'FB_INFO',
        payload: {
          accessToken,
          id
        }
      })
    }
  }

  componentWillUpdate(nextProps, nextState){

    //Sets Cookies
    if(nextProps.facebook.accessToken && nextProps.facebook.userId){
      cookie.save('facebookAccessToken', nextProps.facebook.accessToken);
      cookie.save('facebookUserId', nextProps.facebook.userId);
    }


    if(nextProps.siteLoaded && !nextProps.siteAuthed){
      if(nextProps.facebook.state === 'PENDING'){
        this.props.dispatch(authSite());
      }
      else{
        browserHistory.push('/login');
      }
    }
    else if(nextProps.siteLoaded && nextProps.siteAuthed){
      if(this.state.location !== '/' && this.state.location !== '/login'){
        browserHistory.push(this.state.location);
      }
      else{
        browserHistory.push('/me');
      }
    }
  }

  render(){
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Loading }></IndexRoute>
          <Route path="/login" component={ Login }></Route>
          <Route path="/me" component={Me}></Route>
          <Route path="/partys" component={ Partys }>
            <IndexRoute component={ PartyEvents }></IndexRoute>
            <Route path="/partys/create" component={ PartyCreate }></Route>
            <Route path="/partys/delete" component={ PartyDelete }></Route>
            <Route path="/partys/empty" component={ PartyEmpty }></Route>
          </Route>
          <Route path="/party/:id" component={Party}>
            <IndexRoute component={ PartyView }></IndexRoute>
            <Route path="/party/:id/edit" component={ PartyEdit }></Route>
          </Route>

          <Route path="/fresh" component={ Fresh }></Route>
        </Route>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    siteAuthed: state.site.authed,
    siteLoaded: state.site.loaded,

    facebook: state.facebook,
  }
}

export default connect(mapStateToProps)(_Component);
