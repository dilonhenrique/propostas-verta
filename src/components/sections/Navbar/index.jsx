/* eslint-disable @next/next/no-img-element */
import Button from '@/components/elements/Button';
import styles from './Navbar.module.scss';

import { TbFilter, TbFileCheck, TbFileExport, TbHistory, TbTrashOff, TbSquaresDiagonal, TbFileStack, TbUserCircle, TbUserPlus, TbLogout, TbMoon, TbSunHigh, TbSun } from 'react-icons/tb';
import SaveButton from '@/components/elements/SaveButton';
import { memo, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import SearchBar from '@/components/elements/SearchBar';
import { Alert, Avatar, ButtonBase, Divider, IconButton, ListItemIcon, Menu, MenuItem, ThemeProvider } from '@mui/material';
import propostaService from '@/commom/service/propostaService';
import { dark } from '@/theme/theme';

const iconStyle = {
  size: 18
}

function Navbar() {
  const { mode, propostaAtual, darkMode } = useSelector(state => {
    return {
      mode: state.globalStatus.mode,
      propostaAtual: state.propostaAtual.data,
      darkMode: state.globalStatus.darkMode,
    }
  });

  const navBarContext = {
    list: <>
      {/* <IconButton hidden={true} size='small' color="primary"><TbFilter /></IconButton> */}
      <SearchBar />
    </>,
    edit: <>
      <SaveButton iconStyle={iconStyle} />
      <Button href={`/exportar/${propostaAtual.id}`} startIcon={<TbFileExport {...iconStyle} />}><p>Exportar</p></Button>
      <Button
        href={`/assinar/?n=${propostaAtual.numeroProposta}.${propostaAtual.versaoProposta}&c=${propostaAtual.cliente}`}
        startIcon={<TbFileCheck {...iconStyle} />}
        disabled={propostaAtual.status === 'aprovada' || propostaAtual.status === 'aprovada*'}
      >
        <p>Assinar</p>
      </Button>
    </>,
    deleted: <>
      <small style={{ color: '#eaa8a8' }}>Proposta deletada! </small>
      <Button onClick={() => { propostaService.undeleteProposta(propostaAtual.id) }} startIcon={<TbTrashOff {...iconStyle} />}><p>Restaurar?</p></Button>
    </>,
    neutral: <></>,
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={dark}>
      <header className={styles.header}>
        <div className='containerXl row'>
          <div className={styles.logoContainer}>
            <ButtonBase onClick={handleMenu}>
              <Avatar alt='Menu principal' src='/assets/images/verta.jpg' sx={{ width: '30px', height: '30px' }} />
            </ButtonBase>
          </div>
          <div className={styles.contextualContainer}>
            {navBarContext[mode] || ''}
          </div>
        </div>
      </header>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu} href="/" component={Link}>
          <ListItemIcon>
            <TbFileStack {...iconStyle} />
          </ListItemIcon>
          Lista de propostas
        </MenuItem>
        <MenuItem onClick={closeMenu} href="/" disabled component={Link}>
          <ListItemIcon>
            <TbUserCircle {...iconStyle} />
          </ListItemIcon>
          Meu perfil
        </MenuItem>
        <MenuItem onClick={closeMenu} href="/" disabled component={Link}>
          <ListItemIcon>
            <TbUserPlus {...iconStyle} />
          </ListItemIcon>
          Cadastrar usuário
        </MenuItem>
        <MenuItem onClick={closeMenu} disabled>
          <ListItemIcon>
            {darkMode
              ? <TbSun {...iconStyle} />
              : <TbMoon {...iconStyle} />}
          </ListItemIcon>
          {darkMode
              ? 'Light mode'
              : 'Dark mode'}
        </MenuItem>
        <Divider />
        <MenuItem disabled onClick={closeMenu}>
          <ListItemIcon>
            <TbLogout {...iconStyle} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </ThemeProvider>
  )
}

export default memo(Navbar);
