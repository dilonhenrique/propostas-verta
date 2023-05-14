import propostaService from "@/commom/service/propostaService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: []
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
    setListaPropostas: (state, { payload }) => {
      // const prepararLista = await prepareList(payload);
      // console.log(prepararLista);
      // state.data = prepararLista;
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
          state.isLoading = false;
          state.data = payload;
        })
      .addCase(updateListaProposta.rejected,
        (state, { payload }) => {
          state.isLoading = false;
          alert('Erro ao atualizar lista');
        })
  }
})

export const { setListaPropostas } = listaPropostasSlice.actions;
export default listaPropostasSlice.reducer;