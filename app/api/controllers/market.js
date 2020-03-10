const marketModel = require('../models/market');

module.exports = {
		create: (req,res,next) => {
			marketModel.create({ 
				marketName: req.body.name,
				marketLocation: req.body.location, 
				marketType: req.body.type,
			},(err, result) => {
				if (err) 
				 res.json({status: 500, message: err})
				else
				 res.json({
					 status: "success", 
					 message: "Market added successfully!!!", 
					 data: null
					});
			});
			
		},
    getById: (req, res, next) => {
        marketModel.findById(req.params.marketId, (err, marketInfo) => {
					if (err){
							next(err)
					}else{
						res.json({
						status: "success",
						message: "market found!",
						data: {markets: marketInfo}
					});
				}
			});
    },

    getAllMarkets: (req, res, next) => {
			let marketsList = [];
        marketModel.find({}, (err, markets) => {
					console.log(markets)
					if (err){
						next(err)
					}else{
						for (let market of markets){
							marketsList.push({
								id: market.id,
								marketName: market.marketName,
								marketLocation: market.marketLocation,
								marketType: market.marketType,
							});
						}
						res.json({
							status: "success",
							message: "market list Found!",
							data: {
								markets: marketsList
							}
						});
					}
        
        })
		},
		
		deleteMarket: (req, res, next) => {
			marketModel.deleteOne(req.params.marketId, (err, marketInfo) => {
				if (err) {
					next(err)
				} else {
					res.json({
						status: 'success',
						message: 'markets with ID:' + req.params.marketId + 'successfully deleted!',
						// data: marketInfo
					})
				} 
			})
		},

		updateMarket: (req, res, next) => {
			console.log('INI REQ');
			marketModel.findOneAndUpdate({
				_id: req.body.id
			}, {
				$set: {
					marketName: req.body.marketName,
					marketLocation: req.body.marketLocation
				}
			}, {
				sort: {_id: -1},
				upsert: true
			}, (err, result) => {
				if (err) return res.send(err)
				res.send(result)
			}
			)
		}
}