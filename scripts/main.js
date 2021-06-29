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

// Get default pokemon list
getPokemonList(base_URL);

// Function to get information about a specific pokemin
function getPokemonInfo(url) {
	open_pokeball();
	fetch(url)
	.then((response) => response.json())
	.then((data) => {
	// Make sure data comes throufg
	console.log(data);
	// Write data to pokemon information container
	document.querySelector(".pokeball-top").innerHTML = `
															<h2 class="pokemon-name">${data.name}</h2>
															<div class="pokemon-image"><img src="${data.sprites.front_default} "></div>
														`;

	let pokeball_bottom = document.querySelector(".pokeball-bottom");

	let abilities_list = document.createElement("ul");
	let moves_list = document.createElement("ul");

	for (let index in data.abilities) {
		abilities_list.innerHTML += `
										<li>${data.abilities[index].ability.name}</li>
									`;
	}

	// for (let index in data.moves) {
	// 	console.log(index);
	// }
	// console.log(abilities_list);
	// pokeball.innerHTML = `${abilities_list}`;
	// pokeball.innerHTML += `${moves_list}`;

	document.querySelector(".pokeball-bottom").innerHTML = `
		${abilities_list}
	`;

	});
}

let pokeball = document.querySelector(".pokeball");

pokeball.addEventListener("click", toggleClass);

function toggleClass() {
pokeball.classList.toggle("active");
}

function open_pokeball() {
pokeball.classList.add("active");
}
