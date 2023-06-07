export default async function handler(req, res) {
  if (req.method === 'GET') return res.status(200).json({ ok: true, data: [] })

  const url = process.env.CU_URL;
  const spaceUrl = '/space/90070088088/' // Projetos: 453254 || Teste Api: 90070088088
  // esta variavel será usada somente nas funções padrão de criação de tarefas, pastas, etc
  const key = process.env.CU_KEY;
  const params = req.query.params;

  const options = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': key
    }
  }
  if (req.method === 'POST' || req.method === 'PUT') {
    options.body = typeof req.body === 'object' ? JSON.stringify(req.body) : req.body
  }

  try {
    const conexao = await fetch(`${url}${params.join('/')}`, options);
    const response = await conexao.json();
    res.status(conexao.status).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Ops! Algo deu errado', data: err });
  }
}
