/** 
 * Required DOM elements:
 *      <p id="stopwatch-display"></p>
 *      <button id="stopwatch-startStop"></button>
 *      <button id="stopwatch-reset"></button>
 * */ 
class Stopwatch{
    constructor(){
        // Binding all functions so that they can be used as button click events
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.toggleStartStop = this.toggleStartStop.bind(this);
        this.tick = this.tick.bind(this);
        this.render = this.render.bind(this);
        
        // References to HTML elements
        this.startStopButton = $("#stopwatch-startStop");
        this.resetButton = $("#stopwatch-reset");
        this.display = $("#stopwatch-display");

        this.time = 0;
        this.active = false;
        this.timer;

        this.initializeButtons();
        this.render();
    }

    // Sets text and click event for buttons
    initializeButtons(){
        this.startStopButton.text("Start");
        this.startStopButton.click(this.toggleStartStop);

        this.resetButton.text("Reset");
        this.resetButton.click(this.reset);
    }

    // Sets display... add any other necessary methods
    render(){
        this.display.text(this.format());
    }

    // Increments time
    tick(){
        this.time += 0.01;
        this.render();
    }

    // Default formatting method. Displays as (1.33, 10.33, 1:03.33)
    format(){
        let secs = Math.round((this.time % 60)*100) / 100;
        let mins = Math.floor(this.time/60);

        // Adding trailing zeros (e.g. 1.3 => 1.30, 1 => 1.00)
        if(secs % 1 == 0) secs += ".00";
        else if((secs*10) % 1 == 0) secs += "0";

        // Adds preceding 0 (e.g. 1:3.00 => 1:03.00)
        if(secs < 10 && mins > 0) secs = "0" + secs;

        // Only returns minutes when minutes exist (e.g. 10.33 NOT 0:10.33)
        if(mins){
            return(mins + ":" + secs)
        }else{
            return String(secs);
        }
    }

    start(){
        this.timer = setInterval(this.tick, 10);
        this.active = true;
        this.startStopButton.text("Stop");
    }
    
    stop(){
        clearInterval(this.timer);
        this.active = false;
        this.startStopButton.text("Start");
    }

    toggleStartStop(){
        if(this.active){
            this.stop();
        }else{
            this.start();
        }
    }

    reset(){
        this.stop();
        this.time = 0;
        this.render();
    }
}

let stopwatch = new Stopwatch();