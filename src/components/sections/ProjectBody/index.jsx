import { Box, InputAdornment, Stack, Switch, Tab, Tabs } from '@mui/material';
import styles from './ProjectBody.module.scss';
import React, { memo, useState } from 'react';
import Cost from '@/components/patterns/Cost';
import { useSelector } from 'react-redux';
import OutlinedInput from '@/components/elements/OutlinedInput';
import { changeHandler } from '@/utils/changeHandler';
import Task from '@/components/patterns/Task';
import Button from '@/components/elements/Button';
import adicionarItem from '@/utils/addItem';
import AddButton from '@/components/elements/AddButton';
import { Reorder } from 'framer-motion';
import changeItemOrder from '@/utils/changeItemOrder';

function ProjectBody() {
  const propostaAtual = useSelector(state => state.propostaAtual);
  const { escopo, custosFixos } = {
    escopo: propostaAtual.escopo,
    custosFixos: propostaAtual.custosFixos,
  }
  const [tab, setTab] = useState(0);

  return (
    <section className={styles.projectBodyContainer}>
      <div className='container'>
        <div className='row'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', marginBottom: '2rem' }}>
            <Tabs centered value={tab} onChange={(event, clickedTab) => setTab(clickedTab)}>
              <Tab label="Escopo" />
              <Tab label="Custos" />
              <Tab label="Configs" />
            </Tabs>
          </Box>
        </div>
        <div className="row">
          <Stack flexGrow={1} display={tab === 0 ? 'inherit' : 'none'}>
            <Reorder.Group as='div' axis="y" values={escopo} onReorder={changeItemOrder}>
              {escopo.map(item => (
                <Task key={item.id} itemId={item.id} value={item} />
              ))}
            </Reorder.Group>
            <AddButton onClick={adicionarItem()}>Adicionar</AddButton>
          </Stack>

          <Stack flexGrow={1} display={tab === 1 ? 'inherit' : 'none'}>
            {custosFixos.map(custo => (
              <Cost itemId={custo.id} key={custo.id} />
            ))}
            <AddButton onClick={adicionarItem('custosFixos')}>Adicionar</AddButton>
          </Stack>

          <Stack flexGrow={1} gap={2} display={tab === 2 ? 'inherit' : 'none'} sx={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
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
          </Stack>

        </div>
      </div>
    </section>
  )
}

export default memo(ProjectBody);
