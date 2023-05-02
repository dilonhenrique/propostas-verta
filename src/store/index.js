import { configureStore } from "@reduxjs/toolkit";
import propostaAtualSlice from "./reducers/propostaAtual";
import versoesAtualSlice from "./reducers/versoesAtual";

const store = configureStore({
  reducer: {
    propostaAtual: propostaAtualSlice,
    versoesAtual: versoesAtualSlice,
  }
})

export default store;