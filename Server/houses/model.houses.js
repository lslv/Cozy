const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Users = require('../houses/model.users.js')

const Houses = sequelize.define('houses',{
  house_name: {
    type: Sequelize.STRING(50),
    unique: true,
    notNull: false
  },
  //Amount input in cents
  slush_fund_value: {
    type: Sequelize.INTEGER,
    isDecimal: false,
    notNull: false
  }
},

//Ensure timeStamps are true
{
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
})

sequelize.sync()

module.exports = Houses
