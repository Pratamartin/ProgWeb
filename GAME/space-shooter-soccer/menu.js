export function loadTeamSelection(setup) {
    const teams = [
      'team1.png', 'team2.png', 'team3.png', 'team4.png',
      'team5.png', 'team6.png', 'team7.png', 'team8.png'
    ];
  
    const teamContainer = document.getElementById('team-selection');
    teamContainer.innerHTML = "";
  
    teams.forEach(team => {
      const img = document.createElement('img');
      img.src = `assets/teams/${team}`;
      img.alt = team;
      img.addEventListener('click', () => {
        setup.selectedPlayer = team;
        document.querySelectorAll('#team-selection img').forEach(i => i.classList.remove('selected'));
        img.classList.add('selected');
        loadEnemySelection(setup, teams.filter(t => t !== team));
      });
      teamContainer.appendChild(img);
    });
  }
  
  function loadEnemySelection(setup, enemyTeams) {
    const label = document.getElementById('enemy-label');
    const enemyContainer = document.getElementById('enemy-selection');
    enemyContainer.innerHTML = '';
    label.style.display = 'block';
    enemyContainer.style.display = 'flex';
  
    enemyTeams.forEach(team => {
      const img = document.createElement('img');
      img.src = `assets/teams/${team}`;
      img.alt = team;
      img.addEventListener('click', () => {
        setup.selectedEnemy = team;
        document.querySelectorAll('#enemy-selection img').forEach(i => i.classList.remove('selected'));
        img.classList.add('selected');
        document.getElementById('start-button').style.display = 'block';
      });
      enemyContainer.appendChild(img);
    });
  }
  