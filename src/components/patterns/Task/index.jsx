import { TbCashBanknote, TbClock, TbGripVertical, TbMoodSmile } from 'react-icons/tb';

import styles from './Task.module.scss';
import DeleteButton from '@/components/elements/DeleteButton';
import TypeButton from '@/components/elements/TypeButton';
import OutlinedInput from '@/components/elements/OutlinedInput';
import { useSelector } from 'react-redux';
import { memo } from 'react';
import { changeHandler } from '@/utils/changeHandler';
import { Stack } from '@mui/material';
import deleteItem from '@/utils/deleteItem';
import mudarItem from '@/utils/mudarItem';
import { Reorder, useDragControls } from 'framer-motion';

const iconProps = {
  size: 20,
  color: '#A6A6A6'
}

function Task({ itemId, value }) {
  const controls = useDragControls();
  const taskAtual = useSelector(state =>
    state.propostaAtual.escopo.find(item =>
      item.id === itemId
    )
  );

  return (
    <Reorder.Item value={value} dragListener={false} dragControls={controls} as='div'>
      <div className={taskAtual.tipo === 'fase' ? styles.task : `${styles.task} ${styles.nested}`}>
        <div className={styles.dragContainer} onPointerDown={(e) => controls.start(e)}>
          <TbGripVertical className={styles.drag} {...iconProps} />
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.primary}>
            <OutlinedInput fullWidth placeholder={`nome da ${taskAtual.tipo}`} defaultValue={taskAtual.nome} onBlur={changeHandler('nome', itemId)} />
          </div>
          <div className={styles.secondary}>
            {taskAtual.tipo === 'fase'
              ?
              <Stack direction='row' gap={0.5} sx={{ color: 'gray' }}>
                <TbClock />
                <p>{taskAtual.tempo}h</p>
              </Stack>
              : taskAtual.tipo === 'terceirizada'
                ?
                <OutlinedInput
                  defaultValue={taskAtual.valor}
                  onBlur={changeHandler('valor', itemId)}
                  type='number'
                  placeholder='custo'
                  sx={{ width: '125px' }}
                  Icon={TbCashBanknote}
                />
                :
                <>
                  <OutlinedInput
                    defaultValue={taskAtual.tempo}
                    onBlur={changeHandler('tempo', itemId)}
                    type='number'
                    placeholder='tempo'
                    sx={{ width: '125px' }}
                    Icon={TbClock}
                  />
                  <OutlinedInput
                    defaultValue={taskAtual.pessoas == 1 ? '' : taskAtual.pessoas}
                    onBlur={changeHandler('pessoas', itemId)}
                    type='number'
                    placeholder='pessoas'
                    sx={{ width: '125px' }}
                    Icon={TbMoodSmile}
                  />
                </>
            }
            <div className={styles.actions}>
              <DeleteButton onClick={deleteItem(itemId)} iconProps={iconProps} />
              <TypeButton changeFn={mudarItem(itemId)} iconProps={iconProps} />
            </div>
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}

export default memo(Task);