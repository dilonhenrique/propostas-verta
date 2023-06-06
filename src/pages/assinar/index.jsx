import PageTitle from '@/components/elements/PageTitle';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Navbar from '@/components/sections/Navbar';
import authService from '@/commom/service/authService';
import AssinaturaStart from '@/components/sections/AssinaturaStart';
import AssinaturaProp from '@/components/sections/AssinaturaProp';
import { setProposta } from '@/store/reducers/assinatura';
import { Slide } from '@mui/material';
import { propApi } from '@/commom/infra/propApi';

export default function Assinar({ session, propAtual }) {
  const assinatura = useSelector(state => state.assinatura);
  const dispatch = useDispatch();

  useEffect(() => {
    if (propAtual) dispatch(setProposta(propAtual));
    dispatch(setGlobalValue({ key: 'mode', value: 'neutral' }));
  }, [dispatch, propAtual])

  return (
    <>
      <PageTitle>Assinatura digital | Estúdio Vertá</PageTitle>
      {/* {session &&
        <Navbar />} */}
      <main>
        <Slide in={!assinatura.proposta.id} appear={false} direction='right' timeout={300} easing={{ exit: 'ease-in-out' }} unmountOnExit>
          <AssinaturaStart />
        </Slide>
        {assinatura.proposta.id && <AssinaturaProp />}
      </main>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = async (ctx) => {
  try {
    const session = await authService.getSession(ctx);

    const [numeroProposta, versaoProposta] = ctx.query.n.split('.');
    const cliente = ctx.query.c;

    const buscar = await propApi(`propostas?numeroProposta='${numeroProposta}'&versaoProposta='${versaoProposta}'&cliente='${cliente}'`);
    const propAtual = buscar.data[0];

    return {
      props: {
        session,
        propAtual,
      }
    }
  } catch (err) {
    return {
      props: {}
    }
  }
}
