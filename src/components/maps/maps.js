import React from 'react';
import { connect } from 'react-redux';

import './maps.css';
import { setMap } from './maps.actions';

var markers = [];

let maps = ({ party = [], map = false, setMap }) => {

  if(!party.length){
    return null;
  }

  var cords = party.reduce(function(collection, event){
    if(event.place && event.place.location && event.place.location.latitude && event.place.location.longitude){
      collection.push({
        lat: event.place.location.latitude,
        lng: event.place.location.longitude
      })
    }
    return collection;
  }, []);

  var createMap = function(ref){
    if(!map){
      try{
        let map = new window.google.maps.Map(ref, {
          zoom: 4,
          center: cords[0]
        });
        setMap(map);
      }
      catch(err){
        console.log(err);
      }
    }
  }

  if(map){
    markers.forEach(marker => marker.setMap(null));
    markers = cords.map(cord => {
      return new window.google.maps.Marker({
        map: map,
        position: cord
      });
    })
  }

  return <div id="map" ref={ ref => createMap(ref) }></div>;
}

const mapStateToProps = (state) => {
  return {
    party: state.my_events,
    map: state.maps.map
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMap:function(map){
      dispatch(setMap(map))
    }
  }
}

const Maps =  connect(
  mapStateToProps,
  mapDispatchToProps
)(maps);

export default Maps;
