import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();

app.use(errorMiddleware);
app.use(renderMiddleware);
app.use(router.routes())

app.use (({ response }) => {
    response.type = "text/html; charset=utf-8";
    response.status = 404;
    response.body = "<h1>404, Page not found!</h1>";
})

app.listen({ port: 7777 });
