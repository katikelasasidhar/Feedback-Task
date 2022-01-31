const FRONTEND = "http://localhost:8080";
const BACKEND = "http://localhost:9090";
const APP_NAME = "sample";
const APP_PATH = `${FRONTEND}/apps/${APP_NAME}`;
export const APP_CONSTANTS = {
  FRONTEND,
  BACKEND,
  APP_PATH,
  APP_NAME,
  FEEDBACKS_HTML: APP_PATH + "/feedbacks.html",
  LOGIN_HTML: APP_PATH + "/login.html",
  SESSION_NOTE_ID: "com_monkshu_ts",
  API_FEEDBACKLISTS: `${BACKEND}/apis/list-feedbacks`,
  API_CREATEFEEDBACK: `${BACKEND}/apis/create-feedback`,
  API_UPDATEFEEDBACK: `${BACKEND}/apis/update-feedback`,
  API_DELETEFEEDBACK: `${BACKEND}/apis/delete-feedback`,
  API_GETFEEDBACK: `${BACKEND}/apis/get-feedback`,
  API_LOGIN: `${BACKEND}/apis/login`,
  USERID: "id",
  USER_ROLE: "user",
  GUEST_ROLE: "guest",
  PERMISSIONS_MAP: {
    user: [APP_PATH + "/feedbacks.html", $$.MONKSHU_CONSTANTS.ERROR_HTML],
    guest: [
      APP_PATH + "/login.html",
      $$.MONKSHU_CONSTANTS.ERROR_HTML,
    ],
  },
  API_KEYS: { "*": "fsRolA1Si81YmT6fWwkXaV9l4I4DzhOo" },
  KEY_HEADER: "X-API-Key",
};
