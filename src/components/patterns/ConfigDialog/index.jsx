import { propApiAuth } from '@/commom/infra/propApi';
import styles from './ConfigDialog.module.scss';
import propostaService from '@/commom/service/propostaService';
import { tokenService } from '@/commom/service/tokenService';
import translateJsToDb from '@/commom/utils/translateJsToDb';
import OutlinedInput from '@/components/elements/OutlinedInput';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, InputAdornment, Stack, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export default function ConfigDialog(props) {
  const { open, setOpen } = props;
  const [defaultParams, setDefaultParams] = useState({});
  function handleClose() { setOpen(false) };

  function changeHandler(key) {
    return (evento) => {
      let value;
      if (evento.target.hasOwnProperty('checked')) {
        value = evento.target.checked;
      } else {
        value = evento.target.value;
      }
      setDefaultParams(atual => {
        return {
          ...atual,
          [key]: value
        }
      })
    }
  }

  async function submit(evento) {
      evento.preventDefault();
      const access_token = tokenService.getAccess();
      const paramsTratados = translateJsToDb(defaultParams);

      const response = await propApiAuth('defaultParams', {
        access_token,
        method: 'POST',
        data: JSON.stringify(paramsTratados),
      });

      if(response.affectedRows){
        enqueueSnackbar('Parâmetros salvos com sucesso!', { variant: 'success' });
        setOpen(false);
      } else {
        enqueueSnackbar('Ops! Erro ao salvar.', { variant: 'error' });
        console.log(response);
      }
  }

  useEffect(() => {
    async function loadParams() {
      try {
        const access_token = tokenService.getAccess();
        const response = await propostaService.getDefaultParams(access_token);
        setDefaultParams(response);
      } catch (err) {
        if (err.response?.status) {
          console.error('erro 1', err.response.status, err.response?.data);
        } else {
          console.error('erro 2', err);
        }
      }
    }
    loadParams();
  }, [])

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={evento => submit(evento)}>
        <DialogTitle>
          Parâmetros padrão
        </DialogTitle>
        <DialogContent className={styles.form}>
          <Stack className={styles.stackRow} marginTop={2}>
            <OutlinedInput
              className={styles.input}
              value={defaultParams.custoBoleto || ''}
              type='number'
              label='Custo do boleto'
              onChange={changeHandler('custoBoleto')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><small>R$</small></InputAdornment>
                )
              }}
            />
            <OutlinedInput
              className={styles.input}
              value={defaultParams.parcelaMinima || ''}
              type='number'
              label='Parcela mínima'
              onChange={changeHandler('parcelaMinima')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><small>R$</small></InputAdornment>
                )
              }}
            />
          </Stack>
          <Stack className={styles.stackRow}>
            <OutlinedInput
              className={styles.input}
              value={defaultParams.descontoVista || ''}
              type='number'
              label='Desconto à vista'
              onChange={changeHandler('descontoVista')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                )
              }}
            />
            <OutlinedInput
              className={styles.input}
              value={defaultParams.porcentagemNota || ''}
              type='number'
              label='Porcentagem NF'
              onChange={changeHandler('porcentagemNota')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">%</InputAdornment>
                )
              }}
            />
          </Stack>
          <Stack className={styles.stackRow}>
            <OutlinedInput
              value={defaultParams.horaTecnica || ''}
              type='number'
              label='Hora técnica inicial'
              onChange={changeHandler('horaTecnica')}
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
            <FormControlLabel
              label='Nota fiscal'
              control={<Switch size="small" checked={defaultParams.temNota} onChange={changeHandler('temNota')} />}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' type='submit'>Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
