// get Canvas
const canvas=document.getElementById("canvas");
let context=canvas.getContext('2d');

// get Button 
const start_button=document.getElementById("start");
const stop_button=document.getElementById("stop");

// set global var
let rotate_flag=false;





class Number {
    constructor(num,x_pos,y_pos,context){
        this.num=num;
        this.y_pos=y_pos; 
        this.x_pos=x_pos;
        this.context=context;
    }

    move(dy){
        this.y_pos+=dy;
    }

    draw(){
        const string ="+"+this.num;
        this.context.fillText(string,this.x_pos,this.y_pos)
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

class Reel{
    constructor(display_num,canvas,context){
        this.display_num=display_num;
        if(this.display_num%2==0){
            this.display_num+=1;
        }
        this.canvas=canvas;
        this.context=context;
        this.gradient;

        this.numOnReel=[];
        this.x_pos=this.canvas.width/2;
        this.height=this.canvas.height;
        this.font_size=this.height/this.display_num;
        this.setting();
        // set  nums displayed firstly and display
        for(let i=0;i<this.display_num;i++){
            const num=Math.floor(Math.random()*100);
            let y_pos=this.height/2+(2-i)*this.font_size;
            this.numOnReel.push(new Number(num,this.x_pos,y_pos,this.context));
        }
        this.draw();
    }

    setting(){
        this.context.textBaseline='middle';
        this.context.textAlign='center';
        this.context.font=`80 ${this.font_size}px Impact`;

        // this.gradient=this.context.createRadialGradient(this.canvas.width/2,this.canvas.height/2,this.canvas.width/4,this.canvas.width/2,this.canvas.height/2,this.canvas.width);
        this.gradient=this.context.createLinearGradient(0,0,0,this.canvas.height);
        this.gradient.addColorStop(1,'blue');
        this.gradient.addColorStop(0.55,'cadetblue');
        this.gradient.addColorStop(0.45,'cadetblue');
        this.gradient.addColorStop(0,'blue');
    }

    draw_background(){
        this.context.fillStyle=this.gradient;
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    rotate(){
        const n=Math.floor(Math.random()*100);
        let new_num=new Number(n,this.x_pos,this.height/2-2*this.font_size,this.context);
        const removedEle=this.numOnReel.shift();
        for(let i=0;i<this.display_num-1;i++){
            this.numOnReel[i].move(this.font_size);
        }
        this.numOnReel.push(new_num);
        this.draw();
    }

    async stop(stop_num){
        let stop_Num=new Number(stop_num,this.x_pos,this.height/2-2*this.font_size,this.context);
        const removedEle=this.numOnReel.shift();
        for(let i=0;i<this.display_num-1;i++){
            this.numOnReel[i].move(this.font_size);
        }
        this.numOnReel.push(stop_Num);
        this.draw();
        await delay(500);
        for(let i=0;i<2;i++){
            this.rotate();
            await delay(500);
        }
    }

    draw(){
        this.context.clearRect(0,0,this.canvas.width,this.height);
        this.draw_background();
        for(let i=0;i<this.display_num;i++){
            
            if(i==(this.display_num-1)/2)this.context.fillStyle='aqua';
            else this.context.fillStyle='white';
            this.numOnReel[i].draw();
        }
    }
}


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
