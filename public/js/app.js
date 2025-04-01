// Función para cambiar el tema
function toggleTheme() {
    const body = document.body;
    const themeButton = document.querySelector('.theme-toggle i');
    
    body.classList.toggle('dark-mode');
    
    // Guardar la preferencia en localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        themeButton.classList.remove('bi-moon-stars');
        themeButton.classList.add('bi-sun');
    } else {
        themeButton.classList.remove('bi-sun');
        themeButton.classList.add('bi-moon-stars');
    }
}

// Función para cargar el tema guardado
function loadTheme() {
    const body = document.body;
    const themeButton = document.querySelector('.theme-toggle i');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeButton.classList.remove('bi-moon-stars');
        themeButton.classList.add('bi-sun');
    }
}

// Cargar el tema cuando se inicia la página
document.addEventListener('DOMContentLoaded', loadTheme);

// Función para mostrar/ocultar el loading
function toggleLoading(show) {
    const overlay = document.querySelector('.loading-overlay');
    const calcularButton = document.getElementById('calcular');
    
    if (show) {
        overlay.style.display = 'flex';
        calcularButton.disabled = true;
    } else {
        overlay.style.display = 'none';
        calcularButton.disabled = false;
    }
}

async function calcularConsumo() {
    toggleLoading(true);
    
    let consumo = 0;

    let basico = document.getElementById("basico").value;
    let intermedio = document.getElementById("intermedio").value;
    let lecturaActual = document.getElementById("lecturaActual").value;
    let lecturaActualMedidor = document.getElementById("lecturaActualMedidor").value;

    let kWhActual = parseInt(lecturaActualMedidor) - parseInt(lecturaActual);

    if (kWhActual > 0) {
        kWhBasic = 0;
        kWhIntermedio = 0;
        consumo = 0;
        PagoTotal = 0;
        consumoKWh = 0;

        // Calculo de consumo básico
        kWhBasic = (parseFloat(basico) * 150);

        // Calculo de consumo intermedio
        if (kWhActual > 150) {
            kWhIntermedio = (parseFloat(intermedio) * (kWhActual - 150));
        }

        // Calculo de consumo total en KWh
        consumoKWh = lecturaActualMedidor - lecturaActual;

        // Calculo de consumo total
        consumo = kWhBasic + kWhIntermedio;
        iva = Number(consumo.toFixed(2)) * .16;

        PagoTotal = Number(consumo.toFixed(2)) + Number(iva.toFixed(2));

        // Simulamos un pequeño delay para mostrar el loading
        await new Promise(resolve => setTimeout(resolve, 500));

        document.getElementById("consumoKWh").value = Number(consumoKWh);
        document.getElementById("consumo").value = Number(consumo.toFixed(2));
        document.getElementById("iva").value = Number(iva.toFixed(2));
        document.getElementById("PagoTotal").value = Number(PagoTotal.toFixed(2));
    } else {
        alert("El consumo no puede ser menor a 0 kWh");
    }
    
    toggleLoading(false);
}