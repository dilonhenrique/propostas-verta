import { enqueueSnackbar } from "notistack"

export async function searchCep(cep) {
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json`)
    var CEPconvertido = await consultaCEP.json()
    if (CEPconvertido.erro) { throw Error("Este CEP não existe") }
    return CEPconvertido
  } catch (erro) {
    if (erro.name == "TypeError") { erro.message = "Formato de CEP inválido" }
    if (erro.name == "SyntaxError") { erro.message = "API inválida" }
    enqueueSnackbar(erro.message, { variant: 'error' })
    return false
  }
}