import store from "@/store"
import calculaveis from "./calculaveis";
import { setEscopo, setFase, setValue } from "@/store/reducers/propostaAtual";

export default function calcularProposta(key) {
  if (key === undefined || calculaveis.includes(key)) {


    for (let pIndex, acc, i = 0, { propostaAtual } = store.getState(); i < propostaAtual.escopo.length; i++) {
      const item = propostaAtual.escopo[i];
      if (item.tipo === 'fase') {
        if (pIndex !== undefined) {
          store.dispatch(setEscopo({
            key: 'tempo',
            value: acc,
            itemId: propostaAtual.escopo[pIndex].id
          }))
        }
        pIndex = i;
        acc = 0;
      } else {
        let adicionar = item.tipo === 'terceirizada'
          ? item.valor === '' ? 0 : Math.ceil(Number(item.valor) / Number(propostaAtual.horaTecnica)) || 0
          : item.tempo === '' ? 0 : Number(item.tempo) * Number(item.pessoas === '' ? 1 : item.pessoas)
        acc += adicionar;
      }
      if (i === propostaAtual.escopo.length - 1) {
        store.dispatch(setEscopo({
          key: 'tempo',
          value: acc,
          itemId: propostaAtual.escopo[pIndex].id
        }))
      }
    }

    const { propostaAtual } = store.getState();
    const cargaHoraria = propostaAtual.escopo.reduce((acc, item) => item.tipo === 'fase' ? acc + Number(item.tempo) : acc, 0);

    if (cargaHoraria > 0) {
      const totalCustosFixos = propostaAtual.custosFixos.reduce((acc, custo) => acc + Number(custo.valor), 0);
      const totalTarefas = cargaHoraria * propostaAtual.horaTecnica;
      let totalDesconto, parcelas, valorNota;

      if (!propostaAtual.customParcela) {
        parcelas = Math.floor((totalTarefas + totalCustosFixos) / propostaAtual.parcelaMinima);
        parcelas == 0 ? parcelas = 1 : null;
      } else { parcelas = propostaAtual.parcelas }
      if (!propostaAtual.customPrazo) {
        store.dispatch(setValue({ key: 'prazoEntrega', value: Math.floor(cargaHoraria / 7, 5) }));
      }

      const totalCustoBoleto = parcelas * propostaAtual.custoBoleto;

      if (propostaAtual.descontoPrevisto) {
        totalDesconto = Math.floor(((1 / (1 - (propostaAtual.descontoPrevisto / 100))) - 1) * (totalTarefas + totalCustosFixos + totalCustoBoleto) * 100) / 100;
      } else {
        totalDesconto = 0
      }

      if (propostaAtual.temNota) {
        valorNota = Math.floor(1 + (((1 / (1 - propostaAtual.porcentagemNota / 100)) - 1) * (totalTarefas + totalCustosFixos + totalCustoBoleto + totalDesconto)) * 100) / 100;
      } else {
        valorNota = 0
      }

      let valorHora = Math.floor((totalTarefas + totalCustosFixos + totalCustoBoleto + totalDesconto + valorNota) / cargaHoraria);
      let valorTotal = Math.floor(valorHora * cargaHoraria * 100) / 100;

      if (parcelas == 1) {
        store.dispatch(setValue({ key: 'valorVista', value: valorTotal }));
      } else {
        store.dispatch(setValue({ key: 'valorVista', value: Math.floor((valorTotal - (valorTotal * (propostaAtual.descontoVista) / 100)) * 100) / 100 }));
      }

      store.dispatch(setValue({ key: 'cargaHoraria', value: cargaHoraria }));
      store.dispatch(setValue({ key: 'parcelas', value: parcelas }));
      store.dispatch(setValue({ key: 'valorNota', value: valorNota }));
      store.dispatch(setValue({ key: 'valorHora', value: valorHora }));
      store.dispatch(setValue({ key: 'valorTotal', value: valorTotal }));

    } else {

      if (!propostaAtual.customParcela) { store.dispatch(setValue({ key: 'parcelas', value: '' })) };
      if (!propostaAtual.customPrazo) { store.dispatch(setValue({ key: 'prazoEntrega', value: '' })) };
      store.dispatch(setValue({ key: 'valorNota', value: '' }));
      store.dispatch(setValue({ key: 'valorHora', value: '' }));
      store.dispatch(setValue({ key: 'valorTotal', value: '' }));
      store.dispatch(setValue({ key: 'valorVista', value: '' }));
    }
  }
}