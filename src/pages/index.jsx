import propostaService from '@/commom/service/propostaService';
import withSession from '@/commom/service/session';
import PageTitle from '@/components/elements/PageTitle';
import FloatingActions from '@/components/patterns/FloatingActions';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropostaList from '@/components/patterns/PropostaList';
import { updateListaProposta } from '@/store/reducers/listaPropostas';
import Navbar from '@/components/sections/Navbar';

export default function Home(props) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateListaProposta(props.listaPropostas));
    dispatch(setGlobalValue({ key: 'mode', value: 'list' }));
  }, [dispatch, props.listaPropostas])

  return (
    <>
      <PageTitle>Propostas Vertá</PageTitle>
      <Navbar />
      <main style={{ backgroundColor: '#f2f2f2' }}>
        <div className='container'>
          <h1 style={{ marginTop: '3rem', marginBottom: 0 }}>Bem vindo(a), {props.session.data.nome}</h1>
          <PropostaList />
        </div>
        <FloatingActions />
      </main>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;
  // const access_token = session.isRefreshed ? session.access_token : ctx.req.cookies['atPropV'];

  // try {
  //   const listaPropostas = await propostaService.getPropostaList(access_token);
  //   return {
  //     props: {
  //       listaPropostas,
  //       session,
  //     }
  //   }
  // } catch (err) {
  //   if (err.response?.status) {
  //     console.error('erro 1', err.response.status, err.response?.data);
  //   } else {
  //     console.error('erro 2', err);
  //   }
  // }

  return {
    props: {
      session,
    }
  }
})
