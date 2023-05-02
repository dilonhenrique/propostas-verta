import store from "@/store";
import { changeEscopoOrder } from "@/store/reducers/propostaAtual";
import calcularProposta from "../other/calcularProposta";

export default function changeItemOrder(newOrder){
  store.dispatch(changeEscopoOrder(newOrder));
  calcularProposta();
}