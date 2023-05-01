/* eslint-disable @next/next/no-img-element */
import Button from '@/components/elements/Button';
import styles from './Navbar.module.scss';

import { TbFileCheck, TbFileLike, TbFileExport, TbFileDollar, TbSignature, TbTrash, TbTriangleSquareCircle } from 'react-icons/tb';
import SaveButton from '@/components/elements/SaveButton';
import { memo } from 'react';

const iconStyle = {
  size: 18
}

function Navbar() {
  const editar = true;

  return (
    <header className={styles.header}>
      <div className='container row'>
        <div className={styles.logoContainer}>
          <img src='/assets/images/verta.jpg' alt="Logotipo Estúdio Vertá" />
        </div>
        {editar
          ? <div className={styles.contextualContainer}>
            <SaveButton iconStyle={iconStyle} />
            <Button startIcon={<TbFileExport {...iconStyle} />}><p>Exportar</p></Button>
            <Button startIcon={<TbFileCheck {...iconStyle} />}><p>Assinar</p></Button>
          </div>
          : <div className={styles.contextualContainer}>
            busca, defaultparams, nova proposta (talvez como speed dial)
          </div>
        }
      </div>
    </header>
  )
}

export default memo(Navbar);
