/**
 * GhostShield.js v1.0.0
 * Plugin independiente de seguridad anti-scraping y protección de interfaz.
 * Cero dependencias.
 */
(function (window, document) {
    'use strict';

    const GhostShield = {
        init: function (config = {}) {
            this.settings = {
                blockRightClick: config.blockRightClick ?? true,
                blockSelect: config.blockSelect ?? true,
                blockShortcuts: config.blockShortcuts ?? true,
                antiDevTools: config.antiDevTools ?? true
            };

            this.activateRules();
            if (this.settings.antiDevTools) this.watchDevTools();
        },

        activateRules: function () {
            // 1. Bloquear Clic Derecho
            if (this.settings.blockRightClick) {
                document.addEventListener('contextmenu', e => e.preventDefault());
            }

            // 2. Bloquear Selección de Texto e Imágenes mediante CSS dinámico
            if (this.settings.blockSelect) {
                const style = document.createElement('style');
                style.textContent = `
                    body {
                        -webkit-user-select: none !important;
                        -moz-user-select: none !important;
                        -ms-user-select: none !important;
                        user-select: none !important;
                    }
                    img { pointer-events: none !important; }
                `;
                document.head.appendChild(style);
            }

            // 3. Bloquear Atajos Críticos (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+C, Ctrl+S)
            if (this.settings.blockShortcuts) {
                document.addEventListener('keydown', e => {
                    const meta = e.ctrlKey || e.metaKey;
                    const shift = e.shiftKey;
                    const key = e.key.toLowerCase();

                    if (
                        e.key === 'F12' ||
                        (meta && key === 'u') ||
                        (meta && shift && key === 'i') ||
                        (meta && shift && key === 'c') ||
                        (meta && key === 's') ||
                        (meta && key === 'c')
                    ) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                });
            }
        },

        watchDevTools: function () {
            // Hack de software: Evalúa un elemento con ID dinámico en bucle para detectar apertura de consola
            const devtools = /./;
            devtools.toString = function () {
                // Si entra aquí, significa que el motor del navegador intentó renderizar este objeto en consola
                document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:20%; font-family:sans-serif;'>⚠️ Entorno Protegido. Acceso Denegado.</h1>";
                throw new Error("GhostShield: Consola bloqueada.");
            };

            setInterval(() => {
                console.log(devtools);
                console.clear();
            }, 1000);
        }
    };

    // Auto-inicialización global
    window.GhostShield = GhostShield;
    document.addEventListener('DOMContentLoaded', () => GhostShield.init());

})(window, document);
