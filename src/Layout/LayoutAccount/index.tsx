import { Avatar, Button, Modal } from "antd";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import Img from "@/assets/images/user.png";
import styled from "styled-components";
import { GiCutDiamond } from "react-icons/gi";
import { SlWallet } from "react-icons/sl";
import { GrContactInfo } from "react-icons/gr";
import Link from "next/link";
import { AiOutlineCamera } from "react-icons/ai";
import { API_URL } from "@/config/config";
import { MdOutlineArticle } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { getUserInfo } from "@/stores/customer.stores";
import { IUser } from "@/interface";
import { useDispatch, useSelector } from "react-redux";
import { initialState, logout } from "@/redux/authSlice";
import { useRouter } from "next/router";
import { AppState } from "@/redux";

function LayoutAccount({ children }: { children: ReactNode }) {
  const router = useRouter();
  const auth = useSelector((state: AppState) => state.auth);
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [userInfo, setUserInfo] = useState<any | null>(initialState.user);
  const [userLike, setUserLike] = useState<number>();
  const [userPost, setUserPost] = useState<number>();
  const name = router?.pathname?.slice(router.pathname.indexOf("/[id]/") + 6);

  const dispatch = useDispatch();

  const getUserDetail = async () => {
    try {
      const result = await getUserInfo();
      if (result?.user?.email) {
        setUserInfo(result?.user);
        setUserLike(result?.like?.length);
        setUserPost(result?.post?.length);
      } else {
        setUserInfo(null);
      }
    } catch (error) {
      router.push("/");
      console.log(error);
    }
  };
  const handleLogout = () => {
    dispatch(logout({}));
    router.push("/");
  };

  useEffect(() => {
    getUserDetail();
  }, [router]);

  const ListCategory = useMemo(() => {
    return [
      // {
      //   id: 1,
      //   name: 'Kim cương của tôi',
      //   icon: SlDiamond,
      //   href: `/account/${user._id}/balance`
      // },
      // {
      //   id: 2,
      //   name: 'Tiền thưởng của tôi',
      //   icon: SlWallet,
      //   href: `/account/${user._id}/bonus`
      // },
      {
        id: 3,
        name: "Thông tin cá nhân",
        icon: GrContactInfo,
        href: `/account/${userInfo?._id}/member`,
        des: "member",
      },
      {
        id: 4,
        name: "Bài viết",
        icon: MdOutlineArticle,
        href: `/account/${userInfo?._id}/article`,
        des: "article",
      },
      {
        id: 5,
        name: "Theo dõi của tôi",
        icon: FiUserPlus,
        href: `/account/${userInfo?._id}/follower`,
        des: "follower",
      },
      {
        id: 6,
        name: "Nhóm",
        icon: HiOutlineUserGroup,
        href: `/account/${userInfo?._id}/group`,
        des: "group",
      },
    ];
  }, [userInfo]);

  const AvatarImg = useMemo(() => {
    let url = "";
    if (userInfo?.avatar) {
      if (userInfo.avatar.includes("http")) {
        url = userInfo.avatar;
      } else {
        url = `${API_URL}/images/` + userInfo.avatar;
      }
    } else {
      url = Img.src;
    }
    return url;
  }, [userInfo]);
  
  return (
    <div>
      <Wrapper className="py-5 wrapper-content">
        <TopContent className="rounded-lg page-container">
          <div className="flex items-center gap-3 left ">
            <div className="relative">
              <Avatar className="avatar" src={AvatarImg} />
              <div
                onClick={() => setShowEditAvatar(true)}
                className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 bg-black rounded-full cursor-pointer"
              >
                <AiOutlineCamera className="text-xl text-white" />
              </div>
            </div>
            <div>
              <div className="text-base font-bold">{userInfo?.email}</div>
              <div className="text-xs text-gray-400">
                Bài viết <span className="quantity">{userPost}</span>
                Thích <span className="quantity">{userLike}</span>
                Người theo dõi{" "}
                <span className="quantity">{userInfo?.follow.length}</span>
              </div>

              <div className="text-xs text-gray-400">
                Cấp độ: <span className="quantity">{0}</span>
              </div>
              <div className="text-xs text-gray-400">
                Kinh nghiệm:{" "}
                <span className="quantity">{userInfo?.experience}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10 right">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <GiCutDiamond className="text-blue-400" />
                Kim cương của tôi:{" "}
                <span className="font-bold text-red-500">0</span>
              </div>
              <div className="flex items-center gap-2">
                <SlWallet />
                Tiền thưởng của tôi:{" "}
                <span className="font-bold text-blue-400">0</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="btn">Nạp kim cương</div>
              <div className="btn">Rút tiền thưởng</div>
            </div>
          </div>
        </TopContent>
        <BottomContent>
          <div className="rounded-lg bottom-left page-container">
            {ListCategory.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.id} href={item.href}>
                  <div
                    className={`tab-item flex items-center gap-4 cursor-pointer ${
                      item.des == name ? "active-tab" : ""
                    }`}
                  >
                    <Icon className="icon" />
                    <span className="name">{item.name}</span>
                  </div>
                </Link>
              );
            })}
            <Button
              onClick={handleLogout}
              className="w-full mt-2 font-semibold bg-gray-200"
            >
              Đăng Xuất
            </Button>
          </div>
          <div className="rounded-lg bottom-right">{children}</div>
        </BottomContent>
      </Wrapper>

      {/* <ModalChangeAvatar showEditAvatar={showEditAvatar} setShowEditAvatar={setShowEditAvatar} AvatarImg={AvatarImg}
                idUser={user?._id}
            /> */}
    </div>
  );
}

export default LayoutAccount;

const Wrapper = styled.div`
  background: #e5e5e5;
`;
const TopContent = styled.div`
  padding: 10px 15px;
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  .avatar {
    width: 69px;
    height: 69px;
  }
  .quantity {
    color: #307b06;
    font-weight: 700;
    margin-right: 5px;
  }
  .btn {
    min-width: 105px;
    height: 28px;
    line-height: 26px;
    font-size: 12px;
    border-radius: 20px;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 12px;
    background: #f7f7f7;
    font-weight: 500;
    background: -o-linear-gradient(top, #ffffff, #f7f7f7);
    box-shadow: 2px 2px 0 rgb(0 0 0 / 6%);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: #ffffff;
      background: #ff6600;
    }
  }
`;
const BottomContent = styled.div`
  max-width: 1440px;
  margin: 10px auto;
  display: flex;
  gap: 10px;
  .bottom-left {
    width: 290px;
    height: auto;
    background: white;
    padding: 10px;
    .tab-item {
      padding: 10px 5px;
      &:not(:last-child) {
        border-bottom: 1px solid #ccc;
      }
      &.active-tab {
        .name {
          color: #52a22d !important;
        }

        background-color: rgb(27, 185, 59, 0.15);
        border-left: 3px solid #397f19;
      }
      &:hover {
        .name {
          color: #f44336;
        }
        background-color: rgb(27, 185, 59, 0.15);
        border-left: 3px solid #397f19;
      }
      > .icon {
        font-size: 16px;
      }
    }
  }
  .bottom-right {
    flex: 1;
    width: 100%;
    height: auto;
    min-height: 500px;
    background: white;
    padding: 10px;
  }
`;
