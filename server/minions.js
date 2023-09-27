const minionsRouter = require('express').Router();


// Import Functions from db.js
const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send("Minion not found");
    }
});

// GET all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// GET minion by id
minionsRouter.get('/:minionId', (req, res) => {
    res.send(req.minion);
});

// POST minion
minionsRouter.post('/', (req, res) => {
    const newMinion = req.body;
    if (newMinion && newMinion.name) {
        const addedMinion = addToDatabase('minions', newMinion)
        res.status(201).send(addedMinion)
    } else {
        res.status(400).send('Invalid input')
    }
});

// PUT Minion
minionsRouter.put('/:minionId', (req, res) => {
    const updatedMinion = req.body;
    if (updatedMinion && updatedMinion.name) {
        updatedMinion.id = req.params.minionId;
        const result = updateInstanceInDatabase('minions', updatedMinion);
        res.send(result);
    } else {
        res.status(400).send('Invalid input');
    }
})

//DELETE Minion
minionsRouter.delete('/:minionId', (req, res) => {
    const removedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (removedMinion) {
        res.status(204).end()
    } else {
        res.status(500).send()
    }
})

// GET Minion work
minionsRouter.get('/:minionId/work', (req, res) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.minionId === req.params.minionId;
    })
    res.send(work);
});

// POST Minion Work
minionsRouter.post('/:minionId/work', (req, res) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createWork = addToDatabase('work', workToAdd);
    res.status(201).send(createWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

// PUT minion work
minionsRouter.put('/:minionId/work/:workId', (req, res) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send()
    } else {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

// DELETE minion work
minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
    const workToDelete = deleteFromDatabasebyId('work', req.params.workId);
    if (workToDelete) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
})

module.exports = minionsRouter;