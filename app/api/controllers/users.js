const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create: (req, res, next) => {
      userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
      }, (err, result) => {
          if (err)
              next(err);
          else
              res.json({status: "Success", message: "User Added Succesfully!", data: null});
      })
  },

  authenticate: (req, res, next) => {
    console.log(req.body)
      userModel.findOne({email: req.body.email}, function(err, userInfo){
          if (err){
            next(err);
            res.json({
              status: 'error', message: 'something wrong'
            })
          }
          else{
            if (bcrypt.compareSync(req.body.password, userInfo.password)){
                const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'),{
                  expiresIn: '1h'
                  });
                res.json({status: "success", message:"User Found!!", data: { user: userInfo, token: token}});
            }	else {
                res.json({status: "error", message:"Invalid email/Password!!", data: null});
            }
          }
      });
  }
}