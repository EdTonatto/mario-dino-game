import { Mario } from './mario.js';
import { Ground } from './ground.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GAME_SPEED_START = 0.75;
const GAME_SPEED_INCREMENT = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const MARIO_WIDTH = 42;
const MARIO_HEIGHT = 78;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 1250;
const GROUND_HEIGHT = 13;
const GROUND_AND_PIPES_SPEED = 0.5;

let mario = null;
let ground = null;
let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;

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

function createSprites() {
    const marioWidthInGame = MARIO_WIDTH * scaleRatio;
    const marioHeightInGame = MARIO_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGame = GROUND_WIDTH * scaleRatio;
    const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

    ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, GROUND_AND_PIPES_SPEED, scaleRatio);
    mario = new Mario(ctx, marioWidthInGame, marioHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);
}

function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
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
    
    clearScreen();

    ground.update(gameSpeed, frameTimeDelta);

    ground.draw();
    mario.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);