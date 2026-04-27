import render from "../render.js";
import { homepageView } from "../views/home.js";
import { fetchStandings, fetchTopScorers, fetchLiveScores } from "../api.js";
//Our home page controller, this is where we fetch all the data for the homepage and pass it to the view, we fetch the standings, top scorers and live scores next to each other 
export async function homeController(ctx) {
    const { session } = ctx;
    // Fetch all data in parallel
    const [standings, topScorers, liveScores] = await Promise.all([
        fetchStandings(39, 2025).catch(err => ({ error: err.message })),
        fetchTopScorers(39, 2025).catch(err => ({ error: err.message })),
        fetchLiveScores().catch(err => ({ error: err.message }))
    ]);

    const data = { standings, topScorers, liveScores, session };
    return render(homepageView, data, ctx);
}