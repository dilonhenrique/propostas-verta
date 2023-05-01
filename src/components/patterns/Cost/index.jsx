import { Stack } from '@mui/material';
import { TbCashBanknote, TbTag } from 'react-icons/tb';

import styles from './Cost.module.scss';
import DeleteButton from '@/components/elements/DeleteButton';
import OutlinedInput from '@/components/elements/OutlinedInput';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import { changeHandler } from '@/utils/changeHandler';
import deleteItem from '@/utils/deleteItem';

const iconProps = {
  size: 20,
  color: '#A6A6A6'
}

function Cost({ itemId }) {
  const costAtual = useSelector(state => state.propostaAtual.custosFixos.find(custo => custo.id === itemId));

  return (
    <Stack gap={1} direction='row' className={styles.cost} justifyContent='center' flexGrow={1}>
      <OutlinedInput
        defaultValue={costAtual.nome}
        onBlur={changeHandler('nome', itemId)}
        placeholder='nome'
        Icon={TbTag}
      />
      <OutlinedInput
        defaultValue={costAtual.valor}
        onBlur={changeHandler('valor', itemId)}
        type='number'
        placeholder='valor'
        Icon={TbCashBanknote}
      />
      <div className={styles.icons}>
        <DeleteButton onClick={deleteItem(itemId)} iconProps={iconProps} />
      </div>
    </Stack>
  )
}

export default memo(Cost);