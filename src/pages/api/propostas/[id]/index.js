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
          data[key] = JSON.stringify(val);
        }
        if (val === false || val === true) {
          data[key] = Number(val);
        }
        keyval.push(key + " = '" + data[key] + "'");
      }
    }

    const updated = keyval.join(", ");
    const query = `UPDATE proposta SET ${updated} WHERE id = ${id}`;

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
    const query = `DELETE FROM proposta WHERE id = ${id}`

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

export default async function handler(req, res) {
  if (!await authService.isAuthenticated(req)) return res.status(401).json({ message: 'Not authorized' });
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

  res.status(404).json({ message: 'Not found' });
}
