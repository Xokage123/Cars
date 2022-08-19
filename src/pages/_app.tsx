import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode } from 'react';

import 'styles/fonts.scss';
import 'styles/global.scss';

interface AppPropsExtends extends AppProps {
  Component: AppProps['Component'] & { children?: ReactNode };
}

const App = ({ Component, pageProps }: AppPropsExtends) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
