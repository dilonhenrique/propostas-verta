import styles from './ProjectHeader.module.scss';
import VersionSelector from '@/components/elements/VersionSelector';
import CategorySelector from '@/components/elements/CategorySelector';
import { useSelector } from "react-redux";
import { TextField } from '@mui/material';
import { memo } from 'react';
import { changeHandler } from '@/utils/dispatchers/changeHandler';
import { useRouter } from 'next/router';
import versionSwitcher from '@/utils/dispatchers/versionSwitcher';

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
            {versoesAtual.length > 1 &&
              <VersionSelector options={versoesAtual} value={versaoProposta} onChange={versionSwitcher(router)} />
            }
          </div>
          <div>
            <CategorySelector value={categoria} onChange={changeHandler('categoria')} />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.col}>
            <TextField fullWidth required label='nome do projeto' value={nomeProjeto} onChange={changeHandler('nomeProjeto')} />
            <TextField fullWidth required label='descrição' value={descricaoProjeto} onChange={changeHandler('descricaoProjeto')} />
          </div>
          <div className={styles.col}>
            <TextField fullWidth required label='cliente' value={cliente} onChange={changeHandler('cliente')} />
            <TextField fullWidth label='marca' value={marca} onChange={changeHandler('marca')} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectHeader);
