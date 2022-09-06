const express = require('express');
const router = express.Router();

const orderProductsHandler = require('./orderProducts.handler.js');

router.get('/', async (req, res) => {
    res.json(await orderProductsHandler.searchOrderProducts());
});

router.get('/:id', async (req, res) =>{
    res.json(await orderProductsHandler.searchOrderProductsId(req.params.id))
});

router.post('/', async (req, res) => {
    const { Quantity, ProductId, OrderId } = req.body;
    res.json(await orderProductsHandler.create(Quantity, ProductId, OrderId));
});

router.put('/:id', async (req, res) =>{
    const { Quantity, ProductId, OrderId } = req.body;
    res.json(await orderProductsHandler.create(Quantity, ProductId, OrderId, req.params.id));
});

router.delete('/:id', async (req, res) => {
    res.json(await orderProductsHandler.remove(req.params.id));
});

module.exports = router;