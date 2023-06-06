import Button from '@/components/elements/Button';
import { CircularProgress, Collapse, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { forwardRef } from 'react';
import { TbSearch } from 'react-icons/tb';
import styles from '../AssinaturaProp.module.scss';
import { enqueueSnackbar } from 'notistack';
import asaasService from '@/commom/service/asaasService';
import { useDispatch, useSelector } from 'react-redux';
import { resetCliente, resetDadosCliente, setCliente, setDados, setValue } from '@/store/reducers/assinatura';
import { controllerValidate, errorHandler, validateField } from '@/commom/utils/stepperValidation';
import { searchCep } from '@/commom/utils/searchCep';

function Cadastro({ register }, ref) {
  const [cadastroLoader, setCadastroLoader] = useState('idle');
  const { dados, propostaAtual } = useSelector(state => ({
    dados: state.assinatura.cliente,
    propostaAtual: state.assinatura.proposta,
  }));
  const dispatch = useDispatch();

  async function searchCadastro(evento) {
    evento.preventDefault();
    setCadastroLoader('loading');

    dispatch(setCliente({
      name: '',
      cpfCnpj: '',
      postalCode: '',
      cityName: '',
      state: '',
      address: '',
      addressNumber: '',
      complement: '',
      province: '',
    }));
    errorHandler.reset('cliente');

    //validar email
    if (!controllerValidate.email(dados.email)) {
      setCadastroLoader('idle');
      return enqueueSnackbar('Digite um email válido');
    }

    const loadClient = await asaasService.loadClient(dados.email);
    loadClient.ok ? setCadastroLoader('success') : setCadastroLoader('error');
  }

  async function blurCep(evento) {
    if (validateField('postalCode')) {
      const endereco = await searchCep(evento.target.value);

      // dispatch(resetDadosCliente());
      if (endereco) {
        dispatch(setCliente({
          postalCode: endereco.cep || '',
          address: endereco.logradouro || '',
          cityName: endereco.localidade || '',
          province: endereco.bairro || '',
          state: endereco.uf || '',
          addressNumber: '',
          complement: '',
        }))
        errorHandler.reset('cliente');
      } else {
        // dispatch(setValue({ key: 'postalCode', value: evento.target.value }))
      }
    }
  }

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h2>Cadastro</h2>
      <form onSubmit={searchCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          variant='outlined'
          label='Email do financeiro'
          helperText='Este email irá receber as cobranças e notas fiscais'
          type='email'
          {...register('email')}
        />
        <Button
          variant='contained'
          type='submit'
          sx={{ height: 34 }}
        >
          {cadastroLoader === 'loading'
            ? <CircularProgress size={16} color='inherit' />
            : <><TbSearch size={16} style={{ marginRight: 5 }} /> Buscar cadastro</>
          }
        </Button>
      </form>
      <Collapse in={cadastroLoader === 'success'}>
        <Stack gap={2}>
          <TextField
            fullWidth
            variant='outlined'
            label='Razão social ou nome completo'
            {...register('name')}
          />
          <Stack direction='row' gap={2}>
            <TextField
              fullWidth
              variant='outlined'
              label='CNPJ/CPF'
              {...register('cpfCnpj')}
            />
            <TextField
              fullWidth
              variant='outlined'
              label='CEP'
              {...register('postalCode')}
              onBlur={blurCep}
            />
          </Stack>
          <Stack direction='row' gap={2}>
            <TextField
              fullWidth
              variant='outlined'
              label='Cidade'
              {...register('cityName')}
            />
            <TextField
              width='30%'
              variant='outlined'
              label='UF'
              {...register('state')}
            />
          </Stack>
          <Stack direction='row' gap={2}>
            <TextField
              fullWidth
              variant='outlined'
              label='Rua'
              {...register('address')}
            />
            <TextField
              width='30%'
              variant='outlined'
              label='Número'
              {...register('addressNumber')}
            />
          </Stack>
          <Stack direction='row' gap={2}>
            <TextField
              width='30%'
              variant='outlined'
              label='Complemento'
              {...register('complement')}
            />
            <TextField
              fullWidth
              variant='outlined'
              label='Bairro'
              {...register('province')}
            />
          </Stack>
        </Stack>
      </Collapse>
    </div>
  )
}

export default forwardRef(Cadastro);
