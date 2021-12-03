/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { monkshu_component } from "/framework/js/monkshu_component.mjs";

const loadCreateBooksPage = () => document.querySelector("#content").innerHTML = "<create-book></create-book>";

//call all other apis API_CREATEBOOKS
function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("nav-menu", `${APP_CONSTANTS.APP_PATH}/components/nav-menu/nav-menu.html`, nav_menu);
}

const trueWebComponentMode = false;	// making this false renders the component without using Shadow DOM

export const nav_menu = { trueWebComponentMode, register, loadCreateBooksPage }