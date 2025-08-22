async function BAN(id) {
    const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        return 'Falha ao fazer requisição!';
    }

    const data = await response.json();
    if (data == null) return 'Usuário inexistente!';

    const { fid, avatar_image, kid, nickname, stove_lv_content } = data;

    let section_banidos = document.querySelector('.centralizar-banidos');

    if (!section_banidos) {
        section_banidos = document.createElement('section');
        section_banidos.className = 'centralizar-banidos';
        section_banidos.setAttribute('aria-label', 'Lista de jogadores banidos');

        const main = document.getElementById('principal');
        main.appendChild(section_banidos);
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
        </div>
        <div class="status">
            <span class="banido">BANIDO</span>
        </div>
    `;

    section_banidos.appendChild(article);
}


BAN(114075438);
BAN(114436149);