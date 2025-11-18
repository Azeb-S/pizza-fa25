// //const mysql = require('mysql2')

// //create a connection 
// // const connection = mysql.createConnection({
// //  host: 'localhost',
// //  user: 'root',
// //  password: '2025@root',
// //  database: 'pizza_db'

// // })
// const mysql = require('mysql2/promise')

// //create a connection 
// async function main() {
//  const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '2025@root',
//   database: 'pizza_db'

//  })

//  console.log('Connected to MySQL!')

//  const [rows] = await connection.execute('SELECT * FROM orders')
//  console.log(rows)

//  await connection.end()
// }

// main().catch(err => console.error(err))


// //connect to the database 

// // connection.connect(err => {
// //  if (err) {
// //   console.error('Error connecting to MYSQL:', err)

// //   return
// //  }
// //  console.log('Connected to MYSQL database!')
// // })
// // // simple test query
// // connection.query('SELECT 1 + 1 AS result', (err, results) => {
// //  if (err) throw err
// //  console.log('Test query result:', results[0].result)
// //  connection.end()
// // });


require('dotenv').config()
const express = require('express')
const { ping } = require('./db')
const {
 createUser, getUserById, listUsers, updateUser, deleteUser
} = require('./users.repo')

const app = express()
app.use(express.json())

// health check
app.get('/health', async (_req, res) => {
 try {
  await ping()
  res.json({ ok: true })
 } catch {
  res.status(500).json({ ok: false })
 }
})

// CREATE
app.post('/users', async (req, res) => {
 try {
  const { name, email } = req.body
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' })

  const user = await createUser({ name, email })
  res.status(201).json(user)
 } catch (err) {
  // duplicate email error code
  if (err && err.code === 'ER_DUP_ENTRY') {
   return res.status(409).json({ error: 'Email already exists' })
  }
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
 }
})

// READ one
app.get('/users/:id', async (req, res) => {
 try {
  const user = await getUserById(Number(req.params.id))
  if (!user) return res.status(404).json({ error: 'Not found' })
  res.json(user)
 } catch (err) {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
 }
})

// READ list
app.get('/users', async (req, res) => {
 try {
  const page = Number(req.query.page || 1)
  const pageSize = Number(req.query.pageSize || 10)
  const result = await listUsers({ page, pageSize })
  res.json(result)
 } catch (err) {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
 }
})

// UPDATE
app.patch('/users/:id', async (req, res) => {
 try {
  const ok = await updateUser(Number(req.params.id), req.body)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.json({ ok: true })
 } catch (err) {
  if (err && err.code === 'ER_DUP_ENTRY') {
   return res.status(409).json({ error: 'Email already exists' })
  }
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
 }
})

// DELETE
app.delete('/users/:id', async (req, res) => {
 try {
  const ok = await deleteUser(Number(req.params.id))
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.status(204).send()
 } catch (err) {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
 }
})

const PORT = process.env.PORT || 3008

app.listen(PORT, () => {
 console.log(`API running at http://localhost:${PORT}`)
})
