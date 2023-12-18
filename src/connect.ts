const sqlite3 = require('sqlite3').verbose()

export const db = new sqlite3.Database('./wise_saying.db', (error: Error) => {
  if (error) console.error(error)
  console.log('정상연결')
})
