import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import PubgClient from '../components/PubgClient'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PUBG Recent Game Stats Tracker</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>PUBG STATS</h1>
        <QueryClientProvider client={queryClient}>
          <PubgClient />
        </QueryClientProvider>
      </main>

      <footer className={styles.footer}>
        made by jack
      </footer>
    </div >
  )
}
