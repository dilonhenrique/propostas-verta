import store from "@/store";
import { setValue } from "@/store/reducers/propostaAtual";

export async function nextProposta() {
  try {
    let listaPropostas = await fetch(`http://localhost:3000/api/propostas`);
    listaPropostas = await listaPropostas.json();

    let amostragem = 10 //x últimas propostas (performance)

    let maior = listaPropostas[0];
    for (let i = listaPropostas.length - amostragem; i < listaPropostas.length; i++) {
      const proposta = listaPropostas[i];
      if(proposta.numeroProposta > maior.numeroProposta){
        maior = proposta
      }
    }

    return maior.numeroProposta + 1;
  } catch (err) {
    console.log(err)
  }
}