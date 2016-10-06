import React, { Component } from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'


export default class Landing extends Component {
  render () {
    return (
      <div>
       <Navbar />
       <div className='landing'>
         <div className='landing-tile'>
            <h1 id='landing-title'>Cozy</h1>
            <p>Cozy Tagline</p>
            <div className="col-lg-4">
            <div className="input-group">
            <input type="text" className="form-control" placeholder="Find Roommates" />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">Go!</button>
            </span>
            </div>
            </div>
        </div>
         <div className='landing-tile'>
          <h1>Features</h1>
         </div>
         <div className='landing-tile'>
         <h1>Tech Stack</h1>
         </div>
         <div className='landing-tile'>
         <h1>Developers</h1>
         </div>
        </div>
      </div>
    )
  }
}
