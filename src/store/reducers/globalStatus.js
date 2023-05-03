import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  mode: 'list'
}

const globalStatusSlice = createSlice({
  name: 'globalStatus',
  initialState,
  reducers: {
    setGlobalValue: (state, { payload }) => {
      const { key, value } = payload;
      if (state[key] != value) {
        state[key] = value;
      }
    },
    changeLoading: (state, { payload }) => {
      if(typeof payload === "boolean"){
        state.loading = payload
      } else {
        state.loading = !state.loading
      }
    },
  }
})

export const { setGlobalValue, changeLoading } = globalStatusSlice.actions;
export default globalStatusSlice.reducer;