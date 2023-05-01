import store from "@/store";
import { addItem } from "@/store/reducers/propostaAtual";

export default function adicionarItem(tipo = 'escopo') {
  return () => {
    store.dispatch(addItem(tipo))
  }
}