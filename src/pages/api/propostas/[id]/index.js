import { translateDbToJs } from "..";
import { authService } from "../../authService";
import { executeQuery } from "../../db";

const controllers = {
  getPropostaById: async (req, res) => {
    const id = req.query.id;
    const query = `SELECT * FROM proposta WHERE id = ${id}`;

    try {
      const results = await executeQuery({
        query,
      });

      if (results.length > 0) {
        const formatedResult = results.map(prop => {
          return translateDbToJs(prop);
        })
        res.status(200).json(formatedResult);
      } else {
        res.status(404).json({ message: 'Nenhuma proposta encontrada' });
      }

    } catch (error) {
      res.status(500).json({ message: 'Ops! Algo deu errado' });
    }
  },

  savePropostaById: async (req, res) => {
    const id = req.query.id;
    const data = req.body;

    let keyval = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let val = data[key];
        if (Array.isArray(val)) {
          val = JSON.stringify(val);
        }
        if (typeof val === 'boolean') {
          val = Number(val);
        }
        keyval.push(key + " = '" + val + "'");
      }
    }

    const updated = keyval.join(", ");
    const query = `UPDATE proposta SET ${updated} WHERE id = ${id}`;
    
    // res.status(200).json({data:query})
    try {
      const result = await executeQuery({
        query,
      });

      if (result.affectedRows > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Nenhuma proposta encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ops! Algo deu errado' });
    }
  },

  deletePropostaById: async (req, res) => {
    const id = req.query.id;
    const query = `UPDATE proposta SET excluido = '1' WHERE id = ${id}`;

    try {
      const result = await executeQuery({
        query,
      });

      if (result.affectedRows > 0) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ message: 'Nenhuma proposta encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ops! Algo deu errado' });
    }
  }
}

const controllerBy = {
  GET: controllers.getPropostaById,
  POST: controllers.savePropostaById,
  DELETE: controllers.deletePropostaById,
}

const controllerSimpleBy = {
  POST: controllers.savePropostaById,
}

export default async function handler(req, res) {
  if (await authService.isAuthenticated(req)){
    if (controllerBy[req.method]) return controllerBy[req.method](req, res);
  
    return res.status(404).json({ message: 'Not found' });
  } else {
    console.log(req.body)
    if (controllerSimpleBy[req.method] && req.body?.status && req.body.length === 1) return controllerSimpleBy[req.method](req, res);

    return res.status(401).json({ message: 'Not authorized' });
  }
}
