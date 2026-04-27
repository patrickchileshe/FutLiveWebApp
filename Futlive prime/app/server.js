import { homeController } from "./controllers/home.js";
import { addItemController, itemsController } from "./controllers/items.js";
import { notFoundController } from "./controllers/notFound.js";
import { addSessionController, deleteSessionController, loginFormController } from "./controllers/sessions.js";
import { addUserController, registrationFormController } from "./controllers/users.js";
import { aboutController } from "./controllers/about.js";
import { fixturesController } from "./controllers/fixtures.js";
import { indexController } from "./controllers/index.js";
import { getPlayer, getTeam, getTeamPage, getTeamSeasons, searchTeams, teamsController } from "./controllers/teams.js";
import { topScorersController } from "./controllers/topscorers.js";
import { staticController } from "./controllers/static.js";
import { withSession, requiresSession, excludeSession } from "./middleware/auth.js";
import { withHeaders } from "./middleware/headers.js";
import { withLogs } from "./middleware/logging.js";
import { validate } from "./middleware/validate.js";
import ApplicationRouter from "./router.js";
import { newItemSchema } from "./schema/newItem.js";
import { userSchema } from "./schema/user.js";

const app = new ApplicationRouter();

app.use(withLogs);
app.use(withHeaders);
app.use(withSession);

// Static assets
app.get("/assets/*", staticController);

// Public pages
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/fixtures", fixturesController);
app.get("/index", indexController);
app.get("/teams", teamsController);
app.get("/teams/:id", getTeamPage);
app.get("/topscorers", topScorersController);

// Teams API
app.get("/api/search-teams", searchTeams);
app.get("/api/team/:id", getTeam);
app.get("/api/player", getPlayer);
app.get("/api/team-seasons/:id", getTeamSeasons);

// Items (protected)
app.get("/items", itemsController, requiresSession);
app.post("/items", addItemController, requiresSession, validate(newItemSchema));

// Auth routes (exclude session)
app.get("/register", registrationFormController, excludeSession);
app.post("/register", registrationFormController, excludeSession, validate(userSchema), addUserController);
app.get("/login", loginFormController, excludeSession);
app.post("/login", loginFormController, excludeSession, validate(userSchema), addSessionController);
app.post("/logout", deleteSessionController, requiresSession);

// 404 catch-all
app.get("*", notFoundController);
app.post("*", notFoundController);

export default function server(request) {
    return app.handle({ ctx: { request } });
}