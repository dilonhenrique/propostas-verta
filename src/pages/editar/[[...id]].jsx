import PageTitle from '@/components/elements/PageTitle';
import Navbar from '@/components/sections/Navbar';
import ProjectBody from '@/components/sections/ProjectBody';
import ProjectHeader from '@/components/sections/ProjectHeader';
import QuickView from '@/components/sections/QuickView';
import { loadDefault } from '@/utils/http/loadDefault';
import { loadProposta } from '@/utils/http/loadProposta';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from "react-redux";

export default function Editar() {
  const router = useRouter();
  const { id } = router.query
  const { propostaAtual } = useSelector(state => ({
    propostaAtual: state.propostaAtual,
  }));

  useEffect(() => {
    if (id){
      loadProposta(id)
    } else {
      loadDefault()
    }
  }, [id])

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
