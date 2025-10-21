const { errors } = require("cassandra-driver")

document.getElementById('pizza-form').onsubmit = () => {
 //alert("Pizza!!!")
 clearErrors()
 //validate first name

 // 
 let isValid = true

 let fname = document.getElementById('fname').value.trim()
 if (!fname) {
  //alert("")

  document.getElementById("err-fname").style.display = "block"
  isValid = false

 }
 let lname = document.getElementById('lname').value.trim()
 if (!lname) {
  //alert("")
  document.getElementById("err-lname").style.display = "block"
  isValid = false

 }
 // Validate email
 let email = document.getElementById('email').value.trim()
 if (!email) {
  document.getElementById("err-email").style.display = "block"
  isValid = false
 }

 // Validate 
 let methodButtons = document.getElementsByName("method")
 let count = 0
 for (let i = 0; i < methodButtons.length; i++) {
  if (methodButtons[i].checked) {
   count++
  }
  if (count === 0) {
   document.getElementById("err-method").style.display = "block"
   isValid = false
  }
 }
 let size = document.getElementById('size').value.trim()
 if (!email) {
  document.getElementById("err-size").style.display = "block"
  isValid = false
 }
 if (size === "none") {
  document.getElementById("err-size").style.display = "block"
  isValid = false
 }


 return isValid

}


function clearErrors() {
 let errors = document.getElementsByClassName("error")
 for (let i = 0; i < errors.length; i++) {
  errors[i].style.display = "none"
 }
}
