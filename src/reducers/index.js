import { combineReducers } from 'redux'
import facebook from './facebook'
import events from './events'
import friends from './friends'

import maps from './maps'
import site from './site'
import partys from './partys'
import party from './party'


const todoApp = combineReducers({
  facebook,
  events,
  friends,
  maps,
  site,
  partys,
  party
})

export default todoApp
