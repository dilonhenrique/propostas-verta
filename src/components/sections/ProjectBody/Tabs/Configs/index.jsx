import OutlinedInput from '@/components/elements/OutlinedInput'
import styles from '../../ProjectBody.module.scss'
import { changeHandler } from '@/utils/dispatchers/changeHandler';
import { InputAdornment, Stack, Switch } from '@mui/material'
import React from 'react'
import { Reorder, motion } from 'framer-motion'
import { useSelector } from 'react-redux';

export default function Configs({ selectedTab, variant }) {
  const propostaAtual = useSelector(state => state.propostaAtual);

  const sx = { width: '100%', maxWidth: '600px', margin: '0 auto', gap: '2rem' }

  return (
    <motion.div
      className={styles.tabContent}
      style={sx}
      variants={variant}
      animate={selectedTab === 2 ? 'visible' : 'hidden'}
    >
      <Stack direction='row' gap={2}>
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.custoBoleto || ''}
          label='Custo do boleto'
          onChange={changeHandler('custoBoleto')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><small>R$</small></InputAdornment>
            )
          }}
        />
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.parcelaMinima || ''}
          label='Parcela mínima'
          onChange={changeHandler('parcelaMinima')}
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
          label='Desconto à vista'
          onChange={changeHandler('descontoVista')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>
            )
          }}
        />
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.porcentagemNota || ''}
          label='Porcentagem NF'
          onChange={changeHandler('porcentagemNota')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">%</InputAdornment>
            )
          }}
        />
      </Stack>
      <OutlinedInput
        value={propostaAtual.horaTecnica || ''}
        label='Hora técnica inicial'
        onChange={changeHandler('horaTecnica')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><small>R$</small></InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end"><small>/hr</small></InputAdornment>
          )
        }}
      />
      <OutlinedInput
        value={propostaAtual.valorHora || ''}
        label='Valor/hora final'
        onChange={changeHandler('valorHora')}
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
          label='Desconto previsto'
          onChange={changeHandler('descontoPrevisto')}
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
          onChange={changeHandler('valorNota')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Switch size="small" checked={propostaAtual.temNota} onChange={changeHandler('temNota')} />
              </InputAdornment>
            )
          }}
        />
      </Stack>
      <Stack direction='row' gap={2}>
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.parcelas || ''}
          label='Parcelas'
          onChange={changeHandler('parcelas')}
          disabled={!propostaAtual.customParcela}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Switch size="small" checked={propostaAtual.customParcela} onChange={changeHandler('customParcela')} />
              </InputAdornment>
            )
          }}
        />
        <OutlinedInput
          sx={{ flexBasis: '50%' }}
          value={propostaAtual.prazoEntrega || ''}
          label='Prazo de entrega'
          onChange={changeHandler('prazoEntrega')}
          disabled={!propostaAtual.customPrazo}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Switch size="small" checked={propostaAtual.customPrazo} onChange={changeHandler('customPrazo')} />
              </InputAdornment>
            )
          }}
        />
      </Stack>
    </motion.div>
  )
}
