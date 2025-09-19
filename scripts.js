/* ---------- CARROSSEL ---------- */
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');

let active = 0;
const total = items.length;
let timer;

function update(direction){
    document.querySelector('.item.active').classList.remove('active');
    document.querySelector('.dot.active').classList.remove('active');

    if(direction > 0){
        active = active + 1;
        if(active === total) active = 0;
    }
    else if(direction < 0){
        active = active - 1;
        if(active < 0) active = total - 1;
    }

    items[active].classList.add('active');
    dots[active].classList.add('active');
    numberIndicator.textContent = String(active + 1).padStart(2, '0');
}

function startCarousel(){
    clearInterval(timer);
    timer = setInterval(()=> update(1), 5000);
}
function stopCarousel(){
    clearInterval(timer);
}

startCarousel();

prevButton.addEventListener('click', ()=> { update(-1); });
nextButton.addEventListener('click', ()=> { update(1); });

/* ---------- NAV / CATÁLOGO ---------- */
const menuHome = document.querySelector('[data-menu="home"]');
const menuProdutos = document.querySelector('[data-menu="products"]');
const container = document.getElementById('carousel-container');
const catalogSection = document.getElementById('catalog-section');
const produtosLista = catalogSection.querySelector('.produtos-lista');
const backBtn = catalogSection.querySelector('.back-btn');

function openCatalog(){
    // pausa o carrossel
    stopCarousel();

    // esconde o carrossel
    container.style.display = 'none';

    // limpa e injeta cópias dos produtos (para manter o carrossel intacto)
    produtosLista.innerHTML = '';
    items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.remove('active'); // remove active para não conflitar
        produtosLista.appendChild(clone);
    });

    // mostra o catálogo
    catalogSection.classList.remove('hidden');

    // garante que a página comece do topo do catálogo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeCatalog(){
    // fecha catálogo
    catalogSection.classList.add('hidden');

    // mostra carrossel
    container.style.display = 'block';

    // reinicia autoplay
    startCarousel();

    // volta ao topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

menuProdutos.addEventListener('click', openCatalog);
menuHome.addEventListener('click', closeCatalog);
backBtn.addEventListener('click', closeCatalog);

/* ---------- comportamento extra: botão Saiba mais dentro do catálogo ---------- */
produtosLista.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn')){
        const produtoItem = e.target.closest('.item');
        if(produtoItem){
            produtoItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});
