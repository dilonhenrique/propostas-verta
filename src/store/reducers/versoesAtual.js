import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const versoesAtualSlice = createSlice({
  name: 'versoesAtual',
  initialState,
  reducers: {
    setVersoes: (state, { payload }) => {
      return payload;
    }
  }
})

export const { setVersoes } = versoesAtualSlice.actions;
export default versoesAtualSlice.reducer;