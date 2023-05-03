import { Stack } from '@mui/material';
import { TbCashBanknote, TbTag } from 'react-icons/tb';

import styles from './Cost.module.scss';
import DeleteButton from '@/components/elements/DeleteButton';
import OutlinedInput from '@/components/elements/OutlinedInput';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import { changeHandler } from '@/utils/dispatchers/changeHandler';
import deleteItem from '@/utils/dispatchers/deleteItem';
import { motion } from 'framer-motion';

const iconProps = {
  size: 20,
  color: '#A6A6A6'
}

function Cost({ custo }) {

  return (
    <motion.div
      transition={{ type: "tween" }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      initial={{ opacity: 0, height: 0, y: '-100%' }}
      exit={{ opacity: 0, height: 0, y: '-100%' }}
    >
      <Stack gap={1} direction='row' className={styles.cost} justifyContent='center' flexGrow={1}>
        <OutlinedInput
          defaultValue={custo.nome}
          onBlur={changeHandler('nome', custo.id)}
          placeholder='nome'
          Icon={TbTag}
        />
        <OutlinedInput
          defaultValue={custo.valor}
          onBlur={changeHandler('valor', custo.id)}
          type='number'
          placeholder='valor'
          Icon={TbCashBanknote}
        />
        <div className={styles.icons}>
          <DeleteButton onClick={deleteItem(custo.id)} iconProps={iconProps} />
        </div>
      </Stack>
    </motion.div>
  )
}

export default memo(Cost);