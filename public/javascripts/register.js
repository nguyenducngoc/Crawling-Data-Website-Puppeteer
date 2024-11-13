var username = document.querySelector("#username");
var email = document.querySelector("#email");
var fullname = document.querySelector("#fullname");
var phone = document.querySelector("#phone");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm-password");
var accounts = JSON.parse(localStorage.getItem("accounts"));
var username_error = document.querySelector(".error-username");
var email_error = document.querySelector(".error-email");
var fullname_error = document.querySelector(".error-fullname");
var phone_error = document.querySelector(".error-phone");
var password_error = document.querySelector(".error-password");
var confirmPassword_error = document.querySelector(".error-confirmPassword");

console.log(username);
accounts = [];
const signup = (e) => {
  validated();
  accounts.push({
    username: "admin",
    password: "admin",
    username: "Admin",
  });
  localStorage.setItem("accounts", JSON.stringify(accounts));
  accounts.map((item) => {
    if (
      username.value &&
      password.value &&
      fullname.value &&
      email.value &&
      phone.value &&
      password.value === confirmPassword.value &&
      item.username !== username.value
    ) {
      var user = {
        username: username.value,
        email: email.value,
        fullname: fullname.value,
        phone: phone.value,
        password: password.value,
      };
      console.log(user);

      accounts.push(user);
      localStorage.setItem("accounts", JSON.stringify(accounts));
      window.location.replace("../login/index.html");
    }
  });

  

  username.addEventListener("textInput", username_Verify);
  password.addEventListener("textInput", password_Verify);
  email.addEventListener("textInput", email_Verify);
  fullname.addEventListener("textInput", fullname_Verify);
  phone.addEventListener("textInput", phone_Verify);

  function validated() {
    if (username.value.length < 1) {
      username.style.border = "1px solid #ff9658";
      username.focus();
    }
    if (email.value.length < 1) {
      email.style.border = "1px solid #ff9658";
      email.focus();
    }
    if (fullname.value.length < 1) {
      fullname.style.border = "1px solid #ff9658";
      fullname.focus();
    }
    if (phone.value.length < 1) {
      phone.style.border = "1px solid #ff9658";
      phone.focus();
    }
    if (password.value.length < 1) {
      password.style.border = "1px solid #ff9658";
      password.focus();
    }
    // if (password.value.length < 6) {
    //   password.style.border = "1px solid #ff9658";
    //   password.focus();
    //   password_error.style.display = "block";
    // }
  }
  function username_Verify() {
    if (username.value.length >= 0) {
      username.style.border = "1px solid silver";
    }
  }
  function email_Verify() {
    if (email.value.length >= 0) {
      email.style.border = "1px solid silver";
    }
  }
  function fullname_Verify() {
    if (fullname.value.length >= 0) {
      fullname.style.border = "1px solid silver";
    }
  }
  function phone_Verify() {
    if (phone.value.length >= 0) {
      phone.style.border = "1px solid silver";
    }
  }
  function password_Verify() {
    if (password.value.length >= 0) {
      password.style.border = "1px solid silver";
    }
  }
};
signup();
