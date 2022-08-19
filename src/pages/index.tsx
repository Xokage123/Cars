import { NextPage } from 'next';
import Head from 'next/head';

import Cars from 'components/cars';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Lending</title>
      </Head>

      <Cars />
    </>
  );
};

export default HomePage;
