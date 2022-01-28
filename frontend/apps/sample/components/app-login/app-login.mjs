/*
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { session } from "/framework/js/session.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
import { APP_CONSTANTS } from "../../js/constants.mjs";

const login = async () => {
  const apiPayloads = {
    u_name: app_login.shadowRoot.querySelector("#u_name").value,
    u_password: app_login.shadowRoot.querySelector("#u_password").value,
  };
  let responseObject = await apiman.rest(
    APP_CONSTANTS.API_LOGIN,
    "POST",
    apiPayloads,
    false,
    true
  );
  if (!responseObject || !responseObject.result) {
    alert("Invalid user");
    router.loadPage(APP_CONSTANTS.LOGIN_HTML);
    return;
  } else {
   session.set(APP_CONSTANTS.USERID, responseObject.validatedUser._id);
    securityguard.setCurrentRole(APP_CONSTANTS.USER_ROLE);
    router.loadPage(APP_CONSTANTS.FEEDBACKS_HTML);
  }
};

//call all other apis API_CREATEBOOKS
function register() {
  // convert this all into a WebComponent so we can use it
  monkshu_component.register(
    "app-login",
    `${APP_CONSTANTS.APP_PATH}/components/app-login/app-login.html`,
    app_login
  );
}

const trueWebComponentMode = false; // making this false renders the component without using Shadow DOM

export const app_login = {
  trueWebComponentMode,
  register,
  login
};
