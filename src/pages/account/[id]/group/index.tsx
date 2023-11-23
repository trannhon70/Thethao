import React, { ReactNode, useContext, useEffect, useState } from "react";
import LayoutAccount from "@/Layout/LayoutAccount";
import { Avatar } from "antd";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useCheckMobile from "@/hooks/useCheckMobile";
import { API_URL } from "@/config/config";
import { AppState } from "@/redux";
import MainLayout from "@/Layout/MainLayout";
import { getGroupInfo } from "@/stores/customer.stores";
import { CDN_URL } from "@/config/config";
function Group() {
  const groups: any = [];
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useCheckMobile();
  const [groupInfo, setGroupInfo] = useState<any>();
  const getGroupInfoAPI = async () => {
    const result = await getGroupInfo();
    setGroupInfo(result?.data.data);
  };
  useEffect(() => {
    getGroupInfoAPI();
  }, []);
  const renderContent = () => {
    return (
      <>
        {groupInfo?.map((item: any) => {
          // const isGroup = item.members.includes(user?._id);
          // if (isGroup) {
          return (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border border-gray-200 item"
            >
              <div
                onClick={() => router.push(`/group/${item._id}`)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Avatar src={`${CDN_URL}/${item?.avatar}`} />
                <div>
                  <div className="text-sm font-bold uppercase group-name">
                    {item.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                      />
                    </svg>
                    <span className="mr-2">
                      {" "}
                      {item?.like?.length > 0 ? item?.like?.length : 0}
                    </span>
                    <AiOutlineEdit />{" "}
                    <span>
                      {item?.post?.length > 0 ? item?.post?.length : 0}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-green-600">
                {/* {item.owner?.[0] === user?._id ? "Quản trị viên" : "Thành viên"} */}
              </span>
            </div>
          );
          // }
        })}
      </>
    );
  };

  if (isMobile) {
    return (
      <div style={{ paddingTop: 110 }} className="body">
        <h1 className="title-heading">Nhóm của bạn</h1>
        <div className="grid grid-cols-1 gap-5">{renderContent()}</div>
      </div>
    );
  }
  return (
    <LayoutAccount>
      <div className="grid grid-cols-2 gap-5">{renderContent()}</div>
    </LayoutAccount>
  );
}

Group.getLayout = (pages: ReactNode) => {
  return <MainLayout>{pages}</MainLayout>;
};

export default Group;
