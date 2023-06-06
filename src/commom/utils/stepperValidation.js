import store from "@/store";
import validaCpfCnpj from "./validaCpfCnpj";
import { deleteError, resetErrors, setError, setErrors } from "@/store/reducers/assinatura";
import dayjs from "dayjs";

export const validateStep = {
  0: () => {
    const obrigatorios = ['parcelas', 'vencimento'];
    return validateField(obrigatorios, 'cobranca');
  },
  1: () => {
    const obrigatorios = ['email', 'name', 'cpfCnpj', 'cityName', 'state', 'address', 'addressNumber', 'province', 'postalCode'];
    return validateField(obrigatorios, 'cliente');
  },
  2: () => {
    return validateField('aceito', 'cobranca');
  },
}

export const validateField = (campo, fieldset = 'cliente') => {
  if (typeof campo === 'object') {
    let validate = true;
    campo.forEach(cmp => {
      if (!validateField(cmp, fieldset)) validate = false;
    })
    return validate;
  } else {
    const { assinatura } = store.getState();

    const validate = (campo in controllerValidate)
      ? controllerValidate[campo](assinatura[fieldset][campo])
      : controllerValidate.generic(assinatura[fieldset][campo])

    if (!validate) {
      errorHandler.set(campo)
    }

    return validate;
  }
}

export const controllerValidate = {
  vencimento: (value) => {
    if (!dayjs(value).isValid()) return false;

    const vcto = dayjs(value);
    const diff = vcto.diff(dayjs(), 'days')
    if (diff > 30 || diff < 0) return false;

    return true;
  },
  email: (value) => {
    const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (value.match(validRegex)) {
      return true;
    }
    return false;
  },
  cpfCnpj: (value) => {
    return validaCpfCnpj(value)
  },
  cep: (value) => {
    value = value.replace(/\.|-/g, "")

    let repetidos = [
      '00000000',
      '11111111',
      '22222222',
      '33333333',
      '44444444',
      '55555555',
      '66666666',
      '77777777',
      '88888888',
      '99999999'
    ].includes(value)

    if (value.length !== 8 || repetidos) {
      return false
    } else {
      return true
    }
  },
  aceito: (value) => {
    return value;
  },
  generic: (value) => {
    if (value === '' || value === ' ') {
      return false;
    }
    return true;
  },
}

export const errorHandler = {
  delete: (campo) => {
    store.dispatch(deleteError(campo));
  },
  reset: (fieldset) => {
    store.dispatch(resetErrors(fieldset));
  },
  set: (campo, errorMessage = 'Preencha este campo corretamente') => {
    store.dispatch(setErrors({ [campo]: errorMessage }));
  },
}