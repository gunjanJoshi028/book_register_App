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
        const response = { "result": false, "booksCreated": [], "booksExisted": [] }
        const createdBooks = await createBooks(jsonReq);
        if (!createdBooks) return response;
        return { ...response, ...{ result: true }, ...createdBooks };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const createBooks = async (jsonReq) => {
    try {
        if (jsonReq.books) {
            const connection = await db.getMongoDbConnection();
            const book=await connection.insertMany(jsonReq.books);
            if (book) return true;
            return false;
        }
        return false;
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq && jsonReq.books);
