// Tabla
const tableBody = document.querySelector('#digimon-table tbody');

fetch('https://digimon-api.vercel.app/api/digimon')
  .then(response => response.json())
  .then(data => {
    data.forEach(digimon => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = digimon.name;
      row.appendChild(nameCell);

      const imageCell = document.createElement('td');
      const image = document.createElement('img');
      image.src = digimon.img;
      image.alt = digimon.name;
      imageCell.appendChild(image);
      row.appendChild(imageCell);

      const levelCell = document.createElement('td');
      levelCell.textContent = digimon.level;
      row.appendChild(levelCell);

      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error(error));

 // Buscador 
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('.btn-outline-warning');
const searchResults = document.querySelector('#search-results');
const card = document.querySelector('.card');
const table = document.querySelector('#digimon-table');

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value.trim();
  const apiUrl = `https://digimon-api.vercel.app/api/digimon/name/${searchTerm}`;

  if (!searchTerm) {
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">Sin resultados :( .. sigue buscando!</h5>
      </div>
    `;
    card.classList.remove('d-none');
    table.classList.add('table-hidden');
  } else {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length === 0) {
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">No results found</h5>
        </div>
      `;
      card.classList.remove('d-none');
      table.classList.add('table-hidden');
    } else {
      const digimon = data[0];
      card.innerHTML = `
        <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}">
        <div class="card-body">
          <h5 class="card-title" style="font-weight: bold">${digimon.name}</h5>
          <p class="card-text" style="font-weight: bold">Nivel: ${digimon.level}</p>
        </div>
      `;
      card.classList.remove('d-none');
      table.classList.add('table-hidden');
    }
  }

  searchResults.innerHTML = '';
  searchResults.appendChild(card);
});

window.addEventListener('DOMContentLoaded', () => {
  card.classList.add('d-none');
});





  