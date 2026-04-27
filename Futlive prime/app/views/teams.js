export function teamsView() {
    return `
        <style>
            .card { background: var(--bg-secondary); border-radius: 12px; padding: 1.5rem; box-shadow: var(--shadow-md); transition: var(--transition); }
            .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
            .squad-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
            .position-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0; }
            .position-filters button:hover { background: #e94560; }
            .loading, .error, .no-results { text-align: center; padding: 2rem; color: var(--text-muted); }
            .error { color: #e94560; }
            .modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
            .modal-card { max-width: 500px; width: 90%; background: var(--bg-secondary); border-radius: 16px; padding: 2rem; position: relative; }
            .modal-close { background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-muted); }
            .stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 0.5rem 0; }
        </style>



        <!-- Grid/List Toggle -->
        <div id="btnContainer" style="text-align: center; margin-bottom: 1rem;">
            <button class="btn active" onclick="listView()" style="padding: 0.5rem 1rem; background: var(--bg-secondary); color: var(--text-light); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; margin-right: 0.5rem;">List</button>
            <button class="btn" onclick="gridView()" style="padding: 0.5rem 1rem; background: var(--bg-secondary); color: var(--text-light); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;">Grid</button>
        </div>

        <!-- Premier League Teams Grid -->
        <div class="teams-grid row" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; padding: 0 1rem;">
            <div class="column team-card card" data-team-id="42" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/arsenal stadium.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Arsenal</h3>
                <p style="margin: 0; opacity: 0.9;">The Gunners – Emirates Stadium</p>
            </div>
            <div class="column team-card card" data-team-id="43" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/villa_park.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Aston Villa</h3>
                <p style="margin: 0; opacity: 0.9;">The Villans – Villa Park</p>
            </div>
            <div class="column team-card card" data-team-id="40" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/vitality stadium.png'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">AFC Bournemouth</h3>
                <p style="margin: 0; opacity: 0.9;">The Cherries – Vitality Stadium</p>
            </div>
            <div class="column team-card card" data-team-id="41" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/brentford.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Brentford</h3>
                <p style="margin: 0; opacity: 0.9;">The Bees – Gtech Community Stadium</p>
            </div>
            <div class="column team-card card" data-team-id="34" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/amex-stadium.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Brighton & Hove Albion</h3>
                <p style="margin: 0; opacity: 0.9;">The Seagulls – Amex Stadium</p>
            </div>
            <div class="column team-card card" data-team-id="49" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/chelsea.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Chelsea</h3>
                <p style="margin: 0; opacity: 0.9;">The Blues – Stamford Bridge</p>
            </div>
            <div class="column team-card card" data-team-id="44" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/Crystal Palace.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Crystal Palace</h3>
                <p style="margin: 0; opacity: 0.9;">The Eagles – Selhurst Park</p>
            </div>
            <div class="column team-card card" data-team-id="45" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/Everton.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Everton</h3>
                <p style="margin: 0; opacity: 0.9;">The Toffees – Goodison Park</p>
            </div>
            <div class="column team-card card" data-team-id="36" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/Fulham.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Fulham</h3>
                <p style="margin: 0; opacity: 0.9;">The Cottagers – Craven Cottage</p>
            </div>
            <div class="column team-card card" data-team-id="35" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/Forest.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Nottingham Forest</h3>
                <p style="margin: 0; opacity: 0.9;">The Reds – City Ground</p>
            </div>
            <div class="column team-card card" data-team-id="33" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/Liverpool.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Liverpool</h3>
                <p style="margin: 0; opacity: 0.9;">The Reds – Anfield</p>
            </div>
            <div class="column team-card card" data-team-id="50" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/Man City.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Manchester City</h3>
                <p style="margin: 0; opacity: 0.9;">The Citizens – Etihad Stadium</p>
            </div>
            <div class="column team-card card" data-team-id="33" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/Man united.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Manchester United</h3>
                <p style="margin: 0; opacity: 0.9;">The Red Devils – Old Trafford</p>
            </div>
            <div class="column team-card card" data-team-id="37" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/Newcastle.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Newcastle United</h3>
                <p style="margin: 0; opacity: 0.9;">The Magpies – St James' Park</p>
            </div>
            <div class="column team-card card" data-team-id="47" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/Spurs.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Tottenham Hotspur</h3>
                <p style="margin: 0; opacity: 0.9;">The Spurs – Tottenham Hotspur Stadium</p>
            </div>
            <div class="column team-card card" data-team-id="21" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/West Ham.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">West Ham United</h3>
                <p style="margin: 0; opacity: 0.9;">The Hammers – London Stadium</p>
            </div>
            <div class="column team-card card" data-team-id="39" style="background-color: #2a2a2a; background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/images/wolves.jpg'); min-height: 200px; cursor: pointer; color: white; padding: 1.5rem; border-radius: 12px; background-size: cover; background-position: center;">
                <h3 style="margin: 0 0 0.5rem 0;">Wolverhampton Wanderers</h3>
                <p style="margin: 0; opacity: 0.9;">The Wolves – Molineux Stadium</p>
            </div>
        </div>

        <!-- Squad Display Container -->
        <div id="squad-section">
            <div id="team-info" style="text-align: center; margin: 2rem 0;"></div>
            <div id="squad-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;"></div>
        </div>

        <script src="/assets/js/teams.js"></script>
        <script>
            var elements = document.getElementsByClassName("column");
            function listView() {
                for (var i = 0; i < elements.length; i++) elements[i].style.width = "100%";
            }
            function gridView() {
                for (var i = 0; i < elements.length; i++) elements[i].style.width = "50%";
            }
            var container = document.getElementById("btnContainer");
            var btns = container.getElementsByClassName("btn");
            for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function() {
                    var current = document.getElementsByClassName("active");
                    current[0].className = current[0].className.replace(" active", "");
                    this.className += " active";
                });
            }

            document.querySelectorAll('.team-card').forEach(col => {
                col.onclick = function() {
                    const teamId = this.dataset.teamId;
                    selectTeam(teamId);
                };
            });
        </script>
    `;
}