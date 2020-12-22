const loginForm = document.getElementById("login");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");


loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (verifyUser(usernameInput.value, passwordInput.value) === true) {
        sessionStorage.setItem("activeUser", usernameInput.value);
        window.open(location.href = "./userLog.html");
    } else {
        alert("Incorrect username or password");
        console.log("User entered incorrect login info");
    }
})