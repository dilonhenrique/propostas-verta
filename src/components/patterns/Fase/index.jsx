import { Stack } from '@mui/material';
import { TbClock, TbGripVertical } from 'react-icons/tb';
import styles from '../Task/Task.module.scss';
import DeleteButton from '@/components/elements/DeleteButton';
import TypeButton from '@/components/elements/TypeButton';
import OutlinedInput from '@/components/elements/OutlinedInput';
import { useSelector } from 'react-redux';
import Task from '../Task';
import { memo } from 'react';
import { changeHandler } from '@/utils/changeHandler';
import mudarItem from '@/utils/mudarItem';

const iconProps = {
  size: 20,
  color: '#A6A6A6'
}

function Fase({ itemId }) {
  const faseAtual = useSelector(state => state.propostaAtual.fases.find(fase => fase.id === itemId));

  return (
    <>
      <div className={styles.task}>
        <div className={styles.dragContainer}>
          <TbGripVertical className={styles.drag} {...iconProps} />
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.primary}>
            <OutlinedInput fullWidth placeholder='nome da fase' defaultValue={faseAtual.nome} onBlur={changeHandler('nome', itemId)} />
          </div>
          <div className={styles.secondary}>
            <Stack direction='row' gap={0.5} sx={{ color: 'gray' }}>
              <TbClock />
              <p>{faseAtual.tempo}h</p>
            </Stack>
            <div className={styles.actions}>
              <DeleteButton iconProps={iconProps} />
              <TypeButton iconProps={iconProps} />
            </div>
          </div>
        </div>
      </div>
      {faseAtual.tarefas.map(tarefa => (
        <Task parentId={faseAtual.id} itemId={tarefa.id} key={tarefa.id} />
      ))}
    </>
  )
}

export default memo(Fase);