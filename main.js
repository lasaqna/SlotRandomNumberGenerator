import Reel from "./Reel.js";
// get Canvas
const canvas=document.getElementById("canvas");
let context=canvas.getContext('2d');

// get Button 
const start_button=document.getElementById("start");
const stop_button=document.getElementById("stop");

// set global var
let rotate_flag=false;




function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




let reel=new Reel(5,canvas,context);

start_button.addEventListener('click',async ()=>{

    window.requestAnimationFrame(reel.rotate_animate());
});

stop_button.addEventListener('click',() =>{
    reel.flag=true;
});
