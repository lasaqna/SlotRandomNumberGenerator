import Reel from "./Reel.js";
// get Canvas
const canvas=document.getElementById("canvas");
let context=canvas.getContext('2d');

// get Button 
const start_button=document.getElementById("start");
const stop_button=document.getElementById("stop");


// set global var
let rotate_flag=false;



let reel=new Reel(5,canvas,context);
stop_button.disabled=true;

start_button.addEventListener('click',async ()=>{
    if(!start_button.disabled&&reel.flag==false){
        rotate_flag=false;
        
    }
    if(!rotate_flag){
        rotate_flag=true;
        start_button.disabled=true;
        stop_button.disabled=false;
    
        reel.rotate_animate();
    }
});

stop_button.addEventListener('click',() =>{
    reel.flag=true;
    stop_button.disabled=true;
    start_button.disabled=false;
});
