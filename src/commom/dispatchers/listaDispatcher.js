import store from "@/store";
import { setOrder } from "@/store/reducers/listaPropostas";

const listaDispatcher = {
  setOrder: (key) => {
    store.dispatch(setOrder(key))
  }
}

export default listaDispatcher;