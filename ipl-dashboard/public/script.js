let chart;

async function loadData() {
  const response = await fetch('../data/orangeCapData.json');
  const data = await response.json();
  return data;
}

function createChart(players, season) {
  const ctx = document.getElementById('orangeCapChart').getContext('2d');

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: players.map(p => p.name),
      datasets: [{
        label: `Top 10 Run Scorers - ${season}`,
        data: players.map(p => p.runs),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const index = context.dataIndex;
              const player = players[index];
              return `${player.name} (${player.team}) - ${player.runs} runs`;
            }
          }
        }
      }
    }
  });
}

function populateDropdown(seasons) {
  const select = document.getElementById('seasonSelect');
  for (const season of seasons) {
    const option = document.createElement('option');
    option.value = season;
    option.textContent = season;
    select.appendChild(option);
  }
}

async function init() {
  const data = await loadData();
  const seasons = Object.keys(data).sort().reverse();

  populateDropdown(seasons);
  createChart(data[seasons[0]], seasons[0]);

  document.getElementById('seasonSelect').addEventListener('change', (e) => {
    const selectedSeason = e.target.value;
    createChart(data[selectedSeason], selectedSeason);
  });
}

init();

// public/script.js or frontend logic
fetch('/orangeCapStats.json')
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('season-select');
    const seasons = Object.keys(data); // assuming { "2023": [...], "2022": [...] }

    seasons.forEach(season => {
      const option = document.createElement('option');
      option.value = season;
      option.textContent = season;
      select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
      renderChart(data[e.target.value]); // visualize on chart
    });
  });
