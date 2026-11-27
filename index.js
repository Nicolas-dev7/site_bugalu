const carrossel = document.getElementById('carrossel');
const track = document.getElementById('track');
const slides = document.querySelectorAll('.carrossel-slide');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');



        let currentIndex = 0;
        let autoPlayInterval;
        const tempoTroca = 5000; // 5 segundos

        // Descobre quantas imagens estão visíveis no momento (padrão: 3)
        function getSlidesVisiveis() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            return 4;
        }
        
        // Atualiza a posição do carrossel
        function atualizarCarrossel() {
            const slidesVisiveis = getSlidesVisiveis();
            const maxIndex = slides.length - slidesVisiveis;

            // Garante o loop infinito ao chegar nas extremidades
            if (currentIndex > maxIndex) {
                currentIndex = 0;
            } else if (currentIndex < 0) {
                currentIndex = maxIndex;
            }

            const porcentagemDeslocamento = currentIndex * (100 / slidesVisiveis);
            track.style.transform = `translateX(-${porcentagemDeslocamento}%)`;
        }
        
        function proximoSlide() {
            currentIndex++;
            atualizarCarrossel();
        }

        function slideAnterior() {
            currentIndex--;
            atualizarCarrossel();
        }

        // Controle do tempo automático (5 segundos)
        function iniciarAutoPlay() {
            autoPlayInterval = setInterval(proximoSlide, tempoTroca);
        }
        
        function pararAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Eventos dos botões
        btnNext.addEventListener('click', () => {
            proximoSlide();
            // Reinicia a contagem para não pular rápido demais após o clique
            pararAutoPlay();
            iniciarAutoPlay();
        });
        
        btnPrev.addEventListener('click', () => {
            slideAnterior();
            pararAutoPlay();
            iniciarAutoPlay();
        });

        // Trava quando o mouse entra e retoma quando sai
        carrossel.addEventListener('mouseenter', pararAutoPlay);
        carrossel.addEventListener('mouseleave', iniciarAutoPlay);

        // Ajusta o alinhamento caso a janela seja redimensionada
        window.addEventListener('resize', atualizarCarrossel);

        // Inicia o carrossel ao carregar a página
        iniciarAutoPlay();

const form = document.getElementById('formulario');
const alerta = document.getElementById('card-alerta');
const btnFechar = document.getElementById('fechar-alerta');
let temporizador;



function mostrarAlerta() {
    alerta.classList.add('visivel');

    // Reseta o timer caso o usuário envie duas vezes seguidas
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        alerta.classList.remove('visivel');
    }, 5000); // Some após 4 segundos
}

function obterRegistros() {
    return JSON.parse(localStorage.getItem('dadosPedido')) || [];
}

let lista = document.getElementById('lista')
let carrinho_vazio = document.getElementById('carrinho_vazio')


function renderizarPedidos () {
    let vetor_registros = obterRegistros()
    carrinho_vazio.style.opacity = '0'
    lista.innerHTML = ''
    vetor_registros.forEach(pedido => {
        console.log(pedido.nome)
        const div = document.createElement('div');
        const p = document.createElement('p')
        const span = document.createElement('span')
        p.textContent = `${pedido.nome}, seu pedido foi feito com sucesso. Em breve entraremos em contato!`
        span.textContent = `Pedido: ${pedido.id}`
        div.classList.add('registro-salvo')
        div.appendChild(span)
        div.appendChild(p)
        lista.appendChild(div)
    });
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o recarregamento da página
    const novoRegistro = {
        id : Date.now(),
        nome : document.getElementById('nome').value,
        telefone : document.getElementById('telefone').value,
        tipoMovel : document.getElementById('tipo').value,
        dimensoes : document.getElementById('dimensoes').value,
        cor : document.getElementById('cor').value,
        tipo_madeira : document.getElementById('madeira').value,
        observacao : document.getElementById('observacoes').value,
        imagem : document.getElementById('imagem').value
    }
    
    let listaRegistros = obterRegistros()
    
    listaRegistros.push(novoRegistro)

    localStorage.setItem('dadosPedido', JSON.stringify(listaRegistros));
    // Aqui entraria o envio real (fetch) para o servidor, se houver
    mostrarAlerta();
    form.reset();
    renderizarPedidos()
    
    });
    
    
    btnFechar.addEventListener('click', () => {
        alerta.classList.remove('visivel');
        clearTimeout(temporizador);
    })
    
    document.addEventListener("DOMContentLoaded", () => {
        console.log(obterRegistros())
        if (obterRegistros().length === 0) {
            carrinho_vazio.style.opacity = '1'
            return;
        } 
        renderizarPedidos()
    })