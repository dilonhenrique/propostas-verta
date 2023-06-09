import AddButton from '@/components/elements/AddButton'
import styles from '../../ProjectBody.module.scss'
import Cost from '@/components/patterns/Cost'
import propostaDispatcher from '@/commom/dispatchers/propostaDispatcher';
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux';

export default function Custos({ selectedTab, variant }) {
  const custosFixos = useSelector(state => state.propostaAtual.data.custosFixos);

  return (
    <>
      <AnimatePresence initial={false}>
        {custosFixos.map(custo => (
          <Cost custo={custo} key={custo.id} />
        ))}
      </AnimatePresence>
      <AddButton onClick={propostaDispatcher.addItem('custosFixos')}>Adicionar</AddButton>
    </>
  )
}
