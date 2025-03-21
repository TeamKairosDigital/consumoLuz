

function calcularConsumo() {
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

        // Calculo de consumo básico
        kWhBasic = (parseFloat(basico) * 150);

        // Calculo de consumo intermedio
        if (kWhActual > 150) {
            kWhIntermedio = (parseFloat(intermedio) * (kWhActual - 150));
        }

        // Calculo de consumo total
        consumo = kWhBasic + kWhIntermedio;
        iva = Number(consumo.toFixed(2)) * .16;

        PagoTotal = Number(consumo.toFixed(2)) + Number(iva.toFixed(2));

        document.getElementById("consumo").value = Number(consumo.toFixed(2));
        document.getElementById("iva").value = Number(iva.toFixed(2));
        document.getElementById("PagoTotal").value = Number(PagoTotal.toFixed(2));


    }else{
        alert("El consumo no puede ser menor a 0 kWh");
        return;
    }
}