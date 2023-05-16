import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import styles from './Loader.module.scss';
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/reducers/propostaAtual";

export const Loader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { isLoading } = useSelector(state => state.propostaAtual)

  React.useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      dispatch(setLoading());
    };

    // here we subscribe to router change start and complete events
    router.events.on("routeChangeStart", handleRouteChange);

    // unsubscribing to router events when component unmounts to prevent memory leaks
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, dispatch]);

  return (<></>
    // <AnimatePresence initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
    //   {isLoading &&
    //     <motion.div
    //       key='loader'
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       exit={{ opacity: 0 }}
    //       style={{
    //         position: "fixed",
    //         inset: 0,
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         backgroundColor: '#242424',
    //         zIndex: 4,
    //       }}
    //     >
    //       <CircularProgress disableShrink />
    //       {/* <motion.div animate={{ rotate: '360deg' }} transition={{ repeat: Infinity }}>
    //         <AiOutlineLoading3Quarters className={styles.rotate} />
    //       </motion.div> */}
    //     </motion.div>}
    // </AnimatePresence>
  )
};