const Sequelize = require('sequelize')
const sequelize = require('../config/database')
const Houses = require('../houses/model.houses.js')

// This is the chore Table itself
const Chores = sequelize.define('chores',{
  chore_name:{
    type: Sequelize.STRING(50),
    unique: true,
    notNull: true
  },
  day_of_week:{

  },
  user_turn:{

  }
},
{
  timestamps: true,
  // createdAt: 'created_at',
  // updatedAt: 'updated_at',
  // deletedAt: 'deleted_at',
  underscored: true,
  paranoid: true
})

Chores.belongsTo(Houses);

Chores.sync({force: true}).then(function () {
  // Table created
  console.log('+++line32 model.chores table successfully created');
}).catch(function(err){
  console.error('There was an error in model.chores', err);
});


//This is the Chore Days

const Chore_Days = sequelize.define('chore_days',{
  //Days will be inputed as "monday, tuesday, wednesday, thursday, friday, saturday, sunday"
  day:{
    type: Sequelize.STRING(10),
    unique: true,
    notNull: true
  }
})

Chore_Days.belongsTo(Chores)

Chore_Days.sync({force: true}).then(function () {
  // Table created
  console.log('+++line53 model.Chore_Days table successfully created')
}).catch(function(err){
  console.error('There was an error in model.chores.Chore_Days', err)
});

//This table keeps track of whether a chore is completed by a user

const Chore_Completions = sequelize.define('chore_completions',{
  chore_id:{

  },
  user_id:{

  },
  verifying_user_id:{

  },
  complete:{
    type: Sequelize.BOOLEAN
  },
},
{
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  deletedAt: false,
})

Chore_Completions.sync({force: true}).then(function () {
  // Table created
  console.log('+++line83 model.Chore_Completions table successfully created')
}).catch(function(err){
  console.error('There was an error in model.chores.Chore_Completions', err)
});

//This Table is the queues the order of user turns

const Queues = sequelize.define('queues',{
  chore_id:{

  },
  user_id:{

  },
  turn:{

  }
})

Queues.sync().then(function () {
  // Table created
  console.log('+++line104 model.chores.queues table successfully created')
}).catch(function(err){
  console.error('There was an error in model.chores.queues', err)
});

//? How to export multiple items?
module.exports = Chores
