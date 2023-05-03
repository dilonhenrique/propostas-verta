import { Backdrop, CircularProgress } from '@mui/material';
import styles from './PageLoader.module.scss';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";

export default function PageLoader({open}) {
  return (
    <Backdrop
      sx={{ backgroundColor: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}
    >
      <CircularProgress />
    </Backdrop>
  )
}

export function Layout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}
