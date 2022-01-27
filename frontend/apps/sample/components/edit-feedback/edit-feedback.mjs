/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { session } from "/framework/js/session.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
import { APP_CONSTANTS } from "../../js/constants.mjs";

const loadFeedback = async () => {
    const payloads = {
        "id": session.get('feedbackId')
    };
    let resp = await apiman.rest(APP_CONSTANTS.API_GETFEEDBACK, "POST", payloads, false, true);
    if (!resp || !resp.result) router.reload();
    edit_feedback.bindData(resp);
}

function homePage(){
    router.loadPage(APP_CONSTANTS.FEEDBACKS_HTML)
}

const editFeedback = async () => {
    await loadFeedback();
    const payloads = {
        "id": session.get('feedbackId'),
        "name": edit_feedback.shadowRoot.querySelector("#name").value,
        "title": edit_feedback.shadowRoot.querySelector("#title").value,
        "detail": edit_feedback.shadowRoot.querySelector("#text").value
    };
    let resp = await apiman.rest(APP_CONSTANTS.API_UPDATEFEEDBACK, "POST", payloads, false, true);
    if (!resp || !resp.result) router.reload();
    homePage()
}

//call all other apis API_CREATEBOOKS
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("edit-feedback", `${APP_CONSTANTS.APP_PATH}/components/edit-feedback/edit-feedback.html`, edit_feedback);
}

const trueWebComponentMode = false;	// making this false renders the component without using Shadow DOM

export const edit_feedback = { trueWebComponentMode, register,editFeedback,loadFeedback,homePage }