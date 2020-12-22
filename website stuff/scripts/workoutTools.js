/**
 * This function calculates the bmi given a weight, height, and metric
 * @param {int} weight 
 * @param {int} height 
 * @param {string} measurement 
 * 
 * @return {int} The calculated BMI
 */
function calculateBMI(weight, height, measurement) {
    if (measurement === "metric") {
        return weight / (height * height);
    } else {
        return weight * 703 / (height * height);
    }
}
bmiForm = document.getElementById("bmiForm");
p = document.getElementById("bmi");

bmiForm.addEventListener('submit', function(e) {
    e.preventDefault();
    bmi = calculateBMI(bmiForm.weight.value, bmiForm.height.value, bmiForm.measurement.value);
    p.innerHTML = "Your BMI is " + Math.round(bmi);
})

/**
 * This function searches exercises on a website
 */
function search() {
    let userInput = document.getElementById("userInput").value;
    if (userInput === '') {
        alert("nothing entered");
    } else {
        window.open("https://www.bodybuilding.com/exercises/search?query=" + userInput);
    }
}


