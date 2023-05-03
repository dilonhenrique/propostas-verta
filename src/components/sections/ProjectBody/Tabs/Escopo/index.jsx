import styles from '../../ProjectBody.module.scss'
import AddButton from '@/components/elements/AddButton'
import Task from '@/components/patterns/Task'
import adicionarItem from '@/utils/dispatchers/adicionarItem'
import changeItemOrder from '@/utils/dispatchers/changeItemOrder'
import { Stack } from '@mui/material'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

function Escopo({ selectedTab, variant }) {
  const escopo = useSelector(state => state.propostaAtual.escopo);

  return (
    <motion.div
      className={styles.tabContent}
      variants={variant}
      animate={selectedTab === 0 ? 'visible' : 'hidden'}
    >
      <Reorder.Group as='div' axis="y" values={escopo} onReorder={changeItemOrder}>
        <AnimatePresence initial={false}>
          {escopo.map(item => (
            <Task key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <AddButton onClick={adicionarItem()}>Adicionar</AddButton>
    </motion.div>
  )
}

export default memo(Escopo);