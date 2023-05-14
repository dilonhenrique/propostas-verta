import { configureStore } from "@reduxjs/toolkit";
import propostaAtualSlice from "./reducers/propostaAtual";
import versoesAtualSlice from "./reducers/versoesAtual";
import globalStatusSlice from "./reducers/globalStatus";
import listaPropostasSlice from "./reducers/listaPropostas";

const store = configureStore({
  reducer: {
    propostaAtual: propostaAtualSlice,
    versoesAtual: versoesAtualSlice,
    globalStatus: globalStatusSlice,
    listaPropostas: listaPropostasSlice,
  }
})

export default store;