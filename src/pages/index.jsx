import withSession from '@/commom/service/session';
import PageTitle from '@/components/elements/PageTitle';
import FloatingActions from '@/components/patterns/FloatingActions';
import Navbar from '@/components/sections/Navbar';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGlobalValue({key:'mode',value:'list'}))
  }, [dispatch])

  return (
    <>
      <PageTitle>Propostas Vertá</PageTitle>
      <Navbar />
      <main>
        <h1>Proposta Vertá</h1>
        <FloatingActions />
      </main>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = withSession((ctx) => {
  const session = ctx.req.session;
  return {
    props: {
      session,
    }
  }
})
