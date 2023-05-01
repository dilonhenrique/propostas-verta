export default async function handler(req, res) {
  const url = process.env.AS_URL;
  const key = process.env.AS_KEY;
  const params = req.query.params;

  const options = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'access_token': key
    }
  }
  if (req.method !== 'GET'){
    options.body = typeof req.body === 'object' ? JSON.stringify(req.body) : req.body
  }

  fetch(`${url}${params.join('/')}`, options)
    .then(async response => {
      const data = await response.json();
      return {
        status: response.status,
        data
      }
    })
    .then(response => res.status(response.status).json(response.data))
    .catch(erro => res.status(erro.status))
}
