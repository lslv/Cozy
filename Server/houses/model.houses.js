const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const Houses = sequelize.define('houses',{
  house_name: {
    type: Sequelize.STRING(50),
    // unique: true,
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

sequelize.sync({force: true}).then(function () {

  console.log('+++line 29 model.houses.js table successfully created');
  // Table created
  // return Houses.create({
  //   house_name: 'John',
  //   slush_fund_value: '45343'
  // });
}).catch(function(err){
  console.error('There was an error', err);
});

module.exports = Houses
