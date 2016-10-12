import React, { Component } from 'react'
import { Link } from 'react-router'
import Navbar from './Navbar'
import { Image } from 'react-bootstrap'


export default class Landing extends Component {
  render () {
    return (
      <div>
       <Navbar />
       <div className='landing'>
         <div className='landing-tile' id='lt1'>
            <h1>Cozy</h1>
            <p>This is home</p>
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
                <Image src ='../../assets/chore_white.png' />
                <h4>Chores</h4>
              </div>
              <div>
                <Image src ='../../assets/budget_white.png' />
                <h4>Budgeting</h4>
              </div>
              <div>
                <Image src ='../../assets/bulletin_board_white.png' />
                <h4>Bulletin Board</h4>
              </div>
              <div>
                <Image src ='../../assets/chat_white.png' />
                <h4>Chat</h4>
              </div>
              <div>
                <Image 
                src ='../../assets/user_review_white.png' />
                <h4>Roommate Reviews</h4>
              </div>
              <div className='calendar_landing_image'>
                <Image 
                src ='../../assets/cal_white_copy.png' />
                <h4>Calendar</h4>
              </div>
            </div>
         </div>
         <div className='landing-tile' id='lt3'>
         <h1>Tech Stack</h1>
         <div className='tech'>
          <div>
            <Image src ='../../assets/react.svg' />
            <h4>ReactJS</h4>
          </div>
          <div>
            <Image src ='../../assets/redux.png' />
            <h4>Redux</h4>
          </div>
          <div>
            <Image src ='../../assets/sass.png' 
            id='sass'
            />
            <h4>Sass</h4>
          </div>
          <div id='node'>
            <Image src ='../../assets/nodejs.png'/>
            <h4>NodeJs</h4>
          </div>
          <div>
            <Image src ='../../assets/postgresql.png' 
            id='postgre'
            />
            <h4>PostgreSQL</h4>
          </div>
          <div>
            <Image src ='../../assets/sequelize.png' />
            <h4>Sequelize ORM</h4>
          </div>
         </div>
         </div>
         <div className='landing-tile' id='lt4'>
         <h1>Developers</h1>
         <div className='developers'>
         <div>
            <Image src ='../../assets/lee_pic.jpeg' />
            <h4>Lee Mordell</h4>
            <div className='developer-links'>
              <a href='https://github.com/lmordell'>
              <Image src ='../../assets/github.png' />
              </a>
              <a href='https://www.linkedin.com/in/leemordell'>
              <Image src ='../../assets/linkedin.png' />
              </a>
            </div>
          </div>
          <div>
          <Image
          className='img-offset' 
          src ='../../assets/viv_pic.jpeg' />
            <h4>Vivian Sze</h4>
            <div className='developer-links'>
              <a href='https://github.com/vvnsze'>
              <Image src ='../../assets/github.png' />
              </a>
              <a href='https://www.linkedin.com/in/vivian-sze-755044125'>
              <Image src ='../../assets/linkedin.png' />
              </a>
            </div>
          </div>
          <div>
          <Image src ='../../assets/lucas_pic.png' />
            <h4>Lucas Fisher</h4>
            <div className='developer-links'>
              <a href='https://github.com/lsfisher'>
              <Image src ='../../assets/github.png' />
              </a>
              <a href='https://www.linkedin.com/in/lucasscottfisher'>
              <Image src ='../../assets/linkedin.png' />
              </a>
            </div>
          </div>
          <div>
          <Image 
          src ='../../assets/sean_pic.jpeg' />
            <h4>Sean Cox</h4>
            <div className='developer-links'>
              <a href='https://github.com/SeanCox'>
              <Image src ='../../assets/github.png' />
              </a>
              <a href='https://www.linkedin.com/in/seancoxcode'>
              <Image src ='../../assets/linkedin.png' />
              </a>
            </div>
          </div>
         </div>
         </div>
        </div>
      </div>
    )
  }
}
