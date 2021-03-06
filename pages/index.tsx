import type { NextPage } from "next";
import Head from "next/head";
import Form from "../components/Form";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../lib/useAuth";

const Home: NextPage = () => {
  const authen = useAuth();
  const router = useRouter();
  useEffect(() => {
    const { auth, status } = authen;

    if (status === "succeeded") {
      router.push(`${auth!.id}`);
    }
  }, [authen, router]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {(authen.status === "loading" || authen.status === "failed") && <Form />}
    </div>
  );
};

export default Home;
