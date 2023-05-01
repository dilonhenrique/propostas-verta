import { configureStore } from "@reduxjs/toolkit";
import propostaAtualSlice from "./reducers/propostaAtual";
import fasesAtualSlice from "./reducers/fasesAtual";
import custosAtualSlice from "./reducers/custosAtual";
import versoesAtualSlice from "./reducers/versoesAtual";

const store = configureStore({
  reducer: {
    propostaAtual: propostaAtualSlice,
    fasesAtual: fasesAtualSlice,
    custosAtual: custosAtualSlice,
    versoesAtual: versoesAtualSlice,
  }
})

export default store;