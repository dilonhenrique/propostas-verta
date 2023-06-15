import PageTitle from '@/components/elements/PageTitle';
import { useDispatch } from "react-redux";
import withSession from '@/commom/service/session';
import Navbar from '@/components/sections/Navbar';
import { useEffect, useState } from 'react';
import { setGlobalValue } from '@/store/reducers/globalStatus';
import FormEditUser from '@/components/patterns/FormEditUser';
import userService from '@/commom/service/userService';
import { Accordion, AccordionDetails, AccordionSummary, Collapse, Paper, Typography } from '@mui/material';

export default function Editar({ usuarios }) {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(usuarios);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    dispatch(setGlobalValue({ key: 'mode', value: 'neutral' }));
  }, [dispatch])

  return (
    <>
      <PageTitle>Gerenciar usuários | Propostas Vertá</PageTitle>
      <Navbar />
      <main style={{backgroundColor: '#f2f2f2'}}>
        <div className='container'>
          <div className='row' style={{
            alignSelf: 'center',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '600px',
            padding: '3rem 0',
          }}>
            <h1>Gerenciar usuários</h1>
            <Paper elevation={4}>
              {users?.map(user => (
                <Accordion key={user.id} disableGutters sx={{padding:'1rem'}} variant='outlined'>
                  <AccordionSummary>
                    <Typography variant='h6' color='primary'>{user.Nome}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormEditUser usuario={user} />
                  </AccordionDetails>
                </Accordion>
              ))}
              <Accordion disableGutters sx={{padding:'1rem'}} variant='outlined'>
                  <AccordionSummary>
                    <Typography variant='h6' color='primary'>+ adicionar</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormEditUser />
                  </AccordionDetails>
                </Accordion>
            </Paper>
          </div>
        </div>
      </main>
    </>
  )
}

//Decorator pattern
export const getServerSideProps = withSession(async (ctx) => {
  const session = ctx.req.session;

  if (session?.data?.role === 'admin') {
    const access_token = session.isRefreshed ? session.access_token : ctx.req.cookies['atPropV'];
    const usuarios = await userService.getUserList(access_token);

    return {
      props: {
        session,
        usuarios,
      }
    }
  }

  return {
    notFound: true
  }
})
