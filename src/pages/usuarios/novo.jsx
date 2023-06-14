import PageTitle from '@/components/elements/PageTitle';
import { useDispatch } from "react-redux";
import withSession from '@/commom/service/session';
import Navbar from '@/components/sections/Navbar';
import { useEffect } from 'react';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import FormEditUser from '@/components/patterns/FormEditUser';

export default function Editar(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGlobalValue({ key: 'mode', value: 'neutral' }));
  }, [dispatch])

  return (
    <>
      <PageTitle>Cadastrar usuários | Propostas Vertá</PageTitle>
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
            <h1>Cadastrar novo usuário</h1>
            <FormEditUser />
          </div>
        </div>
      </main>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;

  if (session?.data?.role === 'admin')
    return {
      props: {
        session,
      }
    }

  return {
  }
})
