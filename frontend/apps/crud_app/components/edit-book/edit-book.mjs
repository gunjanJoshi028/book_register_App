/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { session } from "/framework/js/session.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
import { APP_CONSTANTS } from "../../js/constants.mjs";

const loadBook = async () => {
    const payloads = {
        "id": session.get('bookId')
    };
    let resp = await apiman.rest(APP_CONSTANTS.API_GETBOOK, "POST", payloads, false, true);
    if (!resp || !resp.result) router.reload();
    edit_book.bindData(resp.book);
}

const editBook = async () => {
    const payloads = {
        "id": session.get('bookId'),
        "bookTitle": edit_book.shadowRoot.querySelector("#bookTitle").value,
        "price": edit_book.shadowRoot.querySelector("#price").value,
        "isbn": edit_book.shadowRoot.querySelector("#isbn").value
    };
    let resp = await apiman.rest(APP_CONSTANTS.API_EDITBOOK, "POST", payloads, false, true);
    if (!resp || !resp.result) router.reload();
    router.loadPage(APP_CONSTANTS.LIST_BOOKS_HTML);
}

//call all other apis API_CREATEBOOKS
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("edit-book", `${APP_CONSTANTS.APP_PATH}/components/edit-book/edit-book.html`, edit_book);
}

const trueWebComponentMode = false;	// making this false renders the component without using Shadow DOM

export const edit_book = { trueWebComponentMode, register, editBook, loadBook }