import Link from "next/link";
import NavbarMobile from "../NavbarMobile";
import { useEffect, useState } from "react";
import { CategoryItemProps } from "@/interface";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AppState } from "@/redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Navbar = ({
  listCate,
  openLoginModal,
}: {
  listCate: any;
  openLoginModal: () => void;
}) => {
  const router = useRouter();
  let slug = router.query.slug;
  let pathName = router.pathname.slice(1);
  const auth = useSelector((state: AppState) => state.auth);
  const [activeToggle, setActiveToggle] = useState(false);
  
  useEffect(() => {
    const navbarMobile = document.getElementById("navbar-mobile");
    const buttonToggle = document.getElementById("icon-toggle-mobile-menu");
    const bars_1 = document.getElementById("icon-bars-1");
    const bars_2 = document.getElementById("icon-bars-2");
    const bars_3 = document.getElementById("icon-bars-3");
    const windowResize = window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        setActiveToggle(false);
        if (bars_2 && bars_1 && bars_3 && navbarMobile) {
          bars_2.style.display = "block";
          navbarMobile.style.transform = "translateX(-100%)";
          bars_1.style.transform = "rotate(0deg) translateY(0px)";
          bars_3.style.transform = "rotate(0) translateY(0)";
        }
      }
    });

    if (bars_2 && bars_1 && bars_3 && navbarMobile) {
      if (activeToggle) {
        bars_2.style.display = "none";
        bars_1.style.transform = "rotate(45deg)";
        navbarMobile.style.transform = "translateX(0%)";
        bars_1.style.transform =
          "rotate(45deg) translateY(7px) translateX(-1px)";
        bars_3.style.transform = "rotate(-45deg) translateY(-7px)";
      } else {
        bars_2.style.display = "block";
        navbarMobile.style.transform = "translateX(-100%)";
        bars_1.style.transform = "rotate(0deg) translateY(0px)";
        bars_3.style.transform = "rotate(0) translateY(0)";
      }
    }

    return () => {
      //@ts-ignore
      window.removeEventListener("resize", windowResize);
    };
  }, [activeToggle]);
  let finalSlug = slug ? slug : pathName;
  const onClickactiveToggle = () => {
   setTimeout(() => {
    setActiveToggle(false);
   }, 1500)
  }
  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/ti-so-truc-tiep");
    }
  }, []);
 
  return (
    <div className="fixed z-20 w-full text-black bg-white page-navbar">
      <NavbarMobile listCate={listCate} onClickactiveToggle = {onClickactiveToggle} openLoginModal= {openLoginModal}/>
      <div className="relative mx-auto navbar-options">
        <Link href={"/"}>
          <div className="absolute page-navbar-icon mr-14 top-5 left-6">
            <img src="/icon/icon-home.png" />
          </div>
        </Link>
        <ul className="navbar-options-ul">
          <Link href={"/"}>
            <li>
              <span
                className={
                  // !slug && router.pathname !== "/the-thao/sea-games-32"
                  !slug && router.pathname === "/"
                    ? "navbar-active py-2"
                    : "navbar py-2"
                }
              >
                Trang chủ
              </span>
            </li>
          </Link>
          <Link href={"/ti-so-truc-tiep"}>
            <li>
              <span
                className={
                  // !slug && router.pathname !== "/the-thao/sea-games-32"
                  !slug && router.pathname === "/ti-so-truc-tiep"
                    ? "navbar-active py-2"
                    : "navbar py-2"
                }
              >
                Tỉ số trực tiếp
              </span>
            </li>
          </Link>
          {/* <Link href={"/the-thao/sea-games-32"}>
            <li>
              <span
                className={
                  router.pathname === "/the-thao/sea-games-32"
                    ? "navbar-active py-2"
                    : "navbar py-2"
                }
              >
                Seagame 32
              </span>
            </li>
          </Link> */}
          {/* @ts-ignore */}
          {listCate?.map((item: CategoryItemProps) => {
            return (
              <Link href={`/${item.slug}`}>
                <li>
                  <span
                    className={
                      finalSlug === item.slug
                        ? "navbar-active py-2"
                        : "navbar py-2"
                    }
                  >
                    {item.name}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
        {!auth.authState ? (
          <a onClick={openLoginModal}>
            <div className="absolute page-navbar-icon top-5 right-4 login-button">
              <button>Đăng nhập</button>
            </div>
          </a>
        ) : (
          <Link href={`/account/${auth.user?._id}/member`}>
            <div className="absolute page-navbar-icon top-5 right-12">
              {auth.user.avatar ? (
                <div
                  className="rounded-full user-avatar"
                  style={{ background: `url(${auth.user.avatar})` }}
                ></div>
              ) : (
                <Avatar
                  icon={<UserOutlined />}
                  style={{ width: "40px", height: "40px" }}
                />
              )}
            </div>
          </Link>
        )}
        <div
          className="fixed z-20 cursor-pointer icon-toggle-mobile-menu right-3 top-7"
          id="icon-toggle-mobile-menu"
          onClick={() => setActiveToggle(!activeToggle)}
        >
          <div className="icon-bars bars-1" id="icon-bars-1"></div>
          <div className="icon-bars bars-2" id="icon-bars-2"></div>
          <div className="icon-bars bars-3" id="icon-bars-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
