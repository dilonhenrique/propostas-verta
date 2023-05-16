import { addIdToObject } from "@/commom/propFunctions/addID";
import createEscopo from "@/commom/propFunctions/createEscopo";
import propostaService from "@/commom/service/propostaService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export const updateProposta = createAsyncThunk('propostaAtual/update', async (id) => {
  if (id) {
    const data = await propostaService.getSingleProposta(id);
    const versoes = await propostaService.getVersions(data.numeroProposta);

    return { data, versoes, isSaved: true }
  }

  const defaultParams = await propostaService.getDefaultParams();
  const numeroProposta = await propostaService.getNextProposta();

  return { data: { ...defaultParams, numeroProposta }, isSaved: true }
})

const example = {
  "id": "72",
  "numeroProposta": "1482",
  "versaoProposta": "1",
  "cliente": "Leandro Ang",
  "marca": "Cimenfort",
  "nomeProjeto": "Identidade visual",
  "descricaoProjeto": "criação de identidade visual estratégica",
  "categoria": "IV",
  "fases": [
    {
      "nome": "Fase 01: imersão",
      "tempo": 10,
      "tarefas": [
        { "nome": "Briefing inicial", "tempo": "2", "pessoas": 1 }, { "nome": "Pesquisa de público alvo", "tempo": "2", "pessoas": 1 }, { "nome": "Pesquisa de concorrentes diretos", "tempo": "2", "pessoas": 1 }, { "nome": "Pesquisa de cultural: hábitos de compra e PDV", "tempo": "4", "pessoas": 1 }
      ]
    },
    {
      "nome": "Fase 02: definição",
      "tempo": 18,
      "tarefas": [
        { "nome": "Possibilidades de posicionamento", "tempo": "2", "pessoas": 1 }, { "nome": "Definição da personalidade da marca", "tempo": "4", "pessoas": 1 }, { "nome": "Mensagem principal da marca", "tempo": "4", "pessoas": 1 }, { "nome": "Direcionamento visual (com referências)", "tempo": "4", "pessoas": 1 }, { "nome": "Análise da arquitetura de marca (sinergia entre as submarcas)", "tempo": "2", "pessoas": 1 }, { "nome": "Apresentação do posicionamento", "tempo": "2", "pessoas": 1 }
      ]
    },
    {
      "nome": "Fase 03: criação",
      "tempo": 50,
      "tarefas": [
        { "nome": "Criação de logotipo e/ou símbolo Cimenfort", "tempo": "18", "pessoas": 1 }, { "nome": "Criação de padrão visual: cores, tipografia e grafismos", "tempo": "18", "pessoas": 1 }, { "nome": "Criação de até 5 submarcas simples (sem símbolo exclusivo)", "tempo": "10", "pessoas": 1 }, { "nome": "Apresentação do padrão visual", "tempo": "2", "pessoas": "2" }
      ]
    },
    {
      "nome": "Fase 04: execução",
      "tempo": 16,
      "tarefas": [
        { "nome": "Refinamento das submarcas", "tempo": "2", "pessoas": 1 }, { "nome": "Criação de até 10 materiais coringas básicos à escolha", "tempo": "12", "pessoas": 1 }, { "nome": "Criação gráfica de até 6 embalagens de produto", "tempo": "", "pessoas": 1 }, { "nome": "Finalização e entrega do projeto", "tempo": "2", "pessoas": 1 }
      ]
    }
  ],
  "custosFixos": [
    { "nome": "Fonte", "valor": "600" }
  ],
  "horaTecnica": 120.00,
  "custoBoleto": 2.99,
  "parcelaMinima": 1200.00,
  "descontoVista": 10,
  "descontoPrevisto": 0,
  "porcentagemNota": 6,
  "temNota": true,
  "valorNota": 759.07,
  "customPrazo": true,
  "prazoEntrega": "8",
  "customParcela": true,
  "parcelas": "4",
  "valorHora": 134,
  "cargaHoraria": 94,
  "valorTotal": 12596,
  "valorVista": 11336.4,
  "status": "aberta",
  "contrato": ""
}

