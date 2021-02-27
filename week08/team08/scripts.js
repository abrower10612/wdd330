
function getJSON(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getPokemon(url) {
  return getJSON(url);
}

function renderPokemonList(Pokemon, pokemonListElement) {

  const list = pokemonListElement.children[1];
  list.innerHTML = "";

  Pokemon.forEach(function (Pokemon) {

    let listItem = document.createElement("tr");
    listItem.innerHTML = `
        <td><a href="${Pokemon.url}">${Pokemon.name}</a></td>
        `;

    listItem.addEventListener("click", function (event) {

      event.preventDefault();
      getPokemonDetails(Pokemon.url);
    });

    list.appendChild(listItem);
  });
}

function renderPokemonDetails(pokemonData) {
  const detailsbox = document.getElementById("detailsbox");
}

function showPokemon(url = "https://pokeapi.co/api/v2/pokemon") {
  getPokemon(url).then(function (data) {
    const results = data.results;

    const pokemonListElement = document.getElementById("pokemonList");
    renderPokemonList(results, pokemonListElement);

    if (data.next) {
      const next = document.getElementById("next");

      next.onclick = () => {

        showPokemon(data.next);

      };
    }
    if (data.previous) {
      const prev = document.getElementById("prev");

      prev.onclick = () => {
        showPokemon(data.previous);
      };
    }
  });
}

function getPokemonDetails(url) {

  getPokemon(url).then(function (data) {
    renderPokemonDetails(data);
  });
}

showPokemon();