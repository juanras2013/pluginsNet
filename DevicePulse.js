/**
 * DevicePulse.js v1.0.0
 * Plugin independiente de optimización inteligente para dispositivos de gama baja.
 * Cero dependencias. Inyección nativa y silenciosa.
 */
(function (window, document) {
    'use strict';

    // Configuración interna de los límites de hardware
    const CONFIG = {
        LOW_RAM: 4,          // Menos o igual a 4GB de RAM es gama baja/media-baja
        LOW_CORES: 4,        // Menos o igual a 4 hilos de CPU
        SLOW_NETWORKS: ['slow-2g', '2g', '3g'] // Conexiones móviles deficientes
    };

    const DevicePulse = {
        /**
         * Analiza los componentes de hardware y conectividad del cliente.
         */
        analyze: function () {
            const nav = window.navigator;
            const conn = nav.connection || nav.mozConnection || nav.webkitConnection || { effectiveType: '4g', saveData: false };
            
            const metrics = {
                ram: nav.deviceMemory || 8, // Simula 8GB si el navegador bloquea el dato por privacidad
                cores: nav.hardwareConcurrency || 8,
                netType: conn.effectiveType,
                saveDataActive: conn.saveData || false,
                isLowEnd: false,
                triggers: []
            };

            // Reglas de diagnóstico
            if (metrics.ram <= CONFIG.LOW_RAM) {
                metrics.isLowEnd = true;
                metrics.triggers.push(`RAM insuficiente (${metrics.ram}GB)`);
            }
            if (metrics.cores <= CONFIG.LOW_CORES) {
                metrics.isLowEnd = true;
                metrics.triggers.push(`CPU limitada (${metrics.cores} núcleos)`);
            }
            if (CONFIG.SLOW_NETWORKS.includes(metrics.netType) || metrics.saveDataActive) {
                metrics.isLowEnd = true;
                metrics.triggers.push(`Red lenta o Ahorro de datos (${metrics.netType})`);
            }

            return metrics;
        },

        /**
         * Aplica los parches de rendimiento de software si el dispositivo lo requiere.
         */
        pulse: function () {
            const status = this.analyze();

            if (!status.isLowEnd) {
                console.log("🚀 [DevicePulse] Dispositivo óptimo. Modo de alta fidelidad activo.");
                return;
            }

            console.warn("⚡ [DevicePulse] Gama baja detectada. Ejecutando optimización extrema...", status.triggers);

            // 1. Desactivar el pesado motor de renderizado gráfico de CSS (Animaciones, filtros y sombras)
            const style = document.createElement('style');
            style.id = 'devicepulse-core-rules';
            style.textContent = `
                /* Congelar animaciones y transiciones complejas que saturan la GPU */
                *, *::before, *::after {
                    animation-delay: 0s !important;
                    animation-duration: 0s !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0s !important;
                    scroll-behavior: auto !important;
                }
                /* Eliminar efectos de desenfoque de fondo (backdrop-filter) y sombras pesadas */
                .glass, [style*="backdrop-filter"], header, card {
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                    box-shadow: none !important;
                    text-shadow: none !important;
                }
            `;
            document.head.appendChild(style);

            // 2. Interceptar el DOM para forzar la carga diferida (Lazy Loading) de imágenes pesadas
            const optimizeImages = () => {
                document.querySelectorAll('img:not([loading])').forEach(img => {
                    img.setAttribute('loading', 'lazy');
                });
            };

            // 3. Pausar videos decorativos o en segundo plano para ahorrar ciclos de CPU
            const pauseVideos = () => {
                document.querySelectorAll('video[autoplay]').forEach(video => {
                    video.removeAttribute('autoplay');
                    video.pause();
                });
            };

            // Ejecutar optimizaciones del DOM inmediatamente o al cargar
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    optimizeImages();
                    pauseVideos();
                });
            } else {
                optimizeImages();
                pauseVideos();
            }

            // 4. Inyectar clase en el nodo raíz (HTML) para control del desarrollador
            document.documentElement.classList.add('device-pulse-low-end');
        }
    };

    // Auto-ejecución inmediata al ser importado para ganar milisegundos críticos
    DevicePulse.pulse();

    // Exponer la API al entorno global por si el desarrollador quiere consultar datos
    window.DevicePulse = DevicePulse;

})(window, document);
