/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import {session} from "/framework/js/session.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";
import { APP_CONSTANTS } from "../../js/constants.mjs";

const listBooks = async () => {
    const payloads = {}
    let resp = await apiman.rest(APP_CONSTANTS.API_LISTBOOKS, "POST", payloads, false, true);
    if (!resp || !resp.result) router.reload();
    list_books.bindData(resp);
}

const loadEditBookPage = (id) => {
    session.set('bookId', id);
    window.monkshu_env.components["edit-book"].loadBook();
    document.querySelector("#content").innerHTML = `<edit-book></edit-book>`;
}

const deleteBooks = async (id) => {
    const payloads = {
        "id": id
    }
    let resp = await apiman.rest(APP_CONSTANTS.API_DELETEBOOKS, "POST", payloads, false, true);
    if (!resp || !resp.result) router.reload();
    router.loadPage(APP_CONSTANTS.LIST_BOOKS_HTML);
}

//call all other apis API_CREATEBOOKS
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("list-books", `${APP_CONSTANTS.APP_PATH}/components/list-books/list-books.html`, list_books);
    list_books.listBooks();
}

const trueWebComponentMode = false;	// making this false renders the component without using Shadow DOM

export const list_books = { trueWebComponentMode, register, listBooks, deleteBooks, loadEditBookPage }