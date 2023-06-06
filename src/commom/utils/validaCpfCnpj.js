export default function validaCpfCnpj(numero) {
  numero = String(numero).replace(/[^\d]/g, '');

  if (numero.length <= 11) {
    return validaCpf(numero);
  } else {
    return validaCnpj(numero);
  }
}

function validaCpf(cpf) {
  cpf = cpf.replace(/\.|-/g, "")

  let repetidos = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ].includes(cpf)

  if (repetidos || primeiroDigito(cpf) || segundoDigito(cpf)) {
    return false
  } else {
    return true
  }
}

function primeiroDigito(cpf) {
  let soma = 0
  let multiplicador = 10

  for (let tamanho = 0; tamanho < 9; tamanho++) {
    soma += cpf[tamanho] * multiplicador
    multiplicador--
  }

  soma = (soma * 10) % 11
  if (soma == 10 || soma == 11) {
    soma = 0
  }

  return soma != cpf[9]
}

function segundoDigito(cpf) {
  let soma = 0
  let multiplicador = 11

  for (let tamanho = 0; tamanho < 10; tamanho++) {
    soma += cpf[tamanho] * multiplicador
    multiplicador--
  }

  soma = (soma * 10) % 11
  if (soma == 10 || soma == 11) {
    soma = 0
  }

  return soma != cpf[10]
}

function validaCnpj(cnpj) {
  let retorno = true

  var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  var c = String(cnpj).replace(/[^\d]/g, '')

  if (c.length !== 14)
    retorno = false

  if (/0{14}/.test(c))
    retorno = false

  for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
  if (c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
    retorno = false

  for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
  if (c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
    retorno = false

  return retorno
}