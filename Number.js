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

export default Number;