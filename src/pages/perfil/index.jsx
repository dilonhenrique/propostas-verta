import styles from '@/styles/User.module.scss';
import PageTitle from '@/components/elements/PageTitle';
import { useDispatch } from "react-redux";
import withSession from '@/commom/service/session';
import Navbar from '@/components/sections/Navbar';
import { useEffect } from 'react';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import FormEditUser from '@/components/patterns/FormEditUser';
import { Paper } from '@mui/material';

export default function Editar({ session }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGlobalValue({ key: 'mode', value: 'neutral' }));
  }, [dispatch])

  return (
    <>
      <PageTitle>Meu perfil | Propostas Vertá</PageTitle>
      <Navbar />
      <main className={styles.userMain}>
        <div className='container'>
          <div className='row'>
            <h1>Editar meu perfil</h1>
            <Paper sx={{padding:'2rem'}} elevation={4}>
              <FormEditUser usuario={session.data} />
            </Paper>
          </div>
        </div>
      </main>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;

  return {
    props: {
      session,
    }
  }
})
