import express from 'express'
import mysql2 from 'mysql2'
import dotenv from 'dotenv'

// Load the variables from .env file 

dotenv.config()

const pool = mysql2.createPool({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
 port: process.env.DB_PORT
}).promise()

const app = express()

//set up ejs
app.set('view engine', 'ejs')
const PORT = 3000

//Define a root to test database connection 

app.get('/db-test', async (req, res) => {
 try {
  const [orders] = await pool.query('SELECT * FROM orders')
  res.send(orders)
 } catch (err) {
  console.error('Database error:', err)
 }
})

// enable static file serving
app.use(express.static('public'))

// allow express read the date whne the fprm submited
//Allow the app tp parse from data from data(req.body)
app.use(express.urlencoded({ extended: true }))

//Create an array to store orderes

const orders = []

//app.get('/', (req, res) => {
//res.send('Welcome to Poppa\'s Pizza!')
//define a default route (/)
app.get('/', (req, res) => {
 //res.sendFile(`${import.meta.dirname}/views/home.html`)
 res.render('home')
})
//Define contact us route
app.get('/contact-us', (req, res) => {
 //res.sendFile(`${import.meta.dirname}/views/contact.html`)
 res.render('contact')
})

//Define cconfirmation us route
app.get('/confirm', (req, res) => {

 //res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
 res.render('confirmation')
})

//Define Admin route
app.get('/admin', async (req, res) => {
 //res.send(orders)
 try {
  const [orders] = await pool.query('SELECT * FROM orders')
  res.render('admin', { orders })
 } catch (err) {
  console.error('Database error:', err)
 }


 //  res.sendFile(`${import.meta.dirname}/views/admin.html`)
})


app.listen(PORT, () => {
 console.log(`Server is running at http://localhost:${PORT}`)
})