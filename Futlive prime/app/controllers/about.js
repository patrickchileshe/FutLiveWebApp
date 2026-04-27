import render from "../render.js";
import { aboutView } from "../views/about.js";

//Our abouut page controller
export function aboutController(ctx) {
    return render(aboutView, {}, ctx);
}