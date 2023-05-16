import { CircularProgress, List, ListSubheader } from '@mui/material';
import styles from '@/styles/Home.module.scss';
import PropostaListItem, { rowStyle } from './PropostaListItem';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

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

    // for (let i = 0; i < listaPropostas.length; i++) {
    //   const prop = listaPropostas[i];
    //   pesquisaveis.forEach(campo => {
    //     if (campo in prop && prop[campo].indexOf(search) != -1) {
    //       novaLista.push(prop);
    //     }
    //   })
    // }

    setListaFiltrada(novaLista);
  }, [search, filter, order, listaPropostas])

  return (
    <div className={styles.listContainer}>
      <List sx={{ minWidth: '700px' }}>
        <ListSubheader sx={{ ...rowStyle, backgroundColor: 'transparent', }}>
          <div></div>
          <div>#</div>
          <div>nome/marca</div>
          <div>cliente</div>
          <div>valor</div>
          <div>status</div>
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
          : <div style={{ margin: '2rem 0', textAlign: 'center' }}>
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
