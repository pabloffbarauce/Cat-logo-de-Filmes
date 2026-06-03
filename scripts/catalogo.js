document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container-cards');

    function carregarFilmes() {
        fetch('http://localhost:3000/filmes')
            .then(res => res.json())
            .then(filmes => {
                container.innerHTML = '';
                
                if (filmes.length === 0) {
                    container.innerHTML = '<p>Nenhum filme cadastrado.</p>';
                    return;
                }

                filmes.forEach(filme => {
                    const card = document.createElement('div');
                    card.classList.add('card-filme');

                    card.innerHTML = `
                        <h3>${filme.nome}</h3>
                        <p><strong>Categoria:</strong> ${filme.categoria || 'Não informada'}</p>
                        <p><strong>Descrição:</strong> ${filme.descricao || 'Sem descrição'}</p>
                        <p><strong>Nota:</strong> ${filme.nota}</p>
                        <button class="botao-excluir" data-id="${filme.id}">Excluir</button>
                    `;

                    container.appendChild(card);
                });

                atribuirExcluir();
            })
            .catch(err => console.error('Erro ao buscar filmes:', err));
    }

    function atribuirExcluir() {
        const botoes = document.querySelectorAll('.botao-excluir');
        botoes.forEach(botao => {
            botao.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                
                if (confirm('Deseja realmente excluir este filme?')) {
                    fetch(`http://localhost:3000/deletar-filme/${id}`, { method: 'DELETE' })
                        .then(res => res.text())
                        .then(resposta => {
                            alert(resposta);
                            carregarFilmes(); 
                        })
                        .catch(err => console.error('Erro ao deletar:', err));
                }
            });
        });
    }

    carregarFilmes();
});