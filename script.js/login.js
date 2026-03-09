// Login function
function login() {
  let user = document.getElementById("userID").value;
  let pass = document.getElementById("password").value;

  let correctUser = "admin";
  let currectPass = "admin123";

  if (user === correctUser && pass === currectPass) {
    window.location.href = "home.html";
    alert("Login Successful");
  } else {
    alert("User ID or Password Incorrect");
  }
}