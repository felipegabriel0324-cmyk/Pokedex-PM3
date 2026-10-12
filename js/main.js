const pokTypes = [];
const types = [];
let multiplicador = 1;
let numero1 = 1; 
const container_selecao = document.getElementById('selecao_script');
container_selecao.addEventListener('click', function(evento) {
	const numero = evento.target.getAttribute('data-numero');
	if(!numero) return;
	numero1 = numero;
});
for(let i = 0;i < numero1;i++) {
	multiplicador++; 			//PORQUE MULTIPLICADOR NAO MUDA
}						//acho que tem algo a ver com a permanencia do eventlistener? tentei colocar o for...
let seletor = 20 * multiplicador;		//dentro do eventlistener antes e não tinha dado certo tambem
console.log(`multiplicador: ${multiplicador}`); //porque? porque multiplicador?
console.log(`seletor: ${seletor}`);
for(let i = 0;i < seletor;i++) {
	https = `https://pokeapi.co/api/v2/pokemon/${i}`;
	fetch(https)
	.then(response => response.json())
	.then(pokemon => {
		let div = document.createElement("div");
		for(let i = 0;i < pokemon.types.length; i++) {
			pokTypes[i] = pokemon.types[i].type.name;
		}
		console.log(`confirmado:${pokemon.name} ${pokemon.id}`); //nem sempre o log registra, + o erro que aparece no console
		let pokedex_container = document.querySelector("#pokedex-container"); //talvez tem uma funcao de retry?
		let nome = document.createElement("h2");
		let id = document.createElement("p");
		let img = document.createElement("img");
		for(let i = 0;i < pokemon.types.length;i++) {
			types[i] = document.createElement("span");
		}
		let type = document.createElement("p");
		nome.textContent = pokemon.name;
		id.textContent = pokemon.id;
		img.src = pokemon.sprites.front_default;
		img.alt = pokemon.name;
		for(let i = 0;i < pokemon.types.length;i++) {
			types[i].textContent = pokTypes[i];
		}
		pokedex_container.appendChild(div);
		div.appendChild(nome);
		div.appendChild(id);
		div.appendChild(img);
		for(let i = 0;i < pokemon.types.length;i++) { //ainda falta o resto da div, botao addtodex e icone de estrela
			div.appendChild(types[i]);
		}
	});
}
