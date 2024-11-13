var accounts = JSON.parse(localStorage.getItem("accounts"));
var btnLogin = document.querySelector("#btnLogin");
var username = document.forms["form"]["username"];
var password = document.forms["form"]["password"];
var username_error = document.querySelector(".error-username");
var password_error = document.querySelector(".error-password");
var formGroup = document.querySelector(".form-group");
const login = (e) => {
  validated();
  accounts.map((item) => {
    if (item.username === username.value && item.password === password.value) {
      user = {
        username: username.value,
        password: password.value,
        ...item,
      };
      localStorage.setItem("login", JSON.stringify(user));
      window.location.replace("../../index.html");
      // return;
    } else {
      if (item.username != username.value) {
      }
      // return ;
    }
  });
  username.addEventListener("textInput", username_Verify);
  password.addEventListener("textInput", password_Verify);
  function validated() {
    if (username.value.length < 1) {
      username.style.border = "1px solid #ff9658";
      username.focus();
      username_error.style.display = "block";
    }
    if (password.value.length < 6) {
      password.style.border = "1px solid #ff9658";
      password.focus();
      password_error.style.display = "block";
    }
  }
  function username_Verify() {
    if (username.value.length >= 0) {
      username.style.border = "1px solid silver";
      username_error.style.display = "none";
      username.style.marginBottom = "16px";
    }
  }
  function password_Verify() {
    if (password.value.length >= 0) {
      password.style.border = "1px solid silver";
      password_error.style.display = "none";
      password.style.marginBottom = "16px !important";
    }
  }
};

login();
