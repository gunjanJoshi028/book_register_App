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
        const response = { "result": false, "booksEdited": [] }
        const editBook = await editBooks(jsonReq);
        if (!editBook) return response;
        return { ...response, ...{ result: true }, ...editBook };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const editBooks= async (jsonReq) => {
    try {
        if (jsonReq.books) {
            const connection = await db.getMongoDbConnection();
            const updateBook=await connection.update(jsonReq.books);
            if (updateBook) return true;
            return false;
        }
        return false;
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq && jsonReq.books);