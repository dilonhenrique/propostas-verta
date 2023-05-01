import { createSlice } from "@reduxjs/toolkit";

const initialState = [1, 2, 3]

const versoesAtualSlice = createSlice({
  name: 'versoesAtual',
  initialState,
  reducers: {}
})

export default versoesAtualSlice.reducer;