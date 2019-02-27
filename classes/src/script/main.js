import ParticleEmitter from "./lib/ParticleEmitter.js";
import Particle from "./lib/Particle.js";
import WaterParticle from "./lib/WaterParticle.js";
import Vector3 from "./lib/Vector3";

const pe = new ParticleEmitter(document.querySelector("canvas"), {
	maxParticles: 500,
	spawnPerUpdate: 2
});

document.querySelector("#wrapper").addEventListener("mousemove", (e) => {
    let mouseX = e.clientX;
    console.log(mouseX)
})

pe.addParticleClass(WaterParticle, function(width, height) {

    return {
        x: width/2,
        y: height-85,
        z: 0,
        vector: new Vector3(
            0,
            0,
            0
        )
    };
});

pe.start();

