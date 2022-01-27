import style from './main.css';

const htmlCanvas = document.getElementById('canvas');
const canvas = htmlCanvas.getContext('2d');

htmlCanvas.width = window.innerWidth - 4;
htmlCanvas.height = window.innerHeight - 4;

addEventListener('resize', () => {
    htmlCanvas.width = window.innerWidth - 4;
    htmlCanvas.height = window.innerHeight - 4;
})

var mouse = {
    x: htmlCanvas.width / 2,
    y: htmlCanvas.height / 2,
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

    }

    draw() {
        canvas.beginPath();
        canvas.arc(htmlCanvas.width / 2, htmlCanvas.height / 2, this.radius, 0, Math.PI * 180, false);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.closePath();
    }

    update() {
        this.draw();
    }
}

function animate() {
    requestAnimationFrame(animate);
}
// animate();

