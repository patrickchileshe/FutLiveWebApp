import { deleteCookie, getCookies, setCookie } from "@std/http/cookie";
import { createSession, deleteSession, getSession } from "./models/sessions.js";


// Here are our authentication functions
export function login(headers, username) {
    const sessionId = createSession(username);
    setCookie(headers, {
        name: "sessionId",
        value: sessionId,
        path: "/"
    })
}

export function currentSession(requestHeaders) {
    const {sessionId} = getCookies(requestHeaders);
    return sessionId && getSession(sessionId);
}

export function logout(headers, sessionId) {
    deleteSession(sessionId);
    deleteCookie(headers, "sessionId", {path: "/"});
}