const TOTAL_POKEMONS = 151; // Adjust this number based on your actual total pokemons
const TOTAL_PAGES = 5; // Adjust this number based on your actual total pages

(async () => {
  const fs = require("fs");

  const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  let fileContent = pokemonsIds.map((id) => `/pokemons/${id}`).join("\n");
  fileContent +=
    "\n" + pages.map((page) => `/pokemons/page/${page}`).join("\n");
  const pokemonNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  ).then((res) => res.json());

  fileContent +=
    "\n" +
    pokemonNameList.results
      .map((pokemon) => `/pokemons/${pokemon.name}`)
      .join("\n");

  fs.writeFileSync("routes.txt", fileContent);

  console.log("Prerender routes file created with the following content:");
  console.log(fileContent);
})();
