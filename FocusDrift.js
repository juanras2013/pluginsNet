/**
 * FocusDrift.js v1.0.0
 * Plugin independiente para detectar inactividad y cambio de pestañas.
 * Cero dependencias.
 */
(function (window, document) {
    'use strict';

    const FocusDrift = {
        init: function (config = {}) {
            this.idleTimeout = config.idleTimeout ?? 30000; // 30 segundos por defecto
            this.timer = null;
            this.isUserActive = true;

            this.setupEvents();
            this.resetTimer();
        },

        setupEvents: function () {
            // Detectar si cambia de pestaña o minimiza el navegador
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.onUserAway("Pestaña oculta");
                } else {
                    this.onUserBack("Pestaña activa");
                }
            });

            // Detectar inactividad por falta de movimiento
            ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
                window.addEventListener(evt, () => this.resetTimer(), { passive: true });
            });
        },

        resetTimer: function () {
            clearTimeout(this.timer);
            if (!this.isUserActive) {
                this.onUserBack("Movimiento detectado");
            }
            this.isUserActive = true;
            this.timer = setTimeout(() => {
                this.isUserActive = false;
                this.onUserAway("Inactividad prolongada");
            }, this.idleTimeout);
        },

        onUserAway: function (reason) {
            console.warn(`💤 [FocusDrift] El usuario se distrajo: ${reason}`);
            document.title = "¡Volvé acá! 🚀";
            // Disparar evento global por si otros plugins quieren enterarse
            window.dispatchEvent(new CustomEvent('focusdrift:away', { detail: { reason } }));
        },

        onUserBack: function (reason) {
            console.log(`✨ [FocusDrift] El usuario regresó: ${reason}`);
            document.title = "Suite Pro - Galaxxx";
            window.dispatchEvent(new CustomEvent('focusdrift:back', { detail: { reason } }));
        }
    };

    window.FocusDrift = FocusDrift;
    document.addEventListener('DOMContentLoaded', () => FocusDrift.init());

})(window, document);
