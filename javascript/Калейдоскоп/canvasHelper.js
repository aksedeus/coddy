const sizeInput = document.querySelector("#size-input");
const colorInput = document.querySelector("#color-input");
const backgroundColorInput = document.querySelector("#background-color-input");
const symmetryInput = document.querySelector("#symmetry-input");
const clearButton = document.querySelector("#clear-button");
const saveButton = document.querySelector("#save-button");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const canvasBoundes = canvas.getBoundingClientRect();


canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.85;

ctx.translate(canvas.width / 2, canvas.height / 2);


function rotate(angle) {
    ctx.rotate(angle * Math.PI / 180);
}

function flip() {
    ctx.scale(-1, 1);
}

function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1 - canvasBoundes.x - canvas.width / 2, y1 - canvasBoundes.y - canvas.height / 2);
    ctx.lineTo(x2 - canvasBoundes.x - canvas.width / 2, y2 - canvasBoundes.y - canvas.height / 2);
    ctx.stroke();
    ctx.closePath();
}

function fillCanvas(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0 - canvas.width / 2, 0 - canvas.height / 2, canvas.width, canvas.height);
}

function savePicture() {
    let image = canvas.toDataURL("image/png");
    let a = document.createElement("a");

    a.href = image;
    a.download = "image.png";
    a.click();
}

canvas.addEventListener("mousemove", (e) => mouseMove(e.clientX, e.clientY))
canvas.addEventListener("mousedown", (e) => mouseDown(e.clientX, e.clientY))
canvas.addEventListener("mouseup", (e) => mouseUp(e.clientX, e.clientY))
sizeInput.addEventListener("input", (e) => sizeChange(e.target.value));
colorInput.addEventListener("input", (e) => colorChange(e.target.value));
backgroundColorInput.addEventListener("input", (e) => backgroundColorChange(e.target.value));
symmetryInput.addEventListener("input", (e) => symmetryChange(e.target.value));
clearButton.addEventListener("click", () => clearCanvas());
saveButton.addEventListener("click", () => savePicture());