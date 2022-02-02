/*
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */
// Custom modules
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const db = require(`./lib/Mongodb`);
const ObjectID =
  require(`${CONSTANTS.APPROOTDIR}/sample/3p/node_modules/mongodb`).ObjectID;
const crypto = require("crypto");

exports.doService = async (jsonReq) => {
  // Validate API request and check mandatory payload required
  if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
  try {
    const response = { result: false };
    const createdUser = await createUser(jsonReq);
    if (!createdUser) return response;
    return { ...response, ...{ result: true }, ...{ createdUser } };
  } catch (error) {
    console.error(error);
    return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
  }
};
const createUser = async (jsonReq) => {
  try {
    if (!jsonReq) return false;
    const connection = await db.getMongoDbUserCollection();
    const user = await connection.insertOne({
      ...jsonReq,
      ...{ u_password: sha512(jsonReq.u_password, jsonReq.u_name) },
    });
    if (!user) return false;
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
