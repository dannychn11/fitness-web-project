//If workout is already created, load, else create new
let newWorkout = JSON.parse(sessionStorage.getItem("workout"));

if (newWorkout === null) {
    newWorkout = [];
}

//Create objects with every item in the array
for (i = 0; i < newWorkout.length; i++) {
    if (newWorkout[i].type === "weights") {
        newWorkout[i] = new Weights(newWorkout[i].date, newWorkout[i].name, "weights", newWorkout[i].sets,
            newWorkout[i].reps, newWorkout[i].weight, newWorkout[i].measurement);
    } else {
        newWorkout[i] = new Cardio(newWorkout[i].date, newWorkout[i].name, "cardio", newWorkout[i].time,
            newWorkout[i].distance);
    }
}

console.log(newWorkout);

//Locate elements to be manipulated and creates global variables

const element = document.getElementById("workout");
const exercise = document.getElementById('input1');
const sets = document.getElementById('input2');
const reps = document.getElementById('input3');
const weight = document.getElementById('input4');
const info = document.getElementById('info');
const log = document.getElementsByClassName("log");
const inputForm = document.getElementsByClassName("inputForm");
const buttons = document.getElementsByClassName("display");
const workoutInfo = document.getElementById('workoutInfo');
const inputs = document.getElementsByClassName("input");
const cardioExercise = document.getElementById('cardioExercise');
const distance = document.getElementById('distance');
const time = document.getElementById('time');
const measurement = document.getElementById("measurement");


//Weights button
buttons[1].addEventListener("click", function () {
    buttons[1].style.display = "inline";
    buttons[1].style.backgroundColor = "rgb(206,206,205)";
    buttons[0].style.backgroundColor = "rgb(235,235,235)";
    inputForm[1].style.display = "block";
    inputForm[0].style.display = "none";

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

let item;
//weights event listener
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
    newWorkout.push(item);
    console.log(item)

    //addToWorkout(exercise, sets, reps);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    displayWorkout(element, newWorkout);
    exercise.value = '';
    sets.value = '';
    reps.value = '';
    weight.value = '';
    tempStoreArray(newWorkout);
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
    newWorkout.push(item);
    console.log(item);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    cardioExercise.value = '';
    time.value = '';
    distance.value = '';
    displayWorkout(element, newWorkout);
    tempStoreArray(newWorkout);
})

//Once loaded display workout
console.log(element.childNodes)
if (element.childNodes.length === 1) {
    displayWorkout(element, newWorkout);
}

let date;




