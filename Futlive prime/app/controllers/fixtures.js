// our dixtures controllers that does fech from our api 

import render from "../render.js";
import { fixturesView } from "../views/fixtures.js";
import { fetchFixtures } from "../api.js";

//Our fixtures page controller
export async function fixturesController(ctx) {
    const { session } = ctx;
    const url = new URL(ctx.request.url);
    
    let from = url.searchParams.get("from");
    let to = url.searchParams.get("to");
    if (!from) from = "2024-08-01";
    if (!to) to = "2025-05-31";
    
    const data = await fetchFixtures(39, 2024, from, to);
    return render(fixturesView, { data, from, to, session }, ctx);
}