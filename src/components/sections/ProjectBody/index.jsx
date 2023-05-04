import { Box, Tab, Tabs } from '@mui/material';
import styles from './ProjectBody.module.scss';
import React, { memo, useState } from 'react';
import Escopo from './Tabs/Escopo';
import Custos from './Tabs/Custos';
import Configs from './Tabs/Configs';

function ProjectBody() {
  const [selectedTab, setSelectedTab] = useState(0);

  const variant = {
    visible: {
      opacity: 1,
      y: 0,
      display: 'flex',
    },
    hidden: {
      opacity: 0,
      y: -20,
      transitionEnd: {
        display: "none",
      }
    },
  }

  return (
    <section className={styles.projectBodyContainer}>
      <div className='container'>
        <div className={`row ${styles.tabNavigation}`}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <Tabs centered value={selectedTab} onChange={(event, clickedTab) => {
              setSelectedTab(clickedTab)
            }}>
              <Tab label="Escopo" />
              <Tab label="Custos" />
              <Tab label="Configs" />
            </Tabs>
          </Box>
        </div>
        <div className="row" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          <Escopo selectedTab={selectedTab} variant={variant} />
          <Custos selectedTab={selectedTab} variant={variant} />
          <Configs selectedTab={selectedTab} variant={variant} />
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectBody);
