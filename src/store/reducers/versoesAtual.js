import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const versoesAtualSlice = createSlice({
  name: 'versoesAtual',
  initialState,
  reducers: {
    resetVersoes: () => {
      return initialState;
    },

    setVersoes: (state, { payload }) => {
      return payload;
    }
  }
})

export const { resetVersoes, setVersoes } = versoesAtualSlice.actions;
export default versoesAtualSlice.reducer;