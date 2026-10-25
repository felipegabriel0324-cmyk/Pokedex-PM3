let multiplicador = 1;
let estado_ATD = 0;
let filtro = "all";
let pesquisando = 0;
const pokemons_favoritos = [];
const pokemons_ATD = [];
const pokedex_container = document.querySelector("#pokedex-container");
const container_selecao = document.getElementById("selecao_script");
const irParaDex = document.getElementById("irParaDex");
const container_tipo = document.getElementById("tipo_script");
const campo_busca = document.getElementById("campo-busca");
const armazemPok = [];
const correspondentes = [];
function buscarTodos() {
	const requisicoes = [];
	for(let i = 1;i <= 140;i++) {
		requisicoes.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
			.then(response => response.json())
		);
	}
	Promise.all(requisicoes).then(pokemon => {
		for(let i = 0;i < 140;i++) {
			armazemPok.push({pok: pokemon[i].name, id: pokemon[i].id});
		}
	});
	console.log(armazemPok);
}
campo_busca.addEventListener("keydown", function(evento) {
	if(evento.key == "Enter") {
		pesquisando = 1;
		for(let i = 0;i < 140;i++) {
			pokemon = campo_busca.value.toLowerCase();
			if(pokemon == armazemPok[i].pok || armazemPok[i].pok.startsWith(pokemon)) {
				correspondentes.push(armazemPok[i].id);
			}
		}
		pokedex_container.replaceChildren();
		atualizar(buscarPesquisa());
		correspondentes.length = 0;
	}else if(campo_busca.value) pesquisando = 0;
});
container_tipo.addEventListener("click", function(evento) {
	if(!evento) return;
	if(evento.target.dataset.tipo == undefined) return;
	filtro = evento.target.dataset.tipo;
	pokedex_container.replaceChildren();
	if(estado_ATD){
		atualizar(buscarATD());
		console.log("de cima rodo");
	}
	else{
		atualizar(buscar());
		console.log("de baixo rodo");
	}
	console.log(filtro);
});
console.log(pokemons_ATD);
function buscar() {
	let x = multiplicador * 20;
	let y = x - 19;
	const requisicoes = [];
	for(;y <= x;y++) {
		requisicoes.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${y}`)
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
function buscarPesquisa() {
	const requisicoes = [];
	for(let i = 0;i < correspondentes.length;i++) {
		requisicoes.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${correspondentes[i]}`)
			.then(response => response.json())
		);
	}
	return requisicoes;
}
function atualizar(requisicoes) {
	Promise.all(requisicoes).then(pokemon => {
		for(let x = 0;x < pokemon.length;x++) {
			let temTipo = false;
			if(filtro == "favorites") {
				for(let i = 0;i < localStorage.length;i++) {
					let chave = localStorage.key(i);
					let objt = JSON.parse(localStorage.getItem(chave));
					if(objt.id == pokemon[x].id && objt.fav) temTipo = true;
				}
			} //filtro favorites = especial, diferente do filtro fornecido da api
			for(let i = 0;i < pokemon[x].types.length;i++) {
				if(pokemon[x].types[i].type.name == filtro) {
					temTipo = true;
				}
			}
			if(filtro != "all") {
				if(!temTipo) continue;
			}
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
			let estadoFavoritado = {fav:0, ATD:0, id:pokemon[x].id};
			if(salvo) {
				estadoFavoritado = JSON.parse(salvo);

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

function resgatarPokemons() {
	for(let i = 0;i < localStorage.length;i++) {
		let chave = localStorage.key(i);
		let objt = JSON.parse(localStorage.getItem(chave));
		if(objt.ATD) pokemons_ATD.push(objt.id);
		if(objt.fav) pokemons_favoritos.push(objt.fav);
		console.log(`chave:${chave} fav:${objt.fav} ATD:${objt.ATD} id:${objt.id}`);
	}
}

function gerenCards(evento) {
	if(estado_ATD == 1) return;
	if(evento) multiplicador = evento.target.getAttribute("data-numero"); //jeito antigo de pegar a data do html, nao sabia
	if(!multiplicador) return;
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
buscarTodos();
resgatarPokemons();
atualizar(buscar());
