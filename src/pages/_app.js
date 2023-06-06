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



export default function App({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });
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
