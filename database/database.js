import postgres from "https://deno.land/x/postgresjs@v3.3.3/mod.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({});
}



export { sql };
