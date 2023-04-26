import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();

const MainPage = (context) => {
    context.response.body = 'Helsinki City bike app'
}

const router = new Router();

router.get('/', MainPage);

app.use(router.routes())

app.listen({ port: 7777 });
