import PageTitle from '@/components/elements/PageTitle';
import ProjectBody from '@/components/sections/ProjectBody';
import ProjectHeader from '@/components/sections/ProjectHeader';
import QuickView from '@/components/sections/QuickView';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import propostaService from '@/commom/service/propostaService';
import withSession from '@/commom/service/session';
import propostaDispatcher from '@/commom/dispatchers/propostaDispatcher';
import Navbar from '@/components/sections/Navbar';
import { useRouter } from 'next/router';
import { updateProposta } from '@/store/reducers/propostaAtual';
import ProjectLoading from '@/components/sections/ProjectLoading';
import { useLeavePageConfirmation } from '@/commom/hooks/useLeavePageConfirmation';
import { AnimatePresence } from 'framer-motion';

export default function Editar(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    // if (props.propostaAtual) {
    //   propostaDispatcher.updateProposta(props.propostaAtual);
    //   propostaDispatcher.updateVersions(props.versoes);
    // } else {
    //   //resetar proposta e versoes
    //   propostaDispatcher.resetProposta();
    //   for (let key in props.defaultParams) {
    //     const value = props.defaultParams[key];
    //     propostaDispatcher.setPropostaValue({ key, value });
    //   }
    // }
    const id = router.query.id[0];
    dispatch(updateProposta(id));
  }, [dispatch, router.query.id])

  const { propostaAtual, isLoading, isSaved } = useSelector(state => ({
    propostaAtual: state.propostaAtual.data,
    isLoading: state.propostaAtual.isLoading,
    isSaved: state.propostaAtual.isSaved,
  }));
  const pageTitle = isLoading ? `Carregando proposta...` : `Editando proposta ${propostaAtual.numeroProposta}.${propostaAtual.versaoProposta} | Propostas Vertá`;

  useEffect(() => {
    if (propostaAtual.excluido) {
      dispatch(setGlobalValue({ key: 'mode', value: 'deleted' }));
    } else {
      dispatch(setGlobalValue({ key: 'mode', value: 'edit' }));
    }
  }, [dispatch, propostaAtual.excluido])

  useLeavePageConfirmation(!isSaved);

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>
      <Navbar />
      <main>
        <ProjectHeader />
        <ProjectBody />
      </main>
      <AnimatePresence>
        {!isLoading &&
          <QuickView key='quickview' />}
      </AnimatePresence>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;
  // const [id] = ctx.params.id || [undefined];
  // const access_token = session.isRefreshed ? session.access_token : ctx.req.cookies['atPropV'];

  // try {
  //   if (id) {
  //     const propostaAtual = await propostaService.getSingleProposta(id, access_token);
  //     const versoes = await propostaService.getVersions(propostaAtual.numeroProposta, access_token);

  //     return {
  //       props: {
  //         session,
  //         propostaAtual,
  //         versoes,
  //       }
  //     }
  //   }
  // } catch (err) {
  //   if (err.response?.status) {
  //     console.error('erro 1', err.response.status, err.response?.data);
  //   } else {
  //     console.error('erro 2', err);
  //   }
  // }
  // const defaultParams = await propostaService.getDefaultParams(access_token);
  // const numeroProposta = await propostaService.getNextProposta(access_token);

  // return {
  //   props: {
  //     session,
  //     defaultParams: {
  //       ...defaultParams,
  //       numeroProposta,
  //     },
  //   }
  // }
  return {
    props: {
      session,
    }
  }
})
