import styles from '@/styles/Login.module.scss';
import PageTitle from '@/components/elements/PageTitle';
import React, { useState } from 'react';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { FiArrowRight } from 'react-icons/fi';
import { useAnimate } from 'framer-motion';
import { useRouter } from 'next/router';
import authService from '@/commom/service/authService';
import { closeSnackbar, enqueueSnackbar } from 'notistack';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scope, animate] = useAnimate();
  const errorStatus = router.query.error;

  async function submit(evento) {
    evento.preventDefault();
    setLoading(true);
    closeSnackbar();

    //retorno do login
    const login = await authService.login(evento.target.elements.email.value, evento.target.elements.password.value);
    if (login?.isLogged) {
      await animate(scope.current, { scale: 0, opacity: 0 }, { ease: 'backInOut' });
      router.push('/');
    } else {
      enqueueSnackbar('Email ou senha inválidos!', { variant: 'error' });
    }

    setLoading(false);
  }

  return (
    <>
      <PageTitle>Faça seu login | Propostas Vertá</PageTitle>
      <main>
        <section className={styles.loginContainer}>
          <div className={styles.formContainer} ref={scope}>
            <h1>Área restrita</h1>
            <p>Faça login para continuar</p>
            <form onSubmit={submit}>
              <TextField variant='outlined' label='email' type='email' name='email' required defaultValue='dilon@dilon.com.br' />
              <TextField variant='outlined' label='senha' type='password' name='password' required defaultValue='123456' />
              <Button type='submit' size='large' variant='contained' sx={{ height: 40 }}>
                {loading
                  ?
                  <CircularProgress size={20} color='inherit' />
                  :
                  <>Login <FiArrowRight style={{ marginLeft: '.5rem' }} /></>
                }
              </Button>
            </form>
            {errorStatus === '401' &&
              <Alert
                severity='warning'
                variant='outlined'
                sx={{ marginY: 2 }}
              >
                <strong>Ops!</strong> Você deve fazer login para acessar esta página.
              </Alert>}
          </div>
        </section>
      </main>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = async (ctx) => {
  if (await authService.isLogged(ctx)) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  return {
    props: {}
  }
}
