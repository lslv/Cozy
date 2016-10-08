import React, { Component } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import {TileLayout, TileLayoutItem} from 'pui-react-tile-layout'
import {ClickableAltPanel} from 'pui-react-panels'
import {Grid, Row, Col, Button} from 'react-bootstrap'

export default class Dashboard extends Component {
	constructor(props) {
		super(props)
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


	render () {

    return (
    <Grid>
      <Row className="show-grid">
      <Col xs={6} md={4}> <Link to='/bulletin_board'><ClickableAltPanel className='panel tile' >  Bulletin board</ClickableAltPanel>  </Link> </Col>
      <Col xs={6} md={4}>  <Link to='/chorelist'> <ClickableAltPanel className='panel tile' > Chores </ClickableAltPanel> </Link> </Col>
      <Col xsHidden md={4}> <Link to='/calendar'> <ClickableAltPanel className='panel tile' > Calendar </ClickableAltPanel> </Link> </Col>
      </Row>
      <Row className="show-grid">
      <Col xs={6} md={4}> <Link to='/chat'>  <ClickableAltPanel className='panel tile' > Chats </ClickableAltPanel> </Link> </Col>
      <Col xs={6} md={4}> <Link to='/budget'> <ClickableAltPanel className='panel tile' >  Budget </ClickableAltPanel> </Link> </Col>
      <Col xsHidden md={4}> <Link to='/reviews'> <ClickableAltPanel className='panel tile'>  Reviews </ClickableAltPanel> </Link> </Col>
      </Row>
    </Grid>



      )


    // return (
    //     <TileLayout columns={3}>
    //      <TileLayoutItem>
    //      <Link to='/bulletin_board'>
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
