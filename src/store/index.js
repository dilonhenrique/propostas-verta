import { configureStore } from "@reduxjs/toolkit";
import propostaAtualSlice from "./reducers/propostaAtual";
import globalStatusSlice from "./reducers/globalStatus";
import listaPropostasSlice from "./reducers/listaPropostas";

const store = configureStore({
  reducer: {
    propostaAtual: propostaAtualSlice,
    globalStatus: globalStatusSlice,
    listaPropostas: listaPropostasSlice,
  }
})

export default store;