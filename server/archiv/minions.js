const minionsRouter = require('express').Router();
const morgan = require('morgan');

//Middleware
minionsRouter.use(morgan('tiny'));

// Import Functions from db.js
const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionsId', (req, res, next, id) => {

})

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

module.exports = minionsRouter;