import Engine from '../engine/engine.js'

const Canvas = new Engine({
    width: window.innerWidth,
    height: window.innerHeight,
    element: document.getElementById("game-canvas"),
    //debug: true,
});

Canvas.startTick();
