import executeQuery from "../db";

export default async function handler(req, res) {
  const method = req.method;
  const id = req.query.id;
  const data = req.body;
  let query, values = '';

  if (method === 'GET') {
    query = `SELECT * FROM proposta WHERE id = ${id}`;
  } else {
    let keyval = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let val = data[key];
        if (Array.isArray(val)) {
          data[key] = JSON.stringify(val);
        }
        if (val === false || val === true) {
          data[key] = Number(val);
        }
        keyval.push(key + " = '" + data[key] + "'");
      }
    }
    const updated = keyval.join(", ");
    query = `UPDATE proposta SET ${updated} WHERE id = ${id}`;
  }

  try {
    const result = await executeQuery({
      query,
      values,
    });

    if (result.length > 0 || result.affectedRows > 0) {
      res.status(200).json(result)
    } else {
      res.status(404).end('Nenhuma proposta encontrada')
    }
    
  } catch (error) {
    console.log(error);
  }
}
