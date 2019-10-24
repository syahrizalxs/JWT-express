const movieModel = require('../models/movies');

module.exports = {
		create: (req,res,next) => {
			movieModel.create({ 
				name: req.body.name,
				released_on: req.body.released_on, 
				starring: req.body.starring,
				directedBy: req.body.directedBy
			},(err, result) => {
				if (err) 
				 next(err);
				else
				 res.json({
					 status: "success", 
					 message: "Movie added successfully!!!", 
					 data: null
					});
			});
			
		},
    getById: (req, res, next) => {
        console.log(req.body);
        movieModel.findById(req.params.movieId, (err, movieInfo) => {
            if (err){
                next(err)
            }else{
				res.json({
				status: "success",
				message: "Movie found!",
				data: {movies: movieInfo}
			});
            }
        });
    },

    getAllMovies: (req, res, next) => {
			let moviesList = [];
        movieModel.find({}, (err, movies) => {
					if (err){
						next(err)
					}else{
						for (let movie of movies){
							moviesList.push({
								id: movie._id,
								name: movie.name,
								released_on: movie.released_on,
								starring: movie.starring,
								directedBy: movie.directedBy
							});
						}
						res.json({
							status: "success",
							message: "Movie list Found!",
							data: {
								movies: moviesList
							}
						});
					}
        
        })
    }
}