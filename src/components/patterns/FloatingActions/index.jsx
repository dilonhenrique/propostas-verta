import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import Router from 'next/router';
import { TbMoodDollar, TbFileDollar, TbSettings2, TbFilePlus } from 'react-icons/tb';

const iconProp = {
  size: 20,
}

const actions = [
  { icon: <TbFilePlus {...iconProp} />, name: 'Nova proposta', href: '/editar' },
  { icon: <TbSettings2 {...iconProp} />, name: 'Configurações' },
  { icon: <TbMoodDollar {...iconProp} />, name: 'Doar para Dilon' },
];

export default function FloatingActions() {
  return (
    <SpeedDial
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      ariaLabel="Botões de ações rápidas"
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          href={action.href ? action.href : null}
        />
      ))}
    </SpeedDial>
  )
}
