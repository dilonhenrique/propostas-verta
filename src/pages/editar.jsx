import PageTitle from '@/components/elements/PageTitle';
import Navbar from '@/components/sections/Navbar';
import ProjectBody from '@/components/sections/ProjectBody';
import ProjectHeader from '@/components/sections/ProjectHeader';
import QuickView from '@/components/sections/QuickView';
import { useSelector } from "react-redux";

export default function Editar() {
  const {propostaAtual, fasesAtual, custosAtual} = useSelector(state => ({
    propostaAtual: state.propostaAtual,
    fasesAtual: state.fasesAtual,
    custosAtual: state.custosAtual,
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
