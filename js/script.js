async function BAN(id, tempo = '&') {
    const response = await fetch('https://kingshotuser.vercel.app/user', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        console.error('Falha ao fazer requisição!');
        return;
    }

    const data = await response.json();
    if (data == null) {
        console.warn('Usuário inexistente!');
        return;
    }

    const { fid, avatar_image, kid, nickname, stove_lv_content } = data;

    let tempoFormatado;
    const tempoLower = String(tempo).toLowerCase();

    const permanentes = ['&', '1/2', 'infinito', 'infinity', 'account removed'];

    if (permanentes.includes(tempoLower)) {
        tempoFormatado = 'Permanente';
    } else if (!isNaN(tempo)) {
        tempoFormatado = `${tempo} minutos`;
    } else {
        tempoFormatado = tempo; 
    }

    let section_banidos = document.querySelector('.centralizar-banidos');

    if (!section_banidos) {
        section_banidos = document.createElement('section');
        section_banidos.className = 'centralizar-banidos';
        section_banidos.setAttribute('aria-label', 'Lista de jogadores banidos');

        const main = document.getElementById('principal');
        if (main) {
            main.appendChild(section_banidos);
        } else {
            console.error('Elemento com id "principal" não encontrado!');
            return;
        }
    }

    const article = document.createElement('article');
    article.className = 'card-banido';
    article.setAttribute('role', 'group');
    article.setAttribute('aria-labelledby', `banido-${nickname}`);
    article.innerHTML = `
        <div class="avatar" style="background-image: url('${avatar_image}');" aria-hidden="true"></div>
        <div class="info">
            <h2 id="banido-${nickname}">Nome: ${nickname}</h2>
            <p><strong>ID:</strong> ${fid}</p>
            <p><strong>Nível da Cidade:</strong> ${stove_lv_content}</p>
            <p><strong>Reino:</strong> #${kid}</p>
            <p><strong>Tempo de Ban:</strong> ${tempoFormatado}</p>
        </div>
        <div class="status">
            <span class="banido">BANIDO</span>
        </div>
    `;

    section_banidos.appendChild(article);
}



BAN(114075438, '1/2');
BAN(114436149, '1/2');
BAN(120311891, 'Account Removed');
BAN(115189677, 'INFINITY');
