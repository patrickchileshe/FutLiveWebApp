// API key – replace with your own or load from env
const API_KEY = Deno.env.get("FOOTBALL_API_KEY") || "999a973d0989d85da2b0d734b56d88bd";
const BASE_URL = "https://v3.football.api-sports.io";

/**
 * Generic football API request function
 * @param {string} endpoint - API endpoint (e.g., '/teams?id=42')
 * @returns {Promise<Object>} The API response as a JavaScript object
 */
export async function fetchFootballAPI(endpoint) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = new Headers({
        "x-apisports-key": API_KEY,
    });
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch from ${endpoint}:`, error);
        return { error: error.message };
    }
}

/**
 * Fetch standings for a specific league and season.
 * @param {number} leagueId - The league ID (e.g., 39 for Premier League)
 * @param {number|string} season - The season year (e.g., 2024)
 * @returns {Promise<Object>} The API response as a JavaScript object
 */
export async function fetchStandings(leagueId, season) {
    const url = `${BASE_URL}/standings?league=${leagueId}&season=${season}`;
    const headers = new Headers({
        "x-apisports-key": API_KEY,
    });
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch standings:", error);
        return { error: error.message };
    }
}

/**
 * Fetch top scorers for a specific league and season.
 * @param {number} leagueId - The league ID (e.g., 39 for Premier League)
 * @param {number|string} season - The season year (e.g., 2024)
 * @returns {Promise<Object>} The API response as a JavaScript object
 */
export async function fetchTopScorers(leagueId, season) {
    const url = `${BASE_URL}/players/topscorers?league=${leagueId}&season=${season}`;
    const headers = new Headers({
        "x-apisports-key": API_KEY,
    });
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch top scorers:", error);
        return { error: error.message };
    }
}

/**
 * Fetch fixtures for a specific league and season.
 * @param {number} leagueId - League ID (39 for Premier League)
 * @param {number|string} season - Season year
 * @param {number} limit - Number of fixtures to fetch
 * @param {string} direction - 'next' or 'last'
 * @returns {Promise<Object>} API response
 */
export async function fetchFixtures(leagueId, season, from, to) {
    const url = `${BASE_URL}/fixtures?league=${leagueId}&season=${season}&from=${from}&to=${to}&timezone=Europe/London`;
    const headers = new Headers({ "x-apisports-key": API_KEY });
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        console.log("Fixtures response:", data);
        return data;
    } catch (error) {
        console.error("Failed to fetch fixtures:", error);
        return { error: error.message };
    }
}

/**
 * Fetch live fixtures.
 * @returns {Promise<Object>} API response
 */
export async function fetchLiveScores() {
    const url = `${BASE_URL}/fixtures?live=all`;
    const headers = new Headers({ "x-apisports-key": API_KEY });
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch live scores:", error);
        return { error: error.message };
    }
}