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
        const response = { "result": false, "Books": [] }
        const deletedBooks = await deleteBooks(jsonReq);
        if (!deletedBooks) return response;
        return { ...response, ...{ result: true }, ...deletedBooks };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const deleteBooks = async (jsonReq) => {
    try {
        if (jsonReq.books) {
            const connection = await db.getMongoDbConnection();
            const delBooks = await connection.deleteMany(jsonReq.books);
            if (delBooks) return true;
            return false;
        }
        return false;
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq && jsonReq.books);
