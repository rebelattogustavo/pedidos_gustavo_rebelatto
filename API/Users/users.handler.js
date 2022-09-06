const crud = require("../../crud/indexC.js");

async function searchUsers(){
    return await crud.get('users');
};

async function searchUsersId(Id){
    return await crud.getById('users', Id);
};

async function create(CPF, Name, Surname, Id) {
    if(Id){
        let user = await crud.getById('users', Id);
        if(user.Name !== undefined){
            await crud.save('users', Id, { CPF, Name, Surname });
        }else{
            return {"Error": "User not found"};
        }
    }else{
        await crud.save('users', null, {CPF, Name, Surname });
    }
    return searchUsers();
};

async function remove(Id){
    await crud.remove('users', Id);
    return searchAuthors();
};

module.exports = {
    searchUsers,
    searchUsersId,
    create,
    remove
};