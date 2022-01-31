/*
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */
// Custom modules
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const db = require(`./lib/mangodb`);
const crypto = require("crypto");

exports.doService = async (jsonReq) => {
  // Validate API request and check mandatory payload required
  if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
  try {
    const response = { result: false };
    const validatedUser = await validateUser(jsonReq);
    if (!validatedUser) return response;
    return { ...response, ...{ result: true }, ...{ validatedUser } };
  } catch (error) {
    console.error(error);
    return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
  }
};
const validateUser = async (jsonReq) => {
  try {
    const connection = await db.getMongoDbUserCollection();
    const user = await connection.findOne({ "u_name": jsonReq.u_name });
    if(!user) return false;
    if(user.u_password !== sha512(jsonReq.u_password, user.u_name)) return false;
    return user;
  } catch (error) {
    throw error;
  }
};

// Hashing algorithm: SHA512
const sha512 = (password, salt) =>
  crypto.createHmac("sha512", salt).update(password).digest("hex");

const validateRequest = (jsonReq) =>
  jsonReq && jsonReq.u_name && jsonReq.u_password;
