let minimo_buscar = 1;
let maximo_buscar = 20;
let estado_ATD = 0;
const pokemons_favoritos = [];
const pokemons_ATD = [];
const pokedex_container = document.querySelector("#pokedex-container");
const container_selecao = document.getElementById("selecao_script");
const irParaDex = document.getElementById("irParaDex");
const reset = document.getElementById("reset");
function limparArmazem() {
	localStorage.clear(); //debug
}
//if(localStorage.getItem(chavePok)) {
//	for(let i = 0;localStorage.length;i++) {
//		pokemons_ATD.push(localStorage.getItem(chavePok));
//	}
//}

console.log(pokemons_ATD);
function buscar() {
	const requisicoes = [];
	for(;minimo_buscar <= maximo_buscar;minimo_buscar++) {
		requisicoes.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${minimo_buscar}`)
			.then(response => response.json())
		);
	}
	return requisicoes;
}
function buscarATD() {
	for(let i = 0;i < pokemons_ATD.length;i++) {
		for(let x = 0;x < pokemons_ATD.length - 1 - i;x++) {
			if(pokemons_ATD[x] > pokemons_ATD[x+1]) {
				let temp = pokemons_ATD[x];
				pokemons_ATD[x] = pokemons_ATD[x+1];
				pokemons_ATD[x+1] = temp;
			}
		}
	}
	const requisicoes = [];
	for(let i = 0;i < pokemons_ATD.length;i++) {
		requisicoes.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons_ATD[i]}`)
			.then(response => response.json())
		);
	}
	return requisicoes;
}
function atualizar(requisicoes) {
	Promise.all(requisicoes).then(pokemon => {
		for(let x = 0;x < pokemon.length;x++) {
			const type = [];

			const pokemonAtual = pokemon[x];

			let div1 = document.createElement("div");
			div1.classList.add("pokemon-card");
			let div2 = document.createElement("div");
			div2.classList.add("id-estrela");
			let id = document.createElement("p");
			id.classList.add("pokemon-id");
			let iconButton = document.createElement("button");
			iconButton.classList.add("icon-button");
			let icon = document.createElement("img");
			icon.classList.add("icon");
			let img = document.createElement("img");
			img.classList.add("pokemon-img");
			let name = document.createElement("h2");
			name.classList.add("pokemon-name");
			for(let i = 0;i < pokemon[x].types.length;i++) {
				type[i] = document.createElement("span");
				type[i].classList.add("pokemon-type");
				type[i].classList.add(pokemon[x].types[i].type.name);
			}
			let div3 = document.createElement("div");
			div3.classList.add("types-style");
			let ATDbutton = document.createElement("button");
			ATDbutton.classList.add("ATD-button");

			id.textContent = `#${pokemon[x].id}`;
			icon.src = "images/estrela.svg";
			img.src = pokemon[x].sprites.front_default;
			img.alt = pokemon[x].name;
			name.textContent = pokemon[x].name;
			for(let i = 0;i < pokemon[x].types.length;i++) {
				type[i].textContent = pokemon[x].types[i].type.name;
			}
			ATDbutton.textContent = "+ ADD TO DEX";

			pokedex_container.appendChild(div1);
			div1.appendChild(div2);
			div2.appendChild(id);
			iconButton.appendChild(icon);
			div2.appendChild(iconButton);
			div1.appendChild(img);
			div1.appendChild(name);
			for(let i = 0;i < pokemon[x].types.length;i++) {
				div3.appendChild(type[i]);
			}
			div1.appendChild(div3);
			div1.appendChild(ATDbutton);
			let chavePok = `pokemon_${pokemon[x].id}`;
			let salvo = localStorage.getItem(chavePok);
			let estadoFavoritado = {fav:0, ATD:0};
			if(salvo) {
				estadoFavoritado = JSON.parse(salvo);
				if(estadoFavoritado.ATD == 1) {
					pokemons_ATD.push(pokemon[x].id);
				}
			}
			if(estadoFavoritado.fav == 1) {
				icon.src = "images/estrelaAtivado.svg";
			}else{
				icon.src = "images/estrela.svg";
			}
			if(estadoFavoritado.ATD == 1) {
				ATDbutton.textContent = "ADICIONADO";
			}else{
				ATDbutton.textContent = "+ ADD TO DEX";
			}
			iconButton.addEventListener("click", function() {
				if(estadoFavoritado.fav) {
					icon.src = "images/estrela.svg";
					estadoFavoritado.fav = 0;
					let indice = pokemons_favoritos.indexOf(pokemonAtual.id);
					if(indice != -1) {
						pokemons_favoritos.splice(indice, 1);
					}
				}else{
					icon.src = "images/estrelaAtivado.svg";
					estadoFavoritado.fav = 1;
					pokemons_favoritos.push(pokemonAtual.id);
				}
				localStorage.setItem(chavePok, JSON.stringify(estadoFavoritado));
				for(let i = 0;i < pokemons_favoritos.length;i++) {
					console.log(`vetorPF${i}: ${pokemons_favoritos[i]}`);
				}
			});
			ATDbutton.addEventListener("click", function() {
				if(estadoFavoritado.ATD) {
					ATDbutton.textContent = "+ ADD TO DEX";
					estadoFavoritado.ATD = 0;
					let indice = pokemons_ATD.indexOf(pokemonAtual.id);
					if(indice != -1) {
						pokemons_ATD.splice(indice, 1);
					}
				}else{
					ATDbutton.textContent = "ADICIONADO";
					estadoFavoritado.ATD = 1;
					pokemons_ATD.push(pokemonAtual.id);
				}
				localStorage.setItem(chavePok, JSON.stringify(estadoFavoritado));	
				for(let i = 0;i < pokemons_ATD.length;i++) {
					console.log(`vetorPATD${i}: ${pokemons_ATD[i]}`);
				}
			});
		}
	});
}
//if(localStorage.getItem(chavePok)) {
//	for(let i = 0;localStorage.length;i++) {
//		pokemons_ATD.push(localStorage.getItem(chavePok));
//	}
//}
function gerenCards(evento) {
	if(estado_ATD == 1) return;
	let multiplicador = 1;
	if(evento) multiplicador = evento.target.getAttribute("data-numero");
	if(!multiplicador) return;
	let base = 20;
	maximo_buscar = base * multiplicador;
	minimo_buscar = maximo_buscar - 19;
	pokedex_container.replaceChildren();
	atualizar(buscar());
	console.log(`multiplicador:${multiplicador}`);
}
container_selecao.addEventListener("click", gerenCards);
irParaDex.addEventListener("click", function() {
	if(estado_ATD == 0) {
		estado_ATD = 1;
		pokedex_container.replaceChildren();
		atualizar(buscarATD());
	}else{
		estado_ATD = 0;
		gerenCards();
	}
});
atualizar(buscar());
