import Number  from "./Number.js";

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

        this.frame_per_rotate=7;
        this.flag=false;
        this.numOnReel=[];
        this.x_pos=this.canvas.width/2;
        this.height=this.canvas.height;
        this.font_size=this.height/this.display_num;
        this.setting();
        // set  nums displayed firstly and display
        let y_pos=this.height/2+(2)*this.font_size;
        for(let i=0;i<this.display_num+1;i++){
            const num=Math.floor(Math.random()*100);
            this.numOnReel.push(new Number(num,this.x_pos,y_pos,this.context));
            y_pos-=this.font_size;
        }
        this.draw();
    }

    setting(){
        // setting context
        this.context.textBaseline='middle';
        this.context.textAlign='center';
        this.context.font=`80 ${this.font_size}px Impact`;

        // setting gradient
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

    fix_position(){
        let y_pos=this.height/2+(this.display_num-1)/2*this.font_size;
        for(let i=0;i<this.numOnReel.length;i++){
            this.numOnReel[i].y_pos=y_pos;
            y_pos-=this.font_size;
        }
    }
    rotate_animate(){
        //  add new Number when a Number go out screen
        if(this.numOnReel[0].y_pos>this.height+this.font_size/2){
            const removedEle=this.numOnReel.shift();
            this.fix_position();
            
            const n=Math.floor(Math.random()*100);
            let new_num=new Number(n,this.x_pos,this.height/2-3*this.font_size,this.context);
            this.numOnReel.push(new_num);
        }   
        // draw animation
        for(let i=0;i<this.numOnReel.length;i++){
            this.numOnReel[i].move(this.font_size/this.frame_per_rotate);
        }
        this.draw();
        if(!this.flag)requestAnimationFrame(this.rotate_animate.bind(this));
        else requestAnimationFrame(this.stop_animate.bind(this));
    }
    
    stop_animate(){
        if(this.numOnReel[0].y_pos>this.height+this.font_size/2){
            const removedEle=this.numOnReel.shift();
            
            this.fix_position();
            let n=Math.floor(Math.random()*100);
            const temp=Math.floor(Math.random()*10);
            if(temp<1)n=90;
            let new_num=new Number(n,this.x_pos,this.height/2-3*this.font_size,this.context);
            this.numOnReel.push(new_num);

            if(this.numOnReel[2].num==90 && this.frame_per_rotate>=10 ){
                this.frame_per_rotate=5;
                this.flag=false;
                return;
            }
            this.frame_per_rotate=Math.max(this.frame_per_rotate+1,10);  
        }   
        for(let i=0;i<this.numOnReel.length;i++){
            this.numOnReel[i].move(this.font_size/this.frame_per_rotate);
        }
        this.draw();
        requestAnimationFrame(this.stop_animate.bind(this));
    }


    draw(){
        this.context.clearRect(0,0,this.canvas.width,this.height);
        this.draw_background();
        for(let i=0;i<this.numOnReel.length;i++){
            if(Math.abs(this.numOnReel[i].y_pos-this.height/2)<this.font_size/2){
                this.context.fillStyle='aqua';
            }else{
                 this.context.fillStyle='white';
            }
            this.numOnReel[i].draw();
        }
    }
}

export default Reel;