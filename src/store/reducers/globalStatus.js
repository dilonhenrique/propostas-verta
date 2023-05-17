import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  mode: 'neutral',
  darkMode: false,
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
    setDarkMode: (state, { payload }) => {
      state.darkMode = !state.darkMode
    },
  }
})

export const { setGlobalValue, changeLoading, setDarkMode } = globalStatusSlice.actions;
export default globalStatusSlice.reducer;