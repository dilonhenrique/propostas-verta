import { put, select, takeLatest } from 'redux-saga/effects';
import { setCliente, setDados } from "../reducers/assinatura";

export function* salvarClienteWatcher() {
  yield takeLatest(setCliente, salvarClienteWorker);
}

function* salvarClienteWorker() {
  const clienteSalvo = yield select(state => state.assinatura.cliente);
  
  if (clienteSalvo.id) {
    yield put(setDados({
      name: { value: clienteSalvo.name, error: false },
      cpfCnpj: { value: clienteSalvo.cpfCnpj, error: false },
      postalCode: { value: clienteSalvo.postalCode, error: false },
      cityName: { value: clienteSalvo.cityName, error: false },
      state: { value: clienteSalvo.state, error: false },
      address: { value: clienteSalvo.address, error: false },
      addressNumber: { value: clienteSalvo.addressNumber, error: false },
      complement: { value: clienteSalvo.complement, error: false },
      province: { value: clienteSalvo.province, error: false },
    }))
  }
}