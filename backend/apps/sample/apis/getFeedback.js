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
        const feedback = await getFeedback(jsonReq);
        if (!feedback) return response;
        return { ...response, ...{ result: true }, ...{ feedback } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const getFeedback = async (jsonReq) => {
    try {
        const collection = await db.getMongoDbCollection();
        const feedback = await collection.findOne({ "_id": db.ObjectID(jsonReq.id) });
        if (feedback) return feedback;
        return false;
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq && jsonReq.id);


