const crud = require("../../crud/indexC.js");

async function searchOrders() {
    return await crud.get('orders');
};

async function searchOrdersId(Id) {
    return await crud.getById('orders', Id);
};

async function create(Status, Number, UserId, Id) {
    if (Id) {
        let orderProducts = await crud.get('order-products');
        console.log(orderProducts);
        let verifica;
        console.log(orderProducts.length);
        if (orderProducts.length > 0) {
            for (let orderProduct of orderProducts){
                if(orderProduct.OrderId == Id){
                    await crud.save('orders', Id, { Status, Number, UserId });
                    verifica =0;
                }else{
                    verifica =1;
                }
            }
        }else {
            return {"Error": "Order cannot be closed because there are no items in it"}
        }
        if(verifica == 1 && make != 1) {
            return {"Error": "Order cannot be closed because there are no items in it"}
        }
    } else {
        let user = await crud.getById("users", UserId);
        let ordersList = await crud.get('orders');
        if (user.Name == undefined) {
            return { "Erro": "User not found!" }
        } else {
            for (let order of ordersList) {
                if (UserId == order.UserId) {
                    if (order.Status == "Open") {
                        return { "Erro": "User already has an open order!" }
                    } else {
                        Number = order.Number + 1;
                    }
                }
            }
            if (Number == null) {
                Number = 1;
            }
            await crud.save('orders', null, { Status: "Open", Number, UserId });
        }
    }
        return searchOrders();
};

async function remove(Id) {
    await crud.remove('orders', Id);
    return searchOrders();
};

module.exports = {
    searchOrders,
    searchOrdersId,
    create,
    remove
};