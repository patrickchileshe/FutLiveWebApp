import { serveDir } from "@std/http";

//just for our static files, meant for a simple controller that serves the files in the public directory, we use this for our css and js files
export function staticController(ctx) {
    const {request} = ctx;
    return serveDir(request);
}