/* eslint-disable @next/next/no-img-element */
import Button from '@/components/elements/Button';
import styles from './Navbar.module.scss';

import { TbFilter, TbFileCheck, TbFileExport, TbHistory, TbTrashOff } from 'react-icons/tb';
import SaveButton from '@/components/elements/SaveButton';
import { memo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import SearchBar from '@/components/elements/SearchBar';
import { Alert, IconButton, ThemeProvider } from '@mui/material';
import propostaService from '@/commom/service/propostaService';
import { dark } from '@/theme/theme';

const iconStyle = {
  size: 18
}

function Navbar() {
  const { mode, id } = useSelector(state => {
    return {
      mode: state.globalStatus.mode,
      id: state.propostaAtual.data.id,
    }
  });

  const navBarContext = {
    list: <>
      {/* <IconButton hidden={true} size='small' color="primary"><TbFilter /></IconButton> */}
      <SearchBar />
    </>,
    edit: <>
      <SaveButton iconStyle={iconStyle} />
      <Button href={`/exportar/${id}`} startIcon={<TbFileExport {...iconStyle} />}><p>Exportar</p></Button>
      <Button disabled startIcon={<TbFileCheck {...iconStyle} />}><p>Assinar</p></Button>
    </>,
    deleted: <>
      <small style={{ color: '#eaa8a8' }}>Proposta deletada! </small>
      <Button onClick={() => { propostaService.undeleteProposta(id) }} startIcon={<TbTrashOff {...iconStyle} />}><p>Restaurar?</p></Button>
    </>,
    neutral: <></>,
  }

  return (
    <ThemeProvider theme={dark}>
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
    </ThemeProvider>
  )
}

export default memo(Navbar);
