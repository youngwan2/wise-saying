import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb () {
  let db= null;
  db = await open({
    filename:'./wise_saying.db',
    driver: sqlite3.Database,
  })

  db.run("PRAGMA cipher_compatibility = 4");

  // To open a database created with SQLCipher 3.x, use this:
  // db.run("PRAGMA cipher_compatibility = 3");
  db.run(`PRAGMA key = ${process.env.DB_SCREPT}`);

  return db
}
