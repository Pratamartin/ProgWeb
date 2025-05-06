document.addEventListener('DOMContentLoaded', function () {
    const drawBtn = document.getElementById('draw-btn');
    const widthInput = document.getElementById('width');
    const chartContainer = document.getElementById('chart-container');
    const barsInputsContainer = document.getElementById('bars-inputs');
  
    function addBarInput(value = '') {
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'bar-height-input';
      input.placeholder = 'Altura da barra';
      input.value = value;
      barsInputsContainer.appendChild(input);
    }
  
    for (let i = 0; i < 5; i++) {
      addBarInput([100, 150, 120, 80, 40][i]);
    }
  
    drawBtn.addEventListener('click', drawChart);
  
    function drawChart() {
      const barWidth = parseInt(widthInput.value) || 30;
      const inputs = document.querySelectorAll('.bar-height-input');
  
      const heights = Array.from(inputs)
        .map(input => parseInt(input.value))
        .filter(num => !isNaN(num) && num > 0);
  
      if (heights.length === 0) {
        alert("Por favor, insira alturas válidas para as barras.");
        return;
      }
  
      chartContainer.innerHTML = '';
  
      const maxHeight = Math.max(...heights);
      const containerHeight = chartContainer.clientHeight;
  
      heights.forEach(height => {
        const barHeight = (height / maxHeight) * (containerHeight - 40);
  
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.width = `${barWidth}px`;
        bar.style.height = `${barHeight}px`;
  
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = height;
  
        bar.appendChild(label);
        chartContainer.appendChild(bar);
      });
    }
  
    drawChart();
  });
  