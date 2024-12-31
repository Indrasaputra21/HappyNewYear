const countdownElement = document.getElementById('countdown');
const fireworksCanvas = document.getElementById('fireworks');
const messageElement = document.querySelector('.message');
const audio = document.getElementById('fireworkSound');

let countdownTime = 5.00; // Waktu dalam format detik dengan 2 digit desimal

function startCountdown() {
    const interval = setInterval(() => {
        if (countdownTime > 0) {
            countdownElement.textContent = countdownTime.toFixed(2); // Menampilkan waktu dengan 2 digit desimal
            countdownTime -= 0.01; // Mengurangi waktu setiap 0.01 detik
        } else {
            clearInterval(interval);
            countdownElement.classList.add('fade-out'); // Tambahkan kelas untuk animasi fade-out
            setTimeout(() => {
                countdownElement.style.display = 'none'; // Sembunyikan countdown setelah animasi selesai
                fireworksCanvas.style.display = 'block'; // Tampilkan canvas kembang api
                messageElement.style.display = 'block'; // Tampilkan pesan
                audio.play(); // Mainkan suara
                animate(); // Mulai animasi kembang api
            }, 2000); // Tunggu 2 detik sebelum melanjutkan
        }
    }, 10); // Update setiap 10ms untuk efek waktu 00.xx
}

startCountdown();

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];

        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                alpha: 1
            });
        }
    }

    update() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.01;
        });

        this.particles = this.particles.filter(p => p.alpha > 0);
    }

    draw() {
        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${p.alpha})`;
            ctx.fill();
        });
    }
}

const fireworks = [];

function randomColor() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

function spawnFirework() {
    for (let i = 0; i < 5; i++) {
        fireworks.push(new Firework(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            randomColor()
        ));
    }
}

setInterval(spawnFirework, 400);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach(firework => {
        firework.update();
        firework.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.body.addEventListener('click', () => {
    audio.play();
});
