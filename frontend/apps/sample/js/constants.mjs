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
  SESSION_NOTE_ID: "com_monkshu_ts",
  API_FEEDBACKLISTS: `${BACKEND}/apis/list-feedbacks`,
  API_CREATEFEEDBACK: `${BACKEND}/apis/create-feedback`,
  API_UPDATEFEEDBACK: `${BACKEND}/apis/update-feedback`,
  API_DELETEFEEDBACK: `${BACKEND}/apis/delete-feedback`,
  API_GETFEEDBACK:`${BACKEND}/apis/get-feedback`,
  USERID: "id",
  USER_ROLE: "user",
  GUEST_ROLE: "guest",
  PERMISSIONS_MAP: {
    user: [APP_PATH + "/feedbacks.html", $$.MONKSHU_CONSTANTS.ERROR_THTML],
    guest: [
      APP_PATH + "/feedbacks.html",
      $$.MONKSHU_CONSTANTS.ERROR_THTML,
    ],
  },
  API_KEYS: { "*": "uiTmv5YBOZMqdTb0gekD40PnoxtB9Q0k" },
  KEY_HEADER: "X-API-Key",
};
