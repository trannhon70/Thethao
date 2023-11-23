import React, { ReactNode, useEffect, useMemo, useState } from "react";
import LayoutAccount from "@/Layout/LayoutAccount";
// import { getUsersFollow } from '../../../../stores/article';
import { Avatar, Input, Space } from "antd";
import { AiOutlineLike, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineArticle } from "react-icons/md";
import Img from "@/assets/images/user.png";
import { API_URL } from "@/config/config";
import { useRouter } from "next/router";
import { FiUserPlus } from "react-icons/fi";
import useCheckMobile from "@/hooks/useCheckMobile";
import { IUser } from "@/interface";
import { GetServerSidePropsContext } from "next";
import MainLayout from "@/Layout/MainLayout";
import { UserOutlined } from "@ant-design/icons";
import { GoFile } from "react-icons/go";
import { getUserFollow } from "@/stores/customer.stores";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/redux";
const { Search } = Input;

function Follewer({ users }: { users: IUser[] }) {
  const isMobile = useCheckMobile();
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const getUserFollows = async () => {
    try {
      const result = await getUserFollow(pageIndex, pageSize, search);
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFollows();
  }, [search]);

  if (isMobile) {
    return (
      <div style={{ paddingTop: 110 }} className="body">
        <h1 className="title-heading">Thành viên theo dõi</h1>
        <div className="grid grid-cols-1 gap-5">
          {user.map((item, index) => {
            return <ItemUser key={index} item={item} />;
          })}
        </div>
      </div>
    );
  }

  const onSearch = (value: string) => setSearch(value);

  return (
    <LayoutAccount>
      <div>
        {/* {users.map((item) => {
          return (
            <ItemUser key={item._id} item={item} />
          )
        })} */}
        <div id="myFollow">
          <div className="myFollow">
            <div className="myFollow_left">Theo dõi của tôi</div>
            <div className="myFollow_right">
              <Space.Compact>
                <Search
                  allowClear
                  className="myFollow_right_input"
                  type="text"
                  placeholder="Tìm kiếm"
                  // onChange={}
                  onSearch={onSearch}
                />
              </Space.Compact>
            </div>
          </div>
          <div className="myFollow1">
            {user &&
              user?.map((item: any, index: number) => {
                return (
                  <div className="myFollow1_col" key={index}>
                    <div className="myFollow1_col_item">
                      <div className="myFollow1_col_item_left">
                        {item.avatar ? (
                          <img
                            style={{ width: "75%", borderRadius: "50%" }}
                            src={item.avatar}
                            alt="..."
                          />
                        ) : (
                          <Avatar size={50} icon={<UserOutlined />} />
                        )}
                      </div>
                      <div className="myFollow1_col_item_center">
                        <div className="myFollow1_col_item_center_top">
                          {item?.email} <span>Won 11/14</span>
                        </div>
                        <div className="myFollow1_col_item_center_bottom">
                          <div className="myFollow1_col_item_center_bottom_icon">
                            <GoFile />{item?.post.length > 0 ? item.post?.length : 0}{" "}
                            <AiOutlineLike style={{ marginLeft: "10px" }} /> {item?.like?.length > 0 ? item?.like?.length : 0}{" "}
                            <AiOutlineUserAdd style={{ marginLeft: "10px" }} />
                            {item?.follow?.length > 0 ? item?.follow?.length : 0}
                          </div>
                          <div className="myFollow1_col_item_center_bottom_icon1">
                            Đã theo dõi
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </LayoutAccount>
  );
}

export default Follewer;

const ItemUser = ({ item }: { item: IUser }) => {
  const router = useRouter();
  const AvatarImg = useMemo(() => {
    const user = item;
    let url = "";
    if (user?.avatar) {
      if (user.avatar.includes("http")) {
        url = user.avatar;
      } else {
        url = `${API_URL}/images/` + user.avatar;
      }
    } else {
      url = Img.src;
    }
    return url;
  }, [item]);
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 item">
      <div
        onClick={() => router.push(`/user/${item._id}`)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Avatar src={AvatarImg} />
        <div>
          <div className="text-sm font-bold uppercase group-name">
            {item.email}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <div className="flex items-center text-xs text-gray-400">
              <MdOutlineArticle /> <span className="ml-1 mr-2">{0}</span>
              <AiOutlineLike /> <span className="ml-1 mr-2">{0}</span>
              <FiUserPlus /> <span className="ml-1 mr-2">{0}</span>
            </div>
          </div>
        </div>
      </div>
      <span className="text-xs font-medium text-green-600">Đã theo dõi</span>
    </div>
  );
};

Follewer.getLayout = (pages: ReactNode) => {
  return <MainLayout>{pages}</MainLayout>;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  let users = null;
  // const [resUser] = await Promise.all([
  //   getUsersFollow(params.id),
  // ]);
  // if(resUser.status === "success"){
  //   users = resUser.data;
  // }else {
  //   return {
  //     notFound: true,
  //   }
  // }
  return {
    props: {
      users: [],
    },
  };
};
