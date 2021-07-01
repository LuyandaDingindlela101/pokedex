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
	let abilities_list = document.querySelector(".abilities-list");
	let moves_list = document.querySelector(".moves-list");
	
	let abilities_heading = document.querySelector(".abilities-heading");
	let moves_heading = document.querySelector(".moves-heading");
	
	openPokeball();
	fetch(url)
	.then((response) => response.json())
	.then((data) => {
		// Make sure data comes throufg
		console.log(data);

		abilities_list.style.display = "flex";
		moves_list.style.display = "flex";

		abilities_list.innerHTML = "";
		moves_list.innerHTML = "";

		abilities_heading.textContent = "Abilities";


		for (let ability_item of data.abilities) {
			// console.log(ability_item);
			fetch(ability_item.ability.url)
			.then((response) => response.json())
			.then((abilities_data) => {

				// Write data to pokemon information container
				document.querySelector(".pokeball-top").innerHTML = 
				`
					<h2 class="pokemon-name">${data.name}</h2>
					<div class="pokemon-image"><img src="${data.sprites.front_default} "></div>
				`;

				for (let effect_item of abilities_data.effect_entries) {
					if (effect_item.language.name == "en") {
						console.log(effect_item);
						abilities_list.innerHTML += 
						`
							<li>
								<div class="abilities-description">
									<h4>${ability_item.ability.name}</h4>
									<p>${effect_item.effect}</p>
								</div>
							</li>
						`;
					}
				}

			});
		}
		
		moves_heading.textContent = "Moves";

		let index = 0;
		for (let move_item of data.moves) {
			// console.log(move_item.move);
			fetch(move_item.move.url)
			.then((response) => response.json())
			.then((moves_data) => {
				console.log(moves_data.flavor_text_entries);

				// for (let flavour_item of moves_data.flavor_text_entries) {
				// 	console.log(flavour_item);
					moves_list.innerHTML += 
					`
						<li>${data.moves[index].move.name}</li>
					`;
					if (flavour_item.version_group.name == "diamond-pearl") {
						moves_list.innerHTML += 
						`
							<li>${data.moves[index].move.name}</li>
						`;
			
					}
				// }
				// for (let i = 0; i < 2; i++) {
				// 	console.log(moves_data.flavor_text_entries[i].flavor_text);
				// }

				// Write data to pokemon information container
				// document.querySelector(".pokeball-top").innerHTML = 
				// `
				// 	<h2 class="pokemon-name">${data.name}</h2>
				// 	<div class="pokemon-image"><img src="${data.sprites.front_default} "></div>
				// `;

				// for (let effect_item of moves_data_data.effect_entries) {
				// 	if (effect_item.language.name == "en") {
				// 		console.log(effect_item);
				// 		moves_data_list.innerHTML += 
				// 		`
				// 			<li>
				// 				<div class="moves_data-description">
				// 					<h4>${move_item.ability.name}</h4>
				// 					<p>${effect_item.effect}</p>
				// 				</div>
				// 			</li>
				// 		`;
				// 	}
				// }
			});

			index++;
			
			if (index == 1) return;
		}
				
				
		for (let index in data.moves) {
			moves_list.innerHTML += 
			`
				<li>${data.moves[index].move.name}</li>
			`;

			if (index == 1) return;
		}
	});
}

function openPokeball() {
	document.querySelector(".pokeball").classList.add("active");
}
