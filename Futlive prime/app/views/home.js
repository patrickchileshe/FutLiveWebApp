export function homepageView({ standings, topScorers, liveScores, session }) {
    // Helper to safely get array

    const safeArray = (data) => (data && !data.error && data.response) ? data.response : [];

    // The league standings 
    let standingsHtml = '';
    const standingsResp = safeArray(standings);
    if (standings.error || standingsResp.length === 0) {
        standingsHtml = '<p>Standings could not be loaded.</p>';
    } else {
        const leagueInfo = standingsResp[0].league;
        const standingsList = leagueInfo.standings[0] || [];
        const rows = standingsList.map(team => `
            <tr>
                <td>${team.rank}</td>
                <td><img src="${team.team.logo}" width="20"> ${team.team.name}</td>
                <td>${team.points}</td>
                <td>${team.all.played}</td>
                <td>${team.all.win}</td>
                <td>${team.all.draw}</td>
                <td>${team.all.lose}</td>s
                <td>${team.all.goals.for}:${team.all.goals.against}</td>
                <td>${team.goalsDiff}</td>
            </tr>
        `).join('');
        standingsHtml = `
            <div class="section-block">
                <h2>${leagueInfo.name} ${leagueInfo.season} Standings</h2>
                <table>
                    <thead>
                        <tr><th>Rank</th><th>Team</th><th>Pts</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF:GA</th><th>GD</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    }

    // The top 5 scorers from the season
    let topScorersHtml = '';
    const topResp = safeArray(topScorers);
    if (topScorers.error || topResp.length === 0) {
        topScorersHtml = '<p>Top scorers could not be loaded.</p>';
    } else {
        const top5 = topResp.slice(0, 5);
        const rows = top5.map((player, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${player.player.photo}" width="30"> ${player.player.name}</td>
                <td><img src="${player.statistics[0].team.logo}" width="20"> ${player.statistics[0].team.name}</td>
                <td>${player.statistics[0].goals.total}</td>
                <td>${player.statistics[0].games.appearences}</td>
            </tr>
        `).join('');
        topScorersHtml = `
            <div class="section-block">
                <h2>🔥 Top 5 Scorers</h2>
                <table>
                    <thead>
                        <tr><th>Rank</th><th>Player</th><th>Team</th><th>Goals</th><th>Apps</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    }

    // Returns current live scores, Take NOTE though to return pl live scores the api requires subcription 
    let liveHtml = '';
    const liveResp = safeArray(liveScores);
    if (liveScores.error) {
        liveHtml = '<p>Live scores could not be loaded.</p>';
    } else if (liveResp.length === 0) {
        liveHtml = '<p>No live matches at the moment.</p>';
    } else {
        const rows = liveResp.map(fixture => {
            const home = fixture.teams.home;
            const away = fixture.teams.away;
            const goals = fixture.goals;
            const status = fixture.fixture.status;
            return `
                <tr>
                    <td><img src="${home.logo}" width="20"> ${home.name}</td>
                    <td><img src="${away.logo}" width="20"> ${away.name}</td>
                    <td>${goals.home} - ${goals.away}</td>
                    <td>${status.long} (${status.short})</td>
                </tr>
            `;
        }).join('');
        liveHtml = `
            <div class="section-block">
                <h2>⚽ Live Scores</h2>
                <table>
                    <thead>
                        <tr><th>Home</th><th>Away</th><th>Score</th><th>Status</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    }

    // Final HTML – only the content (layout added by render.js)
    return `
        <div class="row">
            <div class="side">${standingsHtml}</div>
        </div>
        <div class="row">
            <div class="main" style="width: 100%;">
                ${topScorersHtml}
                ${liveHtml}
            </div>
        </div>
    `;
}