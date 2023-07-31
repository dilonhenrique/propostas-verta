import { CircularProgress, List, ListSubheader } from '@mui/material';
import styles from '@/styles/Home.module.scss';
import PropostaListItem, { rowStyle } from './PropostaListItem';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Orderer from './Orderer';

export default function PropostaList() {
  const { listaPropostas, search, filter, order, isLoading } = useSelector(state => ({
    listaPropostas: state.listaPropostas.data,
    isLoading: state.listaPropostas.isLoading,
    search: state.listaPropostas.search,
    filter: state.listaPropostas.filter,
    order: state.listaPropostas.order,
  }));

  const [listaFiltrada, setListaFiltrada] = useState(listaPropostas);
  useEffect(() => {
    const pesquisaveis = ['marca', 'cliente', 'descricaoProjeto', 'nomeProjeto']
    let novaLista = search
      ? listaPropostas.reduce((filtrado, prop) => {
        const versoesFiltradas = prop.versoes.filter(versao =>
          Object.keys(versao).some(key => {
            if (pesquisaveis.includes(key))
              return versao[key].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            return false;
          })
        )
        if (versoesFiltradas.length) filtrado.push({ ...prop, versoes: versoesFiltradas });
        return filtrado;
      }, [])
      : [...listaPropostas]

    if (order.key === "numeroProposta" || order.key === "valorTotal") {
      if (order.asc) {
        novaLista.sort((a, b) => a.versoes[0][order.key] - b.versoes[0][order.key])
      } else {
        novaLista.sort((a, b) => b.versoes[0][order.key] - a.versoes[0][order.key])
      }
    } else {
      if (order.asc) {
        novaLista.sort((a, b) => b.versoes[0][order.key] > a.versoes[0][order.key] ? 1 : a.versoes[0][order.key] > b.versoes[0][order.key] ? -1 : 0)
      } else {
        novaLista.sort((a, b) => a.versoes[0][order.key] > b.versoes[0][order.key] ? 1 : b.versoes[0][order.key] > a.versoes[0][order.key] ? -1 : 0)
      }
    }

    novaLista = novaLista.reduce((filtrado, prop) => {
      const versoesFiltradas = prop.versoes.filter(versao => {
        for (let key in filter) {
          const valor = versao[key] === 'aprovada*' ? 'aprovada' : versao[key];
          if(!filter[key].includes(valor)){
            return false
          }
        }
        return true
      })
      
      if (versoesFiltradas.length) filtrado.push({ ...prop, versoes: versoesFiltradas });
      return filtrado;
    }, [])

    setListaFiltrada(novaLista);
  }, [search, filter, order, listaPropostas])

  return (
    <div className={styles.listContainer}>
      <List sx={{ minWidth: '700px' }}>
        <ListSubheader sx={{ ...rowStyle, backgroundColor: 'transparent', color: '#FFFFFF' }}>
          <div></div>
          <Orderer chave='numeroProposta' label='#' order={order} />
          <Orderer chave='nomeProjeto' label='nome/categoria' order={order} />
          <Orderer chave='cliente' label='cliente/marca' order={order} />
          <Orderer chave='valorTotal' label='valor' order={order} />
          <Orderer chave='status' label='status' order={order} />
          <div></div>
        </ListSubheader>
        {listaFiltrada.length
          ? <div className={styles.listaPropostas}>
            <AnimatePresence>
              {listaFiltrada.map(proposta => (
                <PropostaListItem key={proposta.versoes[0].id} proposta={proposta.versoes[0]} versoes={proposta.versoes} />)
              )}
            </AnimatePresence>
          </div>
          : <div style={{ margin: '5rem 0', textAlign: 'center' }}>
            {isLoading
              ? <CircularProgress />
              : <h2>Nenhuma proposta encontrada</h2>
            }
          </div>
        }
      </List>
    </div>
  )
}
