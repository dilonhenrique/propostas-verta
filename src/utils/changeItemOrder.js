import store from "@/store";
import { changeEscopoOrder } from "@/store/reducers/propostaAtual";
import calcularProposta from "./calcularProposta";

export default function changeItemOrder(newOrder){
  store.dispatch(changeEscopoOrder(newOrder));
  calcularProposta();
}