const controllers = {
  GET: async (req, res) => {

  },
  POST: async (req, res) => {

  },
}

export default async function handler(req, res) {
  const url = process.env.AS_URL;
  const key = process.env.AS_KEY;
  const query = req.query;
  const { params, email } = query;
  delete query.params;

  // if(controllers[req.method]) return controllers[req.method](req,res);

  if (req.method === 'GET') {
    if (!email && !params.includes('cities')) return res.status(200).json({ ok: true, data: [] })
  }

  const options = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'access_token': key
    }
  }
  if (req.method === 'POST' || req.method === 'PUT') {
    options.body = typeof req.body === 'object' ? JSON.stringify(req.body) : req.body
  }

  function urlConstructor() {
    let fetchUrl = `${url}${params.join('/')}`;
    if (Object.keys(query).length !== 0 && query.constructor === Object) {
      fetchUrl += '?';
      for (let key in query) {
        fetchUrl += `${key}=${query[key]}&`;
      }
    }

    return fetchUrl;
  }

  try {
    const conexao = await fetch(urlConstructor(), options);
    const response = await conexao.json();
    res.status(conexao.status).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Ops! Algo deu errado', data: err });
  }
}
