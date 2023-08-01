import { call, takeLatest, select, retry, put } from 'redux-saga/effects';
import { assinarProposta, setValue } from '../reducers/assinatura';
import asaasService from '@/commom/service/asaasService';
import clickupService from '@/commom/service/clickupService';
import propostaService from '@/commom/service/propostaService';
import { mailService } from '@/commom/service/mailService';
import { setSigning } from '../reducers/signing';

let log = [];

export function* assinarPropostaWatcher() {
  yield takeLatest(assinarProposta, assinarPropostaWorker);
}

function* assinarPropostaWorker() {
  const assinaturaObj = yield select(state => state.assinatura);
  log = [];

  try {
    yield put(setSigning({ mensagem: 'Gerando faturas...', porcentagem: 0, error: false }));
    yield callAndLog(() => asaasService.generateCharge(assinaturaObj));

    yield put(setSigning({ mensagem: 'Criando tarefas para equipe...', porcentagem: 25 }));
    yield callAndLog(() => clickupService.saveProject(assinaturaObj.proposta));

    yield put(setSigning({ mensagem: 'Validando assinatura...', porcentagem: 50 }));
    yield callAndLog(() => propostaService.changeStatus(assinaturaObj.proposta, 'aprovada'));

    yield put(setSigning({ mensagem: 'Finalizando...', porcentagem: 75 }));
    yield call(() => mailService.send({
      destinatario: 'dilon@estudioverta.com.br',
      assunto: `Nova assinatura de contrato: ${assinaturaObj.proposta.nomeProjeto} de ${assinaturaObj.proposta.cliente}`,
      html: `
      <!DOCTYPE html>
      <html lang='pt-br'>
      <head>
          <meta charset='UTF-8'>
          <meta http-equiv='X-UA-Compatible' content='IE=edge'>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>
          <title>Assinatura de contrato: ${assinaturaObj.proposta.nomeProjeto} de ${assinaturaObj.cliente.name}</title>
      </head>
      <body style='font-family:Arial, Helvetica, sans-serif;'>
          <div>
              <h1>Nova assinatura de contrato!</h1>
              <ul style='display:block;list-style: none;padding: 0;'>
                  <li style='margin-left:0'>${assinaturaObj.proposta.nomeProjeto} | ${assinaturaObj.proposta.numeroProposta}</li>
                  <li style='margin-left:0'>Cliente: ${assinaturaObj.proposta.cliente}</li>
                  <li style='margin-left:0'>Marca: ${assinaturaObj.proposta.marca}</li>
              </ul>
              <p style='font-style: italic;font-size:0.9em;color:gray'>${assinaturaObj.cobranca.parcelas > 1
          ? `${assinaturaObj.proposta.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} em ${assinaturaObj.cobranca.parcelas}x`
          : `${assinaturaObj.proposta.valorVista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} à vista`
        } para o dia ${assinaturaObj.cobranca.vencimento}</p>
              <hr style='margin-top:40px;margin-bottom:20px;border-top: #d5d5d5 solid 1px;'>
              <div style='padding:20px 0'>
                  <a href='https://www.asaas.com/payment/show/${log[0].cobranca.invoiceNumber}' target='_blank' style='padding:10px 15px;border-radius:20px;background-color:blueviolet;color:#FFF;text-decoration:none;margin-right:10px'>Ver cobrança</a>
                  <a href='${log[1].taskLink}' target='_blank' style='padding:10px 15px;border-radius:20px;background-color:blueviolet;color:#FFF;text-decoration:none;'>Ver tarefa</a>
              </div>
          </div>
      </body>
      </html>
      `,
    }))
    
    yield put(setSigning({ mensagem: 'Assinatura efetuada com sucesso!', porcentagem: 100 }));
    // throw new Error('exemplo de erro');

  } catch (err) {
    console.log(err);
    yield put(setSigning({ mensagem: 'Ops! Algo deu errado.', porcentagem: 100, error: true }));
    const response = yield call(compensation);
  }
}

function* callAndLog(funcao, params) {
  const response = yield funcao();
  log.push(response);
  return response;
}

function* compensation() {
  for (let i = log.length - 1; i >= 0; i--) {
    if (log[i].cobranca) {
      const response = yield asaasService.deleteBilling(log[i].cobranca);
      //validar compensação: response.deleted === true
    } else if (log[i].folderId) {
      const response = yield clickupService.deleteProject(log[i].folderId);
      //validar compensação: response.deleted === true
    } else {
      const response = yield propostaService.changeStatus({ ...log[i].proposta, status: 'aprovada' }, 'aberta');
      //validar compensação: response.affectedRows === 1 (ou true)
    }
  }
}