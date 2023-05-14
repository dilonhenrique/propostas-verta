import styles from './ProjectHeader.module.scss';
import VersionSelector from '@/components/elements/VersionSelector';
import CategorySelector from '@/components/elements/CategorySelector';
import { useSelector } from "react-redux";
import { TextField } from '@mui/material';
import { memo } from 'react';
import propostaDispatcher from '@/commom/dispatchers/propostaDispatcher';
import { useRouter } from 'next/router';

function ProjectHeader() {
  const router = useRouter();
  const propostaAtual = useSelector(state => state.propostaAtual);
  const { numeroProposta, versaoProposta, categoria, nomeProjeto, descricaoProjeto, cliente, marca } = propostaAtual;
  const versoesAtual = useSelector(state => state.versoesAtual);

  return (
    <section className={styles.projectHeaderContainer}>
      <div className='container'>
        <div className={styles.titleContainer}>
          <div>
            <h1 style={{ display: 'inline-block', marginRight: '1rem' }}>Proposta {`${numeroProposta}.${versaoProposta}`}</h1>
            {!propostaAtual.excluido && versoesAtual.length > 1 &&
              <VersionSelector options={versoesAtual} value={versaoProposta} onChange={propostaDispatcher.versionSwitcher(router)} />
            }
          </div>
          <div>
            <CategorySelector value={categoria} onChange={propostaDispatcher.changeHandler('categoria')} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.col}>
            <TextField fullWidth required label='nome do projeto' value={nomeProjeto} onChange={propostaDispatcher.changeHandler('nomeProjeto')} />
            <TextField fullWidth required label='descrição' value={descricaoProjeto} onChange={propostaDispatcher.changeHandler('descricaoProjeto')} />
          </div>
          <div className={styles.col}>
            <TextField fullWidth required label='cliente' value={cliente} onChange={propostaDispatcher.changeHandler('cliente')} />
            <TextField fullWidth label='marca' value={marca} onChange={propostaDispatcher.changeHandler('marca')} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectHeader);
