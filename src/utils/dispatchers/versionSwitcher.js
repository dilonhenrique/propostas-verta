import store from "@/store";
import { changeLoading } from "@/store/reducers/globalStatus";
import { useRouter } from "next/router";

export default function versionSwitcher(router) {
  return (evento) => {
    const versaoSelecionada = evento.target.value;
    const { versoesAtual } = store.getState();
    const { id } = versoesAtual.find(versao => versao.versao === versaoSelecionada);
    
    // store.dispatch(changeLoading(true));
    router.push(`/editar/${id}`);
  }
}