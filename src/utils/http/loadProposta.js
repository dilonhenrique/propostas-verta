import store from "@/store";
import { setProposta } from "@/store/reducers/propostaAtual";
import createEscopo from "../propFunctions/createEscopo";
import { addIdToObject } from "../propFunctions/addID";

export async function loadProposta(id) {
  try {
    let conexao = await fetch(`http://localhost:3000/api/propostas/${id[0]}`);
    conexao = await conexao.json();
    conexao = createEscopo(addIdToObject(conexao[0]));
    store.dispatch(setProposta(conexao));
  } catch (err) {
    console.log(err)
  }
}