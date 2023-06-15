import propostaService from "@/commom/service/propostaService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  data: [],
  search: '',
  filter: {
    categoria: ['IV', 'NAM', 'NIV', 'EMB', 'DESIGN', 'MOVIE'],
    status: ['aberta', 'aprovada', 'recusada'],
  },
  order: {
    key: 'numeroProposta',
    asc: false,
  },
}

export function prepareList(originalList) {
  let newList = [];
  originalList.forEach((prop, index, lista) => {
    //primeira ocorrência do numeroProposta
    if (lista.findIndex(item => item.numeroProposta === prop.numeroProposta) === index) {
      newList.push({
        numeroProposta: prop.numeroProposta,
        versoes: [{ ...prop }],
      })
    } else {
      const versoesAtual = newList[newList.findIndex(item => item.numeroProposta === prop.numeroProposta)].versoes;
      versoesAtual.push({ ...prop });

      if (prop.status === 'aprovada') {
        //colocar aprovada em primeiro lugar
        const propIndex = versoesAtual.findIndex(item => item.versaoProposta === prop.versaoProposta);
        versoesAtual.splice(propIndex, 1);
        versoesAtual.unshift(prop);
      }
    }
  });
  return newList;
}

export const updateListaProposta = createAsyncThunk('listaPropostas/update', async (lista) => {
  const listaPropostas = lista || await propostaService.getPropostaList();
  return prepareList(listaPropostas);
})

const listaPropostasSlice = createSlice({
  name: 'listaPropostas',
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      if (state.search !== payload)
        state.search = payload;
    },

    setOrder: (state, { payload }) => {
      const asc = state.order.asc;
      state.order = {
        key: payload,
        asc: !asc
      }
    },

    setFilter: (state, { payload }) => {

    },

    setListaPropostas: (state, { payload }) => {
      state.data = prepareList(payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateListaProposta.pending,
        (state, { payload }) => {
          state.isLoading = true;
        })
      .addCase(updateListaProposta.fulfilled,
        (state, { payload }) => {
          state.data = payload;
          state.isLoading = false;
        })
      .addCase(updateListaProposta.rejected,
        (state, { payload }) => {
          state.isLoading = false;
          console.log('Erro ao atualizar lista:', payload)
        })
  }
})

export const { setSearch, setOrder, setFilter, setListaPropostas } = listaPropostasSlice.actions;
export default listaPropostasSlice.reducer;