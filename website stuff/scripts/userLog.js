const username = sessionStorage.getItem("activeUser");
const user = retrieveFromLocal(username);
console.log("active user is " + user.username);
const element = document.getElementById("log");
const header = document.getElementById("header");
const coll = document.getElementsByClassName("collapsible");
const log = document.getElementById("log");
const forms = document.getElementsByClassName("userForm");
const save = document.getElementById("save");
const passwords = document.getElementById("password");
const newPass = document.getElementsByClassName("newPassword");
let workout = user.workouts;
const inputForm = document.getElementsByClassName("inputForm");
const buttons = document.getElementsByClassName("display");
const weight = document.getElementById('input4');
const measurement = document.getElementById("measurement");
const exercise = document.getElementById('input1');
const sets = document.getElementById('input2');
const reps = document.getElementById('input3');


//Turning workout into object array
for (i = 0; i < workout.length; i++) {
    if (workout[i].type === "weights") {
        workout[i] = new Weights(workout[i].date, workout[i].name, "weights", workout[i].sets,
            workout[i].reps, workout[i].weight, workout[i].measurement);
    } else {
        workout[i] = new Cardio(workout[i].date, workout[i].name, "cardio", workout[i].time,
            workout[i].distance);
    }
}

//Weights button
buttons[1].addEventListener("click", function () {
    buttons[1].style.display = "inline";
    buttons[1].style.backgroundColor = "rgb(206,206,205)";
    buttons[0].style.backgroundColor = "rgb(235,235,235)";
    inputForm[1].style.display = "block";
    inputForm[0].style.display = "none";
    //buttons[0].style.display = "none";
    //buttons[2].style.display = "inline";

})

//Cardio button
buttons[0].addEventListener("click", function () {

    //buttons[1].style.display = "none";
    buttons[0].style.display = "inline";
    buttons[0].style.backgroundColor = "rgb(206,206,205)";
    buttons[1].style.backgroundColor = "rgb(235,235,235)";
    inputForm[0].style.display = "block";
    inputForm[1].style.display = "none";
    //buttons[2].style.display = "inline";
})
//save.addEventListener("onclick", );

const p = document.createElement('p');
p.appendChild(document.createTextNode("Hello " + user.name));
header.appendChild(p);
console.log(user.workouts);
displayWorkout(element, workout);
inputForm[1].addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(measurement.value)
    if (weight.value === "") {
        weight.value = 0;
    }
    try {
        dateValue = date.value;
    } catch {
        var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        dateValue = utc;
    }
    item = new Weights(dateValue, exercise.value, "weights", parseInt(sets.value), parseInt(reps.value), parseInt(weight.value), measurement.value);
    console.log(item)
    workout.push(item);
    console.log(item)

    //addToWorkout(exercise, sets, reps);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    displayWorkout(element, workout);
    exercise.value = '';
    sets.value = '';
    reps.value = '';
    weight.value = '';
    tempStoreArray(workout);
});
//cardio events listener
inputForm[0].addEventListener('submit', function (e) {
    e.preventDefault();
    try {
        dateValue = date.value;
    } catch {
        var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        dateValue = utc;
    }
    item = new Cardio(dateValue, cardioExercise.value, "cardio", time.value, distance.value);
    workout.push(item);
    console.log(item);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    cardioExercise.value = '';
    time.value = '';
    distance.value = '';
    displayWorkout(element, workout);
    tempStoreArray(workout);
})

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let form = this.nextElementSibling;
        if (form.style.display === "block") {
            form.style.display = "none";
        } else {
            form.style.display = "block";
        }
    })
}

const changeUser = document.getElementById("changeUser");
changeUser.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(password.value);
    if (password.value === user.password) {
        if (newPass[0].value === newPass[1].value) {
            console.log(newPass.value);
            user.changePass(newPass[0].value);
            user.updateUser();
            alert("password updated");
        } else {
            alert("password does not match");
        }
    } else {
        alert("password incorrect");
    }
})

let date;






