import store from "@/store";
import { changeItem } from "@/store/reducers/propostaAtual";
import calcularProposta from "../other/calcularProposta";

export default function mudarItem(itemId) {
  return (type) => {
    if(typeof type === 'string'){
      store.dispatch(changeItem({ itemId: itemId, type: type }));
      calcularProposta();
    }
  }
}