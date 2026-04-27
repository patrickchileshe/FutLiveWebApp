import { fragments } from "./errors.js";


//This is our auth view, this is where we handle the rendering of the login and registration forms,
//  however i hopw i remember to improve the cssand look nice

export function loginFormView({errors = {username: {}, password: {} } }) {

    const {username, password} = fragments(errors);

    return `
    <section aria-labelledby="login-heading" class="center">
        <h2 id="login-heading">Sign in to your account</h2>
        <p>Don't have an account? <a href="/register">Sign up here</a></p>
        <form method="POST" class="auth">
            <label for="username">Username: </label>
            <input id="username" name="username"${username.value} required minlength="8" autocomplete="username">
            ${username.message}
            <label for="password">Password: </label>
            <input id="password" name="password" type="password"${password.value} required minlength="12" autocomplete="current-password">
            ${password.message}
            <button type="submit">Sign in</button>
        </form>
    </section>
    `
}

export function registrationFormView({errors = {username: {}, password: {} } }) {

    const {username, password} = fragments(errors);

    return `

    


    <section aria-labelledby="register-heading" class="center">
        <h2 id="register-heading">Create an account</h2>
        <p>Already have an account? <a href="/login">Sign in here</a></p>
        <form method="POST" class="auth">
            <label for="username">Username: </label>
            <input id="username" name="username" ${username.value} required minlength="8" autocomplete="username">
            ${username.message}
            <label for="password">Password: </label>
            <input id="password" name="password" type="password" ${password.value} required minlength="12" autocomplete="new-password">
            ${password.message}
            <label for="confirm">Confirm password: </label>
            <input id="confirm" type="password" autocomplete="new-password">
            <button type="submit">Sign up</button>
        </form>
        <script type="module" src="/assets/js/confirmPassword.js"></script>
    </section>
    `
}