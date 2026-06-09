/**
 * ChameleonTheme.js v1.0.0
 * Extractor de color dominante de imágenes para adaptabilidad de interfaz.
 * Cero dependencias externas.
 */
(function (window, document) {
    'use strict';

    const ChameleonTheme = {
        init: function () {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.watchImages();
        },

        watchImages: function () {
            // Busca imágenes marcadas con la clase .chameleon-target
            const targets = document.querySelectorAll('.chameleon-target');
            targets.forEach(img => {
                if (img.complete) {
                    this.extractColor(img);
                } else {
                    img.addEventListener('load', () => this.extractColor(img));
                }
            });
        },

        extractColor: function (img) {
            // Reducir tamaño en el canvas para optimizar velocidad del procesador
            this.canvas.width = 10;
            this.canvas.height = 10;
            
            try {
                this.ctx.drawImage(img, 0, 0, 10, 10);
                const data = this.ctx.getImageData(0, 0, 10, 10).data;

                let r = 0, g = 0, b = 0;
                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i+1];
                    b += data[i+2];
                }

                const pixels = data.length / 4;
                r = Math.floor(r / pixels);
                g = Math.floor(g / pixels);
                b = Math.floor(b / pixels);

                // Inyecta las variables directamente al estilo del documento
                document.documentElement.style.setProperty('--chameleon-primary', `rgb(${r}, ${g}, ${b})`);
                document.documentElement.style.setProperty('--chameleon-light', `rgba(${r}, ${g}, ${b}, 0.2)`);
                console.log(`🎨 [ChameleonTheme] Interfaz adaptada al color dominante: rgb(${r},${g},${b})`);
            } catch (e) {
                console.error("❌ [ChameleonTheme] Error de CORS o lectura de imagen.");
            }
        }
    };

    window.ChameleonTheme = ChameleonTheme;
    document.addEventListener('DOMContentLoaded', () => ChameleonTheme.init());

})(window, document);
