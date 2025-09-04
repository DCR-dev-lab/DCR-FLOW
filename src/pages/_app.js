import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import PageLoader from "../components/PageLoader";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
    setAuthChecked(true);

    // Setup router events for page transitions
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);
    const handleError = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);

  if (!authChecked) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>DCR FLOW</title>
        <met char charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isLoading && <PageLoader />}
      <Component {...pageProps} isLoggedIn={isLoggedIn} />
    </>
  );
}

export default MyApp;
