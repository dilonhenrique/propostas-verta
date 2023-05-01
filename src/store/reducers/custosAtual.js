import { addIdToObject } from "@/utils/addID";
import { createSlice } from "@reduxjs/toolkit";

const initialState = addIdToObject([
  { "nome": "Fonte", "valor": "600" }
])

const custosAtualSlice = createSlice({
  name: 'custosAtual',
  initialState,
  reducers: {
    setcustosAtual: (state, { payload }) => {
      const { custoId, key, value } = payload;

      const custoIndex = state.findIndex(custo => custo.id === custoId);
      state[custoIndex][key] = value;
    },
  }
})

export const { setcustosAtual } = custosAtualSlice.actions;
export default custosAtualSlice.reducer;