import executeQuery from "../db";

export default async function handler(req, res) {
  const method = req.method;
  const params = req.query;
  const data = req.body;
  let query, values = '';

  if (method === 'GET') {
    query = 'SELECT * FROM proposta';
    // if (params) {
    //   query += ' WHERE '
    //   let keyval = [];
    //   for (let key in params) {
    //     if (params.hasOwnProperty(key)) {
    //       keyval.push(key + " = '" + params[key] + "'");
    //     }
    //   }
    //   query += keyval.join(", ");
    // }
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
      const results = result.map(prop => {
        let newObj = { ...prop };
        if (typeof prop.fases === 'string') {
          newObj.fases = JSON.parse(prop.fases)
        }
        if (typeof prop.custosFixos === 'string') {
          newObj.custosFixos = JSON.parse(prop.custosFixos)
        }
        newObj.temNota = !!newObj.temNota;
        newObj.customParcela = !!newObj.customParcela;
        newObj.customPrazo = !!newObj.customPrazo;

        return newObj;
      })
      res.status(200).json(results)
    } else {
      res.status(404).end('Nenhuma proposta encontrada')
    }

  } catch (error) {
    console.log(error);
  }
}
