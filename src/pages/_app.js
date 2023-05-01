import 'normalize.css/normalize.css';
import '@/styles/globals.scss';
import { theme } from '@/theme/theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux'
import store from '@/store';


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}