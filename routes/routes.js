// Rotas
app.get('/', (req, res) => {
  Postagem.findAll({ order: [['id', 'desc']] }).then((posts) => {
    res.render('home', { posts });
  });
});

app.get('/criar-post', (req, res) => {
  res.render('formulario');
});

app.post('/salvar-post', (req, res) => {
  Postagem.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  }).then(() => {
    res.redirect('/');
  }).catch((erro) => {
    res.send(`Erro: ${erro}`);
  });
});