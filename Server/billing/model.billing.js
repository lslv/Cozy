const Sequelize = require('sequelize')
const sequelize = require('../config/database')
let Houses = require('../houses/model.houses.js')
let Users = require('../users/model.users.js')
let chalk = require('chalk')

//This is the Bills table

const Bills = sequelize.define('bills', {
	bill_name: {
		type: Sequelize.STRING(50),
		notNull: true
	},
	is_paid: {
		type: Sequelize.BOOLEAN
	},
	amount_due_in_cents: {
		type: Sequelize.DECIMAL,
		notNull: true
	},
  due_date:{
    type: Sequelize.DATE,
    notNull: true
  }
} ,
	{
		timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false,
	}
)

Bills.belongsTo(Houses)

Bills.sync().then(function () {
  // Table created
	console.log(chalk.cyan('+++line37 model.bills table successfully created'))
}).catch(function (err) {
	console.error(chalk.cyan('+++line39 There was an error in model.bills'), err)
})

//This is the Slush_Fund_Payments Table

const Slush_Fund_Payments = sequelize.define('slush_fund_payments',{
  amount_in_cents:{
    type: Sequelize.DECIMAL,
		notNull: true
  }
} ,
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    deletedAt: false,
  }
)

Slush_Fund_Payments.belongsTo(Houses, {
  as: 'house_id',
  foreignKey: 'houses'
})

Slush_Fund_Payments.belongsTo(Users, {
  as: 'user_id',
  foreignKey: 'users'
})

Slush_Fund_Payments.sync().then(function () {
  // Table created
	console.log(chalk.cyan('+++line72 model.slush_fund_payments table successfully created'))
}).catch(function (err) {
	console.error(chalk.cyan('+++line74 There was an error in model.slush_fund_payments'), err)
})

module.exports = {Bills: Bills, Slush_Fund_Payments: Slush_Fund_Payments}
