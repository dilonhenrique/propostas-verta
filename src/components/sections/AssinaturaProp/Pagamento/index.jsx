import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { forwardRef } from 'react';
import 'dayjs/locale/en-gb';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import DateInput from '@/components/elements/DateInput';

function Pagamento({ register }, ref) {
  const propostaAtual = useSelector(state => state.assinatura.proposta);

  const formasPgto = constructFormasPgto();
  function constructFormasPgto() {
    let newArray = [];
    if (propostaAtual.parcelas > 1) {
      newArray.push({
        label: `À vista por ${propostaAtual.valorVista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} no boleto (-${propostaAtual.descontoVista}%)`,
        value: 1,
      });
      for (let i = 2; i - 1 < propostaAtual.parcelas; i++) {
        newArray.push({
          label: `${i}x de ${(propostaAtual.valorTotal / i).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} no Boleto`,
          value: i,
        })
      }
    } else {
      newArray.push({
        label: `À vista por ${propostaAtual.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} no boleto`,
        value: 1,
      });
    }
    return newArray;
  }

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2>Pagamento</h2>
      <FormControl>
        <InputLabel>Forma de pagamento</InputLabel>
        <Select label='Forma de pagamento' {...register('parcelas')}>
          {formasPgto.map(forma => <MenuItem key={forma.value} value={forma.value}>{forma.label}</MenuItem>)}
        </Select>
      </FormControl>

      <DateInput
        views={['day']}
        label='Data de vencimento'
        disablePast
        minDate={dayjs()}
        maxDate={dayjs().add(31, 'days')}
        {...register('vencimento')}
      />
    </div>
  )
}

export default forwardRef(Pagamento);

// let hoje = new Date()
//     vencimento.min = hoje.toISOString().split("T")[0]
//     hoje.setDate(hoje.getDate() + 30)
//     vencimento.max = hoje.toISOString().split("T")[0]
