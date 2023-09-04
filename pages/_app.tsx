import '../styles/globals.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../data/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}