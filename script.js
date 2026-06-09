function iniciarCalibracaoIA() {
    var celular = document.getElementById('nome_celular').value;
    
    // Validação para não deixar o campo vazio
    if (celular.trim() === "") {
        alert("Por favor, digite o modelo do seu celular para começar!");
        return;
    }

    // Esconde o resultado anterior e exibe a animação de carregamento
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('carregando').style.display = 'block';

    // Sequência de mensagens simuladas da IA
    setTimeout(() => { document.getElementById('texto_ia').innerText = "Processando DPI e taxa de atualização..."; }, 800);
    setTimeout(() => { document.getElementById('texto_ia').innerText = "Ajustando latência do servidor regional..."; }, 1600);
    setTimeout(() => { document.getElementById('texto_ia').innerText = "Calibrando diâmetro do botão de disparo..."; }, 2400);
    
    // Chama a função que processa os dados após 3.2 segundos
    setTimeout(processarDadosIA, 3200);
}

function processarDadosIA() {
    // Esconde o carregamento
    document.getElementById('carregando').style.display = 'none';

    // Captura os dados exatos do formulário HTML
    var celular = document.getElementById('nome_celular').value;
    var ram = document.getElementById('ram').value;
    var desempenho = document.getElementById('desempenho').value;
    var problema = document.getElementById('problema_mira').value;
    var regiao = document.getElementById('regiao').value;
    var tela = document.getElementById('tela_tamanho').value;
    var aceitaDpi = document.getElementById('aceita_dpi').value;

    // Valores iniciais equilibrados para a nova escala de 0 a 200
    var geral = 145, reddot = 138, m2x = 142, m4x = 140, botao = 45, dpi = 600, latenciaMsg = "Otimizado";

    // 1. Ajuste baseado no Tamanho da Tela
    if (tela === "pequena") {
        botao = 39; 
        geral += 10; 
    } else if (tela === "grande") {
        botao = 52; 
        geral -= 10; 
    }

    // 2. Ajuste baseado na Memória RAM
    if (ram === "baixa") {
        geral += 15; m2x += 12; dpi = 680;
    } else if (ram === "alta") {
        geral -= 8; m2x -= 6; dpi = 510;
    }

    // 3. Ajuste baseado no Desempenho
    if (desempenho === "trava") {
        geral += 10;
        botao -= 2; 
    }

    // 4. Correção do Problema de Mira do Jogador
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

    // 5. Ajuste de Região e Latência
    if (regiao === "br") {
        latenciaMsg = "Ping Estável (0-30ms) | Foco em Precisão";
    } else if (regiao === "latam") {
        geral += 5;
        latenciaMsg = "Ping Médio (40-80ms) | Sensi aumentada";
    } else {
        geral += 8; reddot += 5;
        latenciaMsg = "Ping Alto (90ms+) | Registro acelerado";
    }

    // Variável para gerar pequenas diferenças nos valores a cada clique
    var randomVal = () => Math.floor(Math.random() * 6) - 3;

    // Função que limita o resultado entre 0 e o teto máximo de 200
    var limitarSensi = (valor) => Math.min(200, Math.max(0, valor + randomVal()));

    // Injeta os resultados numéricos nas tags correspondentes
    document.getElementById('celular_detectado').innerText = celular.toUpperCase();
    document.getElementById('geral_val').innerText = limitarSensi(geral);
    document.getElementById('reddot_val').innerText = limitarSensi(reddot);
    document.getElementById('mira2x_val').innerText = limitarSensi(m2x);
    document.getElementById('mira4x_val').innerText = limitarSensi(m4x);
    document.getElementById('botao_val').innerText = botao + "%";
    document.getElementById('latencia_val').innerText = latenciaMsg;

    // Controladores dos blocos dinâmicos de instrução
    var dpiRes = document.getElementById('dpi_res');
    var ponteiroVal = document.getElementById('ponteiro_val');
    var listaInstrucoes = document.getElementById('lista_instrucoes');

    // Executa a verificação se o aparelho usa DPI ou se vai para o plano de Acessibilidade
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

    // Torna visível o bloco de resultados
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