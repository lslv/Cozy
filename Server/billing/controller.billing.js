const Billing = require('./model.billing')

module.exports = {
	getBills : (req, res) => {
    //takes in a house id
    //returns all bills with the house id
		Billing.findAll({
			where: { house_id: req.query.house_id }
		})
    .then(res.status(200).send(req.query.house_id))

	}
}
