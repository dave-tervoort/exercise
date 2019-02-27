import Particle from "./Particle";

export default  class WaterParticle extends Particle{

    constructor({ x, y, z, vector, timeToLive = 1000 }) {
        super({ x, y, z, vector, timeToLive});

        this.timeToLive = timeToLive;
        this.vector = vector;
        this.gravityX = 0.07;
        this.gravityY = 0.999;
        this.wind = 0.025;
        this.radius = this.getRandomNumber(3,5);
        this.dy = -this.getRandomNumber(4,7);
        this.dx = -this.getRandomNumber(-1,1);
        this.colorArray = ["#00a0ff", "#0093eb", "#008adc"]
        this.color = this.getColor();
    }

    render(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath()
    }

    getColor(){
        this.color = this.colorArray[Math.floor(Math.random()*this.colorArray.length)];
        return this.color;
    }

    getRandomNumber (min, max) {
        return Math.random() * (max - min) + min;
    }

    update(){

        this.dy+=this.gravityX;
        this.dx*=this.gravityY;

        this.dx+=this.wind;

        this.x += this.dx;
        this.y += this.dy;
        this.z += this.vector.z;
        this.timeToLive = Math.max(0, this.timeToLive - 1);
    }
}