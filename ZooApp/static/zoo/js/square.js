let matrix = [];

let selected = [];

let showMatrix = () => {
    let body = document.getElementById("matrix-body");
    body.innerHTML = "";
    let N = matrix.length;
    for (let i = 0; i < N; i++) {
        let line = matrix[i];
        let M = line.length;
        let html_row = document.createElement("div");
        html_row.classList.add("row");
        for (let j = 0; j < M; j++) {
            let new_el = document.createElement("div");
            new_el.classList.add("ele");
            new_el.id = `${i * N + j}`;
            new_el.innerText = line[j];
            new_el.addEventListener("click", select);
            if (selected.indexOf(i*N+j) != -1) color(new_el);
            html_row.appendChild(new_el);
        }
        body.appendChild(html_row);
    }
};

let transponate = (event) => {
    let N = matrix.length;
    let M = matrix[0].length;
    let new_matrix = [];
    for (let i = 0; i < M; i++) {
        let row = [];
        for (let j = 0; j < N; j++) row.push(matrix[j][i]);
        new_matrix.push(row);
    }
    matrix = new_matrix;
    showMatrix();
}

let neighbor = (point) => {
    let N = matrix.length;
    let M = matrix[0].length;
    let x = point[0];
    let y = point[1];
    let steps = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let res = [];
    for (let i = 0; i < 4; i++) {
        let cx = steps[i][0] + x;
        let cy = steps[i][1] + y;
        if (cx >= 0 && cx < N && cy >= 0 && cy < M) res.push(cx * N + cy);
    }
    return res;
}

let select = (event) => {
    let el = event.target;
    let N = matrix.length;
    let M = matrix[0].length;
    if (selected.indexOf(Number(el.id)) != -1) return;
    let K = document.getElementById("K").value;

    let px = parseInt(el.id / N);
    let py = el.id % N;
    console.log(px, py);
    let c1 = 0;
    for (let i = 0; i < N; i++) if (selected.indexOf(i * N + py) != -1) c1++;
    if (c1 >= K) return;
    c1 = 0;
    for (let i = 0; i < M; i++) if (selected.indexOf(px * N + i) != -1) c1++;
    if (c1 >= K) return;


    let ns = neighbor([px, py]);
    console.log(ns);
    console.log(selected);
    console.log(el.id)
    for (let i in ns) {
        if (selected.indexOf(ns[i]) != -1) return;
    }
    selected.push(Number(el.id));

    color(el)
}

let color = (el) => {
    if (Number(el.innerHTML) % 2) {
        el.classList.add("even")
    } else {
        el.classList.add("odd")
    }
}

let add_row = () => {
    selected = [];
    let N = matrix.length;
    let M = matrix[0].length;
    let row = [];
    for (let i = 0; i < matrix[0].length; i++)
        row.push(Math.round(Math.random() * (N * M)));
    matrix.push(row);
    showMatrix();
}

let add_column = () => {
    selected = [];
    let N = matrix.length;
    let M = matrix[0].length;
    for (let i = 0; i < matrix.length; i++) 
        matrix[i].push(Math.round(Math.random() * (N * M)));
    showMatrix();
}

window.addEventListener("load", () => {
    document.getElementById("N").addEventListener("input", (event) => {
        console.log("N")
        matrix = [];
        selected = [];
        let N = event.target.value;
        for (let i = 0; i < N; i++) {
            let line = [];
            for (let j = 0; j < N; j++) {
                line.push(Math.round(Math.random() * (N * N)));
            }
            matrix.push(line);
        }
        showMatrix();
    });
    document.getElementById('trsp-btn').addEventListener("click", transponate)
    document.getElementById('add-row').addEventListener("click", add_row)
    document.getElementById('add-column').addEventListener("click", add_column)
})

// window.addEventListener("click", select);