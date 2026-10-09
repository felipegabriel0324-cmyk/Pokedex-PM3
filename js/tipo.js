const botoes = document.querySelectorAll('.tipo');
const container = document.querySelector('.filtro');
let isDown = false;
let startX;
let scrollLeft;
let isDragging = false;
botoes.forEach(botao => {
	botao.addEventListener('click',function(e) {
		if(isDragging) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		botoes.forEach(b => b.classList.remove('ativo'));
		this.classList.add('ativo');
	});
});
container.addEventListener('mousedown', (e) => {
	isDown = true;
	isDragging = false;
	startX = e.pageX - container.offsetLeft;
	scrollLeft = container.scrollLeft;
});
window.addEventListener('mousemove', (e) => {
	if(!isDown) return;
	e.preventDefault();
	const x = e.pageX - container.offsetLeft;
	const walk = (x - startX) *1.5; /* controla a velocidade*/
	if(Math.abs(walk) > 5) {
		isDragging = true;
	}
	container.scrollLeft = scrollLeft - walk;
});
window.addEventListener('mouseup', () => {
	isDown = false;
	setTimeout(() => {
		isDragging = false;
	}, 50);
});
