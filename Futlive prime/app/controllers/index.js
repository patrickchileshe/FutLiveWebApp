import render from "../render.js";
import { indexView } from "../views/index.js";


//this index page was for testing intially ut gonna remove it hope we remeber 
export function indexController(ctx) {
    return render(indexView, {}, ctx);
}