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

	let abilities_list = document.querySelector(".abilities-list");
	let moves_list = document.querySelector(".moves-list");
	
	let abilities_heading = document.querySelector(".abilities-heading");
	let moves_heading = document.querySelector(".moves-heading");

	abilities_list.style.display = "flex";
	moves_list.style.display = "flex";

	abilities_list.innerHTML = "";
	moves_list.innerHTML = "";

	abilities_heading.textContent = "Abilities";
	for (let index in data.abilities) {
		abilities_list.innerHTML += `
								<li>${data.abilities[index].ability.name}</li>
							`;
						};
						
						moves_heading.textContent = "Moves";
						
	for (let index in data.moves) {
		moves_list.innerHTML += `
								<li>${data.moves[index].move.name}</li>
							`;
		if (index == 4) return;
	}
	// console.log(abilities_list);
	// pokeball.innerHTML = `${abilities_list}`;
	// pokeball.innerHTML += `${moves_list}`;

	});
}

function open_pokeball() {
	document.querySelector(".pokeball").classList.add("active");
}
