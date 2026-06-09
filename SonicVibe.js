/**
 * SonicVibe.js v1.0.0
 * Plugin de micro-interacciones sonoras sintetizadas por software en tiempo real.
 * Cero dependencias y cero archivos de audio externos.
 */
(function (window, document) {
    'use strict';

    const SonicVibe = {
        init: function () {
            this.audioCtx = null;
            this.setupTriggers();
        },

        initContext: function () {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
        },

        /**
         * Genera una onda de sonido pura basada en frecuencia, duración y tipo.
         */
        playTone: function (frequency, type, duration) {
            this.initContext();
            if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.type = type; // 'sine', 'square', 'sawtooth', 'triangle'
            osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

            // Evitar clics de audio configurando rampas de volumen suaves
            gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start();
            osc.stop(this.audioCtx.currentTime + duration);
        },

        setupTriggers: function () {
            // Escuchar clics globales en botones o inputs interactivos
            document.addEventListener('click', (e) => {
                const el = e.target;
                if (el.tagName === 'BUTTON' || el.closest('button') || (el.tagName === 'INPUT' && el.type === 'submit')) {
                    this.playTone(440, 'sine', 0.1); // Sonido suave de tap
                }
            });

            // Escuchar envíos de formularios para alertar éxito o fracaso
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', () => {
                    this.playTone(587.33, 'triangle', 0.15); // Nota Re
                    setTimeout(() => this.playTone(880, 'triangle', 0.2), 100); // Nota La (Acorde de éxito)
                });
            });
        }
    };

    window.SonicVibe = SonicVibe;
    document.addEventListener('DOMContentLoaded', () => SonicVibe.init());

})(window, document);
