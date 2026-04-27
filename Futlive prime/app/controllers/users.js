import { login } from "../auth.js";
import { createUser } from "../models/users.js";
import redirect from "../redirect.js";
import render from "../render.js";
import {registrationFormView} from "../views/auth.js"
//Our registration controllers, this is where we handle the registration functionality, we have a controller for the registration form and a controller for adding a user but yeah
export function registrationFormController(ctx) {
    const {errors} = ctx;
    return render(registrationFormView, {errors}, ctx);
}

export async function addUserController(ctx, next) {
    const {isValid, validated, headers} = ctx;
    if (!isValid) return next(ctx);
    await createUser(validated);
    login(headers, validated.username);
    return redirect(headers, "/", `user '${validated.username}' has been created`);
}