import { addIdToObject } from "@/utils/addID";
import { createSlice } from "@reduxjs/toolkit";

const initialState = addIdToObject([
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
])

const fasesAtualSlice = createSlice({
  name: 'fasesAtual',
  initialState,
  reducers: {
    setfasesAtual: (state, { payload }) => {
      const { faseId, key, value } = payload;

      const faseIndex = state.findIndex(fase => fase.id === faseId);
      state[faseIndex][key] = value;
    },
    setTarefa: (state, { payload }) => {
      const { faseId, tarefaId, key, value } = payload;
      
      const faseIndex = state.findIndex(fase => fase.id === faseId);
      const tarefaIndex = state[faseIndex].tarefas.findIndex(tarefa => tarefa.id === tarefaId);
      state[faseIndex].tarefas[tarefaIndex][key] = value;
    }
  }
})

export const { setfasesAtual, setTarefa } = fasesAtualSlice.actions;
export default fasesAtualSlice.reducer;