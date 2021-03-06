/*
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { session } from "/framework/js/session.mjs";
import { securityguard } from "/framework/js/securityguard.mjs";
import { router } from "/framework/js/router.mjs";
import { APP_CONSTANTS } from "../../js/constants.mjs";

const loadCreateFeedbackPage = () =>
  (document.querySelector("#container").innerHTML =
    "<create-feedback></create-feedback>");

const logout = async () => {
  try {
    session.set(APP_CONSTANTS.USERID, "");
    securityguard.setCurrentRole(APP_CONSTANTS.GUEST_ROLE);
    router.loadPage(APP_CONSTANTS.LOGIN_HTML);
  } catch (error) {
    console.error(error);
  }
};

//call all other apis API_CREATEBOOKS
function register() {
  // convert this all into a WebComponent so we can use it
  monkshu_component.register(
    "feedback-header",
    `${APP_CONSTANTS.APP_PATH}/components/feedback-header/feedback-header.html`,
    feedback_header
  );
}

const trueWebComponentMode = false; // making this false renders the component without using Shadow DOM

export const feedback_header = {
  trueWebComponentMode,
  register,
  loadCreateFeedbackPage,
  logout,
};
