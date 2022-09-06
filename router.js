const express = require("express");
const router = express.Router();

const orders = require("./API/Orders/orders.controller.js");
const orderProducts = require("./API/OrderProducts/orderProducts.controller.js");
const users = require("./API/Users/users.controller.js");
const products = require("./API/Products/products.controller.js");

router.use("/orders" , orders);
router.use("/order-products" , orderProducts);
router.use("/users" , users);
router.use("/products" , products);


module.exports = router;