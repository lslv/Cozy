import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import RatingItem from './RatingItem'
import { bindActionCreators } from 'redux';
import {fetchAllRatings} from '../actions/actions_ratings'

class RatingList extends Component {

  componentWillMount(){
    //call a function, which is an action(fetchAllRatings)
    this.props.fetchAllRatings()

  }
  const ratinglist = this.props.ratingList.map((rating)=> {
    return (
      <RatingItem
      stars={rating.stars}
      review = {rating.review}
      />
    )
  })

  return (
    <ul className ="rating-list">
      {ratinglist}
    </ul>
  )

}

function mapStateToProps(state){
  return {
    ratingList: state.ratings.ratingList
  };
}


//Promote bookList from a component to a containers - it needs to  know abut this new dispatch method, selectBook. Make is available as a prop.
export default connect(mapStateToProps,{fetchAllRatings:fetchAllRatings})(RatingList);
