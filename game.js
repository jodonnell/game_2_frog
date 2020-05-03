function gridScale(n) {
    return n * GRID;
}

function incrementAnimationFrame() {
    FRAME++;
    FRAME %= 2;
    setTimeout(incrementAnimationFrame, 500);
}
incrementAnimationFrame();

function drawRectangle(xposition, yposition, color, x, y, w, h) {
    ctx.fillStyle = color;
    ctx.fillRect(x + xposition, y + yposition, w, h);
}

function drawPlayer() {
    const img = PLAYER_SPR[FRAME];
    img.forEach((block) => {
        drawRectangle(player.x - player.offsetX, player.y, ...block);
    });
}

function setPlayerMoving(dx, dy) {
    player.moving = true;
    player.xSpeed = dx;
    player.ySpeed = dy;
}

function resetPlayer() {
    player.x = GRID * 5 + 20;
    player.y = GRID * 7;
    player.moving = false;
}

document.addEventListener("keydown", (e) => {
    if (e.repeat || player.moving) return;
    if (e.key == "ArrowLeft") setPlayerMoving(-4, 0);
    else if (e.key == "ArrowRight") setPlayerMoving(4, 0);
    else if (e.key == "ArrowUp") setPlayerMoving(0, -4);
});

function playerX() {
    return player.x - player.offsetX;
}

function PlayerIsOnGrid() {
    return playerX() % GRID == 0 && player.y % GRID == 0;
}

function checkPlayerBounds() {
    if (playerX() > C_WIDTH - GRID / 2) player.xSpeed *= -1;
    else if (playerX() < -GRID / 2) player.xSpeed *= -1;
    else if (player.y <= -GRID) player.y = C_HEIGHT + player.ySpeed;
}

function movePlayer() {
    if (!player.moving) return;
    player.x += player.xSpeed;
    player.y += player.ySpeed;
    checkPlayerBounds();
    if (PlayerIsOnGrid()) player.moving = false;
}

function Car(x, y, w) {
    (this.x = x), (this.y = y), (this.w = w), (this.h = 50);
}

function CarLane(y, speed, direction, pattern) {
    this.speed = speed;
    this.width = pattern.length * GRID;
    this.direction = direction;
    this.cars = [];
    let startX = (direction == 1) * (C_WIDTH - this.width);
    for (i = 0; i < pattern.length; i++) {
        let car_length = 0;
        if (pattern[i] == ".") continue;
        while (pattern[i + car_length] == "c") {
            car_length++;
        }
        this.cars.push(new Car(i * GRID + startX, y, car_length * GRID));
        i += car_length;
    }
}
function drawCars(lane) {
    ctx.fillStyle = DGREY;
    lane.cars.forEach((car) => {
        let count = car.w / GRID;
        let offset = FRAME;
        for (i = 0; i < count; i++) {
            ctx.fillRect(
                car.x + i * GRID,
                car.y + car.h + offset * 10,
                GRID,
                -car.h
            );
            offset = (offset + 1) % 2;
        }
    });
}
function moveCars(lane) {
    lane.cars.forEach((car) => {
        car.x += lane.direction * lane.speed;
        if (lane.direction == 1 && car.x > C_WIDTH)
            car.x = -lane.width + C_WIDTH;
        else if (lane.direction == -1 && car.x <= -GRID * 4) car.x = lane.width;
    });
}

function checkForCollision(car) {
    const playerLeft = player.x - 5;
    const playerRight = playerLeft + player.width + 10;

    const playerTop = player.y + 10;
    const playerBottom = playerTop + 50;

    const carLeft = car.x;
    const carRight = carLeft + car.w;

    const carTop = car.y;
    const carBottom = car.y + GRID;

    if (playerRight <= carLeft || playerLeft >= carRight)
        return false;
    if (playerTop >= carBottom || playerBottom <= carTop)
        return false;
    return true;

}

var LANE_1 = new CarLane(gridScale(6), 2, 1, CAR_PATTERN[0]),
    LANE_2 = new CarLane(gridScale(5), 6, -1, CAR_PATTERN[1]),
    LANE_3 = new CarLane(gridScale(4), 4, 1, CAR_PATTERN[2]);

function gameLoop() {
    requestAnimationFrame(gameLoop);

    ctx.fillStyle = GREY;
    ctx.fillRect(0, 0, C_WIDTH, C_HEIGHT);

    movePlayer();
    drawPlayer();
    [LANE_1, LANE_2, LANE_3].forEach(lane => {
        drawCars(lane);
        moveCars(lane);
        lane.cars.forEach((car) => {
            if (checkForCollision(car)) {
                resetPlayer();
            }

        });
    });

}
gameLoop();
