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

    const keys = Object.keys(data);
    const values = Object.values(data);
    const key = keys.join(", ");
    const val = "'" + values.join("', '") + "'";
    const query = `INSERT INTO proposta (${key}) VALUES (${val})`;

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
