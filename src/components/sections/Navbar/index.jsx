/* eslint-disable @next/next/no-img-element */
import Button from '@/components/elements/Button';
import styles from './Navbar.module.scss';

import { TbFilter, TbFileCheck, TbFileLike, TbFileExport, TbFileDollar, TbSignature, TbTrash, TbTriangleSquareCircle, TbSearch } from 'react-icons/tb';
import SaveButton from '@/components/elements/SaveButton';
import { memo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import SearchBar from '@/components/elements/SearchBar';
import { IconButton } from '@mui/material';

const iconStyle = {
  size: 18
}

function Navbar() {
  const { mode, id } = useSelector(state => {
    return {
      mode: state.globalStatus.mode,
      id: state.propostaAtual.id,
    }
  });

  const navBarContext = {
    list: <>
      <IconButton hidden={true} size='small' color="primary"><TbFilter /></IconButton>
      <SearchBar />
    </>,
    edit: <>
      <SaveButton iconStyle={iconStyle} />
      <Button href={`/exportar/${id}`} startIcon={<TbFileExport {...iconStyle} />}><p>Exportar</p></Button>
      <Button startIcon={<TbFileCheck {...iconStyle} />}><p>Assinar</p></Button>
    </>,
    neutral: <></>
  }

  return (
    <header className={styles.header}>
      <div className='container row'>
        <div className={styles.logoContainer}>
          <Link href='/'>
            <img src='/assets/images/verta.jpg' alt="Logotipo Estúdio Vertá" />
          </Link>
        </div>
        <div className={styles.contextualContainer}>
          {navBarContext[mode] || ''}
        </div>
      </div>
    </header>
  )
}

export default memo(Navbar);
