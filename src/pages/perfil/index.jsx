import PageTitle from '@/components/elements/PageTitle';
import { useDispatch } from "react-redux";
import withSession from '@/commom/service/session';
import Navbar from '@/components/sections/Navbar';
import { useEffect } from 'react';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import FormEditUser from '@/components/patterns/FormEditUser';

export default function Editar({session}) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setGlobalValue({ key: 'mode', value: 'neutral' }));
  }, [dispatch])

  return (
    <>
      <PageTitle>Meu perfil | Propostas Vertá</PageTitle>
      <Navbar />
      <main>
      <div className='container'>
          <div className='row' style={{
            alignSelf: 'center',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '500px',
            paddingTop: '3rem',
          }}>
            <h1>Editar meu perfil</h1>
            <FormEditUser usuario={session.data} />
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
