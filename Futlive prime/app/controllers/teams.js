import render from "../render.js";
import { teamsView } from "../views/teams.js";
import { teamDetailsView } from "../views/teamDetails.js";
import { fetchFootballAPI } from "../api.js";

export function teamsController(ctx) {
    return render(teamsView, {}, ctx);
}


//This gets us the formation and some stadium details of each team. this works as intended but some teams return the wrong team and some return no data at all, however this is a proof of concept that we can get the data and display it on the page
export async function getTeamPage(ctx) {
    const url = new URL(ctx.request.url);
    const pathParts = url.pathname.split('/');
    const teamId = pathParts[pathParts.length - 1];
    if (!teamId || isNaN(teamId)) {
        return render(() => '<p>Invalid team ID</p>', {}, ctx);
    }
    try {
        const teamData = await fetchFootballAPI(`/teams?id=${teamId}`);
        const teamResponse = teamData.response?.[0] || {};
        const team = teamResponse.team || null;
        const venue = teamResponse.venue || {};
        const data = {
            team,
            venue,
            squad: [],
            error: teamData.error
        };
        if (team) {
            const squadData = await fetchFootballAPI(`/players/squads?team=${teamId}`);
            data.squad = squadData.response?.[0]?.players || [];
        }
        return render(teamDetailsView, data, ctx);
    } catch (error) {
        return render(() => `<p>Error: ${error.message}</p>`, {}, ctx);
    }
}

// API handlers (ctx Response) just as a reminder for myself, these are not used in the client-side code but are server-side endpoints
export async function searchTeams(ctx) {
    const url = new URL(ctx.request.url);
    const name = url.searchParams.get('name');
    if (!name || name.length < 2) {
        return new Response(JSON.stringify({ response: [] }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    try {
        const data = await fetchFootballAPI(`/teams?search=${encodeURIComponent(name)}`);
        return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


//This gon help get the teams from the api and then send it to the client as a response
export async function getTeam(ctx) {
    const url = new URL(ctx.request.url);
    const pathParts = url.pathname.split('/');
    const teamId = pathParts[pathParts.length - 1];
    try {
        const teamData = await fetchFootballAPI(`/teams?id=${teamId}`);
        const squadData = await fetchFootballAPI(`/players/squads?team=${teamId}`); 
        const teamResponse = teamData.response?.[0] || {};
        return new Response(JSON.stringify({
            team: teamResponse.team || null,
            venue: teamResponse.venue || {},
            squad: squadData.response?.[0]?.players || []
        }), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


//The API will get us all the clubs players we need to display, However take note some of the photos dont load and 2 clubs retrun the wrong team but proof of concept exists
export async function getPlayer(ctx) {
    const url = new URL(ctx.request.url);
    const playerId = url.searchParams.get('id');
    const season = url.searchParams.get('season') || new Date().getFullYear();
    try {
        const data = await fetchFootballAPI(`/players?id=${playerId}&season=${season}`);
        return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


//This gets us the seasons that the team has played in, this is used to populate the dropdown on the team page
export async function getTeamSeasons(ctx) {
    const url = new URL(ctx.request.url);
    const pathParts = url.pathname.split('/');
    const teamId = pathParts[pathParts.length - 3]; // /api/team-seasons/:id
    try {
        const data = await fetchFootballAPI(`/teams/seasons?team=${teamId}`);
        return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
