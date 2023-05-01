export default function toCurrency(value) {
  const currency = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const valor = currency.slice(3);
  const [reais, centavos] = valor.split(',');
  return (<>{reais}<small>,{centavos}</small></>)
}