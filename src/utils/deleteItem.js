import store from "@/store";
import { removeItem } from "@/store/reducers/propostaAtual";
import calcularProposta from "./calcularProposta";

export default function deleteItem(itemId) {
  return () => {
    store.dispatch(removeItem({ itemId: itemId }));
    calcularProposta();
  }
}