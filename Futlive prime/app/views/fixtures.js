// app/views/fixtures.js

import { escape } from "@std/html/entities";

export function fixturesView({ data, from, to, session }) {
    if (!data || data.error) {
        return `<p>Could not load fixtures data: ${data.error || 'Unknown error'}</p>`;
    }
    if (!data.response || data.response.length === 0) {
        return `<p>No fixtures found for the selected date range (${from} to ${to}). Try a different range.</p>`;
    }

    const fixtureList = data.response.map(fixture => {
        const home = fixture.teams.home;
        const away = fixture.teams.away;
        const goals = fixture.goals;
        const status = fixture.fixture.status;
        return `
            <div class="fixture-item">
                <div class="fixture-date">${escape(fixture.fixture.date).substring(0, 10)}</div>
                <div class="fixture-match">
                    <div class="team home-team">
                        <img src="${home.logo}" width="28"> ${escape(home.name)}
                    </div>
                    <div class="score">${goals.home ?? '?'} - ${goals.away ?? '?'}</div>
                    <div class="team away-team">
                        ${escape(away.name)} <img src="${away.logo}" width="28">
                    </div>
                </div>
                <div class="fixture-status">${status.long}</div>
            </div>
        `;
    }).join('');

    return `
        <section aria-labelledby="fixtures-heading">
            <h2 id="fixtures-heading">Premier League Fixtures (${from} to ${to})</h2>
            ${fixtureList}
        </section>
    `;
}