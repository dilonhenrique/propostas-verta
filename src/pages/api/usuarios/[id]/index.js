import { authService } from "../../authService";
import { executeQuery } from "../../db";
import { hashPass } from "../../login";

const controllers = {
  getUserById: async (req, res) => {
    const id = req.query.id;
    const query = `SELECT * FROM usuarios WHERE id = ${id}`;

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

  saveUserById: async (req, res) => {
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
        if (key === 'password' || key === 'senha' || key === 'Senha') {
          val = await hashPass(val);
        }
        keyval.push(key + " = '" + val + "'");
      }
    }
    
    const updated = keyval.join(", ");
    const query = `UPDATE usuarios SET ${updated} WHERE id = ${id}`;

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

  deleteUserById: async (req, res) => {
    const id = req.query.id;
    const query = `DELETE FROM usuarios WHERE id = ${id}`;

    try {
      const result = await executeQuery({
        query,
      });

      if (result.affectedRows > 0) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ message: 'Nenhum usuário encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ops! Algo deu errado' });
    }
  }
}

const controllerBy = {
  GET: controllers.getUserById,
  POST: controllers.saveUserById,
  DELETE: controllers.deleteUserById,
}

export default async function handler(req, res) {
  if (await authService.isAuthenticated(req)) {
    if (controllerBy[req.method]) return controllerBy[req.method](req, res);

    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(401).json({ message: 'Not authorized' });
}
