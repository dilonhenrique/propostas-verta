import { Button, Collapse, IconButton, LinearProgress, Slide, Stack, Step, StepButton, Stepper } from '@mui/material';
import styles from './AssinaturaProp.module.scss';
import { useState } from 'react';
import Pagamento from './Pagamento';
import Cadastro from './Cadastro';
import Contrato from './Contrato';
import { useDispatch, useSelector } from 'react-redux';
import { assinarProposta } from '@/store/reducers/assinatura';
import { validateStep } from '@/commom/utils/stepperValidation';
import asaasService from '@/commom/service/asaasService';
import { useAssinaturaForm } from '@/commom/hooks/useAssinaturaForm';
import { IoIosArrowDown } from 'react-icons/io';

export default function AssinaturaProp() {
  const dispatch = useDispatch();
  const { register } = useAssinaturaForm();

  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});

  const [openDetail, setOpenDetail] = useState(false);

  const { dados, propostaAtual, signing } = useSelector(state => ({
    dados: state.assinatura,
    propostaAtual: state.assinatura.proposta,
    signing: state.signing,
  }));

  const stepControl = {
    assinar: (evento) => {
      evento.preventDefault();
      if (validationMiddleware(2)) {
        setActiveStep(3)
        dispatch(assinarProposta);
      }
    },

    nextStep: async () => {
      if (validationMiddleware(activeStep)) {

        if (activeStep === 1) {
          //cria um objeto para o novo cliente
          let newClient = {
            id: dados.cliente.id,
            email: dados.cliente.email,
            name: dados.cliente.name,
            cpfCnpj: dados.cliente.cpfCnpj,
            postalCode: dados.cliente.postalCode,
            state: dados.cliente.state,
            address: dados.cliente.address,
            addressNumber: dados.cliente.addressNumber,
            complement: dados.cliente.complement,
            province: dados.cliente.province,
          }

          //salva o novo cadastro do cliente e atualiza o estado global
          if (!dados.cliente.id || dados.cliente.changed) await asaasService.saveClient(newClient);
        }

        stepControl.goToStep(activeStep + 1);
      }
    },

    prevStep: () => { stepControl.goToStep(activeStep - 1); },

    goToStep: (n) => {
      setActiveStep(n);
    },
  }

  function validationMiddleware(n) {
    const isValid = validateStep[n]();

    const newCompleted = completedSteps;
    newCompleted[activeStep] = isValid;
    setCompletedSteps(newCompleted);

    return isValid;
  }

  const steps = [
    {
      label: 'Pagamento',
      content: Pagamento,
    },
    {
      label: 'Cadastro',
      content: Cadastro,
    },
    {
      label: 'Assinatura',
      content: Contrato,
    },
  ]

  const isMobile = window.innerWidth < 800;

  return (
    <div className={styles.pageContainer}>
      <section className={styles.propContainer}>
        <Stack direction='row' gap={1}>
          {isMobile && <IconButton
            sx={{ height: '40px', width: '40px', marginLeft: '-1rem' }}
            onClick={() => setOpenDetail(atual => !atual)}
          >
            <IoIosArrowDown color='#FFF' style={{ transition: '300ms', transform: `rotate(${openDetail ? '180' : '0'}deg)` }} />
          </IconButton>}
          <div>
            <h6>Assinar proposta {propostaAtual.numeroProposta}.{propostaAtual.versaoProposta}</h6>
            <h1>{propostaAtual.nomeProjeto}</h1>
          </div>
        </Stack>
        <Collapse in={!isMobile || openDetail}>
          <div className={styles.propDetails}>
            <h6>Cliente</h6>
            <p>{propostaAtual.cliente}</p>
            <h6>Marca</h6>
            <p>{propostaAtual.marca}</p>
            <h6>Valor</h6>
            <p>{propostaAtual.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
        </Collapse>
      </section>
      <Slide in={activeStep < 3} unmountOnExit appear={false}>
        <section className={styles.stepsContainer}>
          <Stepper
            nonLinear
            activeStep={activeStep}
            className={styles.stepperContainer}
          >
            {steps.map((step, index) => (
              <Step key={step.label} completed={completedSteps[index]}>
                <StepButton onClick={() => setActiveStep(index)} disabled={!(index === 0 || completedSteps[index - 1])}>
                  <Collapse orientation='horizontal' in={!isMobile || activeStep === index}><span>{step.label}</span></Collapse>
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <div className={styles.contentContainer}>
            {steps.map((step, index) => {
              const Component = step.content;
              return (
                <Collapse key={step.label} in={activeStep === index}>
                  <Component register={register} />
                </Collapse>
              )
            })}
          </div>

          <div className={styles.buttonsContainer}>
            {activeStep !== 0 && <Button variant='outlined' onClick={stepControl.prevStep}>Voltar</Button>}
            {activeStep < 2
              ? <Button variant='contained' onClick={stepControl.nextStep}>Próximo</Button>
              : <Button variant='contained' onClick={stepControl.assinar}>Assinar</Button>
            }
          </div>
        </section>
      </Slide>
      <Slide in={activeStep > 2} unmountOnExit>
        {/* <AssinaturaEnd /> */}
        <section className={styles.stepsContainer} style={{ paddingTop: '6rem' }}>
          <h2>{signing.mensagem}</h2>
          <LinearProgress
            sx={{ my: 3, height: '.5rem' }}
            variant="determinate"
            color={signing.error ? 'error' : 'primary'}
            value={signing.porcentagem}
          />
          {!signing.error
            ? <small>{signing.porcentagem < 100
              ? 'Estamos gerando a assinatura da sua proposta. Por favor, não feche esta aba.'
              : 'Tudo certo! Você já pode fechar esta página'
            }</small>
            : <>
              <p><small>Você pode tentar novamente, ou então entrar em contato com nosso suporte.</small></p>
              <Stack direction='row' gap={2} sx={{ my: 2 }}>
                <Button variant='outlined' href={`https://wa.me/5551993669397?text=Ol%C3%A1%21+Estou+com+problema+para+assinar+o+contrato+digital+da+Vert%C3%A1+${propostaAtual.numeroProposta}`} target='_blank'>Suporte</Button>
                <Button variant='contained' onClick={stepControl.assinar}>Tentar novamente</Button>
              </Stack>
            </>
          }
        </section>
      </Slide>
    </div >
  )
}
