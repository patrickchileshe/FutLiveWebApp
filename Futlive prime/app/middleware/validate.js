import { validateSchema } from "../validation.js";


//This is our validation middleware, this is where we handle the validation of the incoming form data for
//  our protected routes, we use the validateSchema function from our validation module to validate the 
// form data against a schema and we log the validation results to the console for debugging purposes
export function validate(schema) {
    return async (ctx, next) => {
        const {request} = ctx;
        const formData = await request.formData();
        const validation = validateSchema(formData, schema);
        if (validation.isValid) {
            console.log("valid");
        } else {
            ctx.status = 400;
            console.log("invalid");
        }
        return next({...ctx, ...validation});
    };
}