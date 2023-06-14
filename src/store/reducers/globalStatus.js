import authService from "@/commom/service/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateUser = createAsyncThunk('globalStatus/update', async (ctx = null) => {
  try {
    const session = await authService.getSession(ctx);
    return session.data;
  } catch(err){
    throw new Error(err)
  }
})

const initialState = {
  loading: false,
  mode: 'neutral',
  darkMode: false,
  user: {},
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
      if (typeof payload === "boolean") {
        state.loading = payload
      } else {
        state.loading = !state.loading
      }
    },
    setDarkMode: (state, { payload }) => {
      state.darkMode = !state.darkMode
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateUser.fulfilled,
        (state, { payload }) => {
          state.user = payload;
        })
      .addCase(updateUser.rejected,
        (state, { payload }) => {
          console.log(payload);
        })
  }
})

export const { setGlobalValue, changeLoading, setDarkMode, setUser } = globalStatusSlice.actions;
export default globalStatusSlice.reducer;