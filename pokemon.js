document.getElementById('pokemon-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const pokemonName = document.getElementById('pokemon-input').value.trim().toLowerCase();
    const pokemonInfo = document.getElementById('pokemon-info');
    pokemonInfo.innerHTML = '';
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok){
            throw new Error('Pokemon not found');
        }

        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        pokemonInfo.innerHTML = `Error ${error.message}`
    }
});

function displayPokemon(pokemon) {
        const pokemonInfo = document.getElementById('pokemon-info')
        pokemonInfo.innerHTML = `
        <div class="card">
            <h2 class="card-title">${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p class="card-text">Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                <p class="card-text">Types: ${pokemon.types.map(type => type.type.name).join(',')}</p>
        </div>
        `;
    } 