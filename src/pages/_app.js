import 'normalize.css/normalize.css';
import '@/styles/globals.scss';
import { verta } from '@/theme/theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import store from '@/store';
import { Loader } from '@/components/patterns/Loader';
import NProgress from "nprogress";
import Router from "next/router";
import { useEffect } from "react";
import '@/styles/nprogress.css';


export default function App({ Component, pageProps }) {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={verta}>
        <SnackbarProvider autoHideDuration={6000} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
          {/* <Loader /> */}
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  )
}