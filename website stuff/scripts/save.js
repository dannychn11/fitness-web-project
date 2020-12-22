
const userForm = document.getElementById("userInfo");
const newWorkout = JSON.parse(sessionStorage.getItem("workout"));

userForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if (doesUserExist(username.value) === false) {
        newUser(name.value, username.value, password.value, newWorkout);
        console.log(name.value + " saved");
        sessionStorage.setItem("activeUser", username.value);
        window.open(location.href = "./userLog.html");
    }
    else {
        alert("Username is taken");
    }
})