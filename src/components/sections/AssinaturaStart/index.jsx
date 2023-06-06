import { Alert, Button, CircularProgress, IconButton, Popover, TextField, Tooltip } from '@mui/material';
import styles from './AssinaturaStart.module.scss';
import { forwardRef, useState } from 'react';
import { closeSnackbar, enqueueSnackbar } from 'notistack';
import { useAnimate } from 'framer-motion';
import { TbSearch, TbQuestionMark } from 'react-icons/tb';
import { propApi } from '@/commom/infra/propApi';
import { assinarProposta, setProposta } from '@/store/reducers/assinatura';
import { useDispatch } from 'react-redux';

function AssinaturaStart(prop,ref) {
  const [loading, setLoading] = useState(false);
  const [scope, animate] = useAnimate();
  const dispatch = useDispatch();

  async function submit(evento) {
    evento.preventDefault();
    setLoading(true);
    closeSnackbar();

    const [numeroProposta, versaoProposta] = evento.target.elements.numeroProposta.value.split('.');
    const cliente = evento.target.elements.cliente.value;

    try {
      const buscar = await propApi(`propostas?numeroProposta='${numeroProposta}'&versaoProposta='${versaoProposta}'&cliente='${cliente}'`);
      const proposta = buscar.data[0];

      if(proposta.status === 'aprovada' || proposta.status === 'aprovada*') throw Error('Esta proposta já foi aprovada!')

      // await animate(scope.current, { scale: 0, opacity: 0 }, { ease: 'backInOut' });
      dispatch(setProposta(proposta));
    } catch (err) {
      enqueueSnackbar(
        <p>
          <span style={{ fontWeight: 'bold' }}>{err.message || 'Não encontramos essa proposta!'}</span><br />
          Confira os dados e tente novamente.
        </p>
        , { variant: 'error' });
    }

    setLoading(false);
  }
  
  return (
    <section className={styles.assinaturaContainer} ref={ref}>
      <h1>
        Assinatura digital <Tooltip arrow title="Este é o processo de assinatura digital das propostas da Vertá. Caso você tenha recebido um orçamento nosso, você pode pesquisar o número e seu nome (como escrito na proposta) e iniciar o processo. É fácil e 100% seguro.">
          <IconButton
            disableFocusRipple
            disableRipple
            color='inherit'
            size='small'
            sx={{ border: '#FFF solid 1px' }}
          >
            <TbQuestionMark />
          </IconButton>
        </Tooltip>
      </h1>
      <div className={styles.formContainer} ref={scope}>
        <form onSubmit={submit}>
          <TextField variant='outlined' label='Número da proposta' name='numeroProposta' required />
          <TextField variant='outlined' label='Nome do cliente' name='cliente' required />
          <Button type='submit' size='large' variant='contained' sx={{ height: 40 }}>
            {loading
              ?
              <CircularProgress size={20} color='inherit' />
              :
              <>Buscar proposta <TbSearch size={16} style={{ marginLeft: '.5rem' }} /></>
            }
          </Button>
        </form>
      </div>
    </section>
  )
}

export default forwardRef(AssinaturaStart);
