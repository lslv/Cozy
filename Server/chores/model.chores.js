const Sequelize = require('sequelize')
const sequelize = require('../config/database')
let Houses = require('../houses/model.houses.js')
let Users = require('../users/model.users.js')
let chalk = require('chalk')

// This is the chore Table itself
const Chores = sequelize.define('chores', {
  chore_name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  day:{
    type: Sequelize.STRING(20)
  },
  user_turn: {
    type: Sequelize.INTEGER
  }
},
  {
    timestamps: true,
    underscored: true,
    paranoid: true
  })

Chores.belongsTo(Houses)

Chores.sync().then(function () {
  // Table created
  console.log(chalk.yellow('+++line32 model.chores table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.chores', err)
})

// This is the Chore Days

// This is the Chore Days

const Chore_Days = sequelize.define('chore_days', {
  // Days will be inputed as "monday, tuesday, wednesday, thursday, friday, saturday, sunday"
  day: {
    type: Sequelize.STRING(10),
    unique: true,
    notNull: true
  }
})

Chore_Days.belongsTo(Chores)

Chore_Days.sync().then(function () {
  // Table created
  console.log(chalk.yellow('+++line53 model.Chore_Days table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.chores.Chore_Days', err)
})

// This table keeps track of whether a chore is completed by a user
const Chore_Completions = sequelize.define('chore_completions', {
  verified: {
    type: Sequelize.BOOLEAN
  },
  completed: {
    type: Sequelize.BOOLEAN
  }
},
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    deletedAt: false
  })

Chore_Completions.belongsTo(Chores, {
  as: 'chore_id',
  foreignKey: 'Chores'
})

Chore_Completions.sync().then(function () {
  // Table created
  console.log(chalk.yellow('+++line83 model.Chore_Completions table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.chores.Chore_Completions', err)
})

// This Table is the queues the order of user turns

const Queues = sequelize.define('queues', {
  turn: {
    type: Sequelize.INTEGER
  // allowNull: false
  }
})

Queues.belongsTo(Users, {
  as: 'user_id',
  foreignKey: 'Users'
})

Queues.belongsTo(Chores, {
  as: 'chore_id',
  foreignKey: 'Chores'
})

Queues.sync().then(function () {
  // Table created
  console.log(chalk.yellow('+++line104 model.chores.queues table successfully created'))
}).catch(function (err) {
  console.error('There was an error in model.chores.queues', err)
})

module.exports = {Chores: Chores, Chore_Days: Chore_Days, Chore_Completions: Chore_Completions, Queues: Queues}
