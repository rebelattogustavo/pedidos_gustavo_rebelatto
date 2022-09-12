const crud = require("../../CRUD/indexC.js");

async function searchOrderProducts() {
    return await crud.get('order-products');
};

async function searchOrderProductsId(Id) {
    return await crud.getById('order-products', Id);
};

async function create(Quantity, ProductId, OrderId, Id) {
    if (Id) {
        let orderProduct = await searchOrderProductsId(Id);
        if (orderProduct.Quantity !== undefined) {
            ProductId = orderProduct.ProductId;
            OrderId = orderProduct.OrderId;
            Quantity = orderProduct.Quantity - Quantity;
            let order = await crud.getById('orders', OrderId);
            if(order.Status == "Open"){
                if (Quantity <= 0) {
                    await remove(Id);
                } else {
                    await crud.save('order-products', Id, { Quantity, ProductId, OrderId });
                }
            }else{
                return {"Error": "Order is already closed"};
            }
        } else {
            return { "Error": "Order Product not found" };
        }
    } else {
        let product = await crud.getById('products', ProductId);
        let order = await crud.getById('orders', OrderId);
        let orderProducts = await crud.get('order-products');
        let continua;
        if (product.Name !== undefined) {
            if (order.Status !== undefined) {
                if(order.Status == "Open"){
                    if (orderProducts.length > 0) {
                        for (let orderProduct of orderProducts) {
                            if (orderProduct.ProductId == ProductId && orderProduct.OrderId == OrderId) {
                                Quantity = Quantity + orderProduct.Quantity;
                                await crud.save('order-products', orderProduct.id, { Quantity, ProductId, OrderId });
                                continua = 0;
                            } else {
                                continua = 1;
                            }
                        }
                    } else {
                        await crud.save('order-products', null, { Quantity, ProductId, OrderId });
                    }
                    if (continua == 1) {
                        await crud.save('order-products', null, { Quantity, ProductId, OrderId });
                    }
                }else{
                    return {"Error": "Order is already closed"};
                }
            } else {
                return { "Error": "Order not found" };
            }
        } else {
            return { "Error": "Product not found" };
        }
    }
    return searchOrderProducts();
};

async function remove(Id) {
    await crud.remove('order-products', Id);
    return searchOrderProducts();
};

module.exports = {
    searchOrderProducts,
    searchOrderProductsId,
    create,
    remove
};