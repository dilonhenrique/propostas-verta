import PageTitle from '@/components/elements/PageTitle';
import Navbar from '@/components/sections/Navbar';
import ProjectBody from '@/components/sections/ProjectBody';
import ProjectHeader from '@/components/sections/ProjectHeader';
import QuickView from '@/components/sections/QuickView';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import { setValue } from '@/store/reducers/propostaAtual';
import { setProposta } from '@/store/reducers/propostaAtual';
import { setVersoes } from '@/store/reducers/versoesAtual';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import propostaService from '@/commom/service/propostaService';
import withSession from '@/commom/service/session';

export default function Editar(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (props.propostaAtual) {
        dispatch(setProposta(props.propostaAtual));
        dispatch(setVersoes(props.versoes));
      } else {
        for (let key in props.defaultParams) {
          const value = props.defaultParams[key];
          dispatch(setValue({ key, value }))
        }
      }
    }
  }, [props, dispatch])

  useEffect(() => {
    return () => {
      dispatch(setGlobalValue({ key: 'mode', value: 'edit' }))
    }
  }, [dispatch])

  const { propostaAtual } = useSelector(state => ({
    propostaAtual: state.propostaAtual,
  }));
  const pageTitle = `Editando proposta ${propostaAtual.numeroProposta}.${propostaAtual.versaoProposta} | Propostas Vertá`;

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>
      <Navbar />
      <main>
        <ProjectHeader />
        <ProjectBody />
      </main>
      <QuickView />
    </>
  )
}

//Decorator pattern
export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;
  const { id } = ctx.params;
  // const access_token = ctx.req.cookies['atPropV'];
  const access_token = session.isRefreshed ? session.access_token : ctx.req.cookies['atPropV'];

  try {
    if (id?.length) {
      const propostaAtual = await propostaService.getSingleProposta(id, access_token);
      const versoes = await propostaService.getVersions(propostaAtual.numeroProposta, access_token);

      return {
        props: {
          session,
          propostaAtual,
          versoes,
        }
      }
    }
  } catch (err) {
    if (err.response?.status) {
      console.error('erro 1', err.response.status, err.response?.data);
    } else {
      console.error('erro 2', err);
    }
  }
  const defaultParams = await propostaService.getDefaultParams(access_token);
  const numeroProposta = await propostaService.getNextProposta(access_token);

  return {
    props: {
      session,
      defaultParams: {
        ...defaultParams,
        numeroProposta,
      },
    }
  }
})
