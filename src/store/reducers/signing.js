import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  mensagem: 'Iniciando...',
  porcentagem: 0,
  error: false
}

export const signingSlice = createSlice({
  name: 'signing',
  initialState,
  reducers: {
    resetSigning: (state, { payload }) => {
      return initialState;
    },
    setSigning: (state, { payload }) => {
      return payload;
    },
  }
})

export const { resetSigning, setSigning } = signingSlice.actions;
export default signingSlice.reducer;