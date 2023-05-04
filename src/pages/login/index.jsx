import styles from '@/styles/Login.module.scss';
import PageTitle from '@/components/elements/PageTitle';
import React, { useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { FiArrowRight } from 'react-icons/fi';
import { useAnimate } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scope, animate] = useAnimate()

  async function submit(evento) {
    evento.preventDefault();

    setLoading(true);

    //simulação buscando login
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await timeout(3000);

    //retorno do login
    const loginSucessfull = false;
    if (loginSucessfull) {
      await animate(scope.current, { scale: 0, opacity: 0 }, { ease: 'backInOut' });
      router.push('/');
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
              <TextField variant='outlined' label='email' type='email' required defaultValue='dilon@dilon.com' />
              <TextField variant='outlined' label='senha' type='password' required defaultValue='paasss' />
              <Button type='submit' size='large' variant='contained' sx={{height:40}}>
                {loading
                  ?
                  <CircularProgress size={20} color='inherit' />
                  :
                  <>Login <FiArrowRight style={{ marginLeft: '.5rem' }} /></>
                }
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
