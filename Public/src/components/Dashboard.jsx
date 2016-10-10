import React, { Component } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import {TileLayout, TileLayoutItem} from 'pui-react-tile-layout'
import {ClickableAltPanel} from 'pui-react-panels'
import {Grid, Row, Col, Button} from 'react-bootstrap'
import Navbar from '../components/Navbar'

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
    this.state={
      bulletin:'../../assets/bulletin_board_white.png',
      chores:'../../assets/chore_white.png',
      calendar: '../../assets/cal_white.png',
      chats:'../../assets/chat_white.png' ,
      budget:'../../assets/budget_white.png',
      reviews:'../../assets/user_review_white.png'
    }
	}

	componentWillMount() {
    //here check if the user logged in via FB auth
        //if so, save data on url query str to session storage
		const { query } = this.props.location
      //on fb login, if user is associated with house
      //query obj is truthy and sets data to sessionStorage
      //if the user just joined a house, the data
      //has already been stored
		if(!_.isEmpty(query)) {
			sessionStorage.setItem('id', query.id)
			sessionStorage.setItem('username', query.user_name)
			sessionStorage.setItem('pay_percentage', query.pay_percentage)
			sessionStorage.setItem('admin', query.admin)
			sessionStorage.setItem('house_id', query.house_id)
			sessionStorage.setItem('fb_pic', query.fb_picture)
		}
	}
  onHover(tileName){
    var currentPath= this.state[tileName].slice(0,-10)
    // console.log(currentPath.slice(0,-10))
    var newState={};
    newState[tileName]=currentPath + '_red.png';
    this.setState(newState)
    //console.log('onMouseOver bulletin')
  }
  onHoverLeave(tileName){
    var currentPath= this.state[tileName].slice(0,-8)
    var newState={};
    newState[tileName]=currentPath + '_white.png';
    this.setState(newState)
    // this.setState({bulletin: currentPath + '_white.png'})
    //console.log('onMouseOver bulletin')
  }
 

	render () {
    return (
    <div>
      <Navbar />

      <Grid className="dashboardContainer">
        <Row className="show-grid">
        <Col xs={6} md={4}>
          <Link className="tileLink" to='/bulletin_board'
          onMouseOver={()=>{this.onHover('bulletin')}}
          onMouseOut={()=>{this.onHoverLeave('bulletin')}}>
            <ClickableAltPanel className='panel tile' >
              Bulletin board
             <img className="icon" src={this.state.bulletin}/>
            </ClickableAltPanel>
          </Link>
        </Col>
        <Col xs={6} md={4}>
          <Link className="tileLink" to='/chorelist'
          onMouseOver={()=>{this.onHover('chores')}}
          onMouseOut={()=>{this.onHoverLeave('chores')}}          
          >
            <ClickableAltPanel className='panel tile' >
              Chores
              <img className="icon" src={this.state.chores} />
            </ClickableAltPanel>
          </Link>
        </Col>
        <Col xsHidden md={4}>
            <Link className="tileLink" to='/calendar'
          onMouseOver={()=>{this.onHover('calendar')}}
          onMouseOut={()=>{this.onHoverLeave('calendar')}}  
            >
              <ClickableAltPanel className='panel tile' >
                Calendar
                <img className="icon calendar" src={this.state.calendar} />
              </ClickableAltPanel>
            </Link>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col xs={6} md={4}>
            <Link className="tileLink" to='/chat'
          onMouseOver={()=>{this.onHover('chats')}}
          onMouseOut={()=>{this.onHoverLeave('chats')}}
            >
              <ClickableAltPanel className='panel tile' >
              Chats
              <img className="icon" src={this.state.chats} />
              </ClickableAltPanel>
            </Link>
          </Col>
          <Col xs={6} md={4}>
            <Link className="tileLink" to='/budget'
          onMouseOver={()=>{this.onHover('budget')}}
          onMouseOut={()=>{this.onHoverLeave('budget')}}
            >
              <ClickableAltPanel className='panel tile' >
              Budget
              <img className="icon" src={this.state.budget} />
              </ClickableAltPanel>
            </Link>
          </Col>
          <Col xsHidden md={4}>
            <Link className="tileLink" to='/ratings'
          onMouseOver={()=>{this.onHover('reviews')}}
          onMouseOut={()=>{this.onHoverLeave('reviews')}}
            >
              <ClickableAltPanel className='panel tile'> 
              Reviews
              <img className="icon" src={this.state.reviews} />
              </ClickableAltPanel>
            </Link>
          </Col>
        </Row>
      </Grid>
    </div>



      )


    // return (
    //     <TileLayout columns={3}>
    //      <TileLayoutItem>
    //      <Link className="tileLink" to='/bulletin_board'>
    //        <ClickableAltPanel>
    //         Bulletin Board
    //        </ClickableAltPanel>
    //       </Link>
    //      </TileLayoutItem>

    //      <TileLayoutItem>
    //      <Link to='/chorelist'>
    //         <ClickableAltPanel>
    //           Chores
    //         </ClickableAltPanel>
    //       </Link>
    //      </TileLayoutItem>

    //      <TileLayoutItem>
    //      <Link to='/calendar'> 
    //        <ClickableAltPanel>
    //         Calendar
    //        </ClickableAltPanel>
    //       </Link>
    //      </TileLayoutItem>

    //      <TileLayoutItem>
    //      <Link to='/chat'>
    //        <ClickableAltPanel>
    //          Chat Room
    //        </ClickableAltPanel>
    //       </Link>
    //      </TileLayoutItem>

    //      <TileLayoutItem>
    //      <Link to='/budget'> 
    //        <ClickableAltPanel>
    //         Budget
    //        </ClickableAltPanel>
    //       </Link>
    //      </TileLayoutItem>

    //       <TileLayoutItem>
    //       <Link to='/review'> 
    //          <ClickableAltPanel>
    //           User Reviews
    //          </ClickableAltPanel>
    //        </Link>
    //      </TileLayoutItem>

    //    </TileLayout>
    //  )


		// return (
  //     <div>
  //       <p>
  //         In the dashboard
  //       </p>
  //       <button>
  //         <Link to='/bulletin_board'> Go to the bulletin board</Link>
  //       </button>
  //       <br />
  //       <button>
  //         <Link to='/chorelist'> Go to the chore list board</Link>
  //       </button>
  //       <br />
  //       <button>
          // <Link to='/calendar'> Go to the Calendar</Link>
  //       </button>
		// 		<br />
  //       <button>
          // <Link to='/chat'> Go to the chat room</Link>
		// 		</button>
		// 		<br />
		// 		<button>
          // <Link to='/budget'> Go to Budget</Link>
  //       </button>
  //     </div>
  //   )
	}
}
