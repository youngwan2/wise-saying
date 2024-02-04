import { Pool} from 'pg'

 export async function openDB(){
  let db:Pool | null = null;
  if(!db) {
    db = new Pool({
      user:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PW,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database:process.env.POSTGRES_DB
    })
  }
  return db
}