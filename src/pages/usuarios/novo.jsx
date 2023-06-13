import PageTitle from '@/components/elements/PageTitle';
import ProjectBody from '@/components/sections/ProjectBody';
import ProjectHeader from '@/components/sections/ProjectHeader';
import QuickView from '@/components/sections/QuickView';
import { useDispatch, useSelector } from "react-redux";
import withSession from '@/commom/service/session';
import Navbar from '@/components/sections/Navbar';
import { Slide } from '@mui/material';
import { useEffect } from 'react';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import FormNewUser from '@/components/patterns/FormNewUser';

export default function Editar(props) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setGlobalValue({ key: 'mode', value: 'neutral' }));
  }, [dispatch])

  return (
    <>
      <PageTitle>Editar usuários | Propostas Vertá</PageTitle>
      <Navbar />
      <main>
        <FormNewUser />
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
