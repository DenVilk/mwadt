let cars = {};
let add_car = (e) => {
    e.preventDefault();
    let surname = document.getElementById('surname').value;
    let brand = document.getElementById('brand').value;
    let number = document.getElementById('number').value;
    if (!surname || !brand || !number) {
        alert("Enter all values!");
        return;
    }
    if (!cars[brand]) {
        cars[brand] = [];
    }
    cars[brand].push([surname, number]);
    console.log(cars)
    search();
    document.getElementById('surname').value = "";
    document.getElementById('brand').value = "";
    document.getElementById('number').value = "";
}

let show_result = (result) => {
    let table = document.getElementById("result").querySelectorAll("tbody")[0];
    table.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
        let new_row = document.createElement('tr');
        let el = document.createElement("td");
        el.innerText = result[i][0];
        new_row.appendChild(el);
        el = document.createElement("td");
        el.innerText = result[i][1];
        new_row.appendChild(el);
        el = document.createElement("td");
        el.innerText = result[i][2];
        new_row.appendChild(el);

        table.appendChild(new_row)
    }
}

let search = () => {
    let brand = document.getElementById("brand-search").value;
    let result = [];

    if (!brand) {
        for (let brand in cars) {
            for (let car in cars[brand]) {
                result.push([brand, cars[brand][car][0], cars[brand][car][1]])
            }
        }
        console.log(result);
        show_result(result);
        return;
    }
    if (cars[brand]) {
        for (let car in cars[brand]) {
            result.push([brand, cars[brand][car][0], cars[brand][car][1]])
        }
        console.log(cars[brand]);
        show_result(result);
    } else {
        console.log("none")
        show_result([])
    }

}

window.addEventListener("load", () => {
    document.getElementById("add-car").addEventListener('click', add_car);
    document.getElementById("brand-search").addEventListener('input', search);
    cars = {
        "bmw": [['Litvinets', '1231']],
        "audi": [['Velikovich', '1121']],
        "porsche": [['Vladymtsev', '1531'], ['Shved', '1531']],
    };
    search();
})