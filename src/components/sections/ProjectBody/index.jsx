import { Box, Tab, Tabs, Skeleton } from '@mui/material';
import styles from './ProjectBody.module.scss';
import React, { memo, useState } from 'react';
import Escopo from './Tabs/Escopo';
import Custos from './Tabs/Custos';
import Configs from './Tabs/Configs';
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion';

function ProjectBody() {
  const [selectedTab, setSelectedTab] = useState(0);
  const isLoading = useSelector(state => state.propostaAtual.isLoading);

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
          {isLoading
            ? <>
              <Skeleton width='100%' height='50px' />
              <Skeleton width='100%' height='50px' />
              <Skeleton width='100%' height='50px' />
            </>
            : <>
              <motion.div className={styles.tabContent} variants={variant} animate={selectedTab === 0 ? 'visible' : 'hidden'} ><Escopo /></motion.div>
              <motion.div className={styles.tabContent} variants={variant} animate={selectedTab === 1 ? 'visible' : 'hidden'} ><Custos /></motion.div>
              <motion.div className={styles.tabContent} variants={variant} animate={selectedTab === 2 ? 'visible' : 'hidden'} style={{ width: '100%', maxWidth: '600px', margin: '0 auto', gap: '2rem' }} ><Configs /></motion.div>
            </>
          }
        </div>
      </div>
    </section>
  )
}

export default memo(ProjectBody);
