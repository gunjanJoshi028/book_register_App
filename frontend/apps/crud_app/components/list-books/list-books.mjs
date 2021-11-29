/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const listBooks = async () => {
    const payloads = {}
    let resp = await apiman.rest(APP_CONSTANTS.API_LIST_BOOKS, "POST", payloads, false, true);
    if (!resp || !resp.result) router.reload();
    list_books.bindData(resp);
}

function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("list-books", `${APP_CONSTANTS.APP_PATH}/components/list-books/list-books.html`, list_books);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const list_books = { trueWebComponentMode, register, listBooks }