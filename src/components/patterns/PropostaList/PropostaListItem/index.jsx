import styles from '@/styles/Home.module.scss';
import toCurrency from '@/commom/utils/toCurrency';
import StatusSelector from '@/components/elements/StatusSelector';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'
import { VscIndent } from 'react-icons/vsc';
import { AiOutlinePlus } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import PropostaActions from './PropostaActions';
import propostaService from '@/commom/service/propostaService';

export const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '2rem 3rem 3fr 2fr 1fr 110px 3rem',
  gap: '1rem',
}

export default function PropostaListItem({ proposta, versoes = [], nested = false }) {
  const [openNested, setOpenNested] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const versoesAlt = versoes.length <= 1 ? [] : versoes.filter(versao => versao.versaoProposta !== proposta.versaoProposta);

  function changeHandler(){
    return async (evento) => {
      setLoadingStatus(true);
      const value = evento.target.value;
      const response = await propostaService.changeStatus(proposta, value);
      setLoadingStatus(false);
    }
  }

  return (
    <>
      <motion.ul
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
      >
        <ListItem className={`${styles.propostaItem} ${nested ? styles.nested : ''}`} sx={rowStyle}>
          <div>
            {nested
              ? <VscIndent size={20} color='#888888' style={{ marginLeft: '0.5rem' }} />
              : !!versoesAlt.length && <IconButton onClick={() => { setOpenNested(current => !current) }}><AiOutlinePlus size={18} /></IconButton>
            }
          </div>
          <ListItemText secondary={`${proposta.numeroProposta}.${proposta.versaoProposta}`} />
          <ListItemText secondary={<small>{proposta.categoria}</small>} className='stickyCol'>
            <Link href={`/editar/${proposta.id}`} className={styles.link}>{proposta.nomeProjeto}</Link>
          </ListItemText>
          <ListItemText primary={proposta.cliente} secondary={proposta.marca} />
          <ListItemText secondary={toCurrency(proposta.valorTotal)} />
          <StatusSelector value={proposta.status} onChange={changeHandler()} isLoading={loadingStatus} />
          <div>
            <PropostaActions proposta={proposta} />
          </div>
        </ListItem>
      </motion.ul>

      <AnimatePresence>
        {versoesAlt.length && openNested
          ? versoesAlt.map(versao => (
            <PropostaListItem key={versao.id} proposta={versao} nested />
          ))
          : null}
      </AnimatePresence>
      
    </>
  )
}
