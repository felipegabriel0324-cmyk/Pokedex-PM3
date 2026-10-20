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
			for(let i = 0;i < pokemon[minimo].types.length;i++) {
				type[i] = document.createElement("span");
				type[i].classList.add("pokemon-type");
				type[i].classList.add(pokemon[minimo].types[i].type.name);
			}
			let div3 = document.createElement("div");
			div3.classList.add("types-style");
			let ATDbutton = document.createElement("button");
			ATDbutton.classList.add("ATD-button");

			id.textContent = `#${pokemon[minimo].id}`;
			icon.src = "images/estrela.svg";
			img.src = pokemon[minimo].sprites.front_default;
			img.alt = pokemon[minimo].name;
			name.textContent = pokemon[minimo].name;
			for(let i = 0;i < pokemon[minimo].types.length;i++) {
				type[i].textContent = pokemon[minimo].types[i].type.name;
			}
			ATDbutton.textContent = "+ ADD TO DEX";

			pokedex_container.appendChild(div1);
			div1.appendChild(div2);
			div2.appendChild(id);
			iconButton.appendChild(icon);
			div2.appendChild(iconButton);
			div1.appendChild(img);
			div1.appendChild(name);
			for(let i = 0;i < pokemon[minimo].types.length;i++) {
				div3.appendChild(type[i]);
			}
			div1.appendChild(div3);
			div1.appendChild(ATDbutton);
			let estrela = 1;
			iconButton.addEventListener("click", function() {
				if(estrela) {
					icon.src = "images/estrelaAtivado.svg";
					estrela = 0;
				}else{
					icon.src = "images/estrela.svg";
					estrela = 1;
				}
			});
			let ATD = 1;
			ATDbutton.addEventListener("click", function() {
				if(ATD) {
					ATDbutton.textContent = "ADICIONADO";
					ATD = 0;
				}else{
					ATDbutton.textContent = "+ ADD TO DEX";
					ATD = 1;
				}
			});
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
