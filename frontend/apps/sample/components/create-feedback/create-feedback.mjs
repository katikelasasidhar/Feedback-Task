/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */

import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
import { APP_CONSTANTS } from "../../js/constants.mjs";

function homePage(){
    router.loadPage(APP_CONSTANTS.FEEDBACKS_HTML)
}


const createFeedback = async () => {
    const payloads = {
        "feedback": [{
            "name": create_feedback.shadowRoot.querySelector("#name").value,
            "title": create_feedback.shadowRoot.querySelector("#title").value,
            "detail": create_feedback.shadowRoot.querySelector("#text").value
        }]
    };

    if (payloads.feedback) {
        let resp = await apiman.rest(APP_CONSTANTS.API_CREATEFEEDBACK, "POST", payloads, false, true);
        console.log(resp)
        if (!resp || !resp.result) router.reload();
    }
    homePage();
}


//call all other apis API_CREATEBOOKS
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("create-feedback", `${APP_CONSTANTS.APP_PATH}/components/create-feedback/create-feedback.html`, create_feedback);
}

const trueWebComponentMode = false;	// making this false renders the component without using Shadow DOM

export const create_feedback = { trueWebComponentMode, register,createFeedback,homePage }