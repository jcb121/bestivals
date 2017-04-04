import React from 'react';
import { Link } from 'react-router'

let component = () => {

  return (
    <div>
      <h2>You have no partys</h2>
      <Link to="/partys/create">Create a new party?</Link>
    </div>
  )
}

export default component;
