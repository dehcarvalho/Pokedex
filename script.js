const campoBusca = document.getElementById("campoBusca");
const botaoBuscar = document.getElementById("botaoBuscar");
const listaPokemon = document.getElementById("listaPokemon");

async function buscarPokemon() {
    const nome = campoBusca.value.toLowerCase().trim();

    if (nome === "") {
        alert("Digite o nome de um Pokémon!");
        return;
    }

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nome}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const pokemon = await resposta.json();

        listaPokemon.innerHTML = `
            <div class="card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">

                <h2>${pokemon.name}</h2>

                <p>Número: ${pokemon.id}</p>

                <p>Tipo: ${pokemon.types.map(tipo => tipo.type.name).join(", ")}</p>
            </div>
        `;

    } catch (erro) {
        listaPokemon.innerHTML = `
            <p>Pokémon não encontrado! Tente outro nome.</p>
        `;
    }
}

botaoBuscar.addEventListener("click", buscarPokemon);

campoBusca.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarPokemon();
    }
});