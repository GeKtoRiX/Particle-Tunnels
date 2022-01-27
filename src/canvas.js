import style from './main.css';

const htmlCanvas = document.getElementById('canvas');
const canvas = htmlCanvas.getContext('2d');

htmlCanvas.width = window.innerWidth - 4;
htmlCanvas.height = window.innerHeight - 4;

addEventListener('resize', () => {
    htmlCanvas.width = window.innerWidth - 4;
    htmlCanvas.height = window.innerHeight - 4;
})
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})
const center = {
    x: htmlCanvas.width / 2,
    y: htmlCanvas.height / 2,
}
var mouse = {
    x: htmlCanvas.width / 2,
    y: htmlCanvas.height / 2,
}
class Particle {
    constructor(x, y, radius, valocity, color) {
        this.x = x;
        this.y = y;
        // Структура ускорения x y.
        this.velocity = valocity;
        this.radius = radius;
        this.color = color;
        this.ttl = 250;
    }
    draw() {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 180, false);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.closePath();
    }
    update() {
        this.draw();
        // Увеличение длины угла радиуса на его длину.
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.ttl--;
    }
}
let particles;
function init() {
    particles = [];
    const arcRadius = 5;
    const arcValue = 30;
    const radian = (Math.PI * 2) / arcValue;
    for (let i = 0; i < arcValue; i++) {
        const x = center.x; // + (Math.cos(radian * i) * arcMultiRadius);
        const y = center.y; // + (Math.sin(radian * i) * arcMultiRadius);
        particles.push(new Particle(x, y, arcRadius, {
            x: Math.cos(radian * i),
            y: Math.sin(radian * i),
        }, 'blue'));
    }
}
let hue = 0;
let hueRadians = 0;
function generateRing() {
    const arcValue = 30;
    const arcRadius = 5;
    const radian = (Math.PI * 2) / arcValue;
    setTimeout(generateRing, 100);
    hue = Math.sin(hueRadians);
    for (let i = 0; i < arcValue; i++) {
        const x = mouse.x; // + (Math.cos(radian * i) * arcMultiRadius);
        const y = mouse.y; // + (Math.sin(radian * i) * arcMultiRadius);
        particles.push(new Particle(x, y, arcRadius, {
            x: Math.cos(radian * i),
            y: Math.sin(radian * i),
        }, `hsl(${Math.abs(hue * 360)}, 50%, 50%)`));
    }
    hueRadians += 0.01;
}
function animate() {
    canvas.fillStyle = 'rgba(0, 0, 0, 0.5)';
    canvas.fillRect(0, 0, htmlCanvas.width, htmlCanvas.height);
    particles.forEach((particle, i) => {
        if (particle.ttl < 0) {
            particles.splice(i, 1);
        }
        else {
            particle.update();
        }
    });
    requestAnimationFrame(animate);
}
init();
animate();
generateRing();

