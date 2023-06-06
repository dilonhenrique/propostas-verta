import { createAction, createSlice } from "@reduxjs/toolkit";

const cobranca = {
  parcelas: '',
  vencimento: '',
  aceito: false,
};
const cliente = {
  email: '',
  name: '',
  cpfCnpj: '',
  postalCode: '',
  cityName: '',
  state: '',
  address: '',
  addressNumber: '',
  complement: '',
  province: '',
  changed: true,
};

const initialState = {
  proposta: {},
  cobranca,
  cliente,
  errors: {},
}

export const assinarProposta = createAction('assinatura/assinarProposta');

export const assinaturaSlice = createSlice({
  name: 'assinatura',
  initialState,
  reducers: {
    setProposta: (state, { payload }) => {
      state.proposta = payload;
    },
    setCobranca: (state, { payload }) => {
      state.cobranca = {
        ...state.cobranca,
        ...payload,
      };
    },
    setCliente: (state, { payload }) => {
      state.cliente = {
        ...state.cliente,
        changed: true,
        ...payload,
      };
    },
    setValue: (state, { payload }) => {
      const { key, value } = payload;
      let fieldset;
      if (key in state.cobranca) {
        fieldset = 'cobranca';
      } else {
        fieldset = 'cliente';
        state.cliente.changed = true;
      }
      state[fieldset][key] = value;
    },
    resetCliente: (state, { payload }) => {
      state.cliente = initialState.cliente;
      //['name', 'cpfCnpj', 'postalCode', 'cityName', 'state', 'address', 'addressNumber', 'complement', 'province']
    },
    resetCobranca: (state, { payload }) => {
      state.cobranca = initialState.cobranca;
    },
    setErrors: (state, { payload }) => {
      state.errors = {
        ...state.errors,
        ...payload,
      };
    },
    deleteError: (state, { payload }) => {
      delete state.errors[payload];
    },
    resetErrors: (state, { payload }) => {
      if (payload === 'cliente' || payload === 'cobranca') {
        for (let key in state[payload]) {
          delete state.errors[key]
        }
      } else {
        state.errors = initialState.errors;
      }
    },
  }
})

export const { setProposta, setCobranca, setCliente, setValue, resetCliente, resetCobranca, setErrors, deleteError, resetErrors } = assinaturaSlice.actions;
export default assinaturaSlice.reducer;