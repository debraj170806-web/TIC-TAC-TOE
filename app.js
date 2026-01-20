let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let modeScreen = document.querySelector("#mode-screen");
let userModeBtn = document.querySelector("#mode-user");
let computerModeBtn = document.querySelector("#mode-computer");

let turnO = true;
let gameMode = null;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

userModeBtn.addEventListener("click", () => {
    gameMode = "user";
    modeScreen.style.display = "none";
});

computerModeBtn.addEventListener("click", () => {
    gameMode = "computer";
    modeScreen.style.display = "none";
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameMode) return;

        if (turnO) {
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
        }

        box.disabled = true;
        checkWinner();

        if (gameMode === "computer" && !turnO) {
            setTimeout(() => {
                computerMove();
            }, 300);
        }
    });
});

function disableBoxes() {
    for (let box of boxes) {
        box.disabled = true;
    }
}

function enableBoxes() {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o");
    }
}

function showWinner(winner) {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

function showDraw() {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

function checkWinner() {
    let filledCount = 0;

    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    boxes.forEach(box => {
        if (box.innerText !== "") filledCount++;
    });

    if (filledCount === 9) {
        showDraw();
    }
}

function computerMove() {
    let emptyBoxes = [...boxes].filter(box => box.innerText === "");

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let vals = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        if (vals.filter(v => v === "X").length === 2 && vals.includes("")) {
            makeMove(pattern[vals.indexOf("")], "X");
            return;
        }
    }

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let vals = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        if (vals.filter(v => v === "O").length === 2 && vals.includes("")) {
            makeMove(pattern[vals.indexOf("")], "X");
            return;
        }
    }

    if (boxes[4].innerText === "") {
        makeMove(4, "X");
        return;
    }

    let corners = [0, 2, 6, 8].filter(i => boxes[i].innerText === "");
    if (corners.length > 0) {
        makeMove(corners[Math.floor(Math.random() * corners.length)], "X");
        return;
    }

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.classList.add("x");
    randomBox.disabled = true;
    turnO = true;
    checkWinner();
}

function makeMove(index, symbol) {
    boxes[index].innerText = symbol;
    boxes[index].classList.add(symbol.toLowerCase());
    boxes[index].disabled = true;
    turnO = true;
    checkWinner();
}

function resetGame() {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    modeScreen.style.display = "flex";
    gameMode = null;
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);







