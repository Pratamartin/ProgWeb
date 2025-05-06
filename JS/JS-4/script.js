document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    const radiusInput = document.getElementById('radius');
    const resultDiv = document.getElementById('result');
    
    calculateBtn.addEventListener('click', calculate);
    radiusInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });
    
    function calculate() {
        const radius = parseFloat(radiusInput.value);
        
        if (isNaN(radius) || radius <= 0) {
            alert("Por favor, insira um valor numérico válido e positivo para o raio.");
            return;
        }
        
        const area = (Math.PI * Math.pow(radius, 2)).toFixed(2);
        const circumference = (2 * Math.PI * radius).toFixed(2);
        

        resultDiv.innerHTML = `
            <p><strong>Área do círculo</strong><br>${area}</p>
            <p><strong>Circunferência</strong><br>${circumference}</p>
        `;
    }
});