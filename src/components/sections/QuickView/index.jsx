import { useSelector } from 'react-redux';
import styles from './QuickView.module.scss';
import toCurrency from '@/commom/utils/toCurrency';

export default function QuickView() {
  const propostaAtual = useSelector(state => state.propostaAtual);
  const valorParcela = propostaAtual.valorTotal / propostaAtual.parcelas;

  return (
    <div className={styles.quickViewContainer}>
      <div className={styles.quickViewContainer__content}>
        <div>
          <p className={styles.itemLabel}>à vista ({propostaAtual.descontoVista}%)</p>
          <p className={styles.itemValue}>{toCurrency(propostaAtual.valorVista)}</p>
        </div>
        <div>
          <p className={styles.itemLabel}>{valorParcela > 0 ? <>{propostaAtual.parcelas}x de {toCurrency(valorParcela)}</> : 'parcelado'}</p>
          <p className={styles.itemValue}>{toCurrency(propostaAtual.valorTotal)}</p>
        </div>
        <div className={styles.cargaHoraria}>
          <p className={styles.itemLabel}>carga horária</p>
          <p className={styles.itemValue}>{propostaAtual.cargaHoraria}<small>h</small></p>
        </div>
      </div>
    </div>
  )
}
