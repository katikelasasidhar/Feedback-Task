/*
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { session } from "/framework/js/session.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
import { APP_CONSTANTS } from "../../js/constants.mjs";

const loadEditFeedBackPage = (id) => {
  session.set("feedbackId", id);
  window.monkshu_env.components["edit-feedback"].loadFeedback();
  document.querySelector("#container").innerHTML =
    "<edit-feedback></edit-feedback>";
};
const listFeedbacks = async () => {
  const payloads = {};
  let resp = await apiman.rest(
    APP_CONSTANTS.API_FEEDBACKLISTS,
    "POST",
    payloads,
    true
  );
  if (!resp || !resp.result) router.reload();
  feedback_lists.bindData(resp);
};

const deleteFeedback = async (id) => {
  const payloads = {
    id: id,
  };
  let resp = await apiman.rest(
    APP_CONSTANTS.API_DELETEFEEDBACK,
    "POST",
    payloads,
    true
  );
  if (!resp || !resp.result) router.reload();
  router.loadPage(APP_CONSTANTS.FEEDBACKS_HTML);
};

//call all other apis API_CREATEBOOKS
function register() {
  // convert this all into a WebComponent so we can use it
  monkshu_component.register(
    "feedback-lists",
    `${APP_CONSTANTS.APP_PATH}/components/feedback-lists/feedback-lists.html`,
    feedback_lists
  );
}

const trueWebComponentMode = false; // making this false renders the component without using Shadow DOM

export const feedback_lists = {
  trueWebComponentMode,
  register,
  loadEditFeedBackPage,
  listFeedbacks,
  deleteFeedback,
};
