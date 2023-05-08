import { TbCashBanknote, TbClock, TbGripVertical, TbMoodSmile } from 'react-icons/tb';
import styles from './Task.module.scss';
import DeleteButton from '@/components/elements/DeleteButton';
import TypeButton from '@/components/elements/TypeButton';
import OutlinedInput from '@/components/elements/OutlinedInput';
import { memo } from 'react';
import { Stack } from '@mui/material';
import propostaDispatcher from '@/commom/dispatchers/propostaDispatcher';
import { Reorder, useDragControls } from 'framer-motion';

const iconProps = {
  size: 20,
  color: '#A6A6A6'
}

function Task({ item }) {

  const controls = useDragControls();
  const taskAtual = item;

  const secondaryFields = {
    fase:
      <Stack direction='row' gap={0.5} sx={{ color: 'gray' }}>
        <TbClock />
        <p>{taskAtual.tempo || 0}h</p>
      </Stack>,

    terceirizada:
      <OutlinedInput
        defaultValue={taskAtual.valor}
        onBlur={propostaDispatcher.changeHandler('valor', item.id)}
        type='number'
        placeholder='custo'
        sx={{ width: '125px' }}
        Icon={TbCashBanknote}
      />,

    tarefa:
      <>
        <OutlinedInput
          defaultValue={taskAtual.tempo}
          onBlur={propostaDispatcher.changeHandler('tempo', item.id)}
          type='number'
          placeholder='tempo'
          sx={{ width: '125px' }}
          Icon={TbClock}
        />
        <OutlinedInput
          defaultValue={taskAtual.pessoas == 1 ? '' : taskAtual.pessoas}
          onBlur={propostaDispatcher.changeHandler('pessoas', item.id)}
          type='number'
          placeholder='pessoas'
          sx={{ width: '125px' }}
          Icon={TbMoodSmile}
        />
      </>,
  }

  const fieldOptions = {
    fase: secondaryFields.fase,
    terceirizada: secondaryFields.terceirizada,
    tarefa: secondaryFields.tarefa,
  }

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      as='div'
      whileDrag={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
      transition={{ type: "tween" }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      initial={{ opacity: 0, height: 0, y: '-100%' }}
      exit={{ opacity: 0, height: 0, y: '-100%' }}
    >
      <div className={taskAtual.tipo === 'fase' ? styles.task : `${styles.task} ${styles.nested}`}>
        <div
          className={styles.dragContainer}
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            controls.start(e);
            e.preventDefault();
          }}
        >
          <TbGripVertical className={styles.drag} {...iconProps} />
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.primary}>
            <OutlinedInput
              fullWidth
              placeholder={`nome da ${taskAtual.tipo}`}
              defaultValue={taskAtual.nome}
              onBlur={propostaDispatcher.changeHandler('nome', item.id)}
              onKeyDown={propostaDispatcher.keyDownHandler('escopo', item.id)}
              InputProps={{ autoFocus: item.autoFocus }}
            />
          </div>
          <div className={styles.secondary}>
            {fieldOptions[taskAtual.tipo] || fieldOptions['tarefa']}
            <div className={styles.actions}>
              <DeleteButton onClick={propostaDispatcher.deleteItem(item.id)} iconProps={iconProps} />
              <TypeButton changeFn={propostaDispatcher.changeItemType(item.id)} iconProps={iconProps} />
            </div>
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}

export default memo(Task);