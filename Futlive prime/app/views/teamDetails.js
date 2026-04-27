export function teamDetailsView({ team, squad, error }) {
  // If there's an error, show it. If no team is found, show a not found message. Otherwise, show the team details and squad.
  
    if (error) {
        return `<p>Error loading team: ${error}</p>`;
    }


    // If team data is missing, show a not found message
    if (!team) {
        return `<p>Team not found.</p>`;
    }
    const playersHtml = squad.length ? squad.map(player => `
        <tr>
            <td><img src="${player.photo || ''}" width="30" alt="${player.name || ''}"> ${player.name || 'Unknown'}</td>
            <td>${player.position || 'N/A'}</td>
            <td>${player.age || 'N/A'}</td>
        </tr>
    `).join('') : '<tr><td colspan="3" style="text-align: center; color: var(--text-muted);">No squad data available (demo mode)</td></tr>';  
    return `
        <div class="team-details">
            <h1>${team.name}</h1>
            <img src="${team.logo}" width="100" alt="${team.name}">
            <p>Code: ${team.code || 'N/A'} | Founded: ${team.founded || 'N/A'} | Stadium: ${team.venue?.name || 'N/A'} (${team.venue?.capacity || 'N/A'} capacity)</p>
            <h2>Squad (${squad.length || 0} players)</h2>
            <table>
                <thead><tr><th>Player</th><th>Position</th><th>Age</th></tr></thead>
                <tbody>${playersHtml}</tbody>
            </table>
            <a href="/teams">← Back to Teams</a>
        </div>
    `;
}
