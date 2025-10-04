function getpokemonId() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('id')
}

function loadPokemonInfo() {
    const pokemonId = getpokemonId()
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    fetch(url)
        .then((response) => response.json())
        .then((pokemonData) => {
            const pokemon = convertPokeApiDetailToPokemon(pokemonData)
            displayPokemonInfo(pokemon)
        })
        .catch(error => console.error('Error:', error));
}

function displayPokemonInfo(pokemon) {
    const pokemonInfo = document.getElementById('pokemonInfo')
    pokemonInfo.innerHTML = `
        <div class="pokemon ${pokemon.type}">
        <a href="index.html" class="backButton">←</a>
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.number}</span>

                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

            <div class="detail">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="pokemonStats">
                <h1>About</h1>
                <p>Height: ${pokemon.height / 10}m</p>
                <p>Weight: ${pokemon.weight / 10}kg</p>
                <p>Abilities: ${pokemon.abilities}</p>
            </div>
        </div>
    `
}

// só escuta caso estivermos na página de informações
if (document.getElementById('pokemonInfo')) {
    window.addEventListener('load', loadPokemonInfo)
}