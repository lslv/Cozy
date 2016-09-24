const Houses = require('./model.houses')

module.exports = {

	search: (req, res) => {
		Houses.findAll({
			//where: { house_name: req.query.search }
			where: {
				house_name: {
					$iLike: '%' + req.query.search + '%'
				}
			}
		})
    .then(houses =>{
	res.status(200).json(houses)
})
    .catch(err => res.status(400).send(err))
	}
}
