
//@ts-nocheck
import MainLayout from "@/Layout/MainLayout";
import ContainerTips from "@/containers/Tips";
import {
  getPrematchAndInplayOddsByMatchId,
  getScheduleAndResultByDate,
} from "@/stores/isport.stores";
import { getAllGroupIdToExclude, getByIdGroup } from "@/stores/group.stores";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Modal, message } from "antd";
import { createDiscussion } from "@/stores/discussion.store";
import GroupMember from "@/containers/GroupMember";
import { CDN_URL } from "@/config/config";
import GroupHome from "@/containers/GroupHome";
import ModalGroup from "@/containers/ModalGroup";
import { createTips } from "@/stores/tips.stores";
import { useSelector } from "react-redux";
import { createUserGroup, deleteUserGroup, getUserInfo } from "@/stores/customer.stores";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const Group = ({ children }: any) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth?.user);
  const [id, setId] = useState(router.query?.id || "");
  const [content, setContent] = useState("");
  const [value, setValue] = useState(0);
  const [options, setOptions] = useState<any>([]);
  const [dataToday, setDataToday] = useState<any>([]);
  const [dataTomorrow, setDataTomorrow] = useState<any>([]);
  const [matchId, setMatchId] = useState<any>(0);
  const [item, setItem] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const [active, setActive] = useState<any>();
  const [isOpened, setIsOpened] = useState(false);
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>();
  const [ratio, setRatio] = useState<any>();
  const [typeOdd, setTypeOdd] = useState<any>();
  const [dataGroup, setDataGroup] = useState<any>([]);
  const [byIdGroup, setByIdGroup] = useState<any>();
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [useGroup, setUserGroup] = useState<any>({});
  const [titleD, setTitleD] = useState<any>('')

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  const handleChangeContent = (id: number, value: string) => {
    setOptions((state: any) =>
      state.map((option: any) => {
        if (option.id == id) {
          option.content = value;
        }

        return option;
      })
    );
  };

  const handleDelete = (id: number) => {
    setOptions((state: any[]) => {
      return state.filter((item) => item.id !== id);
    });
  };
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const handleAddNew = () => {
    const id = Math.floor(Math.random() * 1000);
    let newElement = {
      id: id,
      element: (
        <div
          key={id}
          className="flex justify-between w-full p-2 mt-2 border rounded-lg"
        >
          <input
            type="text"
            className="flex-grow pr-2 border-none outline-none"
            placeholder="Nội dung lựa chọn"
            onChange={(e) => handleChangeContent(id, e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="flex-shrink-0 w-6 h-6 cursor-pointer"
            onClick={() => handleDelete(id)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ),
      content: "",
    };
    setOptions([...options, newElement]);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const formatDateDD = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getScheduleAndResultByDates = async () => {
    const data = await getScheduleAndResultByDate(formatDateDD(today));
    setDataToday(data);
  };

  const getScheduleAndResultByDatesTomorrow = async () => {
    const data = await getScheduleAndResultByDate(formatDateDD(tomorrow));
    setDataTomorrow(data);
  };

  const getPrematchAndInplayOddsByMatchIds = async () => {
    const data = await getPrematchAndInplayOddsByMatchId(matchId);
    setDetail(data);
  };

  const getByIdGroups = async () => {
    const data = await getByIdGroup(router.query?.id);
    // console.log(data);
    
    setByIdGroup(data);
  };

  useEffect(() => {
    getScheduleAndResultByDates();
    getScheduleAndResultByDatesTomorrow();
    // if(id){
    //   getByIdGroups();
    // }
  }, []);
  useEffect(() => {
    if (router.query?.id) {
      getByIdGroups();
    }
  }, [router.query]);

  useEffect(() => {
    getPrematchAndInplayOddsByMatchIds();
  }, [matchId]);
  const onClickTournament = (value: any) => {
    setMatchId(value.matchId);
    setItem(value);
  };
  const handleSend = async () => {
    const kind =
      active === 1 || active === 2 || active === 3
        ? 1
        : active === 4 || active === 5
        ? 2
        : 3; //1 là hàng đầu tiên, 2 là hàng thứ 2, 3 là hàng thứ 3
    const option =
      active === 1 || active === 4 || active === 6
        ? 0
        : active === 2 || active === 5 || active === 7
        ? 1
        : 2; // lọc ra các option
    const companyId = detail.europeOdds[0]?.split(",");
    const dataRef = {
      title: title,
      content: description,
      isFree: isOpened,
      ratio: ratio,
      option: option,
      kind: kind,
      groupId: router.query?.id,
      matchId,
      companyId: companyId[1],
    };
    const create = await createTips(dataRef);
    if (create.data?.status === 1) {
      return message.success(create.data?.message);
    } else {
      return message.error(create.data?.message);
    }
  };
  const handleSubmitDiscussion = async (e: any) => {
    try {
      e.preventDefault();
      const result = await createDiscussion({
        groupId: id,
        content,
        title: discussionTitle,
      });

      if (result.data?.status == 1) {
        message.success(result.data?.message);
        return;
      }
      message.error("Đăng tips thất bại, vui lòng thử lại");
    } catch (error: any) {
      console.log(error);
      message.error(error.response?.data?.message || error.response?.data);
    }
  };

  const handleAddRouter = (value: any) => {
    router.push({
      pathname: `/group/${router.query?.id}`,
      query: { active: value },
    });
  };

  const activeRouter = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getAllGroupIdToExcludes = async () => {
    const result = await getAllGroupIdToExclude(activeRouter.id);
    setDataGroup(result);
  };
  const getUserInfos = async () => {
    const result = await getUserInfo();
    setUserGroup(result);
  };
  useEffect(() => {
    if (activeRouter.id) {
      getAllGroupIdToExcludes();
      getUserInfos();
    }
  }, [activeRouter]);

 
  const handleLeaveTheGroup = async () => {
    const dataRef = {
      groupId: router.query.id,
      user: user?._id,
    } as any;
    const result = await deleteUserGroup(dataRef);
    if (result.data.status === 1) {
      message.success("Rời khỏi group thành công");
      getUserInfos();
    }
  };

  const handleUpdateTheGroup = async () => {
    const dataRef = {
      id: router.query.id,
    } as any;
    const result = await createUserGroup(dataRef);
    if (result.status === 1) {
      message.success("Tham gia group thành công");
      getUserInfos();
    }
  };

  const onclickGuiBai = async() => {
    const dataRef = {
      _id: user?._id,
      content : content,
      groupId:router.query.id,
      title : titleD
    }

    const result = await createDiscussion(dataRef)
    if(result.data.status === 1){
      message.success('Đăng thảo luận thành công!')
    }
  }
  
  return (
    <div className="mt-4">
      <div className="grid grid-cols-12 gap-2 text-black page-container">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-4">
          <div className="p-2 bg-white rounded-sm shadow-lg ">
            <div className="px-2 py-1 ">
              <div className="flex items-center w-full gap-2">
                <div className="flex-shrink-0 w-9 h-9">
                  {byIdGroup?.avatar ? (
                    <img
                      src={`${CDN_URL}/${byIdGroup.avatar}`}
                      alt=""
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "2px solid white",
                        padding: "7px 12px",
                        borderRadius: "50%",
                        backgroundColor: `${getRandomColor()}`,
                      }}
                    >
                      {byIdGroup?.data?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold md:text-base">
                    {byIdGroup?.data?.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-gray-400 md:text-sm">
                      Thành viên{" "}
                      <span className="font-bold text-green-600">{byIdGroup?.member?.length > 0 ? byIdGroup?.member?.length : 0}</span>
                    </p>
                    <p className="text-xs font-semibold text-gray-400 md:text-sm">
                      Chủ đề mới <span className="text-green-600">{byIdGroup?.post?.length > 0 ? byIdGroup?.post?.length : 0}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 mt-2 text-gray-500 rounded-lg md:text-sm md:p-4 bg-slate-200/60">
            {byIdGroup?.data?.description}
            </div>
            <ul>
              <Link href="">
                <li
                  onClick={() => handleAddRouter("home")}
                  className={
                    activeRouter.active === "home"
                      ? "flex items-center gap-2 p-4 text-sm transition-all duration-300 border-b text-orange-400 md:text-base"
                      : "flex items-center gap-2 p-4 text-sm transition-all duration-300 border-b hover:text-orange-400 md:text-base"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 md:h-6 md:w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  Trang chủ
                </li>
              </Link>
              <Link href="">
                <li
                  onClick={() => handleAddRouter("")}
                  className={
                    activeRouter.active === ""
                      ? "flex items-center gap-2 p-4 text-sm transition-all duration-300 border-b text-orange-400 md:text-base"
                      : "flex items-center gap-2 p-4 text-sm transition-all duration-300 border-b hover:text-orange-400 md:text-base"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 md:h-6 md:w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Gửi bài
                </li>
              </Link>
              <Link href="">
                <li
                  onClick={() => handleAddRouter("member")}
                  className={
                    activeRouter.active === "member"
                      ? "flex items-center gap-2 p-4 text-sm transition-all duration-300 border-b text-orange-400 md:text-base"
                      : "flex items-center gap-2 p-4 text-sm transition-all duration-300 border-b hover:text-orange-400 md:text-base"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 md:h-6 md:w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  Thành viên
                </li>
              </Link>
              <Link href="">
                <li
                  onClick={showModal}
                  className="flex items-center gap-2 p-4 text-sm transition-all duration-300 border-b hover:text-orange-400 md:text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 md:h-6 md:w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Quyền hạn
                </li>
              </Link>
            </ul>

            {
              useGroup?.user?.group?.some((item:any) => item._id === router?.query?.id) === true ?  <button
              onClick={() => handleLeaveTheGroup()}
              className="w-full py-1 mt-4 text-sm text-white transition-all duration-300 bg-red-500 rounded-lg md:py-2 hover:bg-red-600 md:text-base"
            >
              Rời khỏi nhóm
            </button> : <button onClick={() => handleUpdateTheGroup()} className="w-full py-1 mt-4 text-sm text-white transition-all duration-300 bg-green-500 rounded-lg md:py-2 hover:bg-green-600 md:text-base">
                Tham gia
              </button>
            }
            
           
          </div>
          <div className="p-2 mt-2 bg-white rounded-sm shadow-lg">
            <div className="flex items-center justify-between py-2 border-b-2">
              <h3 className="text-xl font-bold">Nhóm</h3>
              <Link href="">
                <span className="font-semibold hover:text-green-500">
                  Xem thêm
                </span>
              </Link>
            </div>
            {/* group info */}
            {dataGroup &&
              dataGroup.map((item: any, index: any) => {
                return (
                  <div
                    key={item?._id}
                    className="flex flex-col py-3 border-b md:justify-between md:items-end last:border-0 md:flex-row"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-9 h-9">
                        {item?.avatar ? (
                          <img
                            src={`${CDN_URL}/${item.avatar}`}
                            alt=""
                            className="object-cover w-full h-full rounded-full"
                          />
                        ) : (
                          <span
                            style={{
                              width: "30px",
                              height: "30px",
                              border: "2px solid gray",
                              padding: "7px 12px",
                              borderRadius: "50%",
                              backgroundColor: `${getRandomColor()}`,
                            }}
                          >
                            {item?.name?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold md:text-base">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-gray-400 md:text-sm">
                            Thành viên{" "}
                            <span className="font-bold text-green-600">
                              {item?.member?.length > 0 ? item?.member?.length : 0}
                            </span>
                          </p>
                          <p className="text-xs font-semibold text-gray-400 md:text-sm">
                            Chủ đề mới{" "}
                            <span className="text-green-600">{item?.post?.length > 0 ? item?.post?.length : 0}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {useGroup?.user?.group?.some((s: any)=> s._id === item?._id ) ? 
                      <div className="mt-1 text-xs text-green-500 md:mt-0 md:text-sm">
                      Thành viên
                    </div> : <div className="mt-1 text-xs text-green-500 md:mt-0 md:text-sm">
                      Tham gia
                    </div>
                  }
                    
                  </div>
                );
              })}
          </div>
        </div>
        {/* MainLayout */}
        <div className="order-1 col-span-12 md:col-span-8">
          {/* {children} */}
          {!activeRouter.active && (
            <div className="p-2 bg-white rounded-sm shadow-lg">
              <div className="flex items-center gap-2 font-bold">
                <div
                  className={
                    value === 0
                      ? `bg-green-600 text-white px-2 sm:px-4 md:px-8  py-2  text-xs md:text-sm text-center  bg-[#e5e5e5]  text-black rounded-md cursor-pointer`
                      : `px-2 sm:px-4 md:px-8  py-2  text-xs md:text-sm text-center  bg-[#e5e5e5]  text-black rounded-md cursor-pointer`
                  }
                  onClick={() => setValue(0)}
                >
                  Tips
                </div>
                <div
                  className={
                    value === 1
                      ? `bg-green-600 text-white px-2 sm:px-4 md:px-8  py-2  text-xs md:text-sm text-center  bg-[#e5e5e5]  text-black rounded-md cursor-pointer`
                      : `px-2 sm:px-4 md:px-8  py-2  text-xs md:text-sm text-center  bg-[#e5e5e5]  text-black rounded-md cursor-pointer`
                  }
                  onClick={() => setValue(1)}
                >
                  Thảo luận
                </div>
                <div
                  className={
                    value === 2
                      ? `bg-green-600 text-white px-2 sm:px-4 md:px-8  py-2  text-xs md:text-sm text-center  bg-[#e5e5e5]  text-black rounded-md cursor-pointer`
                      : `px-2 sm:px-4 md:px-8  py-2  text-xs md:text-sm text-center  bg-[#e5e5e5]  text-black rounded-md cursor-pointer`
                  }
                  onClick={() => setValue(2)}
                >
                  Bỏ phiếu
                </div>
              </div>
              {value === 0 && (
                <div className="grid grid-cols-7 mt-4 gap-x-2">
                  <ContainerTips
                    dataToday={dataToday}
                    onClickTournament={onClickTournament}
                    dataTomorrow={dataTomorrow}
                    matchId={matchId}
                    item={item}
                    detail={detail}
                    setActive={setActive}
                    setRatio={setRatio}
                    setTypeOdd={setTypeOdd}
                    active={active}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    toggle={toggle}
                    isOpened={isOpened}
                    handleSend={handleSend}
                  />
                </div>
              )}
              {value === 1 && (
                <div className="mt-3 min-h-[500px]">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border-2 rounded-lg outline-none"
                    placeholder="Vui lòng nhập tiêu đề."
                    onChange={(e)=>setTitleD(e.target.value)} 
                  />
                  <div className="my-4">
                    <QuillNoSSRWrapper
                      modules={modules}
                      onChange={setContent}
                      className="mt-4"
                      placeholder="Vui lòng nhập nội dung"
                    ></QuillNoSSRWrapper>
                  </div>
                  <div className="text-center">
                    <button onClick={()=>onclickGuiBai()} className="w-full px-3 py-3 text-white bg-green-500 rounded-lg max-w-[300px] ml-auto hover:bg-green-600">
                      Gửi bài 
                    </button>
                  </div>
                </div>
              )}
              {value === 2 && (
                <div className="my-3">
                  <input
                    type="text"
                    className="w-full p-2 mt-2 border-2 rounded-lg outline-none"
                    placeholder="Vui lòng nhập tiêu đề"
                  />
                  <textarea
                    name=""
                    id=""
                    className="w-full outline-none md:min-h-[300px] border-2 rounded-lg p-2 mt-3"
                    placeholder="Vui lòng nhập nội dung"
                  ></textarea>
                  {options?.map((item: any, index: number) => item?.element)}
                  <button
                    className="w-full px-3 py-2 my-4 text-center border rounded-lg outline-none hover:text-white hover:bg-orange-500"
                    onClick={handleAddNew}
                  >
                    Thêm lựa chọn
                  </button>
                  <div className="mt-2 text-center">
                    <button className="w-full px-3 py-3 text-white bg-green-500 rounded-lg max-w-[300px] ml-auto hover:bg-green-600">
                      Gửi bài
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Thành viên */}
          {activeRouter.active === "member" && <GroupMember groupId={id} />}
          {/* trang chủ */}
          {activeRouter.active === "home" && <GroupHome groupId={id} />}
        </div>
      </div>
      <ModalGroup
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={isModalOpen}
      />
    </div>
  );
};

Group.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Group;
