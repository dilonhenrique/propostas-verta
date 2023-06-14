import { authService } from "../authService";
import { executeQuery } from "../db";
import { hashPass } from "../login";

const controllers = {
  getAllUsers: async (req, res) => {
    const query = 'SELECT * FROM usuarios';

    try {
      const results = await executeQuery({
        query,
      });

      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ message: 'Nenhum usuário encontrado' });
      }

    } catch (error) {
      res.status(500).json({ message: 'Ops! Algo deu errado' });
    }
  },

  saveNewUser: async (req, res) => {
    const data = req.body;

    const sameEmail = await executeQuery({query: `SELECT * FROM usuarios WHERE Email = '${req.body.Email}'`});
    if(sameEmail.length > 0) return res.status(404).json({ emailExists: true, message: 'Este email já existe' });

    let keyval = [];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let val = data[key];
        if (Array.isArray(val)) {
          val = JSON.stringify(val);
        }
        if (val === false || val === true) {
          val = Number(val);
        }
        if (key === 'password' || key === 'senha' || key === 'Senha') {
          val = await hashPass(val);
        }
        keyval.push(key + " = '" + val + "'");
      }
    }

    const updated = keyval.join(", ");
    const query = `INSERT INTO usuarios SET ${updated}`;
    // 'INSERT INTO '.self::$table.' ('.$key.') VALUES ('.$val.')';

    // res.status(200).json({data:query})
    try {
      const result = await executeQuery({
        query,
      });

      if (result.affectedRows > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Nenhum usuário encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ops! Algo deu errado' });
    }
  },
}

const controllerBy = {
  GET: controllers.getAllUsers,
  POST: controllers.saveNewUser,
}

export default async function handler(req, res) {
  if (await authService.isAuthenticated(req)) {
    if (controllerBy[req.method]) return controllerBy[req.method](req, res);

    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(401).json({ message: 'Not authorized' });
}
