const canvas = document.querySelector("#canvas");
const colorInput = document.querySelector("#color-input");
const backgroundColorInput = document.querySelector("#background-color-input");
const clearBtn = document.querySelector("#clear-btn");
const sizeInput = document.querySelector("#size-input");
const pencilBtn = document.querySelector("#pencil-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const rectBtn = document.querySelector("#rect-btn");
const circleBtn = document.querySelector("#circle-btn");
const saveBtn = document.querySelector("#save-btn");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

//Получаем 2d контекст канваса
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const PENCIL = "PENCIL";
const ERASER = "ERASER";
const RECT = "RECT";
const CIRCLE = "CIRCLE";

let prev = [];
let next = [];

let isPainting = false;
let color = "#81ABEE";
let backgroundColor = "#ffffff";
let size = 4;
let tool = PENCIL;

let lastMouseX;
let lastMouseY;
let snapshot;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineCap = "round";
ctx.lineJoin = "round";

colorInput.value = color;
backgroundColorInput.value = backgroundColor;
sizeInput.value = size;


function fillCanvas() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function deselectAllTools() {
    eraserBtn.classList.remove("choosed-tool");
    pencilBtn.classList.remove("choosed-tool");
    rectBtn.classList.remove("choosed-tool");
    circleBtn.classList.remove("choosed-tool");
}

function changeTool(toolName, operationName, button) {
    tool = toolName;
    ctx.globalCompositeOperation = operationName;

    deselectAllTools();
    button.classList.add("choosed-tool");
}

fillCanvas();


canvas.addEventListener("mousedown", (e) => {
    isPainting = true;
    ctx.beginPath();
    ctx.lineTo(e.clientX, e.clientY);
    prev.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    next = [];

    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
})

canvas.addEventListener("mouseup", () => {
    isPainting = false;
    ctx.closePath();
})

canvas.addEventListener("mousemove", (e) => {
    if(isPainting) {
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;


        if(tool == PENCIL ) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        } else if(tool == ERASER) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.strokeStyle = backgroundColor;
            ctx.stroke();
        }
        else if(tool == RECT) {
            ctx.putImageData(snapshot, 0, 0);
            ctx.fillRect(lastMouseX, lastMouseY, e.clientX - lastMouseX, e.clientY - lastMouseY);
        } else if(tool == CIRCLE) {
            ctx.beginPath();
            ctx.putImageData(snapshot, 0, 0);

            let radius = Math.sqrt(Math.pow(lastMouseX - e.clientX, 2) + Math.pow(lastMouseY - e.clientY, 2));
            ctx.arc(lastMouseX, lastMouseY, radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
})

eraserBtn.addEventListener("click", () => changeTool(ERASER, "source-over", eraserBtn));
pencilBtn.addEventListener("click", () => changeTool(PENCIL, "source-over", pencilBtn));
rectBtn.addEventListener("click", () => changeTool(RECT, "source-over", rectBtn));
circleBtn.addEventListener("click", () => changeTool(CIRCLE, "source-over", circleBtn));

colorInput.addEventListener("input", (e) => color = e.target.value);
backgroundColorInput.addEventListener("input", (e) => {
    backgroundColor = e.target.value;
    fillCanvas();
})

sizeInput.addEventListener("input", (e) => size = e.target.value);
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
saveBtn.addEventListener("click", () => {
    let image = canvas.toDataURL("image/png");
    let a = document.createElement("a");

    a.href = image;
    a.download = "image.png";
    a.click();
});

prevBtn.addEventListener("click", () => {
    ctx.globalCompositeOperation="source-over";

    if(prev.length > 0) {
        let data = prev.pop();

        next.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        ctx.putImageData(data, 0, 0);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

nextBtn.addEventListener("click", () => {
    ctx.globalCompositeOperation="source-over";

    if(next.length > 0) {
        let data = next.pop();
        
        prev.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        ctx.putImageData(data, 0, 0);
    }
})

//TODO реализовать пипетку

/*
Представить все ввиде таймлайна
Как только мы что то нарисовали, то знаем только настоящее и прошлое, но не знаем будущее
Как только мы вернулись в прошлое, настоящее стало будущим, а часть прошлого настоящим.
Это позволяет перемещаться по времени, но только известному нам
Как только, вернувшись в прошлое, мы выполняем новое действие, все будущее перезаписывается 
И опять остается только настоящее и прошлое
*/


/*
Для демонстрационного урока
1. Просто рисование при ведении мышкой.
2. Рисование только при нажатии кнопкой мыши
3. Смена цвета
4. Смена размера линий
5. Очистка канваса
6. Сохранение картинки
7. Ластик

*/



