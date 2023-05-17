import { useSelector } from 'react-redux';
import styles from './QuickView.module.scss';
import toCurrency from '@/commom/utils/toCurrency';
import { motion } from 'framer-motion';

export default function QuickView() {
  const propostaAtual = useSelector(state => state.propostaAtual.data);
  const valorParcela = propostaAtual.valorTotal / propostaAtual.parcelas;

  return (
      <motion.div
        className={styles.quickViewContainer}
        initial={{opacity:0, y:'100%'}}
        animate={{opacity:1, y:'0%'}}
        exit={{opacity:0, y:'100%'}}
      >
        <div className={styles.quickViewContainer__content}>
          {(propostaAtual.descontoVista > 0 || propostaAtual.parcelas == 1) &&
            <div>
              <p className={styles.itemLabel}>à vista {propostaAtual.parcelas > 1 ? `(${propostaAtual.descontoVista}%)` : null}</p>
              <p className={styles.itemValue}>{toCurrency(propostaAtual.valorVista)}</p>
            </div>
          }
          {propostaAtual.parcelas > 1 &&
            <div>
              <p className={styles.itemLabel}>{valorParcela > 0 ? <>{propostaAtual.parcelas}x de {toCurrency(valorParcela)}</> : 'parcelado'}</p>
              <p className={styles.itemValue}>{toCurrency(propostaAtual.valorTotal)}</p>
            </div>
          }
          <div className={styles.cargaHoraria}>
            <p className={styles.itemLabel}>carga horária</p>
            <p className={styles.itemValue}>{propostaAtual.cargaHoraria}<small>h</small></p>
          </div>
        </div>
      </motion.div>
  )
}
