import React from 'react';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '@/components/elements/Button';
import styles from './NewUser.module.scss';
import { useState } from 'react';
import userService from '@/commom/service/userService';

export default function FormNewUser() {
  const [loading, setLoading] = useState(false);
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
      onChange: (evento) => setError(atual => ({
        ...atual,
        [name]: validateField[name](evento.target.value)
      })),
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
      return value.length >= 6 ? '' : 'Sua senha precisa de pelo menos 6 caracteres'
    },
    SenhaConf: (value) => {
      const senha = document.querySelector('[name="Senha"]').value;
      return value === senha ? '' : 'As senhas digitadas não coincidem'
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
      const erro = validateField[key](campos[key].value);
      setError(atual => ({
        ...atual,
        [key]: erro
      }))
      if (erro !== '') validado = false;
    }

    if (validado){
      salvarUsuario({
        Nome: campos.Nome.value,
        Email: campos.Email.value,
        Senha: campos.Senha.value,
        Role: campos.Role.value,
      });
    }
  }

  async function salvarUsuario(usuario) {
    setLoading(true);
    const response = await userService.saveUser(usuario);
    console.log(response)
    setLoading(false);
  }

  return (
    <section className={styles.newUserContainer}>
      <div className='container'>
        <div className='row'>
          <h1>Cadastrar novo usuário</h1>
          <form onSubmit={validateForm}>
            <TextField required variant='outlined' {...register('Nome')} label='Nome' inputProps={{ minLength: 3 }} />
            <TextField required variant='outlined' {...register('Email')} type='email' label='Email' />
            <TextField required variant='outlined' {...register('Senha')} type='password' label='Senha' inputProps={{ minLength: 6, maxLength: 20 }} />
            <TextField required variant='outlined' {...register('SenhaConf')} type='password' label='Confirme a senha' inputProps={{ minLength: 6, maxLength: 20 }} />
            <FormControl>
              <InputLabel>Tipo de usuário</InputLabel>
              <Select required variant='outlined' {...register('Role')} label='Tipo de usuário'>
                <MenuItem value=''>--tipo de usuário--</MenuItem>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='comercial'>Comercial</MenuItem>
                <MenuItem value='viewer'>Somente visualização</MenuItem>
              </Select>
            </FormControl>
            <Button type='submit' variant='contained' sx={{height:30}}>{loading ? <CircularProgress /> : 'Salvar'}</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
