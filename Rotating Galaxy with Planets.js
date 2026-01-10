const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Sun
const sun = { x: centerX, y: centerY, radius: 30, color: 'yellow' };

// Planets
const planets = [
    { name: "Mercury", radius: 5, distance: 60, angle: 0, speed: 0.03, color: "#aaa" },
    { name: "Venus", radius: 8, distance: 90, angle: 0, speed: 0.02, color: "#f5d" },
    { name: "Earth", radius: 10, distance: 130, angle: 0, speed: 0.015, color: "#0af" },
    { name: "Mars", radius: 7, distance: 170, angle: 0, speed: 0.012, color: "#f50" },
    { name: "Jupiter", radius: 20, distance: 220, angle: 0, speed: 0.008, color: "#f5a" }
];

function drawSun() {
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    ctx.fillStyle = sun.color;
    ctx.fill();
}

function drawPlanet(planet) {
    const x = sun.x + planet.distance * Math.cos(planet.angle);
    const y = sun.y + planet.distance * Math.sin(planet.angle);

    ctx.beginPath();
    ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.fill();
    
    planet.x = x;
    planet.y = y;
}

function drawOrbit(planet) {
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, planet.distance, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawSun();
    
    planets.forEach(p => {
        drawOrbit(p);
        drawPlanet(p);
        p.angle += p.speed;
    });

    requestAnimationFrame(animate);
}

animate();

// Optional: Show planet name on hover
canvas.addEventListener("mousemove", e => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSun();

    planets.forEach(p => {
        drawOrbit(p);
        drawPlanet(p);

        if (Math.hypot(mouseX - p.x, mouseY - p.y) < p.radius + 5) {
            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.fillText(p.name, p.x + 15, p.y - 15);
        }

        p.angle += p.speed;
    });
});
