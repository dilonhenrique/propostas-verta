import React from 'react';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '@/components/elements/Button';
import styles from './EditUser.module.scss';
import { useState } from 'react';
import userService from '@/commom/service/userService';
import { useRouter } from 'next/router';
import authService from '@/commom/service/authService';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/store/reducers/globalStatus';

export default function FormEditUser({ usuario }) {
  const { user } = useSelector(state => state.globalStatus);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    Nome: usuario?.nome || '',
    Email: usuario?.email || '',
    Senha: '',
    SenhaConf: '',
    Role: usuario?.role || '',
  })
  const [error, setError] = useState({
    Nome: '',
    Email: '',
    Senha: '',
    SenhaConf: '',
    Role: '',
  })

  function register(name) {
    return {
      name,
      value: data[name],
      onChange: (evento) => {
        setData(atual => ({
          ...atual,
          [name]: evento.target.value
        }));
        setError(atual => ({
          ...atual,
          [name]: validateField[name](evento.target.value)
        }));
      },
      error: error[name] !== '',
      helperText: error[name],
    }
  }

  const validateField = {
    Nome: (value) => {
      return value != '' ? '' : 'Digite seu nome';
    },
    Email: (value) => {
      const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const valido = value.match(validRegex);
      return valido ? '' : 'E-mail inválido';
    },
    Senha: (value) => {
      if (value === '') return '';
      return value.length >= 6 ? '' : 'Sua senha precisa de pelo menos 6 caracteres'
    },
    SenhaConf: (value) => {
      if (data.Senha === '') return '';
      return value === data.Senha ? '' : 'As senhas digitadas não coincidem'
    },
    Role: (value) => {
      return value != '' ? '' : 'Digite seu nome';
    },
  }

  function validateForm(evento) {
    evento.preventDefault();
    const campos = evento.target.elements;
    let validado = true;

    for (let key in validateField) {
      if (key in campos) {
        const erro = validateField[key](campos[key].value);
        setError(atual => ({
          ...atual,
          [key]: erro
        }))
        if (erro !== '') validado = false;
      }
    }

    if (validado) {
      let novoUsuario = {
        id: usuario?.id,
        Nome: campos.Nome.value,
        Email: campos.Email.value,
      }
      if (campos.Senha?.value != '') novoUsuario.Senha = campos.Senha.value;
      if (campos.Role && campos.Role?.value != '') novoUsuario.Role = campos.Role.value;
      salvarUsuario(novoUsuario);
    }
  }

  async function salvarUsuario(novoUsuario) {
    setLoading(true);
    const response = await userService.saveUser(novoUsuario);
    if (response.ok) {
      //update user data in the store
      dispatch(updateUser());
    }
    setLoading(false);
  }

  return (
    <form className={styles.editUserForm} onSubmit={validateForm}>
      <TextField required variant='outlined' {...register('Nome')} label='Nome' inputProps={{ minLength: 3 }} />
      <TextField required variant='outlined' {...register('Email')} type='email' label='Email' />
      <TextField required={!Boolean(usuario?.id)} variant='outlined' {...register('Senha')} type='password' label={!Boolean(usuario?.id) ? 'Senha' : 'Nova senha'} inputProps={{ minLength: 6, maxLength: 20 }} />
      <TextField required={!Boolean(usuario?.id)} variant='outlined' {...register('SenhaConf')} type='password' label='Confirme a senha' inputProps={{ minLength: 6, maxLength: 20 }} />
      {user.role === 'admin' &&
        <FormControl>
          <InputLabel>Tipo de usuário</InputLabel>
          <Select required variant='outlined' {...register('Role')} label='Tipo de usuário'>
            <MenuItem value=''>--tipo de usuário--</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='comercial'>Comercial</MenuItem>
            <MenuItem value='viewer'>Somente visualização</MenuItem>
          </Select>
        </FormControl>}
      <Button type='submit' variant='contained' sx={{ height: 30 }}>{loading ? <CircularProgress color='inherit' size={20} /> : 'Salvar'}</Button>
    </form>
  )
}
