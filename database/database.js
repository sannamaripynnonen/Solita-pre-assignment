import postgres from "https://deno.land/x/postgresjs@v3.3.3/mod.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({});
}

// Import journey data
const trips = await sql`SELECT * FROM citybiketrips`;

if (trips.length == 0) {
  await sql`\copy citybiketrips FROM '/var/lib/postgresql/2021-05.csv' DELIMITER ',' CSV HEADER;`;
  await sql`\copy citybiketrips FROM '/var/lib/postgresql/2021-06.csv' DELIMITER ',' CSV HEADER;`;
  await sql`\copy citybiketrips FROM '/var/lib/postgresql/2021-07.csv' DELIMITER ',' CSV HEADER;`;
  await sql`DELETE FROM citybiketrips WHERE duration < 10 AND distance < 10;`;
}


// Import information about bike stations in Helsinki and Espoo
const stations = await sql`SELECT * FROM bikestations`;

if (stations.length == 0) {
  await sql`\copy bikestations FROM '/var/lib/postgresql/Helsingin_ja_Espoon_kaupunkipyoraasemat_avoin.csv' DELIMITER ',' CSV HEADER;`;
}

export { sql };
