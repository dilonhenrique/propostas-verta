import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { TbMoodDollar, TbFileDollar, TbSettings2 } from 'react-icons/tb';

const iconProp = {
  size: 20,
}

const actions = [
  { icon: <TbFileDollar {...iconProp} />, name: 'Nova proposta' },
  { icon: <TbSettings2 {...iconProp} />, name: 'Configurações' },
  { icon: <TbMoodDollar {...iconProp} />, name: 'Doar para Dilon' },
];

export default function FloatingActions() {
  return (
    <SpeedDial
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      ariaLabel="Botões de ações rápidas"
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  )
}
