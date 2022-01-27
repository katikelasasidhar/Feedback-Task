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
        const editedFeedback = await editFeedback(jsonReq);
        if (!editedFeedback) return response;
        return { ...response, ...{ result: true } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const editFeedback = async (jsonReq) => {
    try {
        const collection = await db.getMongoDbCollection();
        const { id, ...feedbackObject } = jsonReq;
        const updateFeedback = await collection.updateOne({ "_id": db.ObjectID(jsonReq.id) }, { $set: feedbackObject });
        if (updateFeedback) return true;
        return false;
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq);
