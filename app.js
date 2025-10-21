import express from 'express'

const app = express()
const PORT = 3000

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
 res.sendFile(`${import.meta.dirname}/views/home.html`)
})
//Define contact us route
app.get('/contact-us', (req, res) => {
 res.sendFile(`${import.meta.dirname}/views/contact.html`)
})

//Define cconfirmation us route
app.get('/confirm', (req, res) => {

 res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
})

//Define Admin route
app.get('/admin', (req, res) => {
 res.send(orders)
 //  res.sendFile(`${import.meta.dirname}/views/admin.html`)
})

//Define submit-order route
app.post('/submit-order', (req, res) => {
 //res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
 // console.log(req.body)

 //Create a JSON object to store the data 

 const order = {
  fname: req.body.fname,
  lname: req.body.lname,
  email: req.body.email,
  method: req.body.method,
  toppings: req.body.toppings,
  size: req.body.size

 }

 //Add order to array

 orders.push(order)
 console.log(orders)
 res.sendFile(`${import.meta.dirname}/views/confirmation.html`)

})
app.listen(PORT, () => {
 console.log(`Server is running at http://localhost:${PORT}`)
})