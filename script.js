const cores = ['vermelho', 'verde', 'azul', 'amarelo', 'roxo', 'laranja'];

let sequencia = [];
let sequenciaJogador = [];
let nivel = 1;
let jogando = true;

const botoesCores = cores.map(cor => document.getElementById(cor));
const startButton = document.getElementById('start-button');
const nivelTexto = document.getElementById('nivel');

startButton.addEventListener('click', iniciarJogo);

function iniciarJogo() {
    sequencia = [];
    sequenciaJogador = [];
    nivel = 1;
    jogando = true; 
    nivelTexto.textContent = `Nível ${nivel}`;
    proximoNivel();
}

function proximoNivel() {
    sequenciaJogador = [];
    let numeroCores = nivel; // Número de cores baseado no nível

    for (let i = 0; i < numeroCores; i++) { // Correção aqui
        const novaCor = cores[Math.floor(Math.random() * cores.length)]; // Correção aqui
        sequencia.push(novaCor);
    }

    nivelTexto.textContent = `Nível: ${nivel}`;
    tocarSequencia();
}

function tocarSequencia() {
    let i = 0; 
    const intervalo = setInterval(() => {
        ativarBotao(sequencia[i]);
        i++;

        if (i >= sequencia.length) {
            clearInterval(intervalo);
        }
    }, 1000);
}

function ativarBotao(cor) {
    const botao = document.getElementById(cor);
    botao.classList.add('active');
    setTimeout(() => botao.classList.remove('active'), 500);
}

botoesCores.forEach(botao => {
    botao.addEventListener('click', (e) => {
        if (!jogando) return;
        const corSelecionado = e.target.id;

        sequenciaJogador.push(corSelecionado);
        ativarBotao(corSelecionado);
        verificarResposta();
    });
});

function verificarResposta() {
    const indiceAtual = sequenciaJogador.length - 1;
    if (sequenciaJogador[indiceAtual] !== sequencia[indiceAtual]) {
        alert('Você errou! Tente novamente.');
        jogando = false;
        return;
    }

    if (sequenciaJogador.length === sequencia.length) {
        if (nivel === 5) {
            alert('Parabéns! Você completou todos os níveis!');
            jogando = false;
        } else {
            nivel++;
            setTimeout(proximoNivel, 1000);
        }
    }
}