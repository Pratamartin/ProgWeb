export function updateHUD(setup) {
    document.getElementById("score-value").textContent = setup.score;
    const livesContainer = document.getElementById("lives");
    livesContainer.innerHTML = "";
    for (let i = 0; i < setup.lives; i++) {
      const lifeImg = document.createElement("img");
      lifeImg.src = `assets/teams/${setup.selectedPlayer}`;
      lifeImg.className = "life";
      livesContainer.appendChild(lifeImg);
    }
  }
  