const Billing = require('../billing/model.billing').Bills

module.exports = {
	getBills : (req, res) => {
    //takes in a house id
    //returns all bills with the house id
		Billing.findAll({
			where: { houseId: req.query.house_id }
		})
    .then(bills => res.status(200).json(bills))
	},

	createBill : (req,res) => {
		Billing.create({
			bill_name: req.body.billname,
			amount_due_in_cents: parseInt(req.body.amount) * 100,
			houseId: req.body.houseId,
			is_paid: false
		})
		.then(bill => res.status(200).json(bill))
	}
}
