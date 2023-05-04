import store from "@/store";
import { addItem, changeEscopoOrder, changeItem, removeItem, setCusto, setEscopo, setValue } from "@/store/reducers/propostaAtual";
import Router from "next/router";
import calcularProposta from "../utils/calcularProposta";
import calculaveis from "../utils/calculaveis";

const propostaDispatcher = {
  addItem: (tipo = 'escopo', beforeId) => {
    if (beforeId) return store.dispatch(addItem({ type: tipo, beforeId: beforeId, autoFocus: true }));
    return () => {
      store.dispatch(addItem({ type: tipo }))
    }
  },

  changeHandler: (key, itemId) => {
    return (evento) => {
      let value = evento.target.value;
      if (key === 'pessoas' && evento.target.value == '') value = 1;
      if (calculaveis.includes(key) && typeof value === 'string') value = Number(value);
      if (evento.target.classList?.contains('MuiSwitch-input')) value = evento.target.checked;

      const { propostaAtual } = store.getState();

      const payload = { key, value, itemId }

      if (itemId) {
        const itemIndex = propostaAtual.escopo.findIndex(item => item.id === itemId)
        const custoIndex = propostaAtual.custosFixos.findIndex(custo => custo.id === itemId);

        if (itemIndex >= 0) {
          if (propostaAtual.escopo[itemIndex][key] != value) {
            store.dispatch(setEscopo(payload));
            calcularProposta(key, itemIndex);
          }
        } else if (propostaAtual.custosFixos[custoIndex][key] != value) {
          store.dispatch(setCusto(payload));
          calcularProposta(key, custoIndex);
        }
      } else {
        if (propostaAtual[key] != value) {
          store.dispatch(setValue(payload));
          calcularProposta(key);
        }
      }
    }
  },

  reorderTasks: (newOrder) => {
    store.dispatch(changeEscopoOrder(newOrder));
    calcularProposta();
  },

  deleteItem: (itemId) => {
    return () => {
      store.dispatch(removeItem({ itemId: itemId }));
      calcularProposta();
    }
  },

  keyDownHandler: (type, itemId) => {
    return (evento) => {
      if (evento.keyCode === 13) {
        propostaDispatcher.addItem(type, itemId);
      }
    }
  },

  changeItemType: (itemId) => {
    return (type) => {
      if (typeof type === 'string') {
        store.dispatch(changeItem({ itemId: itemId, type: type }));
        calcularProposta();
      }
    }
  },

  versionSwitcher: (router) => {
    return (evento) => {
      const versaoSelecionada = evento.target.value;
      const { versoesAtual } = store.getState();
      const { id } = versoesAtual.find(versao => versao.versao === versaoSelecionada);

      // store.dispatch(changeLoading(true));
      // router.push(`/editar/${id}`);
      Router.push(`/editar/${id}`);
    }
  },
}

export default propostaDispatcher;