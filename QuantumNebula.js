/**
 * QuantumNebula.js v1.0.0
 * Fondo interactivo de partículas espaciales mediante Canvas 2D.
 * Optimizado para alto rendimiento y cero dependencias.
 */
(function (window, document) {
    'use strict';

    const QuantumNebula = {
        init: function () {

            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.mouse = { x: null, y: null, radius: 100 };

            this.setupStyles();
            this.setupEvents();
            this.resize();
            this.createParticles();
            this.animate();
        },

        setupStyles: function () {
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100vw';
            this.canvas.style.height = '100vh';
            this.canvas.style.zIndex = '-1';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.background = '#0a0a16';
            document.body.appendChild(this.canvas);
        },

        setupEvents: function () {
            window.addEventListener('resize', () => this.resize());
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
            window.addEventListener('mouseout', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        },

        resize: function () {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        },

        createParticles: function () {
            const count = Math.min(window.innerWidth / 15, 100);
            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 2 + 1,
                    baseX: Math.random() * this.canvas.width,
                    baseY: Math.random() * this.canvas.height,
                    density: (Math.random() * 30) + 1,
                    color: `rgba(138, 43, 226, ${Math.random() * 0.6 + 0.2})`
                });
            }
        },

        animate: function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            for (let i = 0; i < this.particles.length; i++) {
                let p = this.particles[i];
                
                // Interacción matemática con el mouse
                if (this.mouse.x != null && this.mouse.y != null) {
                    let dx = this.mouse.x - p.x;
                    let dy = this.mouse.y - p.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.mouse.radius) {
                        let force = (this.mouse.radius - distance) / this.mouse.radius;
                        let directionX = dx / distance;
                        let directionY = dy / distance;
                        p.x -= directionX * force * p.density * 0.6;
                        p.y -= directionY * force * p.density * 0.6;
                    } else {
                        if (p.x !== p.baseX) p.x -= (p.x - p.baseX) * 0.05;
                        if (p.y !== p.baseY) p.y -= (p.y - p.baseY) * 0.05;
                    }
                } else {
                    if (p.x !== p.baseX) p.x -= (p.x - p.baseX) * 0.05;
                    if (p.y !== p.baseY) p.y -= (p.y - p.baseY) * 0.05;
                }

                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.fill();
            }
            
            requestAnimationFrame(() => this.animate());
        }
    };

    window.QuantumNebula = QuantumNebula;
    document.addEventListener('DOMContentLoaded', () => QuantumNebula.init());

})(window, document);
