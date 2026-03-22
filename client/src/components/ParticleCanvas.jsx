import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let bubbles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Soft floating particles that rise upward (anti-gravity)
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = -(Math.random() * 0.8 + 0.2); // Float upward
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.25 + 0.05;
        this.hue = Math.random() * 60 + 240; // Purple-blue range
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      }
      update() {
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.3 + this.speedX;
        if (this.y < -20) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Larger glass bubbles that slowly float upward
    class Bubble {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 200;
        this.size = Math.random() * 30 + 10;
        this.speedY = -(Math.random() * 0.3 + 0.1);
        this.opacity = Math.random() * 0.04 + 0.01;
        this.wobble = Math.random() * Math.PI * 2;
      }
      update() {
        this.y += this.speedY;
        this.wobble += 0.008;
        this.x += Math.sin(this.wobble) * 0.5;
        if (this.y < -this.size * 2) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(
          this.x - this.size * 0.3, this.y - this.size * 0.3, 0,
          this.x, this.y, this.size
        );
        grad.addColorStop(0, `rgba(168, 85, 247, ${this.opacity * 2})`);
        grad.addColorStop(0.7, `rgba(108, 92, 231, ${this.opacity})`);
        grad.addColorStop(1, `rgba(59, 130, 246, ${this.opacity * 0.5})`);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      bubbles = [];
      const pCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
      for (let i = 0; i < pCount; i++) {
        const p = new Particle();
        p.y = Math.random() * canvas.height; // Start scattered
        particles.push(p);
      }
      for (let i = 0; i < 8; i++) {
        const b = new Bubble();
        b.y = Math.random() * canvas.height;
        bubbles.push(b);
      }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(108, 92, 231, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      bubbles.forEach(b => { b.update(); b.draw(); });
      particles.forEach(p => { p.update(); p.draw(); });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
