/*
Basic Info

- Workouts are arrays with Exercise objects
- A new workout is stored in the session storage, allowing it
    to be saved when navigating pages until the browser is closed
- When an account is created, their workout is saved in the local storage
- The embedded html for Google Maps was taken from https: //www.embedgooglemap.net/
- Seperating objects in different files wasn't really working so I have a seperate
    folder
- Probably used way too many ids in the html

*/


/**
 * This class creates User objects
 * 
 * @class
 */
class User {
    /**
     * This is a constructor function to create User objects
     * 
     * Creates a user class with a name, username, password, and information
     * about their workouts
     * 
     * @constructor
     * @param {string} name The name of the user
     * @param {string} username The username of the user
     * @param {string} password The password of the user
     * @param {array} workouts The user's workouts
     */
    constructor(name, username, password, workouts) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.workouts = workouts;
    }


    /**
     * This method updates the user
     *
     */
    updateUser() {
        let userString = JSON.stringify(this);
        localStorage.removeItem(this.username);
        localStorage.setItem(this.username, userString);
        alert("User account updated");
        console.log("updated");

    }

    /**
     * This method changes the user's password
     * 
     * @param {string} newPass The new password
     */
    changePass(newPass) {

        this.password = newPass;
        console.log("success");

    }

    /**
     * This method changes the user's workouts
     * 
     * @param {array} newWorkout The new workout
     */
    updateWorkout(newWorkout) {
        this.workouts = newWorkout;
    }

    /**
     * This function logs the user out
     */
     logOut() {
        sessionStorage.setItem("activeUser", null);
        sessionStorage.setItem("workout", JSON.stringify([]));
        window.open(location.href = "./home.html");
    }
}

/**
 * This class creates Exercise objects
 *
 * @class
 */
class Exercise {
    /**
     * This is a constructor function to create Exercise objects
     *
     * Creates an exercise class with a name and type
     *
     * @constructor
     * @param {string} name The name of the user
     * @param {string} type The type of exercise 
     */
    constructor(date, name, type) {
        this.date = date;
        this.name = name;
        this.type = type;
    }

    /**
     * This method changes the name of the exercise
     * 
     * @param {String} newName 
     */
    changeName(newName) {
        this.name = newName;
    }
}

/**
 * This class creates cardio objects
 * 
 * @class
 */
class Cardio extends Exercise {
    /**
     * This is a constructor function to create Cardio objects
     * 
     * @inheritdoc
     * @param {int} time Time to compelete exercise
     * @param {int} distance Distance of the activity
     */
    constructor(date, name, type, time, distance) {
        super(date, name, type);
        this.time = time;
        this.distance = distance;
    }

    /**
     * This function changes the distance of the exercise
     * 
     * @param {int} newDistance The new distance 
     */
    changeDistance(newDistance) {
        this.distance = newDistance;
    }

}

/**
 * This class creates weights objects
 * 
 * @class
 */
class Weights extends Exercise {
    /**
     * This is a constructor function to create Weights objects
     * 
     * @inheritdoc
     * @param {int} sets Number of sets
     * @param {int} reps Number of reps
     * @param {int} weight Weight used
     */
    constructor(date, name, type, sets, reps, weight, measurement) {
        super(date, name, type);
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.measurement = measurement;
    }
    /**
     * This method changes the weight
     * @param {int} newWeight The new weight
     */
    changeWeight(newWeight) {
        this.weight = newWeight;
    }

    /**
     * 
     * This function changes the reps and sets
     * @param {int} newSets 
     * @param {int} newReps 
     */
    changeRepScheme(newSets, newReps) {
        this.sets = newSets;
        this.reps = newReps;
    }
}

/**
 * This function saves new user objects to be saved to local storage
 * 
 * @param {string} name The name of the user
 * @param {string} username The chose username
 * @param {string} password The chosen password
 * @param {array} workout An array of all the workout information
 */
function newUser(name, username, password, workout) {
    let user = new User(name, username, password, workout);
    let userString = JSON.stringify(user);
    localStorage.setItem(username, userString);
    alert("Workout Saved");
}


/**
 * This function retrieves the data of a user from the local storage
 * 
 * @param {string} username The username of the user to be retrived
 * 
 * @return {user} Returns user objects
 */
function retrieveFromLocal(username) {
    let userString = localStorage.getItem(username);
    let user = JSON.parse(userString);
    user = new User(user.name, user.username, user.password, user.workouts);
    return user;
}

