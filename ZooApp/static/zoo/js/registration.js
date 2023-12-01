let validate = (username) => {
    if (username.length > 150 || username.length == 0 ) return false;
    let regexp = /[a-zA-Z0-9\.\-\+\_@]+/gm;
    // return regexp.match(username)[0].length == username.length;
    return username.match(regexp)[0].length == username.length;
}

let validateEvent = (event) => {
    console.log("Huy")
    let username = event.target.value;

    let rules = document.getElementById("registration-form").getElementsByTagName("p")[0].getElementsByTagName("span")[0];
    let valid = validate(username);
    let button = document.getElementById("registration-form").getElementsByTagName("button")[0];

    if (valid) {
        rules.style.color = "green";
        button.removeAttribute("disabled");
    } else {
        rules.style.color = "red";
        button.setAttribute('disabled', true);
    }
}

window.addEventListener("load", () => {
    console.log("Loaded");
    let username_field = document.getElementById("registration-form").getElementsByTagName("p")[0].getElementsByTagName("input")[0];
    username_field.addEventListener("input", validateEvent);


})
