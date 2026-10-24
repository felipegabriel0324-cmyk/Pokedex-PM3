const container_tipo = document.getElementById("tipo_script");
container_tipo.addEventListener("click", function(evento) {
	if(!evento) return;
	if(evento.target.dataset.tipo == undefined) return;
	const filtroEscolhido = evento.target.dataset.tipo;
	console.log(filtroEscolhido);
});
