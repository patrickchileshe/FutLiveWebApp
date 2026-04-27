let searchTimeout;
let currentSquad = [];

function searchTeams() {
    const container = document.getElementById("team-search-container");
    const term = document.getElementById("team-search").value.trim();

    if (searchTimeout) clearTimeout(searchTimeout);
    if (term.length < 2) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';
    container.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">Searching...</div>';

    searchTimeout = setTimeout(async () => {
        try {
            const res = await fetch(`/api/search-teams?name=${encodeURIComponent(term)}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            const data = await res.json();

            if (!data.response?.length) {
                container.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">No teams found.</div>';
                return;
            }

            container.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1rem; padding: 1rem 0;">
                    ${data.response.map(r => {
                        const t = r.team || r;
                        return `
                            <div onclick="selectTeam(${t.id})"
                                 style="cursor: pointer; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; padding: 1rem; text-align: center; transition: 0.2s;">
                                <img src="${t.logo}" width="50" style="margin-bottom: 0.5rem;" alt="${t.name}">
                                <div style="font-weight: 500; font-size: 0.9rem; color: var(--text-light);">${t.name}</div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">${t.country || ''}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } catch (e) {
            container.innerHTML = `<div style="color: #e94560; padding: 1rem;">Error: ${e.message}</div>`;
        }
    }, 300);
}

async function selectTeam(teamId) {
    const teamInfo = document.getElementById("team-info");
    const grid = document.getElementById("squad-grid");
    const squadSection = document.getElementById("squad-section");

    if (!teamInfo || !grid) return;

    if (squadSection) squadSection.scrollIntoView({ behavior: "smooth", block: "start" });
    teamInfo.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">Loading team...</div>';
    grid.innerHTML = '<div style="color: var(--text-muted); padding: 1rem;">Loading players...</div>';

    try {
        const res = await fetch(`/api/team/${teamId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();

        const team = data.team || {};
        const venue = data.venue || {};
        currentSquad = data.squad || [];

        teamInfo.innerHTML = `
            <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 1rem; display: inline-flex; align-items: center; gap: 1rem;">
                <img src="${team.logo || ''}" width="60" alt="${team.name || 'Team'}" style="object-fit: contain;">
                <div style="text-align: left;">
                    <h3 style="margin: 0 0 0.35rem 0;">${team.name || 'Unknown Team'}</h3>
                    <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem;">${venue.name || 'Venue unavailable'}${venue.capacity ? ` (${venue.capacity.toLocaleString()})` : ''}</p>
                </div>
            </div>
        `;

        renderSquad("all");
    } catch (e) {
        teamInfo.innerHTML = `<div style="color: #e94560; padding: 1rem;">Error: ${e.message}</div>`;
        grid.innerHTML = "";
    }
}

function renderSquad(filter) {
    const grid = document.getElementById("squad-grid");
    if (!grid) return;

    const players = filter === "all"
        ? currentSquad
        : currentSquad.filter((p) => (p.position || "").toLowerCase().includes(filter.toLowerCase()));

    if (!players.length) {
        grid.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 1rem;">No players found for this team.</div>';
        return;
    }

    grid.innerHTML = players.map((p) => `
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 10px; padding: 1rem; text-align: center;">
            <img src="${p.photo || ''}" width="64" alt="${p.name || 'Player'}" style="border-radius: 50%; object-fit: cover; margin-bottom: 0.5rem;">
            <h4 style="margin: 0 0 0.35rem 0; font-size: 0.95rem;">${p.name || 'Unknown'}</h4>
            <p style="margin: 0; color: var(--text-muted); font-size: 0.85rem;">${p.position || 'N/A'}${p.age ? ` • ${p.age}` : ''}</p>
        </div>
    `).join("");
}

globalThis.searchTeams = searchTeams;
globalThis.selectTeam = selectTeam;
globalThis.renderSquad = renderSquad;

// Allow pressing Enter in the search box to trigger search
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('team-search');
    if (input) {
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') searchTeams();
        });
    }
});
