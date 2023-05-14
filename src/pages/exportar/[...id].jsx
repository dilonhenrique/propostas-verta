import propostaService from '@/commom/service/propostaService';
import withSession from '@/commom/service/session';
import toCurrency from '@/commom/utils/toCurrency';
import PageTitle from '@/components/elements/PageTitle';
import Navbar from '@/components/sections/Navbar';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import styles from '@/styles/Exportar.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Exportar(props) {
  const { propostaAtual } = props;
  const hoje = new Date();
  const mes = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho", "agosto", "septembro", "outubro", "novembro", "dezembro"]
  const pageTitle = `VERTA${propostaAtual.numeroProposta}.${propostaAtual.versaoProposta}-${propostaAtual.categoria}-${(propostaAtual.marca || propostaAtual.cliente).toUpperCase()}`;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGlobalValue({ key: 'mode', value: 'neutral' }))
  }, [dispatch])

  return (
    <>
      <PageTitle>{pageTitle}</PageTitle>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={`${styles.col} ${styles.spaceBetween}`} style={{ height: '100vh' }}>
            <div style={{ marginTop: '3rem', paddingTop: '3rem' }}>
              <img src="https://estudioverta.com.br/wp-content/uploads/2020/12/estudio-verta-pr.png" className={styles.logo} />
            </div>
            <div>
              <h2 className={styles.propostaBadge}>PROPOSTA {propostaAtual.numeroProposta}.{propostaAtual.versaoProposta}</h2>
              <h1 className={styles.nomeProjeto}>{propostaAtual.nomeProjeto}</h1>
              <h3 className="text-secondary">Ac {propostaAtual.cliente}</h3>
            </div>
            <div style={{ paddingBottom: '1rem' }}>
              <p>Estúdio Vertá Ltda<br />28.781.103/0001-55</p>
              <p>Gravataí, {hoje.getDate()} de {mes[hoje.getMonth()]} de {hoje.getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.row} style={{ paddingTop: '3rem', marginTop: '3rem' }}>
          <div className={styles.col}></div>
          <div className={styles.col9}>
            <p>Este documento contém a proposta para {propostaAtual.descricaoProjeto} para {propostaAtual.marca ? `a marca ${propostaAtual.marca}` : `o cliente ${propostaAtual.cliente}`}. Esta proposta é exclusiva e seguirá as etapas do processo abaixo:</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <h3 className={styles.subtitulo} style={{ marginTop: '1rem', textAlign: 'right' }}>Processo</h3>
          </div>
          <div className={`${styles.col9} ${styles.tarefas}`}>
            {propostaAtual.escopo
              ? propostaAtual.escopo.map(item => (
                <p key={item.id} className={item.tipo === 'fase' ? styles.fases : null}>{item.nome} {item.tipo === 'fase' ? `(${item.tempo}hr)` : null}</p>
              ))
              : propostaAtual.fases.map(fase => (
                <>
                  <p key={fase.nome} className={styles.fases}>{fase.nome} ({fase.tempo}hr)</p>
                  {fase.tarefas.map(tarefa => (
                    <p key={tarefa.nome}>{tarefa.nome}</p>
                  ))}
                </>
              ))
            }
          </div>
        </div>
      </div>

      <div className={`${styles.container} ${styles.spaceBetween}`}>
        <div className={styles.row} style={{ paddingTop: '3rem' }}>
          <div className={styles.col}></div>
          <div className={styles.col9}>
            <div className={styles.row}>
              <div className={styles.col} style={{ marginBottom: '1rem' }}>
                <p>Com base neste escopo, nossa base de cálculo seguirá a carga horária e valores a seguir:</p>
              </div>
            </div>
            <div className={`${styles.row} ${styles.tabela}`} style={{ '--bs-gutter-x': 0, marginBottom: '3rem' }}>
              <div className={styles.col8}>
                <p>Prazo para execução</p>
                <p>Carga horária</p>
                <p>Hora técnica</p>
              </div>
              <div className={styles.col}>
                <p>{propostaAtual.prazoEntrega} semanas</p>
                <p>{propostaAtual.cargaHoraria}hr</p>
                <p>{propostaAtual.horaTecnica.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).slice(3)}/hr</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.row} style={{ marginTop: '1rem' }}>
            <div className={styles.col}></div>
            <div className={styles.col9}>
              <h5 className={styles.subtitulo} style={{ marginBottom: 0 }}>Valor total</h5>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <h3 className={styles.RS}>R$</h3>
            </div>
            <div className={styles.col9}>
              <h3 className={styles.valorTotal}>{toCurrency(propostaAtual.valorTotal)}</h3>
            </div>
          </div>
          <div className={styles.row} style={{ marginBottom: '1rem' }}>
            <div className={styles.col}></div>
            <div className={`${styles.col9}`}>
              {propostaAtual.parcelas > 1
                ?
                <div>
                  <p>Em até {propostaAtual.parcelas}x de {(propostaAtual.valorTotal / propostaAtual.parcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).slice(3)} no boleto</p>
                  {propostaAtual.valorVista < propostaAtual.valorTotal &&
                    <p>Ou economize {(propostaAtual.valorTotal - propostaAtual.valorVista).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).slice(3)} à vista: {propostaAtual.valorVista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).slice(3)}</p>
                  }
                </div>
                :
                <div>
                  <p>Pagamento em 1 parcela no boleto bancário</p>
                </div>
              }
            </div>
          </div>
        </div>

        <div className={styles.row} style={{ paddingBottom: '3rem' }}>
          <div className={styles.col}></div>
          <div className={styles.col9}>
            <h5 className={styles.subtitulo}>Condições gerais</h5>
            <ul className={styles.condicoes}>
              <li>Esta proposta é válida durante 30 dias a partir da data de envio;</li>
              <li>O prazo de execução do projeto pode variar de acordo com o retorno do cliente, alterações durante o processo e imprevistos não informados à Vertá;</li>
              <li>O valor acima não inclui custos com produção, instalação ou impressão dos materiais criados;</li>
              <li>Se não estiver descriminado na proposta, o valor acima não inclui custos com viagens para fora da região metropolitana de Porto Alegre;</li>
              <li>O direito de uso de todo o material criado é cedido automaticamente ao cliente após a quitação integral do projeto;</li>
              <li>Em caso de inatividade por parte do cliente durante o prazo de 2 meses, o projeto será cancelado e entregue ao cliente no estágio atual do projeto.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;
  const [id] = ctx.params.id;
  // const access_token = ctx.req.cookies['atPropV'];
  const access_token = session.isRefreshed ? session.access_token : ctx.req.cookies['atPropV'];

  try {
    const propostaAtual = await propostaService.getSingleProposta(id, access_token);
    const versoes = await propostaService.getVersions(propostaAtual.numeroProposta, access_token);

    return {
      props: {
        session,
        propostaAtual,
        versoes,
      }
    }
  } catch (err) {
    if (err.response?.status) {
      console.error('erro 1', err.response.status, err.response?.data);
    } else {
      console.error('erro 2', err);
    }
    return {
      props: {
        session,
        err
      }
    }
  }
})
