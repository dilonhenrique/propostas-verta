import styles from './ProjectHeader.module.scss';
import VersionSelector from '@/components/elements/VersionSelector';
import CategorySelector from '@/components/elements/CategorySelector';
import { useSelector } from "react-redux";
import { TextField } from '@mui/material';
import { memo } from 'react';
import { changeHandler } from '@/utils/changeHandler';

function ProjectHeader() {
  const { numeroProposta, versaoProposta, categoria, nomeProjeto, descricaoProjeto, cliente, marca } = useSelector(state => state.propostaAtual);
  const versoesAtual = useSelector(state => state.versoesAtual);

  return (
    <section className={styles.projectHeaderContainer}>
      <div className='container'>
        <div className={styles.titleContainer}>
          <div>
            <h1 style={{ display: 'inline-block', marginRight: '1rem' }}>Proposta {`${numeroProposta}.${versaoProposta}`}</h1>
            <VersionSelector options={versoesAtual} value={versaoProposta} onChange={changeHandler('versaoProposta')} />
          </div>
          <div>
            <CategorySelector value={categoria} onChange={changeHandler('categoria')} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.col}>
            <TextField fullWidth required label='nome do projeto' defaultValue={nomeProjeto} onBlur={changeHandler('nomeProjeto')} />
            <TextField fullWidth required label='descrição' defaultValue={descricaoProjeto} onBlur={changeHandler('descricaoProjeto')} />
          </div>
          <div className={styles.col}>
            <TextField fullWidth required label='cliente' defaultValue={cliente} onBlur={changeHandler('cliente')} />
            <TextField fullWidth label='marca' defaultValue={marca} onBlur={changeHandler('marca')} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectHeader);
