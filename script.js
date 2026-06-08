function iniciarCalibracaoIA() {
    var celular = document.getElementById('nome_celular').value;
    if (celular.trim() === "") {
        alert("Por favor, digite o modelo do seu celular para começar!");
        return;
    }

    document.getElementById('resultado').style.display = 'none';
    document.getElementById('carregando').style.display = 'block';

    setTimeout(() => { document.getElementById('texto_ia').innerText = "Processando DPI e taxa de atualização..."; }, 800);
    setTimeout(() => { document.getElementById('texto_ia').innerText = "Ajustando latência do servidor regional..."; }, 1600);
    setTimeout(() => { document.getElementById('texto_ia').innerText = "Calibrando diâmetro do botão de disparo..."; }, 2400);
    
    setTimeout(processarDadosIA, 3200);
}

function processarDadosIA() {
    document.getElementById('carregando').style.display = 'none';

    var celular = document.getElementById('nome_celular').value;
    var ram = document.getElementById('ram').value;
    var desempenho = document.getElementById('desempenho').value;
    var problema = document.getElementById('problema_mira').value;
    var regiao = document.getElementById('regiao').value;
    var tela = document.getElementById('tela_tamanho').value;

    // Valores iniciais equilibrados
    var geral = 125, reddot = 92, m2x = 132, m4x = 128, botao = 45, dpi = 600, latenciaMsg = "Otimizado";

    // 1. Ajuste de Tela (Cálculo do botão de tiro)
    if (tela === "pequena") {
        botao = 39; 
        geral += 5; // Menos espaço físico exige mais sensibilidade por milímetro movido
    } else if (tela === "grande") {
        botao = 52; 
        geral -= 5; 
    }

    // 2. Ajuste por Memória RAM (Telas de celulares mais fracos precisam de mais velocidade)
    if (ram === "baixa") {
        geral += 20; m2x += 15; dpi = 711;
    } else if (ram === "alta") {
        geral -= 10; m2x -= 5; dpi = 510;
    }

    // 3. Ajuste por Desempenho
    if (desempenho === "trava") {
        geral += 12;
        botao -= 2; 
    }

    // 4. Correção de Erro de Mira do jogador
    if (problema === "peito") {
        geral += 10; reddot += 5;
        botao -= 3; 
    } else if (problema === "passa") {
        geral -= 12; m2x -= 6;
        dpi = Math.floor(dpi * 0.88); // Diminui a DPI ligeiramente para segurar o tiro na cabeça
    } else if (problema === "pina") {
        reddot -= 8; m4x -= 10;
        botao += 4; // Botão maior estabiliza as miras para não tremer
    }

    // 5. Ajuste por Região do Servidor
    if (regiao === "br") {
        latenciaMsg = "Ping Estável (0-30ms) | Foco em Precisão";
    } else if (regiao === "latam") {
        geral += 3;
        latenciaMsg = "Ping Médio (40-80ms) | Sensi aumentada";
    } else {
        geral += 6; reddot += 4;
        latenciaMsg = "Ping Alto (90ms+) | Registro de tiro acelerado";
    }

    // Margem dinâmica para gerar números ligeiramente diferentes a cada clique
    var randomVal = () => Math.floor(Math.random() * 5) - 2;

    // Colocar os resultados nas tags correspondentes do HTML
    document.getElementById('celular_detectado').innerText = celular.toUpperCase();
    document.getElementById('geral_val').innerText = Math.min(200, geral + randomVal());
    document.getElementById('reddot_val').innerText = Math.min(200, reddot + randomVal());
    document.getElementById('mira2x_val').innerText = Math.min(200, m2x + randomVal());
    document.getElementById('mira4x_val').innerText = Math.min(200, m4x + randomVal());
    document.getElementById('botao_val').innerText = botao + "%";
    document.getElementById('dpi_res').innerText = dpi + " DPI";
    document.getElementById('latencia_val').innerText = latenciaMsg;

    document.getElementById('resultado').style.display = 'block';
}

function copiarConfig() {
    var cel = document.getElementById('celular_detectado').innerText;
    var geral = document.getElementById('geral_val').innerText;
    var reddot = document.getElementById('reddot_val').innerText;
    var m2x = document.getElementById('mira2x_val').innerText;
    var m4x = document.getElementById('mira4x_val').innerText;
    var botao = document.getElementById('botao_val').innerText;
    var dpi = document.getElementById('dpi_res').innerText;

    var texto = `🎯 SENSIPRO IA\n📱 Aparelho: ${cel}\n• Geral: ${geral}\n• Red Dot: ${reddot}\n• Mira 2x: ${m2x}\n• Mira 4x: ${m4x}\n• Botão Calculado: ${botao}\n• Config. Sistema: ${dpi}`;
    
    navigator.clipboard.writeText(texto).then(() => {
        alert("Configuração copiada para a área de transferência!");
    });
}
