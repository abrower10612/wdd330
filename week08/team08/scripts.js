const apiURL = "https://pokeapi.co/api/v2/pokemon/";

fetch(apiURL)
  .then((response) => response.json())
  .then((pokemonInfo) => {

    let pokemonList = pokemonInfo.results;

    console.log(pokemonInfo)

    for (let i = 0; i < pokemonList.length; i++) {
      let pokemon = document.createElement('li');
      pokemon.textContent = pokemonList[i].name;
      document.getElementById("pokemon").appendChild(pokemon);
    };
  })

  function nextPage() {
    const nextPage = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";

    fetch(nextPage)
    .then((response) => response.json())
    .then((pokemonInfo) => {
  
      let pokemonList = pokemonInfo.results;
  
      console.log(pokemonInfo)
  
      for (let i = 0; i < pokemonList.length; i++) {
        let pokemon = document.createElement('li');
        pokemon.textContent = pokemonList[i].name;
        document.getElementById("pokemon").appendChild(pokemon);
      };
    })
  }


  function prevPage() {
    const nextPage = "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20";

    fetch(nextPage)
    .then((response) => response.json())
    .then((pokemonInfo) => {
  
      let pokemonList = pokemonInfo.results;
  
      console.log(pokemonInfo)
  
      for (let i = 0; i < pokemonList.length; i++) {
        let pokemon = document.createElement('li');
        pokemon.textContent = pokemonList[i].name;
        document.getElementById("pokemon").appendChild(pokemon);
      };
    })
  }