/**
 * This function verifies the existence of a user
 * 
 * @param {string} username Username to be verified
 * 
 * @return {bool} true if successful, false if unsuccessful
 */
function doesUserExist(username) {
    try {
        retrieveFromLocal(username);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * This function verifies the user exists and has correct username and password
 * 
 * @param {string} username username of the user
 * @param {string} password password of the user
 * 
 * @return {bool} return true if username and password match, false if either do not
 */
function verifyUser(username, password) {
    if (doesUserExist(username) === true) {
        user = retrieveFromLocal(username);
        verify = password === user.password ? true : false;
        return verify;
    }
    return false;
}

/**
 * This function deletes users
 * 
 * @param {string} username Username of user to be deleted
 */
function deleteUser(username) {
    if (doesUserExist(username) === true) {
        localStorage.removeItem(username);
    }
}

/**
 * This function clears all exercies from the website and array
 */
function clearAll() {
    if (newWorkout.length != 0) {
        result = confirm("This will clear all exercises");
        if (result) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            newWorkout = [];
            tempStoreArray(newWorkout);
            console.log("Cleared all");
        }
    }
}


//session storage garbage

/**
 * Stores the workout in session storage
 * @param {array} workout Array with exercise objects
 */
function tempStoreArray(workout) {
    stringWorkout = JSON.stringify(workout);
    sessionStorage.setItem('workout', stringWorkout);
}



/**
 * This function displays the workout on the html page
 * 
 * The workout should be an exercise array and so every object will have
 * their own p element and button. Each p and button element is given an id
 * for easy reference. An anonymous function is created to bind a delete action
 * to the button. This also changes the workout array. Lastly, the type of exercise
 * will determine how each item in the array is displayed.
 * 
 * @param {html element} element The html element in which the workout will be displayed in
 * @param {array} workout Array with Exercise objects
 */
function displayWorkout(element, workout) {
    for (i = 0; i < workout.length; i++) {
        const p = document.createElement('p');
        const button = document.createElement('BUTTON')
        p.setAttribute("id", workout[i].name + "p");
        button.setAttribute("id", workout[i].name);

        button.setAttribute("onclick", del = function() {
            par = document.getElementById(this.id + "p");
            par.remove();
            for (i = 0; i < workout.length; i++) {
                if (workout[i].name === this.id) {
                    workout.splice(i, 1);
                }
            }
            tempStoreArray(workout);
            console.log("deleted " + this.id);
        });
        button.onclick = del;
        button.className = "delete";
        button.appendChild(document.createTextNode("delete"));

        if (workout[i] instanceof Weights) {
            p.appendChild(document.createTextNode(workout[i].date + " " + workout[i].name +
                " : " + workout[i].sets + " x " + workout[i].reps + " at " +
                workout[i].weight + " " + workout[i].measurement));
        } else {
            p.appendChild(document.createTextNode(workout[i].date + " " + workout[i].name + " : " +
                workout[i].time + " " + workout[i].distance));
        }
        element.appendChild(p);
        p.appendChild(button)
    }

}


/**
 * This function compares two exercises alphabetically
 * @param {Exercise} a Exercise object a 
 * @param {Exercise} b Exercise object b
 * 
 * @return {int} -1 if "a" smaller, 1 if "a" greater, 0 if a = b
 */
function compareName(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

/**
 * This function compares the date of two exercises
 * @param {Exercise} a Exercise object a
 * @param {Exercise} b Exercise object b
 * 
 * @return {int} -1 if "a" smaller, 1 if "a" greater, 0 if a = b
 */
function compareDate(a, b) {
    if (a.date < b.date) {
        return -1;
    }
    if (a.date > b.date) {
        return 1;
    }
    return 0;
}

/**
 * Sets the date. This function will be called by the date button
 */
function setDate() {
    date = document.getElementById("date");
    alert("Date is set as " + date.value);
}

/**
 * This function sorts the workout 
 * 
 * @param {array} workout 
 */
function sortWorkout(workout) {
    //for some reason does not work if variable is set outside of function
    const sortWay = document.getElementById("sort");
    if (sortWay.value === "weight") {
        workout.sort(compareWeight);
    } else if (sortWay.value === "exercise") {
        workout.sort(compareName);
    } else if (sortWay.value === "date") {
        workout.sort(compareDate);
    }
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    displayWorkout(element, workout);
}
