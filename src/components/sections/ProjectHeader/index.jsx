import styles from './ProjectHeader.module.scss';
import VersionSelector from '@/components/elements/VersionSelector';
import CategorySelector from '@/components/elements/CategorySelector';
import { useSelector } from "react-redux";
import { TextField } from '@mui/material';
import { memo } from 'react';
import propostaDispatcher from '@/commom/dispatchers/propostaDispatcher';
import { useRouter } from 'next/router';
import SkeletonLoader from '@/components/elements/SkeletonLoader';

function ProjectHeader() {
  const router = useRouter();
  const { propostaAtual, versoesAtual, isLoading } = useSelector(state => ({
    propostaAtual: state.propostaAtual.data,
    versoesAtual: state.propostaAtual.versoes,
    isLoading: state.propostaAtual.isLoading,
  }));
  const { numeroProposta, versaoProposta, categoria, nomeProjeto, descricaoProjeto, cliente, marca } = propostaAtual;

  return (
    <section className={styles.projectHeaderContainer}>
      <div className='container'>
        <div className={styles.titleContainer}>
          <div>
            <SkeletonLoader isLoading={isLoading}>
              <h1 style={{ display: 'inline-block', marginRight: '1rem' }}>Proposta {`${numeroProposta}.${versaoProposta}`}</h1>
            </SkeletonLoader>
            {!isLoading && !propostaAtual.excluido && versoesAtual.length > 1 &&
              <VersionSelector options={versoesAtual} value={versaoProposta} onChange={propostaDispatcher.versionSwitcher(router)} />
            }
          </div>
          <div>
            <SkeletonLoader isLoading={isLoading}>
              <CategorySelector value={categoria} onChange={propostaDispatcher.changeHandler('categoria')} />
            </SkeletonLoader>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.col}>
            <SkeletonLoader isLoading={isLoading} width='100%'>
              <TextField fullWidth required label='nome do projeto' value={nomeProjeto} onChange={propostaDispatcher.changeHandler('nomeProjeto')} />
            </SkeletonLoader>
            <SkeletonLoader isLoading={isLoading} width='100%'>
              <TextField fullWidth required label='descrição' value={descricaoProjeto} onChange={propostaDispatcher.changeHandler('descricaoProjeto')} />
            </SkeletonLoader>
          </div>
          <div className={styles.col}>
            <SkeletonLoader isLoading={isLoading} width='100%'>
              <TextField fullWidth required label='cliente' value={cliente} onChange={propostaDispatcher.changeHandler('cliente')} />
            </SkeletonLoader>
            <SkeletonLoader isLoading={isLoading} width='100%'>
              <TextField fullWidth label='marca' value={marca} onChange={propostaDispatcher.changeHandler('marca')} />
            </SkeletonLoader>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectHeader);
