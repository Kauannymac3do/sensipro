function processarDadosIA() {
    document.getElementById('carregando').style.display = 'none';

    var celular = document.getElementById('nome_celular').value;
    var ram = document.getElementById('ram').value;
    var desempenho = document.getElementById('desempenho').value;
    var problema = document.getElementById('problema_mira').value;
    var regiao = document.getElementById('regiao').value;
    var tela = document.getElementById('tela_tamanho').value;
    var aceitaDpi = document.getElementById('aceita_dpi').value;

    // NOVO: Valores iniciais equilibrados pensando no limite de 200
    var geral = 145, reddot = 138, m2x = 142, m4x = 140, botao = 45, dpi = 600, latenciaMsg = "Otimizado";

    // 1. Ajuste de Tela (Cálculo do botão de tiro)
    if (tela === "pequena") {
        botao = 39; 
        geral += 10; // Escala aumentada para o limite de 200
    } else if (tela === "grande") {
        botao = 52; 
        geral -= 10; 
    }

    // 2. Ajuste por Memória RAM
    if (ram === "baixa") {
        geral += 15; m2x += 12; dpi = 680;
    } else if (ram === "alta") {
        geral -= 8; m2x -= 6; dpi = 510;
    }

    // 3. Ajuste por Desempenho
    if (desempenho === "trava") {
        geral += 10;
        botao -= 2; 
    }

    // 4. Correção de Erro de Mira do jogador
    if (problema === "peito") {
        geral += 15; reddot += 10;
        botao -= 3; 
    } else if (problema === "passa") {
        geral -= 15; m2x -= 10;
        dpi = Math.floor(dpi * 0.88);
    } else if (problema === "pina") {
        reddot -= 12; m4x -= 12;
        botao += 4;
    }

    // 5. Ajuste por Região do Servidor
    if (regiao === "br") {
        latenciaMsg = "Ping Estável (0-30ms) | Foco em Precisão";
    } else if (regiao === "latam") {
        geral += 5;
        latenciaMsg = "Ping Médio (40-80ms) | Sensi aumentada";
    } else {
        geral += 8; reddot += 5;
        latenciaMsg = "Ping Alto (90ms+) | Registro acelerado";
    }

    // Margem dinâmica para gerar números ligeiramente diferentes a cada clique
    var randomVal = () => Math.floor(Math.random() * 6) - 3;

    // MODIFICADO: Agora o limite máximo vai até 200!
    var limitarSensi = (valor) => Math.min(200, Math.max(0, valor + randomVal()));

    // Colocar os resultados nas tags do HTML
    document.getElementById('celular_detectado').innerText = celular.toUpperCase();
    document.getElementById('geral_val').innerText = limitarSensi(geral);
    document.getElementById('reddot_val').innerText = limitarSensi(reddot);
    document.getElementById('mira2x_val').innerText = limitarSensi(m2x);
    document.getElementById('mira4x_val').innerText = limitarSensi(m4x);
    document.getElementById('botao_val').innerText = botao + "%";
    document.getElementById('latencia_val').innerText = latenciaMsg;

    // Lógica do celular sem DPI
    var dpiRes = document.getElementById('dpi_res');
    var ponteiroVal = document.getElementById('ponteiro_val');
    var listaInstrucoes = document.getElementById('lista_instrucoes');

    if (aceitaDpi === "nao") {
        dpiRes.innerText = "DPI Padrão do Aparelho";
        dpiRes.style.color = "#ffaa00";
        ponteiroVal.innerText = "Máxima + Velocidade de Rolagem Rápida";

        listaInstrucoes.innerHTML = `
            <li>Mantenha a <strong>DPI Padrão</strong> para não forçar o sistema do seu aparelho.</li>
            <li>Vá em Acessibilidade > Visual > <strong>Tamanho da Fonte</strong> e coloque no MÍNIMO.</li>
            <li>Ative o recurso <strong>"Remover Animações"</strong> para cliques mais instantâneos.</li>
            <li>Se for Samsung/Motorola: Ative a <strong>Sensibilidade do Toque</strong> nas configs de tela.</li>
        `;
    } else {
        dpiRes.innerText = dpi + " DPI";
        dpiRes.style.color = "#00f260";
        ponteiroVal.innerText = "Ativar no Máximo";

        listaInstrucoes.innerHTML = `
            <li>Vá em Configurações > Sistema > Opções do Desenvolvedor.</li>
            <li>Procure por <strong>"Menor Largura"</strong> e coloque a DPI gerada.</li>
            <li>Em Configurações > Tela, force a taxa em <strong>90Hz</strong>.</li>
        `;
    }

    document.getElementById('resultado').style.display = 'block';
}