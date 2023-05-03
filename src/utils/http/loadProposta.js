import createEscopo from "../propFunctions/createEscopo";
import { addIdToObject } from "../propFunctions/addID";

export async function loadProposta(id) {
  try {
    //baixa a proposta de acordo com id
    let conexao = await fetch(`http://localhost:3000/api/propostas/${id[0]}`);
    conexao = await conexao.json();
    conexao = createEscopo(addIdToObject(conexao[0]));
    return conexao;
  } catch (err) {
    console.log(err)
  }
}