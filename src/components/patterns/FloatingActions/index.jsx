import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useState } from 'react';
import { TbMoodDollar, TbSettings2, TbFilePlus } from 'react-icons/tb';
import {CiMenuKebab} from 'react-icons/ci';
import ConfigDialog from '../ConfigDialog';

const iconProp = {
  size: 20,
}


export default function FloatingActions() {
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: <TbFilePlus {...iconProp} />, name: 'Nova proposta', href: '/editar' },
    { icon: <TbSettings2 {...iconProp} />, name: 'Configurações', onClick: () => { setOpen(true) } },
    { icon: <TbMoodDollar {...iconProp} />, name: 'Doar para Dilon' },
  ];

  return (
    <>
      <SpeedDial
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        ariaLabel="Botões de ações rápidas"
        icon={<CiMenuKebab size={25} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            href={action.href || null}
            onClick={action.onClick || null}
          />
        ))}
      </SpeedDial>

      <ConfigDialog open={open} setOpen={setOpen} />
    </>
  )
}
