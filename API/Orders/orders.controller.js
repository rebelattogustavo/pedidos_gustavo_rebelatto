const express = require('express');
const router = express.Router();

const ordersHandler = require('./orders.handler');

router.get('/', async (req, res) => {
    res.json(await ordersHandler.searchOrders());
});

router.get('/:id', async (req, res) =>{
    res.json(await ordersHandler.searchOrdersId(req.params.id))
});

router.post('/', async (req, res) => {
    const { Status, Number, UserId } = req.body;
    res.json(await ordersHandler.create(Status, Number, UserId));
});

router.put('/:id', async (req, res) =>{
    const { Status } = req.body;
    let order = await ordersHandler.searchOrdersId(req.params.id);
    if(order){
        res.json(await ordersHandler.create(Status, order.Number, order.UserId, req.params.id));
    }else{
        res.json("Error: No such order found" )
    }
});

router.delete('/:id', async (req, res) => {
    res.json(await ordersHandler.remove(req.params.id));
});

module.exports = router;