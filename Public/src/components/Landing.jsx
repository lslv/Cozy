import React, { Component } from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'


export default class Landing extends Component {
  render () {
    return (
      <div>
       <Navbar />
       <div className='landing'>
         <div className='landing-tile' id='lt1'>
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
         <div className='landing-tile' id='lt2'>
            <h1>Features</h1>
            <div className='features'>
              <div>
                <img src ='../../assets/chore.png' />
                <h4>Chores</h4>
              </div>
              <div>
                <img src ='../../assets/budget.png' />
                <h4>Budget</h4>
              </div>
              <div>
                <img src ='../../assets/bulletin_board.png' />
                <h4>Bulletin Board</h4>
              </div>
              <div>
                <img src ='../../assets/chat.png' />
                <h4>Chat</h4>
              </div>
              <div>
                <img src ='../../assets/user_review.png' />
                <h4>Roommate Reviews</h4>
              </div>
            </div>
         </div>
         <div className='landing-tile' id='lt3'>
         <h1>Tech Stack</h1>
         <div className='tech'>
          <div>
            <img src ='../../assets/react.svg' />
            <h4>ReactJS</h4>
          </div>
          <div>
            <img src ='../../assets/redux.png' />
            <h4>Redux</h4>
          </div>
          <div>
            <img src ='../../assets/sass.png' />
          </div>
          <div>
            <img src ='../../assets/express.png' />
          </div>
          <div>
            <img src ='../../assets/postgresql.png' />
          </div>
          <div>
            <img src ='../../assets/sequelize.png' />
          </div>
         </div>
         </div>
         <div className='landing-tile' id='lt4'>
         <h1>Developers</h1>
         <div className='developers'>
         <div>
         <img src ='../../assets/lee_pic.jpeg' />
            <h4>Lee Mordell</h4>
          </div>
          <div>
          <img src ='../../assets/viv_pic.jpeg' />
            <h4>Vivian Sze</h4>
          </div>
          <div>
          <img src ='../../assets/lucas_pic.png' />
            <h4>Lucas Fisher</h4>
          </div>
          <div>
          <img src ='../../assets/sean_pic.jpeg' />
            <h4>Sean Cox</h4>
          </div>
         </div>
         </div>
        </div>
      </div>
    )
  }
}
