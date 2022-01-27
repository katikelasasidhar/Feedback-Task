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
        const response = { "result": false, "feedbacks": [] }
        const feedbacks = await getFeedbacks(jsonReq);
        if (!feedbacks) return response;
        //if (!feedbacks) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { ...response, ...{ result: true }, ...{ feedbacks } };
       //return { result:true,results:{feedbacks}}
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}
const getFeedbacks = async (jsonReq) => {
    try {
        const connection = await db.getMongoDbCollection();
        const feedbacks = await connection.find({}).toArray();
        if (feedbacks) return feedbacks;
        return false;
    } catch (error) {
        throw error;
    }
}
const validateRequest = jsonReq => (jsonReq);


