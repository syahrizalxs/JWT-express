const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express();

//Import Routers
const users = require('./routes/users')
const markets = require('./routes/markets')
const suppliers = require('./routes/suppliers')


const PORT = process.env.PORT || 3000;

//Configuration Database
const moongose = require('mongoose');
const dbConfig = require('./config/database');

moongose.connect(dbConfig.url,{
    useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connected to database');
    })
    .catch(err => {
        console.log('Could not connect to database', err);
        process.exit();
})

app.set('secretKey','nodeRestApi');//JWT secret token
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        'message' : 'API for Markets Stock'
    });
});

validateUser = (req, res, next) =>{
    jwt.verify(req.headers['key'], req.app.get('secretKey'), (err, decoded) =>{
        if (err){
            res.json({
                status: "Error",
                message: err.message,
                data: null
            });
        } else{
            //Add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}

// ROUTERS FOR APP DECLARE HERE //

//Public Routes (No Authenticate)
app.use('/users', users);
app.use('/suppliers', suppliers)
//Private Routes (With authenticate)
app.use('/markets', validateUser, markets);

app.listen(PORT, () =>{
    console.log('Server running on'+ PORT);
});
