document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('trail-container');
    const dots = [];
    const dotCount = 8;
    const dotSpacing = 20; 
    

    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.opacity = 1 - (i * 0.1); 
        dot.style.width = `${16 - (i * 1)}px`;
        dot.style.height = `${16 - (i * 1)}px`;
        container.appendChild(dot);
        dots.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    

    function animateTrail() {
        let posX = mouseX;
        let posY = mouseY;
        

        dots.forEach((dot, index) => {
            const prevX = parseFloat(dot.dataset.x) || posX;
            const prevY = parseFloat(dot.dataset.y) || posY;
            
            dot.dataset.x = posX;
            dot.dataset.y = posY;
            
            
            dot.style.transform = `translate(${posX}px, ${posY}px)`;

            const angle = Math.atan2(posY - prevY, posX - prevX);
            posX -= Math.cos(angle) * dotSpacing;
            posY -= Math.sin(angle) * dotSpacing;
        });
        
        requestAnimationFrame(animateTrail);
    }
    

    animateTrail();
});