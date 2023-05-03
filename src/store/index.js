import { configureStore } from "@reduxjs/toolkit";
import propostaAtualSlice from "./reducers/propostaAtual";
import versoesAtualSlice from "./reducers/versoesAtual";
import globalStatusSlice from "./reducers/globalStatus";

const store = configureStore({
  reducer: {
    propostaAtual: propostaAtualSlice,
    versoesAtual: versoesAtualSlice,
    globalStatus: globalStatusSlice,
  }
})

export default store;