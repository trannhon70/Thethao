import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType, NextPageContext } from "next";
import { ReactNode, useEffect } from "react";
import "@/styles/globals.scss";
import "@/styles/sports.scss";
import "@/styles/posts.scss";
import "@/styles/cssforlive.scss";
import "@/styles/profile/index.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import moment from "moment";
import "moment/locale/vi";
import { wrapper } from "@/redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getUserInfo } from "@/stores/customer.stores";
import { useDispatch } from "react-redux";
import { getUser, initialState } from "@/redux/authSlice";
import Script from "next/script";
import Head from "next/head";

moment.locale("vi");

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const dispatch = useDispatch();

  const getUserFirstLoad = async () => {
    try {
      const result = await getUserInfo();
      if (result?.user) {
        dispatch(getUser({ authState: true, user: result.user }));
      } else {
        dispatch(getUser({ authState: false, user: initialState }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFirstLoad();
  }, []);

  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <Head>
        <meta name="msvalidate.01" content="286C05BE75AA8BE5CD840497ED8C46AE" />
        <meta
          name="google-site-verification"
          content="CaIuh3-31_8XJK73JTVW73MawcdKVblqbJqKuNNjF00"
        />
      </Head>
      <Script
        id="script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ThethaoSH",
            "alternateName": "ThểThaoSH",
            "url": "https://thethaosh.com/",
            "logo": "https://thethaosh.com/images/logo-footer.png"
          }
          `,
        }}
      ></Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-0MCL5M5QEN"
      ></Script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-0MCL5M5QEN');`,
        }}
      ></Script>
      {getLayout(<Component {...pageProps} />)}
    </GoogleOAuthProvider>
  );
};

export default wrapper.withRedux(MyApp);
