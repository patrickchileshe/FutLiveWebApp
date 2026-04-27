import render from "../render.js";
import { topScorersView } from "../views/topscorers.js";
import { fetchTopScorers } from "../api.js";
//literally just returns top scorers lol from our api and passes it to the view, we also pass the session
export async function topScorersController(ctx) {
    const { session } = ctx;
    const data = await fetchTopScorers(39, 2024);
    return render(topScorersView, { data, session }, ctx);
}