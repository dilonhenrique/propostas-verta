import store from "@/store";

export async function loadVersoes(numeroProposta) {
  try {
    let listaPropostas = await fetch(`${window.location.origin}/api/propostas`);
    listaPropostas = await listaPropostas.json();

    const versoes = listaPropostas.reduce((acc, proposta) => {
      if (proposta.numeroProposta === numeroProposta) {
        acc.push({
          versao: Number(proposta.versaoProposta),
          id: proposta.id,
        })
      }
      return acc;
    }, []);
    
    return versoes;
  } catch (err) {
    console.log(err)
  }
}