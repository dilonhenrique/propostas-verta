import { authService } from "../authService";
import { executeQuery } from "../db";

export function translateDbToJs(prop) {
  let newObj = { ...prop };
  if (typeof prop.escopo === 'string') {
    if (prop.escopo === 'null') {
      newObj.escopo = null;
    } else {
      newObj.escopo = JSON.parse(prop.escopo)
    }
  }
  if (typeof prop.fases === 'string') {
    newObj.fases = JSON.parse(prop.fases)
  }
  if (typeof prop.custosFixos === 'string') {
    newObj.custosFixos = JSON.parse(prop.custosFixos)
  }
  newObj.temNota = !!newObj.temNota;
  newObj.customParcela = !!newObj.customParcela;
  newObj.customPrazo = !!newObj.customPrazo;
  newObj.excluido = !!newObj.excluido;

  return newObj;
}

const controllers = {
  getAllPropostas: async (req, res) => {
    const query = 'SELECT * FROM proposta WHERE excluido = 0';


    try {
      const results = await executeQuery({
        query,
      });

      if (results.length > 0) {
        const formatedResult = results.map(prop => {
          const { nomeProjeto, numeroProposta, versaoProposta, categoria, cliente, marca, valorTotal, status, id } = prop;
          const propSimplificada = { nomeProjeto, numeroProposta, versaoProposta, categoria, cliente, marca, valorTotal, status, id };
          return translateDbToJs(propSimplificada);
        })
        res.status(200).json(formatedResult);
      } else {
        res.status(404).json({ message: 'Nenhuma proposta encontrada' });
      }

    } catch (error) {
      res.status(500).json({ message: 'Ops! Algo deu errado' });
    }
  },

  saveNewProposta: async (req, res) => {
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
    const query = `INSERT INTO proposta SET ${updated}`;
    // 'INSERT INTO '.self::$table.' ('.$key.') VALUES ('.$val.')';

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
}

const controllerBy = {
  GET: controllers.getAllPropostas,
  POST: controllers.saveNewProposta,
}

export default async function handler(req, res) {
  if (!await authService.isAuthenticated(req)) return res.status(401).json({ message: 'Not authorized' });
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

  res.status(404).json({ message: 'Not found' });
}
