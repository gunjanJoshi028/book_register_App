/* 
* (C) 2020 TekMonks. All rights reserved. 
* License: MIT - see enclosed LICENSE file. 
*/
// Custom modules 
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/crud_app/apis/lib/constants`);
const db = require(`./lib/mongodb`);

exports.doService = async jsonReq => {

    // Validate API request and check mandatory payload required  
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const response = { "result": false }
        const editBook = await editBooks(jsonReq);
        if (!editBook) return response;
        return { ...response, ...{ result: true } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const editBooks = async (jsonReq) => {
    try {
        const collection = await db.getMongoDbCollection();
        const { id, ...bookObject} = jsonReq;
        const updateBook=await collection.updateOne({ "_id": db.ObjectID(jsonReq.id) }, bookObject);
        if (updateBook) return true;
        return false;
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq);