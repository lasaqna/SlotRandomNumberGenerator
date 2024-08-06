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

start_button.addEventListener('click',async ()=>{
    rotate_flag=true;
    while(rotate_flag){
        reel.rotate();
        await delay(200);
    }
    const left_rotate_num=Math.floor(Math.random()*20);
    for(let i=0;i<left_rotate_num;i++){
        reel.rotate();
        await delay(200+20*i);
    }
    reel.stop(90);
});

stop_button.addEventListener('click',() =>{
    rotate_flag=false;
});
