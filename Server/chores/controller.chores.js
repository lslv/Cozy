const db = require('../chores/model.chores')
const Users = require('../users/model.users')
const schedule =require('node-schedule')

//wrap this whole thing in a cron job so it executes at the beginning of every week
var rule = new schedule.RecurrenceRule()
rule.dayOfWeek=0
// rule.minute=0
rule.minute=0
rule.hour=0

var weeklyCronUpdate= schedule.scheduleJob(rule, function(){
	db.Chores.findAll()
	.then(chores=>{
		chores.forEach(chore=>{
			console.log('updating chore #', chore.id)
			var newTurn= chore.user_turn +1
			if(newTurn <  chore.num_of_users)
				chore.update({user_turn: newTurn})
			else
				chore.update({user_turn: 0})
		})
	})
	
})




module.exports = {
	postChore: (req, res) => {
		console.log(req.body)
		if(req.body.type==='group')
			db.Chores.create({
				chore_name: req.body.chore_name,
				user_turn: 0,
				num_of_users:req.body.num_of_users,
				day:req.body.day,
				house_id: req.body.house_id,
			})
		else //could refactor into object being passed in being modifed
			db.Chores.create({
				chore_name: req.body.chore_name,
				user_turn: 0,
				num_of_users:1,
				day:req.body.day,
				house_id: req.body.house_id,
			})
    .then((createdPost) => {
	if(req.body.type==='group'){
		Users.findAll({where:{house_id:req.body.house_id}})
            .then((users)=>{
	var queuePosts=[]
	var turnNum=0
	users.forEach((user)=>{
		queuePosts.push({
			turn:turnNum,
			userId: user.dataValues.id,
			choreId: createdPost.dataValues.id,
			houseId: req.body.house_id
		})
		turnNum++
	})
	db.Queues.bulkCreate(queuePosts)
    .then(()=>{
	res.status(200).send(createdPost)
	})
	})}
	else{
		Users.findOne({where:{user_name:req.body.chore_adder}})
    .then((user)=>{
	db.Queues.create({
		turn:0,
		userId:user.dataValues.id,
		choreId: createdPost.dataValues.id,
		houseId: req.body.house_id
	})
  .then(()=>{
	res.status(200).send(createdPost)
	})
	})
	}
	// creat cron job related to each chore here, make a call to updateCHore Turn
	// console.log(req.body.day)
	// var weekDayNum=0
	// switch(req.body.day){
	// case 'monday':
	// 	weekDayNum=1
	// 	break
	// case 'tuesday':
	// 	weekDayNum=2
	// 	break
	// case 'wednesday':
	// 	weekDayNum=3
	// 	break
	// case 'thursday':
	// 	weekDayNum=4
	// 	break
	// case 'friday':
	// 	weekDayNum=5
	// 	break
	// case 'saturday':
	// 	weekDayNum=6
	// 	break
	// case 'sunday':
	// 	weekDayNum=7
	// 	break

	// }
	// var choreCronJob= schedule.scheduleJob('* * * * * *', function(){
		
	// })

	// setTimeout(function(){
	// 	console.log('cancelling that cron job')
	// 	choreCronJob.cancel()
	// }, 5000, choreCronJob)




	})
    .catch((err) => {
	res.status(404).send(err)
	})
	},

	getChores: (req, res) => {
		console.log('getChores query: ', req.query)
		db.Chores.findAll({
			where: { house_id: req.query.house_id }
		})
      .then((queriedPosts) => {
	res.status(200).json(queriedPosts)
	})
      .catch((err) => {
	res.status(404).send(err)
	})
	},

	deleteChore: (req, res) => {
		console.log('deleteChore query: ', req.query)
		db.Chores.findOne({
			where: {id: req.query.id }
		})
      .then((choreToDelete) => {
	choreToDelete.destroy()
// })
//       .then((deletedChore)=>{
	res.status(200).json(choreToDelete)
	})
      .catch((err) => {
	res.status(404).send(err)
	})
	},

	getQueue: (req, res) => {
		console.log('getQueue query', req.query)
		db.Queues.findAll({where: {choreId:req.query.choreId}})
    .then((queues)=>{
	res.status(200).json(queues)
	})
    .catch((err)=>{
	res.status(404).send(err)
	})

	},
	getQueues: (req, res) => {
		console.log('getQueues query', req.query)
		db.Queues.findAll({where: {choreId:req.query.houseId}})
    .then((queues)=>{
	res.status(200).json(queues)
	})
    .catch((err)=>{
	res.status(404).send(err)
	})

	},
	updateChoreTurn: (req, res) => {
		console.log('update Chores query: ', req.body)
		db.Chores.findOne({
			where: { id: req.body.id }
		})
    .then((choreToBeUpdated) => {
      //now it becomes the user for the previos week, might be a good place to make google notifcation on calendar
	var newTurn= choreToBeUpdated.user_turn -1
	if(newTurn >= 0)
		return choreToBeUpdated.update({user_turn: newTurn})
	else
        return choreToBeUpdated.update({user_turn: choreToBeUpdated.num_of_users-1})

	})
    .then((updatedChore) => {
	console.log(updatedChore)
	res.status(200).send(updatedChore)
	})
    .catch((err) => {
	res.status(404).send(err)
	})
	}


}
