export function withHeaders(ctx, next) {
    ctx.headers = new Headers();
    return next(ctx);
}