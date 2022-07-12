var modal = document.getElementById("terms");
var modal_login = document.getElementById("login_popup");
var modal_signup = document.getElementById("signup_popup");
window.onclick = function (event) {
    if (event.target == modal | event.target == modal_login |event.target == modal_signup ) {
        modal.style.display = "none";
        modal_login.style.display = "none";
        modal_signup.style.display = "none";
    }
}

function login_pop(){
    modal.style.display = "none";
    modal_login.style.display = 'flex';
}

function signup_pop(){
    modal_login.style.display = "none";
    modal_signup.style.display = "flex";
}

function back_to_login(){
    modal_signup.style.display = "none";
    modal_login.style.display = "flex";
}

function terms_condition() {
    document.getElementById('terms').style.display = "flex";
};

if (msg == "Incorrect username or password") {
    document.getElementById('login_popup').style.display = "flex";
    document.getElementById('incorrect_username').style.display = "flex";
    document.getElementById('incorrect_password').style.display = "flex";
  } else if (msg == "Username already exists") {
    document.getElementById('signup_popup').style.display = "flex";
    document.getElementById('account_exists').style.display = "flex";
  } else if (msg == "Registered email") {
    document.getElementById('signup_popup').style.display = "flex";
    document.getElementById('email_exists').style.display = "flex";
  } else if (msg == "Invalid email address!") {
    document.getElementById('signup_popup').style.display = "flex";
    document.getElementById('invalid_email').style.display = "flex";
  } else if (msg == "Username must contain only characters and numbers!") {
    document.getElementById('signup_popup').style.display = "flex";
    document.getElementById('username_specialChar').style.display = "flex";
  }
