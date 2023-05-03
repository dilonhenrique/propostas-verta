import PageTitle from '@/components/elements/PageTitle';
import { Layout } from '@/components/patterns/PageLoader';
import Navbar from '@/components/sections/Navbar';
import ProjectBody from '@/components/sections/ProjectBody';
import ProjectHeader from '@/components/sections/ProjectHeader';
import QuickView from '@/components/sections/QuickView';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import { setValue } from '@/store/reducers/propostaAtual';
import { setProposta } from '@/store/reducers/propostaAtual';
import { setVersoes } from '@/store/reducers/versoesAtual';
import { loadDefault } from '@/utils/http/loadDefault';
import { loadProposta } from '@/utils/http/loadProposta';
import { loadVersoes } from '@/utils/http/loadVersoes';
import { nextProposta } from '@/utils/http/nextProposta';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    if (id?.length) {
      const propostaAtual = await loadProposta(id);
      const versoes = await loadVersoes(propostaAtual.numeroProposta);

      return {
        props: {
          propostaAtual,
          versoes
        }
      }
    }
  } catch (err) {
    console.log(err)
  }
  const defaultParams = await loadDefault();
  const numeroProposta = await nextProposta();

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
