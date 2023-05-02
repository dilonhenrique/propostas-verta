import store from "@/store";
import { setProposta, setValue } from "@/store/reducers/propostaAtual";
import createEscopo from "../propFunctions/createEscopo";
import { addIdToObject } from "../propFunctions/addID";

export async function loadDefault() {
  try {
    let conexao = await fetch(`http://localhost:3000/api/defaultParams`);
    conexao = await conexao.json();
    for (let key in conexao) {
      store.dispatch(setValue({ key, value: conexao[key] }))
    }
    // store.dispatch(setProposta(conexao));
  } catch (err) {
    console.log(err)
  }
}