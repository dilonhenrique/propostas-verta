import propostaService from '@/commom/service/propostaService';
import withSession from '@/commom/service/session';
import toCurrency from '@/commom/utils/toCurrency';
import PageTitle from '@/components/elements/PageTitle';
import FloatingActions from '@/components/patterns/FloatingActions';
import PropostaListItem from '@/components/patterns/PropostaListItem';
import Navbar from '@/components/sections/Navbar';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import { IconButton, List, ListItem, ListItemButton, ListItemSecondaryAction, ListItemText, ListSubheader } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

export default function Home(props) {
  const dispatch = useDispatch();

  const [listaPropostas, setListaPropostas] = useState(prepareList(props.listaPropostas) || []);

  function prepareList(list) {
    list = list.sort((a, b) => b.numeroProposta - a.numeroProposta);
    const nested = true;

    list.forEach(proposta => {
      if (nested && !proposta.nested) {
        let versoes = list.filter(versao => versao.numeroProposta == proposta.numeroProposta && versao.versaoProposta != proposta.versaoProposta)

        if (proposta.nested !== false) {
          let aprovada = versoes.filter(versao => versao.status == "aprovada")
          if (aprovada.length > 0) {
            versoes.unshift(proposta)
            versoes.splice(versoes.findIndex(versao => versao.versaoProposta == aprovada[0].versaoProposta), 1)
            versoes.forEach(versao => versao.nested = true)
            return
          }
        }

        proposta.nested = false
        proposta.versoes = []
        versoes.forEach(versao => {
          versao.nested = true;
          proposta.versoes.push({
            id: versao.id,
            numeroProposta: versao.numeroProposta,
            versaoProposta: versao.versaoProposta,
          })
        })
      }
    })

    delete list.descricaoProjeto;
    delete list.escopo;
    delete list.custosFixos;
    delete list.horaTecnica;
    delete list.custoBoleto;
    delete list.parcelaMinima;
    delete list.descontoVista;
    delete list.descontoPrevisto;
    delete list.porcentagemNota;
    delete list.temNota;
    delete list.valorNota;
    delete list.customPrazo;
    delete list.prazoEntrega;
    delete list.customParcelas;
    delete list.parcelas;
    delete list.valorHora;
    delete list.cargaHoraria;
    delete list.valorVista;
    delete list.contrato;

    return list;
  }

  useEffect(() => {
    dispatch(setGlobalValue({ key: 'mode', value: 'list' }))
  }, [dispatch])

  const columns = [
    { field: 'nomeProjeto', headerName: 'Nome do projeto', width: 300 },
    { field: 'cliente', headerName: 'Cliente', width: 150 },
    { field: 'marca', headerName: 'Marca', width: 150 },
    { field: 'numero', headerName: 'Número', type: 'number', width: 90, valueGetter: (params) => `${params.row.numeroProposta}.${params.row.versaoProposta}` },
    { field: 'valorTotal', headerName: 'Valor', type: 'number', width: 160, },
    { field: 'status', headerName: 'Status', sortable: false, width: 160, },
  ];

  return (
    <>
      <PageTitle>Propostas Vertá</PageTitle>
      <Navbar />
      <main>
        <div className='container'>
          <h1>Proposta Vertá</h1>
          <List>
            <ListSubheader>teste</ListSubheader>
            {listaPropostas.map(proposta => {
              if (!proposta.nested)
                return (<PropostaListItem key={proposta.id} proposta={proposta} />)
            })}
          </List>
          {/* <DataGrid
            rows={listaPropostas}
            columns={columns}
            density='compact'
            disableRowSelectionOnClick={true}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 50 },
              },
            }}
          /> */}
        </div>
        <FloatingActions />
      </main>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;
  const access_token = session.isRefreshed ? session.access_token : ctx.req.cookies['atPropV'];

  try {
    const listaPropostas = await propostaService.getPropostaList(access_token)
    return {
      props: {
        listaPropostas,
        session,
      }
    }
  } catch (err) {
    if (err.response?.status) {
      console.error('erro 1', err.response.status, err.response?.data);
    } else {
      console.error('erro 2', err);
    }
  }

  return {
    props: {
      session,
    }
  }
})
