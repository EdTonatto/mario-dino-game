const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;

let scaleRatio = null;
let previousTime = null;

function getScaleRatio() {
    const screenHeight = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight,
    );

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth,
    );

    if(screenWidth/screenHeight < GAME_WIDTH/GAME_HEIGHT) {
        return screenWidth/GAME_WIDTH;
    } else {
        return screenHeight/GAME_HEIGHT;
    }
}

function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
}

setScreen();

window.addEventListener('resize', () => setTimeout(setScreen, 500));
if(screen.orientation)
    screen.orientation.addEventListener('change', setScreen);

function clearScreen() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(currentTime) {
    if(previousTime === null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;    
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    console.log(frameTimeDelta);
    clearScreen();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);