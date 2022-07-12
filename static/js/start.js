var modal = document.getElementById("terms");
var modal_login = document.getElementById("login_popup");
var modal_signup = document.getElementById("signup_popup")
window.onclick = function (event) {
    if (event.target == modal | event.target == modal_login |event.target == modal_signup ) {
        modal.style.display = "none";
        modal_login.style.display = "none";
        modal_signup.style.display = "none";
    }
}

function login_pop(){
    document.getElementById("terms").style.display = "none";
    document.getElementById("login_popup").style.display = 'flex';
}

function signup_pop(){
    document.getElementById("login_popup").style.display = "none";
    document.getElementById("signup_popup").style.display = "flex";
}


function terms_condition() {
    document.getElementById('terms').style.display = "flex";
};