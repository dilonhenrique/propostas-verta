import { configureStore } from "@reduxjs/toolkit";
import propostaAtualSlice from "./reducers/propostaAtual";
import globalStatusSlice from "./reducers/globalStatus";
import listaPropostasSlice from "./reducers/listaPropostas";
import assinaturaSlice from "./reducers/assinatura";
import createSagaMiddleware from 'redux-saga';
import { assinarPropostaWatcher } from "./sagas/assinar";
import signingSlice from "./reducers/signing";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    propostaAtual: propostaAtualSlice,
    globalStatus: globalStatusSlice,
    listaPropostas: listaPropostasSlice,
    assinatura: assinaturaSlice,
    signing: signingSlice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().prepend(
    sagaMiddleware,
  )
});

sagaMiddleware.run(assinarPropostaWatcher);

export default store;