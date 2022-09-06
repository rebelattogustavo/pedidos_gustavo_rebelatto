const express = require('express');
const router = express.Router();

const usersHandler = require('./users.handler');

router.get('/', async (req, res) => {
    res.json(await usersHandler.searchUsers());
});

router.get('/:id', async (req, res) =>{
    res.json(await usersHandler.searchUsersId(req.params.id))
});

router.post('/', async (req, res) => {
    const { CPF, Name, Surname } = req.body;
    res.json(await usersHandler.create(CPF, Name, Surname));
});

router.put('/:id', async (req, res) =>{
    const { CPF, Name, Surname } = req.body;
    res.json(await usersHandler.create(CPF, Name, Surname, req.params.id));
});

router.delete('/:id', async (req, res) => {
    res.json(await usersHandler.remove(req.params.id));
});

module.exports = router;