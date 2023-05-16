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

async function prepareList(list) {
  //organiza em ordem do numero da proposta
  list = list.sort((a, b) => b.numeroProposta - a.numeroProposta);

  //deleta informações desnecessárias
  list = list.map(propostaAtual => {
    const { cliente, id, nomeProjeto, numeroProposta, versaoProposta, valorTotal, status, marca } = propostaAtual;
    return { cliente, id, nomeProjeto, numeroProposta, versaoProposta, valorTotal, status, marca, }
  });

  //organiza as versões como filhas das propostas pai
  const newList = list.filter(propostaAtual => {
    const todasVersoes = list.filter(prop => prop.numeroProposta === propostaAtual.numeroProposta);
    const aprovada = todasVersoes.filter(prop => prop.status === 'aprovada');
    const menorVersao = todasVersoes.reduce((acc, prop) => {
      if (prop.versaoProposta < acc.versaoProposta) {
        return prop.versaoProposta
      }
      return acc
    }, todasVersoes[0].versaoProposta);

    //se é a proposta-pai...
    if ((!aprovada.length && propostaAtual.versaoProposta === menorVersao) || (aprovada[0]?.versaoProposta === propostaAtual.versaoProposta)) {
      //define as versões alternativas da proposta-pai
      propostaAtual.versoes = todasVersoes.filter(prop => prop.versaoProposta !== propostaAtual.versaoProposta);

      if (propostaAtual.status === 'aprovada') {
        //se ela estiver como aprovada, define as filhas como aprovadas indiretamente
        propostaAtual.versoes?.forEach(async prop => {
          prop.status !== 'aprovada*'
            ? await propostaService.changeStatus(prop.id, 'aprovada*')
            : null
        })
      } else {
        async function changeToAberta(prop) {
          if (prop.status === 'aprovada*') {
            return await propostaService.changeStatus(prop.id, 'aberta');
          }
        }
        //se não, define as filhas e ela mesma como aberta, caso ainda estejam aprovadas indiretamente
        changeToAberta(propostaAtual);
        propostaAtual.versoes?.forEach(prop => {
          changeToAberta(prop);
        })
      }

      return propostaAtual;
    }
  })

  return newList;
}

export const updateListaProposta = createAsyncThunk('listaPropostas/update', async (lista) => {
  const listaPropostas = lista || await propostaService.getPropostaList();
  return await prepareList(listaPropostas);
})

const listaPropostasSlice = createSlice({
  name: 'listaPropostas',
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      if(state.search !== payload)
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
          alert('Erro ao atualizar lista');
        })
  }
})

export const { setSearch, setOrder, setFilter } = listaPropostasSlice.actions;
export default listaPropostasSlice.reducer;