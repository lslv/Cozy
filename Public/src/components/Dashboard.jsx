import React, { Component } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import {TileLayout, TileLayoutItem} from 'pui-react-tile-layout'
import {ClickableAltPanel} from 'pui-react-panels'

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
        <TileLayout columns={3}>
         <TileLayoutItem>
           <ClickableAltPanel><Link to='/bulletin_board'> Go to the bulletin board
            </Link></ClickableAltPanel>
         </TileLayoutItem>
         <TileLayoutItem>
           <ClickableAltPanel><Link to='/chorelist'> Go to the chore list board
            </Link></ClickableAltPanel>
         </TileLayoutItem>
         <TileLayoutItem>
           <ClickableAltPanel><Link to='/calendar'> Go to the Calendar
            </Link></ClickableAltPanel>
         </TileLayoutItem>
         <TileLayoutItem>
           <ClickableAltPanel><Link to='/chat'> Go to the chat room
          </Link></ClickableAltPanel>
         </TileLayoutItem>
         <TileLayoutItem>
           <ClickableAltPanel><Link to='/budget'> Go to Budget
            </Link></ClickableAltPanel>
         </TileLayoutItem>
       </TileLayout>
     )


		// return (
  //     <div>
  //       <p>
  //         In the dashboard
  //       </p>
  //       <button>
  //         <Link to='/bulletin_board'> Go to the bulletin board
  //         </Link>
  //       </button>
  //       <br />
  //       <button>
  //         <Link to='/chorelist'> Go to the chore list board
  //         </Link>
  //       </button>
  //       <br />
  //       <button>
  //         <Link to='/calendar'> Go to the Calendar
  //         </Link>
  //       </button>
		// 		<br />
  //       <button>
  //         <Link to='/chat'> Go to the chat room
		// 		</Link>
		// 		</button>
		// 		<br />
		// 		<button>
  //         <Link to='/budget'> Go to Budget
  //         </Link>
  //       </button>
  //     </div>
  //   )
	}
}
