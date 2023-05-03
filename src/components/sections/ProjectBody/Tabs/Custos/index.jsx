import AddButton from '@/components/elements/AddButton'
import styles from '../../ProjectBody.module.scss'
import Cost from '@/components/patterns/Cost'
import adicionarItem from '@/utils/dispatchers/adicionarItem';
import { Stack } from '@mui/material'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';

export default function Custos({ selectedTab, variant }) {
  const custosFixos = useSelector(state => state.propostaAtual.custosFixos);

  return (
    <motion.div
      className={styles.tabContent}
      variants={variant}
      animate={selectedTab === 1 ? 'visible' : 'hidden'}
    >
      <AnimatePresence initial={false}>
        {custosFixos.map(custo => (
          <Cost custo={custo} key={custo.id} />
        ))}
      </AnimatePresence>
      <AddButton onClick={adicionarItem('custosFixos')}>Adicionar</AddButton>
    </motion.div>
  )
}
