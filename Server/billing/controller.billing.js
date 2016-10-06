const Billing = require('../billing/model.billing').Bills

module.exports = {
	getBills : (req, res) => {
    //takes in a house id
    //returns all bills with the house id
		Billing.findAll({
			where: { houseId: req.query.house_id }
		})
    .then(bills => res.status(200).json(bills))
	}
}
