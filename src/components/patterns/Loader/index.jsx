import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import styles from './Loader.module.scss';
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loader = () => {
  const router = useRouter();
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  React.useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setIsLoaderVisible(true);
    };

    const handleRouteComplete = (url, { shallow }) => {
      setIsLoaderVisible(false);
    };

    // here we subscribe to router change start and complete events
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    setIsLoaderVisible(false);

    // unsubscribing to router events when component unmounts to prevent memory leaks
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router.events]);

  return (
    <AnimatePresence initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      {isLoaderVisible &&
        <motion.div
          key='loader'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: '#242424',
            zIndex: 4,
          }}
        >
          <CircularProgress disableShrink />
          {/* <motion.div animate={{ rotate: '360deg' }} transition={{ repeat: Infinity }}>
            <AiOutlineLoading3Quarters className={styles.rotate} />
          </motion.div> */}
        </motion.div>}
    </AnimatePresence>
  )
};