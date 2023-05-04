/* eslint-disable @next/next/no-img-element */
import Button from '@/components/elements/Button';
import styles from './Navbar.module.scss';

import { TbFileCheck, TbFileLike, TbFileExport, TbFileDollar, TbSignature, TbTrash, TbTriangleSquareCircle, TbSearch } from 'react-icons/tb';
import SaveButton from '@/components/elements/SaveButton';
import { memo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { InputAdornment, TextField } from '@mui/material';

const iconStyle = {
  size: 18
}

function Navbar() {
  const { mode } = useSelector(state => state.globalStatus);

  const navBarContext = {
    list: <>
      busca, defaultparams, nova proposta (talvez como speed dial)
      <TextField variant='outlined' size="small" type='search' placeholder='Buscar...' InputProps={{ sx: { backgroundColor: '#FFFFFF' }, startAdornment: <InputAdornment position="start"><TbSearch size={18} /></InputAdornment> }} />
    </>,
    edit: <>
      <SaveButton iconStyle={iconStyle} />
      <Button startIcon={<TbFileExport {...iconStyle} />}><p>Exportar</p></Button>
      <Button startIcon={<TbFileCheck {...iconStyle} />}><p>Assinar</p></Button>
    </>,
    neutral:<></>
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
