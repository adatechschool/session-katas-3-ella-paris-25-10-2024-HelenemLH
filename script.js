// function to get pokémon data from the URL
async function fetchPokemonData(url) {
    const response = await fetch(url); 
    const data = await response.json(); 
    return data.pokemon; 
}

// function to get stats about pokémon
function displayPokemonStats(pokemons) {
    //  total number of pokémon
    console.log("How many Pokémon are in the data?");
    console.log(`Total Pokémon: ${pokemons.length}`);
    
    // show pokémon over 10 kg
    console.log("Pokémon weighing over 10 kg:");
    const heavyPokemons = pokemons.filter(pokemon => parseFloat(pokemon.weight) > 10);
    heavyPokemons.forEach(pokemon => console.log(`${pokemon.name}: ${pokemon.weight} kg`));

    // sort and display pokémon by weight
    console.log("Pokémon sorted by weight (lightest to heaviest):");
    const sortedPokemons = [...pokemons].sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
    sortedPokemons.forEach(pokemon => console.log(`${pokemon.name}: ${pokemon.weight} kg`));
}

// function to show evolutions for a specific pokémon
function displayEvolutions(pokemonName, pokemons) {
    console.log(`Possible evolutions for ${pokemonName}:`);
    const pokemon = pokemons.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());
    if (!pokemon) {
    console.log(`Pokémon ${pokemonName} not found.`);
        return;
    }

    const evolutions = pokemon.next_evolution || [];
    if (evolutions.length > 0) {
    console.log(evolutions.map(e => e.name).join(" -> "));
    } else {
    console.log(`${pokemonName} has no evolutions.`);
    }
}



// URL pokémon JSON 
const url = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';

// run
fetchPokemonData(url)
    .then(pokemons => {
        displayPokemonStats(pokemons);
        displayEvolutions('Pikachu', pokemons);
    })
    .catch(error => console.error('Error loading data:', error));
