const crud = require("../../crud/indexC.js");

async function searchProducts(){
    return await crud.get('products');
};

async function searchProductsId(Id){
    return await crud.getById('products', Id);
};

async function create(Name, Price, Id) {
    if(Id){
        let product = await crud.getById('products', Id);
        if(product.Name !== undefined){
            await crud.save('products', Id, { Name, Price });
        }else{
            return {"Message": "Product not found"};
        }
    }else{
        await crud.save('products', null, {Name, Price });
    }
    return searchProducts();
};

async function remove(Id){
    await crud.remove('products', Id);
    return searchProducts();
};

module.exports = {
    searchProducts,
    searchProductsId,
    create,
    remove
};