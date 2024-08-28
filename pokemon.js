const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemon_name.toLowerCase()}`;


async function fetchPokemonData() {
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemon_name.toLowerCase()}`;
    try {
        const response = await fetch(apiURL)
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.log("Error", error)
    }
}

async function displayCharacters() {
        pokemonData.innerHTML = `
        <h4>${pokemon.name}</h4>
        <img scr="${pokemon.sprites.front_default}" alt="${pokemon.name}"
        <p>Abilities: ${pokemon.abilities}</p>
        <p>Types: ${pokemon.type}</p>
        <p>Stats: ${pokemon.stats}</p>;
        `
    };


searchForm.addEventListener("submit", function {
    const pokemonInput = document.getElementById("pokemon-name")
    .ariaValueMax.toLowerCase();
    fetchPokemonData("pokemon-name")
}

) 