import store from "@/store";
import { errorHandler } from "../utils/stepperValidation";
import { setValue } from "@/store/reducers/assinatura";

function handleChange(key) {
  return (evento) => {
    const value =
      evento.target?.type === "checkbox"
        ? evento.target.checked
        : evento.target
          ? evento.target.value
          : evento.$d.toISOString()

    store.dispatch(setValue({ key, value }));
    errorHandler.delete(key);
  }
}

function register(key) {
  const state = store.getState()
  const dados = state.assinatura;

  let fieldset;
  if (key in dados.cobranca) {
    fieldset = 'cobranca'
  } else {
    fieldset = 'cliente'
  }

  return {
    value: dados[fieldset][key],
    onChange: handleChange(key),
    error: Boolean(dados.errors[key]),
    // helperText: dados.errors[key] || ' ',
  }
}

export function useAssinaturaForm() {
  return {
    register
  }
}