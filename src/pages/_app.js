import 'normalize.css/normalize.css';
import '@/styles/globals.scss';
import '@/styles/nprogress.css';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import store from '@/store';
import { useEffect } from "react";
import { verta } from '@/theme/theme';
import { Loader } from '@/components/patterns/Loader';
import NProgress from "nprogress";
import Router from "next/router";
import { setUser } from '@/store/reducers/globalStatus';
import Head from 'next/head';


export default function App({ Component, pageProps }) {

  //LOADER SHOWS UP WHEN THE ROUTER OF NEXT ACTIVATE
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  //UPDATE USER DATA IN THE STORE WHEN THE SESSION DATA CHANGES
  useEffect(() => {
    if (pageProps?.session?.data) {
      store.dispatch(setUser({ ...pageProps.session.data }))
    }
  }, [pageProps?.session?.data])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={verta}>
          <SnackbarProvider autoHideDuration={6000} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
            {/* <Loader /> */}
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </>
  )
}
