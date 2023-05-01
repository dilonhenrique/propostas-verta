import executeQuery from "../../db";

export default async function handler(req, res) {
  const id = req.query.id;
  
  const values = '';
  const query = `DELETE FROM proposta WHERE id = ${id}`

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
