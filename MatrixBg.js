(function() {
    console.log("🟢 [Matrix Protocol v1.2.0] Inicializando entorno dinámico adaptable...");

    // 1. Inyección de diseño Hacker de alta fidelidad en los componentes web
    let styleContainer = document.getElementById("matrix-theme-styles");
    if (!styleContainer) {
        styleContainer = document.createElement("style");
        styleContainer.id = "matrix-theme-styles";
        document.head.appendChild(styleContainer);
    }
    styleContainer.textContent = `
        body {
            background-color: #000000 !important;
            background-image: none !important;
            color: #00ff00 !important;
            transition: background-color 0.5s ease !important;
        }
        .form-container {
            background: rgba(5, 12, 5, 0.88) !important;
            border: 1px solid #00ff00 !important;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.5) !important;
            backdrop-filter: blur(4px) !important;
        }
        input {
            background: #050a05 !important;
            border: 1px solid #00ff00 !important;
            color: #00ff00 !important;
            text-shadow: 0 0 3px #00ff00 !important;
        }
        button {
            background: #00ff00 !important;
            color: #000000 !important;
            font-weight: bold !important;
            box-shadow: 0 0 15px #00ff00 !important;
            border: none !important;
        }
        h1, label {
            text-shadow: 0 0 8px rgba(0, 255, 0, 0.8) !important;
        }
    `;

    // 2. Creación e inyección del lienzo gráfico
    let canvas = document.getElementById("matrix-canvas-f12");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "matrix-canvas-f12";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        canvas.style.zIndex = "-2"; 
        canvas.style.pointerEvents = "none";
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    const fontSize = 16;
    let rainDrops = [];

    // 3. 🚨 FUNCIÓN CRÍTICA DE ADAPTABILIDAD EN TIEMPO REAL
    function adjustMatrixDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Calculamos cuántas columnas entran según el ancho de la pantalla actual
        const targetColumns = Math.floor(canvas.width / fontSize);
        
        // Ajustamos dinámicamente el array sin perder el progreso de la lluvia existente
        if (rainDrops.length < targetColumns) {
            for (let i = rainDrops.length; i < targetColumns; i++) {
                rainDrops[i] = Math.random() * -20; // Aparecen escalonadas desde arriba
            }
        } else if (rainDrops.length > targetColumns) {
            rainDrops = rainDrops.slice(0, targetColumns);
        }
    }
    
    // Ejecución inicial y vinculación al evento de cambio de tamaño de pantalla
    adjustMatrixDimensions();
    window.removeEventListener("resize", adjustMatrixDimensions); // Limpia duplicados antiguos
    window.addEventListener("resize", adjustMatrixDimensions);

    // 4. Alfabeto de código Matrix original (Katakana + Números + Hex)
    const alphabet = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF".split("");

    // 5. Bucle del motor de renderizado a 30 FPS estables
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Genera la estela difuminada de caída
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ff00"; 
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            const x = i * fontSize;
            const y = rainDrops[i] * fontSize;

            ctx.fillText(text, x, y);

            // Reinicia la gota de forma aleatoria si pasa el fondo de la pantalla
            if (y > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            
            rainDrops[i]++;
        }
    }

    // Seguridad de software: Cancela ejecuciones en segundo plano si volvés a recargar el script
    if (window.matrixIntervalID) {
        clearInterval(window.matrixIntervalID);
    }

    window.matrixIntervalID = setInterval(drawMatrix, 33);
    console.log("🚀 [Matrix Protocol] Corriendo con éxito. Escalado automático activado.");
})();
