let pokemon = {};
let base_URL = "https://pokeapi.co/api/v2/pokemon/";

// Function to fetch a list of pokemon
function getPokemonList(url) {
	fetch(url)
	// Convert data from JSON
	.then((response) => response.json())
	//Stuff to do with data
	.then((data) => {
	// Console log to make sure I am getting the data
	console.log(data);
	// Get the list of pokemon from the results
	let pokemon = data.results;
	// Get element from HTML to write buttons in
	let container = document.querySelector(".pokemon-list-container");
	// Clear the container
	container.innerHTML = "";
	// Loop over pokemon list and create an HTML button for each one. Add the button to the container
	pokemon.forEach((btn) => {
		container.innerHTML += `<li onclick="getPokemonInfo('${btn.url}')">${btn.name}</li>`;
	});

	// Add a next pokemon button
	container.innerHTML += `<br><br><button onclick="getPokemonList('${data.next}')">Next</button>`;
	});
}

// Function to get information about a specific pokemin
function getPokemonInfo(url) {
     // CALL THE openPokeball FUNCTION
	openPokeball();
	fetch(url)
	.then((response) => response.json())
	.then((data) => {
          // CREATE AND POPULATE THE pokemon OJECT WITH APPROPRIATE DATA
          let pokemon = {
               name: data.name,
               height: data.height + " m",
               weight: data.weight + " lbs",
               type: data.types[0].type.name,
               image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + data.id + ".png",
          }

          // UPDATE THE HTML WITH THE CORRECT INFO
          document.querySelector(".pokeball-image").innerHTML = `<img src="${pokemon.image_url}" alt="">`
          document.querySelector(".pokeball-details h1").textContent = `${pokemon.name}`
          document.querySelector(".stats-container").innerHTML = 
          `
               <div class="type-container">
                    <span>${pokemon.type}</span>
                    <p>Type</p>
               </div>
               <div class="weight-container">
                    <span>${pokemon.weight}</span>
                    <p>Weight</p>
               </div>
               <div class="height-container">
                    <span>${pokemon.height}</span>
                    <p>Height</p>
               </div>
          `
	});
}

// FUNCTION WILL ADD THE ACTIVE CLASS TO THE .pokeball ELEMENT
function openPokeball() {
	document.querySelector(".pokeball").classList.add("active");
}


// Get default pokemon list
getPokemonList(base_URL);

