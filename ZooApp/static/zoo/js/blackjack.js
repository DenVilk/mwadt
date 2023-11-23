let numbers = {
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 2,
    "Q": 3,
    "K": 4,
    "A": 11,
}

let player_1 = [];
let player_2 = [];
let signs = ['hearts', 'spades', 'clubs', 'diamonds'];

let stack = [];
let status = "Ваш ход!"

function abs(a) {
    if (a > 0) return a;
    return -a;
}

function end_game() {
    console.log("Game ended.")
    let p1 = abs(sum(player_1) - 21);
    let p2 = abs(sum(player_2) - 21);

    let board_hand = document.getElementById("robot-hand");
    board_hand.innerHTML = "";
    for (let i in player_2) {
        let card_el = document.createElement("span");
        card_el.classList.add("card", player_2[i][0]);
        card_el.innerHTML = player_2[i][1];
        board_hand.appendChild(card_el);
    }
    document.getElementById("add").setAttribute("disabled", true);
    add_move();

    let res = `\nPlayer: ${sum(player_1)}\nRobot: ${sum(player_2)}`
    if (p1 < p2) {
        alert("You win!" + res);
    } else if (p1 > p2) {
        alert("Robot win!" + res);
    } else alert("Tie." + res);

}

function add_card_to_hand(hand, card) {
    let board_hand = document.getElementById((hand == "player_1" ? "player-hand" : "robot-hand"));
    console.log(board_hand);
    let new_card = document.createElement("span");
    new_card.classList.add('card', (hand == "player_1" ? card[0] : "closed"));
    if (hand == 'player_1') {
        new_card.innerText = card[1];
    }
    board_hand.appendChild(new_card);
    add_move();
}

function sum(hand) {
    let s = 0;
    for (let i = 0; i < hand.length; i++) {
        s += numbers[hand[i][1]];
    }
    return s;
}

function robot() {
    if (!stack.length) { end_game(); return; }
    if (sum(player_2) < 21) {
        let card = stack.pop();
        add_card_to_hand("player_2", card);
        player_2.push(card);
    }
}

function make_turn() {
    document.getElementById("stop").removeAttribute("disabled");
    if (!stack.length) { end_game(); return; }
    let card = stack.pop();
    player_1.push(card);
    add_card_to_hand("player_1", card);
    robot();
}

function shuffle(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function generateStack() {
    stack = [];
    for (let i = 0; i < 4; i++)
        for (let key in numbers) {
            stack.push([signs[i], key])
        }
    stack = shuffle(stack);
    return stack;
}

function newGame() {
    document.getElementById("robot-hand").innerHTML = "";
    document.getElementById("player-hand").innerHTML = "";
    document.getElementById("stop").setAttribute("disabled", true);
    document.getElementById("add").removeAttribute("disabled");
    player_1 = [];
    player_2 = [];
    generateStack();
}

function stop_game() {
    for (let i = 0; i < 36; i++) robot();
    end_game();
}


window.addEventListener("load", () => {
    let start_btn = document.getElementById("new");
    let turn_btn = document.getElementById("add");
    let stop_btn = document.getElementById("stop");
    let select_bg = document.getElementById("board-bg");
    start_btn.addEventListener("click", newGame);
    turn_btn.addEventListener("click", make_turn);
    stop_btn.addEventListener("click", stop_game);
    select_bg.addEventListener("change", (event) => {
        console.log('10')
        let board = document.getElementsByClassName("board")[0];
        console.log(board);
        console.log(event.target.value);
        board.style.setProperty("background-image", "url(/static/zoo/img/" + event.target.value + ".jpeg)");
    });
    newGame();
})


let add_move = () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach(
        card_w => {
            card_w.addEventListener('mousemove', event => {
                //console.log(card_w.getBoundingClientRect());
                const [x, y] = [event.offsetX, event.offsetY];
                const rect = card_w.getBoundingClientRect();
                const [width, height] = [rect.width, rect.height];
                const middleX = width / 2;
                const middleY = height / 2;
                const offsetX = ((x - middleX) / middleX) * 25;
                const offsetY = ((y - middleY) / middleY) * 25;
                const offX = 50 + ((x - middleX) / middleX) * 25;
                const offY = 50 - ((y - middleY) / middleY) * 20;
                card_w.style.setProperty("--rotateX", 1 * offsetX + "deg");
                card_w.style.setProperty("--rotateY", -1 * offsetY + "deg");
                card_w.style.setProperty("--posx", offX + "%");
                card_w.style.setProperty("--posy", offY + "%");
                card_w.style.setProperty("--scale", 120 + "%");
            });
            card_w.addEventListener('mouseleave', eve => {
                card_w.style.animation = 'reset-card 1s ease';
                card_w.addEventListener("animationend", e => {
                    card_w.style.animation = 'unset';
                    card_w.style.setProperty("--rotateX", "0deg");
                    card_w.style.setProperty("--rotateY", "0deg");
                    card_w.style.setProperty("--posx", "50%");
                    card_w.style.setProperty("--posy", "50%");
                    card_w.style.setProperty("--scale", "100%");
                }, {
                    once: true
                });
            });
        }
    );
}

