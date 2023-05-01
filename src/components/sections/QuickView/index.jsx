import { useSelector } from 'react-redux';
import styles from './QuickView.module.scss';
import toCurrency from '@/utils/toCurrency';

export default function QuickView() {
  const propostaAtual = useSelector(state => state.propostaAtual);

  return (
    <div className={styles.quickViewContainer}>
      <div className={styles.quickViewContainer__content}>
        <div>
          <p className={styles.itemLabel}>à vista (10%)</p>
          <p className={styles.itemValue}>{toCurrency(propostaAtual.valorVista)}</p>
        </div>
        <div>
          <p className={styles.itemLabel}>{propostaAtual.parcelas}x de {toCurrency(propostaAtual.valorTotal / propostaAtual.parcelas)}</p>
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
