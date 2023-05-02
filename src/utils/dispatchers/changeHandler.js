import store from "@/store"
import { setCusto, setEscopo, setFase, setTarefa, setValue } from "@/store/reducers/propostaAtual";
import calcularProposta from "../other/calcularProposta";
import calculaveis from "../other/calculaveis";

export function changeHandler(key, itemId) {
  return (evento) => {
    let value = evento.target.value;
    if (key === 'pessoas' && evento.target.value == '') value = 1;
    if (calculaveis.includes(key) && typeof value === 'string') value = Number(value);
    if (evento.target.classList.contains('MuiSwitch-input')) value = evento.target.checked;

    const { propostaAtual } = store.getState();

    const payload = { key, value, itemId }

    if (itemId) {
      const itemIndex = propostaAtual.escopo.findIndex(item => item.id === itemId)
      const custoIndex = propostaAtual.custosFixos.findIndex(custo => custo.id === itemId);

      if(itemIndex >= 0){
        if (propostaAtual.escopo[itemIndex][key] != value) {
          store.dispatch(setEscopo(payload));
          calcularProposta(key, itemIndex);
        }
      } else if (propostaAtual.custosFixos[custoIndex][key] != value) {
        store.dispatch(setCusto(payload));
        calcularProposta(key, custoIndex);
      }
    } else {
      if (propostaAtual[key] != value) {
        store.dispatch(setValue(payload));
        calcularProposta(key);
      }
    }
  }
}