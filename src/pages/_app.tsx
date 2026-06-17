import type { AppProps } from 'next/app';
import { AppProvider } from '../store/AppContext';
import { Layout } from '../components/layout/Layout';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import 'katex/dist/katex.min.css';
import '../styles/globals.css';
import Head from 'next/head';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${plusJakartaSans.variable} ${outfit.variable} min-h-screen`}>
      <Head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </Head>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </main>
  );
}

