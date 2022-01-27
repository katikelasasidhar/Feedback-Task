/* 
* (C) 2020 TekMonks. All rights reserved. 
* License: MIT - see enclosed LICENSE file. 
*/
// Custom modules 
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const db = require(`./lib/mangodb`);

exports.doService = async jsonReq => {

    // Validate API request and check mandatory payload required  
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const response = { "result": false }
        const createdFeedback = await createFeedback(jsonReq);
        if (!createdFeedback) return response;
        return { ...response, ...{ result: true } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const createFeedback = async (jsonReq) => {
    try {
        if (jsonReq.feedback) {
            const connection = await db.getMongoDbCollection();
            const feedback = await connection.insertMany(jsonReq.feedback);
            if (feedback) return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq && jsonReq.feedback);
