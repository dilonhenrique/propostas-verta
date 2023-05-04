import 'normalize.css/normalize.css';
import '@/styles/globals.scss';
import { theme } from '@/theme/theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux'
import store from '@/store';
import { Loader } from '@/components/patterns/Loader';


export default function App({ Component, pageProps }) {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   // Used for page transition
  //   const start = () => {
  //     setLoading(true)
  //   }
  //   const end = () => {
  //     setLoading(false)
  //   }
  //   Router.events.on("routeChangeStart", start)
  //   Router.events.on("routeChangeComplete", end)
  //   Router.events.on("routeChangeError", end)
  //   return () => {
  //     Router.events.off("routeChangeStart", start)
  //     Router.events.off("routeChangeComplete", end)
  //     Router.events.off("routeChangeError", end)
  //   }
  // }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <Loader />
          <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}