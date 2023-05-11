import { authService } from "../authService";
import {executeQuery} from "../db";

const controllers = {
  getParams: async (req, res) => {
    const query = 'SELECT * FROM defaultParams';

    try {
      const result = await executeQuery({
        query,
      });

      if (result.length > 0) {
        const data = {
          ...result[0],
          temNota: !!result[0].temNota
        }
        delete data.id;
  
        res.status(200).json(data)
      } else {
        res.status(404).json({ message: 'Nenhum parâmetro encontrado' });
      }

    } catch (error) {
      res.status(500).json({ message: 'Ops! Algo deu errado' });
    }
  },

  updateParams: async (req, res) => {
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
    const query = `UPDATE defaultParams SET ${updated} WHERE id = 1`;

    try {
      const result = await executeQuery({
        query,
      });

      if (result.affectedRows > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Nenhum parâmetro encontrada' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ops! Algo deu errado' });
    }
  },
}

const controllerBy = {
  GET: controllers.getParams,
  POST: controllers.updateParams,
}

export default async function handler(req, res) {
  if (!await authService.isAuthenticated(req)) return res.status(401).json({ message: 'Not authorized' });
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

  res.status(404).json({ message: 'Not found' });
}
