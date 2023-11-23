import Loading from "@/components/common/Loading";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import { API_URL, URL } from "@/config/config";
import { getAllCateByDomain } from "@/stores/categories.stores";
import Head from "next/head";
import { ReactNode } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Input, Modal } from "antd";
import LoginModal from "@/components/LoginModal";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/redux";
import { setLoginModal, setSignupModal } from "@/redux/layoutSlice";
import SignUpModal from "@/components/SignUpModal";
import BackToTopButton from "@/components/BackTotopButton";
const fetcher = (url: any) => fetch(url).then((res) => res.json());

const MainLayout = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(
    `${API_URL}/category/domains?domain=${URL}`,
    fetcher
  );

  const layout = useSelector((state: AppState) => state.layout);

  const openLoginModal = () => {
    dispatch(setLoginModal(true));
  };

  const closeLoginModal = () => {
    dispatch(setLoginModal(false));
  };

  const closeSignUpModal = () => {
    dispatch(setSignupModal(false));
  };

  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/fac459bf2d.js"
          crossOrigin="anonymous"
        ></script>
        <title>Thể thao SH, tin tức thể thao mới nhất</title>
      </Head>

      <div className="container min-w-full min-h-screen mx-auto bg-white">
        {loading && <Loading />}
        <div className="min-h-screen mx-auto main-layout">
          <Modal
            open={layout.loginModal}
            onCancel={closeLoginModal}
            cancelButtonProps={{ className: "button-close-login-modal" }}
            okButtonProps={{ className: "button-ok-login-modal" }}
            title={"Đăng nhập"}
            className="max-w-md"
          >
            <LoginModal />
          </Modal>
          <Modal
            open={layout.signupModal}
            onCancel={closeSignUpModal}
            cancelButtonProps={{ className: "button-close-login-modal" }}
            okButtonProps={{ className: "button-ok-login-modal" }}
            title={"Đăng ký"}
            className="max-w-md"
          >
            <SignUpModal />
          </Modal>
          <Navbar openLoginModal={openLoginModal} listCate={data?.data} />
          <div className="main-content">{children}</div>
          <Footer listCate={data?.data} />
        </div>
        <BackToTopButton />
      </div>
    </>
  );
};

export default MainLayout;
