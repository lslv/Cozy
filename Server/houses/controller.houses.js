const Houses = require('./model.houses')

module.exports = {
	search: (req, res) => {
		Houses.findAll({
			where: {
				house_name: {
					$iLike: '%' + req.query.search + '%'
				}
			}
		})
    .then(houses => res.status(200).json(houses))
    .catch(err => res.status(400).send(err))
	},
	addHouse: (req, res) => {
		Houses.create({
			house_name: req.body.houseName,
			slush_fund_value: 0
		})
		.then(house => res.status(200).send(house))
    .catch(err => res.status(400).send(err))
	}
}
