const express = require('express');
const router = express.Router();

const productsHandler = require('./products.handler.js');

router.get('/', async (req, res) => {
    res.json(await productsHandler.searchProducts());
});

router.get('/:id', async (req, res) =>{
    res.json(await productsHandler.searchProductsId(req.params.id))
});

router.post('/', async (req, res) => {
    const { Name, Price } = req.body;
    res.json(await productsHandler.create(Name, Price));
});

router.put('/:id', async (req, res) =>{
    const { Name, Price } = req.body;
    res.json(await productsHandler.create(Name, Price, req.params.id));
});

router.delete('/:id', async (req, res) => {
    res.json(await productsHandler.remove(req.params.id));
});

module.exports = router;