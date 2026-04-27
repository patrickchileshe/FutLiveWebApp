export function topScorersView({ data, session }) {
    if (!data || !data.response || data.response.length === 0) {
        return "<h1>No top scorers data available</h1>";
    }

    const rows = data.response.map((player, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><img src="${player.player.photo}" width="30" alt=""> ${player.player.name}</td>
            <td><img src="${player.statistics[0].team.logo}" width="20"> ${player.statistics[0].team.name}</td>
            <td>${player.statistics[0].goals.total}</td>
            <td>${player.statistics[0].games.appearances}</td>
        </tr>
    `).join('');

    return `
        <h1>Top Scorers - Premier League </h1>
        <table>
            <thead>
                <tr><th>Rank</th><th>Player</th><th>Team</th><th>Goals</th><th>Appearances</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}