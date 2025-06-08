function calcular() {
    var raioInput = document.getElementById('raio');
    var areaOutput = document.getElementById('area');
    var circOutput = document.getElementById('circunferencia');
    var raio = parseFloat(raioInput.value);
    if (isNaN(raio)) {
        alert("Por favor, informe um número válido para o raio.");
        return;
    }
    var area = Math.PI * raio * raio;
    var circunferencia = 2 * Math.PI * raio;
    areaOutput.value = area.toFixed(2);
    circOutput.value = circunferencia.toFixed(2);
}
