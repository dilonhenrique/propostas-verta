import { authService } from "../authService";
import {executeQuery} from "../db";

const controllers = {
  getAllPropostas: async (req, res) => {
    const query = 'SELECT * FROM proposta';

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
}

const controllerBy = {
  GET: controllers.getAllPropostas,
}

export default async function handler(req, res) {
  if (!await authService.isAuthenticated(req)) return res.status(401).json({ message: 'Not authorized' });
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

  res.status(404).json({ message: 'Not found' });
}
