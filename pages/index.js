import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button, TextField} from '@material-ui/core'

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>SuperVan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.h1}>Welcome to SuperVan</h1>
      <p className={styles.p}>
          SuperVan is an advanced web system built to assist in group camping. It can supply builtin boards, messaging, and resource sharing. SuperVan is mainly for offline use and soul modems.
      </p>
      <h2 className={styles.h2}>Connect without WiFi</h2>
      <div style={{textAlign: 'center'}} className={styles.signIn}>
        <TextField label="password" variant="filled" fullWidth type="password"/>
        <Button variant="contained" color="primary" size="large" style={{marginTop: '1rem'}}>Submit</Button>
      </div>
    </div>
  );
}
