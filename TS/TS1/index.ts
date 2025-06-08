function calcular(): void {
  const raioInput = document.getElementById('raio') as HTMLInputElement;
  const areaOutput = document.getElementById('area') as HTMLInputElement;
  const circOutput = document.getElementById('circunferencia') as HTMLInputElement;

  const raio = parseFloat(raioInput.value);
  if (isNaN(raio)) {
    alert("Por favor, informe um número válido para o raio.");
    return;
  }

  const area = Math.PI * raio * raio;
  const circunferencia = 2 * Math.PI * raio;

  areaOutput.value = area.toFixed(2);
  circOutput.value = circunferencia.toFixed(2);
}
