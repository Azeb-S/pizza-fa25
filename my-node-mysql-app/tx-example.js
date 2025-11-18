// tx-example.js
const { pool } = require('./db')
async function createUserAndLog({ name, email }) {
 const conn = await pool.getConnection()
 try {
  await conn.beginTransaction()

  const [resUser] = await conn.execute(
   'INSERT INTO users (name, email) VALUES (?, ?)',
   [name, email]
  )

  await conn.execute(
   'INSERT INTO audit_log (entity, entity_id, action) VALUES (?, ?, ?)',
   ['users', resUser.insertId, 'create']
  )

  await conn.commit()
  return resUser.insertId
 } catch (err) {
  await conn.rollback()
  throw err
 } finally {
  conn.release()
 }
}


