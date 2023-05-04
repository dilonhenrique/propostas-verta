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

export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    if (id?.length) {
      const propostaAtual = await propostaService.getSingleProposta(id);
      const versoes = await propostaService.getVersions(propostaAtual.numeroProposta);

      return {
        props: {
          propostaAtual,
          versoes
        }
      }
    }
  } catch (err) {
    if(err.response?.status){
      console.error(err.response.status, err.response?.data);
    } else {
      console.error(err);
    }
  }
  const defaultParams = await propostaService.getDefaultParams();
  const numeroProposta = await propostaService.getNextProposta();

  return {
    props: {
      defaultParams: {
        ...defaultParams,
        numeroProposta
      },
    }
  }
}

export default function Editar(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.propostaAtual) {
      dispatch(setProposta(props.propostaAtual));
      dispatch(setVersoes(props.versoes));
    } else {
      for (let key in props.defaultParams) {
        const value = props.defaultParams[key];
        dispatch(setValue({ key, value }))
      }
    }
  }, [props, dispatch])

  useEffect(() => {
    dispatch(setGlobalValue({key:'mode',value:'edit'}))
  }, [dispatch])

  const { propostaAtual } = useSelector(state => ({
    propostaAtual: state.propostaAtual,
  }));

  return (
    <>
      <PageTitle>Editando proposta {`${propostaAtual.numeroProposta}.${propostaAtual.versaoProposta}`} | Propostas Vertá</PageTitle>
      <Navbar />
      <main>
        <ProjectHeader />
        <ProjectBody />
      </main>
      <QuickView />
    </>
  )
}
