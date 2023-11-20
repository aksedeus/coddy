//Предыдущая координата X мышки
let prevMouseX = 0;
//Предыдущая координата Y мышки
let prevMouseY = 0;

let symmetry = 6;
let isPainting = false;
let backgroundColor = "#ffffff";

//Задаем инпутам знаячения по умолчанию
backgroundColorInput.value = backgroundColor;
sizeInput.value = 4;
colorInput.value = "#399905";
symmetryInput.value = symmetry;

fillCanvas(backgroundColor);

//Стиль линий
ctx.lineCap = "round";
//Цвет лини
ctx.strokeStyle = "#399905";
//Толщина линий
ctx.lineWidth = 4;



//Движение курсора мышки по канваусу (холсту)
function mouseMove(mouseX, mouseY) {
    if(isPainting) {
        for(let i = 0; i < symmetry; i++) {
            line(prevMouseX, prevMouseY, mouseX, mouseY);
            flip();
            line(prevMouseX, prevMouseY, mouseX, mouseY);
            flip();
            rotate(360 / symmetry);
        }
    
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    }
    
}

//Нажатие мышкой по канваусу (холсту)
function mouseDown(mouseX, mouseY) {
    isPainting = true;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
}

//Отпустили клавишу мышки по канваусу (холсту)
function mouseUp(mouseX, mouseY) {
    isPainting = false;
}

//Меняем размер кисти
function sizeChange(size) {
    ctx.lineWidth = size;
}

//Меняем цвет кисти
function colorChange(color) {
    ctx.strokeStyle = color;
}

//Меняем цвет заднего фона
function backgroundColorChange(color) {
    backgroundColor = color;
    fillCanvas(color);
}

//Меняем количество симметрий
function symmetryChange(symmetryCount) {
    symmetry = symmetryCount;
}

//Очищаем канвас (холст)
function clearCanvas() {
    fillCanvas(backgroundColor);
}
