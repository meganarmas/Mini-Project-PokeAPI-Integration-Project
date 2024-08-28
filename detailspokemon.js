document.addEventListener('DOMContentLoaded', () => {
    const pokemonInfo = document.getElementById('pokemon-info');

    const pokemonList = ['oshawott', 'gengar'];

    const fetchPokemon = async (pokemonName) =>{
        const APIurl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        try {
            const response = await fetch(APIurl);
            if (!response.ok){
                throw new Error('Pokemon not found');
            }
            const data = await response.json();
            return data;
    } catch (error) {
        console.log("Error", error);
    }
};

    const fetchSpecies = async (speciesURL) => {
        try {
            const response = await fetch(speciesURL);
            if (!response.ok){
                throw new Error('Species not found');
            }
            const data = await response.json();
            return data;
    } catch (error) {
        console.log("Error", error);
    }
    };

    const fetchEvolution = async (evolutionChainURL) => {
        try {
        const response = await fetch(evolutionChainURL);
        if (!response.ok){
            throw new Error('Pokemon not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error", error);
    }
};

    const displayList = async () =>{
        for (const name of pokemonList) {
            const pokemonData = await fetchPokemon(name);
            if (pokemonData) {
                const speciesData = await fetchSpecies(pokemonData.species.url);
                if (speciesData) {
                    const evolutionData = await fetchEvolution(speciesData.evolution_chain.url);
                    if (evolutionData) {
                        displayPokemon(pokemonData, evolutionData);
                    }
                }
            }
        }
    };

    function displayPokemon(pokemon,evolutionData){
        const evolutionChain = getEvolutionChain(evolutionData)
        pokemonInfo.innerHTML += `
        <div class="card">
            <h2 class="card-title">${pokemon.name}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p class="card-text">Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                <p class="card-text">Types: ${pokemon.types.map(type => type.type.name).join(',')}</p>
                <p>Stats:</p>
                <ul>
                ${pokemon.stats.map(stat =>`<li>${stat.stat.name}: <${stat.base_stat}</li>`).join('')}
                </ul>
                <p>Evolutions:</p>
                <ul>
                ${evolutionChain.map(poke => `<li>${poke}</li>`).join('')}
                </ul>
        </div>
        `;
    }

    function getEvolutionChain(evolutionData) {
        const chain = evolutionData.chain;
        const evolutions = [];
        function traverseEvolution(chain) {
            if (chain.species) {
                evolutions.push(chain.species.name.charAt(0).toUpperCase() + chain.species.name.slice(1));
            }
            if (chain.evolves_to.length > 0) {
                chain.evolves_to.forEach(next => traverseEvolution(next));
            }
        }
        traverseEvolution(chain);
        return evolutions;
    }

    displayList();
});;