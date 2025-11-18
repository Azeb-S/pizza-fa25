// users.repo.js
const { pool } = require('./db')

// CREATE
async function createUser({ name, email }) {
 const sql = `
    INSERT INTO users (name, email)
    VALUES (?, ?)
  `
 const params = [name, email]
 const [result] = await pool.execute(sql, params)
 return { id: result.insertId, name, email }
}

// READ by id
async function getUserById(id) {
 const sql = `SELECT id, name, email, created_at FROM users WHERE id = ?`
 const [rows] = await pool.execute(sql, [id])
 return rows[0] || null
}

// READ list with simple pagination
async function listUsers({ page = 1, pageSize = 10 } = {}) {
 const offset = (page - 1) * pageSize
 const sql = `
    SELECT id, name, email, created_at
    FROM users
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `
 const [rows] = await pool.execute(sql, [pageSize, offset])

 const [[{ count }]] = await pool.query('SELECT COUNT(*) AS count FROM users')
 return {
  data: rows,
  page,
  pageSize,
  total: count,
  totalPages: Math.ceil(count / pageSize)
 }
}

// UPDATE
async function updateUser(id, { name, email }) {
 const sql = `
    UPDATE users
    SET name = COALESCE(?, name),
        email = COALESCE(?, email)
    WHERE id = ?
  `
 const [result] = await pool.execute(sql, [name ?? null, email ?? null, id])
 return result.affectedRows > 0
}

// DELETE
async function deleteUser(id) {
 const sql = `DELETE FROM users WHERE id = ?`
 const [result] = await pool.execute(sql, [id])
 return result.affectedRows > 0
}

module.exports = {
 createUser,
 getUserById,
 listUsers,
 updateUser,
 deleteUser
};


