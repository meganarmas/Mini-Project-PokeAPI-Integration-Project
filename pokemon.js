async function fetchPokemonData(pokemon){
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${pokemon_name.toLowerCase()}`;
    try {
        const response = await fetch(apiURL);
        if (!response.ok){
            throw new Error(`Pokemon not found: ${response.statusText}`);
        }
        const data = await response.json();
        updatePokemonDetails(data);
        catch (error) {
            console.error('Fetch error:', error);
            displayErrorMessage('Pokemon not found!');
        }
    }
}

function displayPokemon(pokemon) {
    const pokemonInfo = document.getElementById('pokemon-info');
    pokemonInfo.innerHTML = `pass `
};




addEventListener(FormSubmission)