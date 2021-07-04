class Engine {
    constructor(params) {
        this.width = params.width || 600,
        this.height = params.height || 400,
        this.tick = params.tick || this.defaultTick,
        this.element = params.element || null,
        this.context = params.context || params.element.getContext('2d') || null
        this.fps = params.fps || 0
        
        this._actual_tick_speed = 0;
        this._adjusted_fps_from_tick_speed = 0;
        this._tick_int = null;
        this._must_request = false;
        this._last_tick_time = 0;

        this._debug_mode = params.debug || false;

        if(this.element != null)
        {
            this.element.width = this.width;
            this.element.height = this.height;
        }
    }

    startTick() {
        if(this.fps > 0)
        {
            this._tick_int = setInterval(() => {
                this._runTick();
            }, 1000/this.fps);
        }
        else
        {
            this._must_request = true;
            this._tick_int = window.requestAnimationFrame(this._runTick);
        }
    }

    stopTick() {
        // stop tick
    }

    manageTick = () => {
        if(this._debug_mode)
            console.log("Tick Mananger:");

        if(this._last_tick_time == 0)
            this._last_tick_time = Date.now();
        
        this._actual_tick_speed = Date.now() - this._last_tick_time;
        this._adjusted_fps_from_tick_speed = Math.round(1000/this._actual_tick_speed);
        this._last_tick_time = Date.now();

        if(this._debug_mode)
        {
            console.log("FPS Target: " + this.fps);
            console.log("Achieved FPS: " + this._adjusted_fps_from_tick_speed);
        }

        if(this._must_request)
            this._tick_int = window.requestAnimationFrame(this._runTick);
    }

    clearCanvas = () => {
        // Clears Canvas
        this.element.width = this.width;
        this.element.height = this.height;
    }

    defaultTick = () => {
        let ctx = this.context;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.font = '18px san-serif';
        ctx.fillText("FPS: " + this._adjusted_fps_from_tick_speed, this.width - 5, 8);
    }

    _runTick = () => {
        this.clearCanvas();

        if(this.tick == null || this.tick == undefined)
            this.tick = this.defaultTick;

        this.tick(); 
        this.manageTick();
    }

}

export default Engine;