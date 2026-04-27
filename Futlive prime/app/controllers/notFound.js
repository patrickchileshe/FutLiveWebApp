import render from "../render.js";
import { notFoundView } from "../views/notFound.js";
//Our 404 page controller, this is used when the user tries to access a page that doesn't exist
export function notFoundController(ctx) {
    ctx.status = 404;
    return render(notFoundView, {}, ctx);
}