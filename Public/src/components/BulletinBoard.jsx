import React, { Component } from 'react'
import BulletinPost from './BulletinPost'

export default class BulletinBoard extends Component {
  render () {
    return (
      <div className='container'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>
                Add a post-it <i className='fa fa-plus-circle' aria-hidden='true'></i>
              </th>
              <th>
                Create a poll <i className='fa fa-plus-circle' aria-hidden='true'></i>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}
