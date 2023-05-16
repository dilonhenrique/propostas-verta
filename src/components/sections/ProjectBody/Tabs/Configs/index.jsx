import OutlinedInput from '@/components/elements/OutlinedInput'
import styles from '../../ProjectBody.module.scss'
import propostaDispatcher from '@/commom/dispatchers/propostaDispatcher';
import { InputAdornment, Stack, Switch } from '@mui/material'
import React from 'react'
import { Reorder, motion } from 'framer-motion'
import { useSelector } from 'react-redux';

export default function Configs({ selectedTab, variant }) {
  const propostaAtual = useSelector(state => state.propostaAtual.data);

  const sx = { width: '100%', maxWidth: '600px', margin: '0 auto', gap: '2rem' }

  return (
    <>
      <Stack direction='row' gap={2}>
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.custoBoleto || ''}
          type='number'
          label='Custo do boleto'
          onChange={propostaDispatcher.changeHandler('custoBoleto')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><small>R$</small></InputAdornment>
            )
          }}
        />
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.parcelaMinima || ''}
          type='number'
          label='Parcela mínima'
          onChange={propostaDispatcher.changeHandler('parcelaMinima')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><small>R$</small></InputAdornment>
            )
          }}
        />
      </Stack>
      <Stack direction='row' gap={2}>
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.descontoVista || ''}
          type='number'
          label='Desconto à vista'
          onChange={propostaDispatcher.changeHandler('descontoVista')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>
            )
          }}
        />
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.porcentagemNota || ''}
          type='number'
          label='Porcentagem NF'
          onChange={propostaDispatcher.changeHandler('porcentagemNota')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>
            )
          }}
        />
      </Stack>
      <OutlinedInput
        value={propostaAtual.horaTecnica || ''}
        type='number'
        label='Hora técnica inicial'
        onChange={propostaDispatcher.changeHandler('horaTecnica')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><small>R$</small></InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end"><small>/hr</small></InputAdornment>
          ),
          step: "0.01",
        }}
      />
      <OutlinedInput
        value={propostaAtual.valorHora}
        label='Valor/hora final'
        onChange={propostaDispatcher.changeHandler('valorHora')}
        disabled
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><small>R$</small></InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end"><small>/hr</small></InputAdornment>
          )
        }}
      />
      <Stack direction='row' gap={2}>
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.descontoPrevisto || ''}
          type='number'
          label='Desconto previsto'
          onChange={propostaDispatcher.changeHandler('descontoPrevisto')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>
            )
          }}
        />
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.valorNota}
          label='Valor da nota'
          disabled
          onChange={propostaDispatcher.changeHandler('valorNota')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Switch size="small" checked={propostaAtual.temNota} onChange={propostaDispatcher.changeHandler('temNota')} />
              </InputAdornment>
            )
          }}
        />
      </Stack>
      <Stack direction='row' gap={2}>
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.parcelas}
          type='number'
          label='Parcelas'
          onChange={propostaDispatcher.changeHandler('parcelas')}
          disabled={!propostaAtual.customParcela}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Switch size="small" checked={propostaAtual.customParcela} onChange={propostaDispatcher.changeHandler('customParcela')} />
              </InputAdornment>
            )
          }}
        />
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.prazoEntrega}
          type='number'
          label='Prazo de entrega'
          onChange={propostaDispatcher.changeHandler('prazoEntrega')}
          disabled={!propostaAtual.customPrazo}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Switch size="small" checked={propostaAtual.customPrazo} onChange={propostaDispatcher.changeHandler('customPrazo')} />
              </InputAdornment>
            )
          }}
        />
      </Stack>
    </>
  )
}