const blank = {
  isLoading: true,
  isSaved: false,
  versoes: [],
  data: {
    //"id": "72", //cria automaticamente ao salvar
    "numeroProposta": "0000", //get from server
    "versaoProposta": "1",
    "cliente": "",
    "marca": "",
    "nomeProjeto": "",
    "descricaoProjeto": "",
    "categoria": "IV",
    "escopo": [
      {
        "id": v4(),
        "tipo": "fase",
        "nome": "",
        "tempo": 0,
      },
      {
        "id": v4(),
        "tipo": "tarefa",
        "nome": "",
        "tempo": "",
        "pessoas": "",
      },
      {
        "id": v4(),
        "tipo": "tarefa",
        "nome": "",
        "tempo": "",
        "pessoas": "",
      }
    ],
    "custosFixos": [
      { "nome": "", "valor": "" }
    ],
    "horaTecnica": 120.00, //get from server (defaultProps)
    "custoBoleto": 2.99, //get from server (defaultProps)
    "parcelaMinima": 1200.00, //get from server (defaultProps)
    "descontoVista": 10, //get from server (defaultProps)
    "descontoPrevisto": 0,
    "porcentagemNota": 6, //get from server (defaultProps)
    "temNota": true, //get from server (defaultProps)
    "valorNota": "",
    "customPrazo": false,
    "prazoEntrega": "",
    "customParcela": false,
    "parcelas": "",
    "valorHora": "",
    "cargaHoraria": 0,
    "valorTotal": 0,
    "valorVista": 0,
    "status": "aberta",
    "contrato": ""
  }
}

const initialState = {...blank, data: createEscopo(addIdToObject(blank.data))}
delete initialState.data.id;

const propostaAtualSlice = createSlice({
  name: 'propostaAtual',
  initialState,
  reducers: {
    resetProposta: () => {
      return initialState;
    },

    setLoading: (state, { payload }) => {
      state.isLoading = payload || true;
    },

    setSaved: (state, { payload }) => {
      state.isSaved = payload || true;
    },

    setVersoes: (state, { payload }) => {
      state.versoes = payload;
    },

    setProposta: (state, { payload }) => {
      state.data = payload;
    },

    setValue: (state, { payload }) => {
      const { key, value } = payload;
      if (state.data[key] != value) {
        state.data[key] = value;
        state.isSaved = false;
      }
    },

    setEscopo: (state, { payload }) => {
      const { itemId, key, value } = payload;

      const itemIndex = state.data.escopo.findIndex(item => item.id === itemId);
      state.data.escopo[itemIndex][key] = value;
      state.isSaved = false;
    },

    changeEscopoOrder: (state, { payload }) => {
      state.data.escopo = payload;
      state.isSaved = false;
    },

    setCusto: (state, { payload }) => {
      const { itemId, key, value } = payload;

      const custoIndex = state.data.custosFixos.findIndex(custo => custo.id === itemId);
      state.data.custosFixos[custoIndex][key] = value;
      state.isSaved = false;
    },

    removeItem: (state, { payload }) => {
      const { itemId } = payload;

      state.data.escopo = state.data.escopo.filter(item => item.id !== itemId)
      state.data.custosFixos = state.data.custosFixos.filter(custo => custo.id !== itemId)
      state.isSaved = false;
    },

    addItem: (state, { payload }) => {
      const { type, beforeId, autoFocus } = payload;

      let obj = { id: v4() }
      let index = state.data[type].length + 2;

      if (type === 'escopo') {
        obj.tipo = 'tarefa';
        obj.nome = '';
        obj.tempo = '';
        obj.pessoas = '';
      } else {
        obj.nome = '';
        obj.valor = '';
      }
      if (autoFocus) { obj.autoFocus = true }

      if (beforeId) {
        const itemIndex = state.data[type].findIndex(item => item.id === beforeId)
        if (itemIndex >= 0) {
          index = itemIndex + 1;
        }
      }

      state.data[type].splice(index, 0, obj);
      state.isSaved = false;
    },

    changeItem: (state, { payload }) => {
      const { itemId, type } = payload;
      const itemIndex = state.data.escopo.findIndex(item => item.id === itemId);

      state.data.escopo[itemIndex].tipo = type;
      state.isSaved = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateProposta.pending,
        (state, { payload }) => {
          state.isLoading = true;
        })
      .addCase(updateProposta.fulfilled,
        (state, { payload }) => {
          return {
            ...initialState,
            ...payload,
            data: {
              ...initialState.data,
              ...payload.data,
            },
            isLoading: false
          };
        })
      .addCase(updateProposta.rejected,
        (state, { payload }) => {
          alert('Erro ao atualizar lista');
          return { ...initialState, isLoading: false };
        })
  }
})

export const { setSaved, setLoading, setVersoes, resetProposta, setProposta, setValue, setCusto, setEscopo, removeItem, addItem, changeItem, changeEscopoOrder } = propostaAtualSlice.actions;
export default propostaAtualSlice.reducer;