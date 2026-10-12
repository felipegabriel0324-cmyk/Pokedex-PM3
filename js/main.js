let minimo = 1;
let maximo = 20;
const requisicoes = [];
const pokedex_container = document.querySelector("#pokedex-container");
function buscar() {
	for(;minimo <= maximo;minimo++) {
		requisicoes.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${minimo}`)
			.then(response => response.json())
		);
		minimo = minimo - 20;
	}
}
function atualizar() {
	Promise.all(requisicoes).then(pokemon => {
	for(;minimo <= maximo;minimo++) {
			const pokTypes = [];
			const types = [];
			let div = document.createElement("div");
			for(let i = 0;i < pokemon.types.length; i++) {
				pokTypes[i] = pokemon.types[i].type.name;
			}
			console.log(`confirmado:${pokemon.name} ${pokemon.id}`);
			let nome = document.createElement("h2");
			let id = document.createElement("p");
			let buttonIcone = document.createElement("button");
			let icone = document.createElement("img");
			let img = document.createElement("img");
			let button = document.createElement("button");
			for(let i = 0;i < pokemon.types.length;i++) {
				types[i] = document.createElement("span");
			}
			let type = document.createElement("p");
			button.textContent = "+ ADD TO DEX";
			nome.textContent = pokemon.name;
			id.textContent = pokemon.id;
			icone.src = "images/estrela.svg";
			img.src = pokemon.sprites.front_default;
			img.alt = pokemon.name;
			for(let i = 0;i < pokemon.types.length;i++) {
				types[i].textContent = pokTypes[i];
			}
			pokedex_container.appendChild(div);
			buttonIcone.appendChild(icone);
			div.appendChild(id);
			div.appendChild(buttonIcone);
			div.appendChild(img);
			div.appendChild(nome);
			for(let i = 0;i < pokemon.types.length;i++) { //ainda falta o resto da div, botao addtodex e icone de estrela
				div.appendChild(types[i]);
			}
			div.appendChild(button);
		}
	});
}
atualizar();
const container_selecao = document.getElementById('selecao_script');
container_selecao.addEventListener('click', function(evento) {
	const numero = evento.target.getAttribute('data-numero');
	if(!numero) return;
	let multiplicador = 20;
	maximo = multiplicador * numero;
	minimo = maximo - 20;
	pokedex_container.replaceChildren();
	buscar();
	atualizar();
});
