import { escape } from "@std/html/entities";
import { getFlash } from "./flash.js";
// deno-lint-ignore no-unused-vars
import { currentSession } from "./auth.js";

export default function render(viewFn, data, ctx) {
    const { request, session, headers, status = 200 } = ctx;
    const content = viewFn(data);
    const footerMessage = session ? `logged in as "${session.username}"` : "";

    const flash = getFlash(request.headers, headers);
    const flashMessage = flash ? `
        <aside id="flash" class="flash-message">
            <p>${escape(flash)}</p>
        </aside>
    ` : '';

    headers.set("content-type", "text/html");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FutLive</title>
    <link rel="icon" href="/assets/icon.svg">
    <link rel="stylesheet" href="/assets/css/styles.css">
    <link rel="stylesheet" href="/assets/fonts.css">
</head>
<body>
    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/index">Index</a>
        <a href="/teams">Clubs</a>
        <a href="/topscorers">Top Scorers</a>
        <a href="/fixtures">Fixtures</a>
        ${session
            ? `<a href="/items">Predictor</a>
               <form method="POST" action="/logout" style="display:block;">
                   <button type="submit" class="sidenav-signout">Sign out</button>
               </form>`
            : `<a href="/login">Sign in</a>`
        }
    </div>

    <span class="menu-trigger" onclick="openNav()">&#9776;</span>

    <div id="main">
        <header>
            <h1><a href="/" style="text-decoration: none; color: inherit;">FutLive</a></h1>
        </header>
        <nav class="topnav">
            <input type="text" name="search" placeholder="Search..." aria-label="Search">
            <button type="button">Search</button>
            ${session
                ? `<form method="POST" action="/logout" style="display:inline;">
                       <button type="submit">Sign out</button>
                   </form>`
                : `<a href="/login">Sign in</a>`
            }
        </nav>
        <main>
            ${flashMessage}
            ${content}
        </main>
        <footer>
            <p>${footerMessage}</p>

            
        </footer>
    </div>

    <script src="/assets/js/script.js"></script>
    <script>
        function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
    </script>
</body>
</html>`;

    return new Response(html, { headers, status });
}