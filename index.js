// Importar módulos
const express = require('express');
const mysql = require('mysql2');
// Criar aplicação
const app = express();
const port = 3000;
// Permitir receber dados de formulário (HTML)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
// Conexão com MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', // coloque sua senha correta
    database: 'banco_filmes'
});
// Testar conexão
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});
// Rota para salvar usuário (form HTML)
app.post('/add-filme', (req, res) => {
    const { nome, categoria, descricao, nota } = req.body;
    const sql = 'INSERT INTO filmes (nome, categoria, descricao, nota) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, categoria, descricao, nota], (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Erro ao salvar');
        }
        res.redirect('/catalogo.html');
    });
});

// Rota para listar usuários
app.get('/filmes', (req, res) => {
    const sql = 'SELECT * FROM filmes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.delete('/deletar-filme/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM filmes WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao deletar do banco');
        }
        res.send('Filme excluído com sucesso!');
    });
});
// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

