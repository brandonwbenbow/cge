import Engine from '/root/engine/engine.js';

var Canvas = null;

document.addEventListener("DOMContentLoaded", (e) => {
    Canvas = new Engine({
        width: window.innerWidth,
        height: window.innerHeight,
        element: document.getElementById("game-canvas"),
        //debug: true,
    });

    Canvas.startTick();
    // Canvas.tick = () => {

    // }
});