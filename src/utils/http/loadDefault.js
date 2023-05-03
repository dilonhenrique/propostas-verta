import store from "@/store";
import { setValue } from "@/store/reducers/propostaAtual";
import { nextProposta } from "./nextProposta";
import { changeLoading } from "@/store/reducers/globalStatus";

export async function loadDefault() {
  try {
    let conexao = await fetch(`${window.location.origin}/api/defaultParams`);
    conexao = await conexao.json();
    
    return conexao;
    
  } catch (err) {
    console.log(err)
  }
}