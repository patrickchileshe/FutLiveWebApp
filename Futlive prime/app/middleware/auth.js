import { currentSession } from "../auth.js";
import redirect from "../redirect.js";

//This is our auth middleware, this is where we handle the session management and access control for our protected routes, we have a middleware to check for a session, a middleware to require a session and
//  a middleware to exclude a session, we also log the access control decisions to the console for debugging purposes

export function withSession(ctx, next) {
    const {request} = ctx;
    ctx.session = currentSession(request.headers);
    console.log(ctx.session ? `logged in as ${ctx.session.username}` : "No session found");
    return next(ctx);
}

export function requiresSession(ctx, next) {
    const {session, headers} = ctx;
    if (!session) {
        console.log("No session found, redirecting to login");
        return redirect(headers, "/login", "Sign in to gain access");
    }
    console.log("Access granted");
    return next(ctx);
}

export function excludeSession(ctx, next) {
    const {session, headers} = ctx;
    if (session) {
        console.log("Access denied, user is already logged in, redirecting to home");
        return redirect(headers, "/", "Sign out to access this page");
    }
    console.log("Access granted");
    return next(ctx);
}
