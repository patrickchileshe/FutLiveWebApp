import { createItem, getItems } from "../models/items.js";
import render from "../render.js";
import { itemsView } from "../views/items.js";
import redirect from "../redirect.js";


//used the lectutre example i guess ut can be used to create a prediciton of pl standings? we will see
export  function itemsController(ctx) {
    const items = getItems();
    return render(itemsView, {items}, ctx);
}

export function addItemController (ctx) {
    const {headers, isValid, errors, validated} = ctx;

    if (!isValid) {
        const items = getItems();
        return render(itemsView, {items, errors}, ctx, 400);
    }
    const newItem = validated["new-item"];
    createItem(newItem);
    return redirect(headers, '/items', `added '${newItem}' to the list`);
    }