import ParticleEmitter from "./lib/ParticleEmitter.js";
import Particle from "./lib/Particle.js";
import WaterParticle from "./lib/WaterParticle.js";
import Vector3 from "./lib/Vector3";

const pe = new ParticleEmitter(document.querySelector("canvas"), {
	maxParticles: 200,
	spawnPerUpdate: 1
});

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

