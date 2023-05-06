import 'normalize.css/normalize.css';
import '@/styles/globals.scss';
import { theme } from '@/theme/theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux'
import store from '@/store';
import { Loader } from '@/components/patterns/Loader';


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <Loader />
          <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}