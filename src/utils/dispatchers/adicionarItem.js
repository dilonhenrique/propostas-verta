import store from "@/store";
import { addItem } from "@/store/reducers/propostaAtual";

export default function adicionarItem(tipo = 'escopo', beforeId) {
  if (beforeId) return store.dispatch(addItem({type: tipo, beforeId: beforeId}))
  return () => {
    store.dispatch(addItem({type: tipo}))
  }
}