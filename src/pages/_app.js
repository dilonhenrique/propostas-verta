import 'normalize.css/normalize.css';
import '@/styles/globals.scss';
import { theme } from '@/theme/theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import store from '@/store';
import { Loader } from '@/components/patterns/Loader';


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider autoHideDuration={6000} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
          <Loader />
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  )
}