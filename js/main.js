let minimo = 0;
let maximo = 20;
let minimo_buscar = 1;
let maximo_buscar = 20;
const pokedex_container = document.querySelector("#pokedex-container");
const container_selecao = document.getElementById("selecao_script");

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

function atualizar(requisicoes) {
	Promise.all(requisicoes).then(pokemon => {
		for(;minimo < maximo;minimo++) {
			const type = [];

			let div = document.createElement("div");
			let id = document.createElement("p");
			let iconButton = document.createElement("button");
			let icon = document.createElement("img");
			let img = document.createElement("img");
			let name = document.createElement("h2");
			for(let i = 0;i < pokemon[minimo].types.length;i++) {
				type[i] = document.createElement("span");
			}
			let ATDbutton = document.createElement("button");

			id.textContent = pokemon[minimo].id;
			icon.src = "images/estrela.svg";
			img.src = pokemon[minimo].sprites.front_default;
			img.alt = pokemon[minimo].name;
			name.textContent = pokemon[minimo].name;
			for(let i = 0;i < pokemon[minimo].types.length;i++) {
				type[i].textContent = pokemon[minimo].types[i].type.name;
			}
			ATDbutton.textContent = "+ ADD TO DEX";

			pokedex_container.appendChild(div);
			div.appendChild(id);
			iconButton.appendChild(icon);
			div.appendChild(iconButton);
			div.appendChild(img);
			div.appendChild(name);
			for(let i = 0;i < pokemon[minimo].types.length;i++) {
				div.appendChild(type[i]);
			}
			div.appendChild(ATDbutton);
		}
	});
}

container_selecao.addEventListener("click", function(evento) {
	const multiplicador = evento.target.getAttribute("data-numero");
	if(!multiplicador) return;
	let base = 20;
	maximo_buscar = base * multiplicador;
	minimo_buscar = maximo_buscar - 19;
	pokedex_container.replaceChildren();
	minimo = 0;
	atualizar(buscar());
});

atualizar(buscar());
