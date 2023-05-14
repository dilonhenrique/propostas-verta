import { List, ListSubheader } from '@mui/material';
import styles from '@/styles/Home.module.scss';
import PropostaListItem from './PropostaListItem';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

export default function PropostaList() {
  const listaPropostas = useSelector(state => state.listaPropostas.data);

  return (
    <List>
      <ListSubheader className={styles.listaRow}>
        <div></div>
        <div>#</div>
        <div>nome/marca</div>
        <div>cliente</div>
        <div>valor</div>
        <div>status</div>
        <div></div>
      </ListSubheader>
      <div className={styles.listaPropostas}>
        <AnimatePresence>
          {listaPropostas.map(proposta => (
            <PropostaListItem key={proposta.id} proposta={proposta} />)
          )}
        </AnimatePresence>
      </div>
    </List>
  )
}
