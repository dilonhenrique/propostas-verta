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
      ? listaPropostas.filter(prop =>
        Object.keys(prop).some(key => {
          if (pesquisaveis.includes(key))
            return prop[key].toLowerCase().includes(search.toLowerCase());
          return false;
        })
      )
      : [...listaPropostas]

    if (order.key === "numeroProposta" || order.key === "valorTotal") {
      if (order.asc) {
        novaLista.sort((a, b) => a[order.key] - b[order.key])
      } else {
        novaLista.sort((a, b) => b[order.key] - a[order.key])
      }
    } else {
      if (order.asc) {
        novaLista.sort((a, b) => b[order.key] > a[order.key] ? 1 : a[order.key] > b[order.key] ? -1 : 0)
      } else {
        novaLista.sort((a, b) => a[order.key] > b[order.key] ? 1 : b[order.key] > a[order.key] ? -1 : 0)
      }
    }

    setListaFiltrada(novaLista);
  }, [search, filter, order, listaPropostas])

  return (
    <div className={styles.listContainer}>
      <List sx={{ minWidth: '700px' }}>
        <ListSubheader sx={{ ...rowStyle, backgroundColor: 'transparent', color:'#FFFFFF' }}>
          <div></div>
          <Orderer chave='numeroProposta' label='#' order={order} />
          <Orderer chave='nomeProjeto' label='nome/marca' order={order} />
          <Orderer chave='cliente' label='cliente' order={order} />
          <Orderer chave='valorTotal' label='valor' order={order} />
          <Orderer chave='status' label='status' order={order} />
          <div></div>
        </ListSubheader>
        {listaFiltrada.length
          ? <div className={styles.listaPropostas}>
            <AnimatePresence>
              {listaFiltrada.map(proposta => (
                <PropostaListItem key={proposta.id} proposta={proposta} />)
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
