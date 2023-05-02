import executeQuery from "../db";

export default async function handler(req, res) {
  const method = req.method;
  const data = req.body;
  let query, values = '';

  if (method === 'GET') {
    query = 'SELECT * FROM defaultParams';
  } else {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const key = keys.join(", ");
    const val = "'" + values.join("', '") + "'";
    query = `INSERT INTO proposta (${key}) VALUES (${val})`;
  }

  try {
    const result = await executeQuery({
      query,
      values,
    });

    if (result.length > 0 || result.affectedRows > 0) {
      const data = {
        ...result[0],
        temNota: !!result[0].temNota
      }

      res.status(200).json(data)
    } else {
      res.status(404).end('Nenhum parâmetro encontrado')
    }

  } catch (error) {
    console.log(error);
  }
}
