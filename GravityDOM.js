/**
 * GravityDOM.js v1.0.2
 * Plugin experimental que aplica físicas de gravedad y rebote a elementos HTML.
 * Cero dependencias externas. Motor matemático nativo. Corriendo siempre sin restricciones.
 * Parcheado contra la selección y arrastre nativo de texto del navegador.
 */
(function (window, document) {
    'use strict';

    const GravityDOM = {
        init: function (config = {}) {
            this.settings = {
                gravity: config.gravity ?? 0.6,      // Fuerza de gravedad hacia abajo
                bounce: config.bounce ?? 0.7,        // Coeficiente de restitución (0 = no rebota, 1 = rebote perfecto)
                friction: config.friction ?? 0.98,   // Fricción del aire
            };

            this.items = [];
            this.activeDragItem = null;
            this.mouse = { x: 0, y: 0, lastX: 0, lastY: 0, vx: 0, vy: 0 };

            this.scanItems();
            this.setupEvents();
            this.loop();
        },

        scanItems: function () {
            const elements = document.querySelectorAll('.gravity-item');
            elements.forEach((el, index) => {
                // Forzar posición absoluta y deshabilitar selección
                el.style.position = 'fixed';
                el.style.cursor = 'grab';
                el.style.userSelect = 'none';
                el.style.webkitUserSelect = 'none';
                el.style.mozUserSelect = 'none';
                el.style.msUserSelect = 'none';

                // 🚨 PARCHE CRÍTICO: Evita que el navegador intente arrastrar el texto de forma nativa
                el.addEventListener('dragstart', (e) => e.preventDefault());

                const rect = el.getBoundingClientRect();

                this.items.push({
                    el: el,
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    isDragging: false
                });

                // Eventos de interacción física
                el.addEventListener('mousedown', (e) => this.startDrag(index, e));
                el.addEventListener('touchstart', (e) => this.startDrag(index, e.touches[0]), { passive: true });
            });
        },

        setupEvents: function () {
            window.addEventListener('mousemove', (e) => this.handleMove(e));
            window.addEventListener('touchmove', (e) => this.handleMove(e.touches[0]), { passive: true });

            window.addEventListener('mouseup', () => this.stopDrag());
            window.addEventListener('touchend', () => this.stopDrag());

            window.addEventListener('resize', () => {
                this.items.forEach(item => {
                    const rect = item.el.getBoundingClientRect();
                    item.width = rect.width;
                    item.height = rect.height;
                });
            });
        },

        startDrag: function (index, e) {
            // Cancelar selección si el mouse se desliza rápido fuera del elemento
            e.preventDefault?.(); 

            this.activeDragItem = this.items[index];
            this.activeDragItem.isDragging = true;
            this.activeDragItem.el.style.cursor = 'grabbing';
            this.activeDragItem.vx = 0;
            this.activeDragItem.vy = 0;

            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.lastX = e.clientX;
            this.mouse.lastY = e.clientY;
        },

        handleMove: function (e) {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            this.mouse.vx = this.mouse.x - this.mouse.lastX;
            this.mouse.vy = this.mouse.y - this.mouse.lastY;

            this.mouse.lastX = this.mouse.x;
            this.mouse.lastY = this.mouse.y;

            if (this.activeDragItem) {
                this.activeDragItem.x = this.mouse.x - (this.activeDragItem.width / 2);
                this.activeDragItem.y = this.mouse.y - (this.activeDragItem.height / 2);
            }
        },

        stopDrag: function () {
            if (this.activeDragItem) {
                this.activeDragItem.isDragging = false;
                this.activeDragItem.el.style.cursor = 'grab';
                this.activeDragItem.vx = this.mouse.vx * 0.8;
                this.activeDragItem.vy = this.mouse.vy * 0.8;
                this.activeDragItem = null;
            }
        },

        loop: function () {
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;

            for (let i = 0; i < this.items.length; i++) {
                let p = this.items[i];

                if (!p.isDragging) {
                    p.vy += this.settings.gravity;
                    p.vx *= this.settings.friction;
                    p.vy *= this.settings.friction;

                    p.x += p.vx;
                    p.y += p.vy;

                    if (p.y + p.height > screenH) {
                        p.y = screenH - p.height;
                        p.vy = -p.vy * this.settings.bounce;
                        p.vx *= 0.95; 
                    }
                    if (p.y < 0) {
                        p.y = 0;
                        p.vy = -p.vy * this.settings.bounce;
                    }
                    if (p.x + p.width > screenW) {
                        p.x = screenW - p.width;
                        p.vx = -p.vx * this.settings.bounce;
                    }
                    if (p.x < 0) {
                        p.x = 0;
                        p.vx = -p.vx * this.settings.bounce;
                    }
                }

                p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px)`;
            }

            requestAnimationFrame(() => this.loop());
        }
    };

    window.GravityDOM = GravityDOM;
    document.addEventListener('DOMContentLoaded', () => GravityDOM.init());

})(window, document);
