import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";

const renderMiddleware = async (context, next) => {
  configure({
    views: `${Deno.cwd()}/views/`,
  });

  context.render = async (file, data) => {
    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};

export { renderMiddleware };
