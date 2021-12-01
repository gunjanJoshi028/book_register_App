/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
import { APP_CONSTANTS } from "../../js/constants.mjs";

const createBook = async () => {
    const payloads = {
        "bookTitle": create_book.shadowRoot.querySelector("#bookTitle").value,
        "price": create_book.shadowRoot.querySelector("#price").value,
        "isbn": create_book.shadowRoot.querySelector("#isbn").value
    }
    if(payloads.bookTitle) {
        let resp = await apiman.rest(APP_CONSTANTS.API_CREATEBOOK, "POST", payloads, false, true);
        if (!resp || !resp.result) router.reload();
    }
    router.loadPage(APP_CONSTANTS.LIST_BOOKS_HTML);
}

//call all other apis API_CREATEBOOKS
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("create-book", `${APP_CONSTANTS.APP_PATH}/components/create-book/create-book.html`, create_book);
}

const trueWebComponentMode = false;	// making this false renders the component without using Shadow DOM

export const create_book = { trueWebComponentMode, register, createBook }