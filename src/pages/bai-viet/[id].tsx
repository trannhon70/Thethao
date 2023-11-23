//@ts-nocheck
import MainLayout from "@/Layout/MainLayout";
import {
  getByIdDiscusion,
  getDisscussionByGroupBaiVietTip,
} from "@/stores/discussion.store";
import { format } from "date-fns";
import moment from "moment";
import { AppState } from "@/redux";
import {
  getAllPostUser,
  getLikesTips,
  getRelatedListTip,
  postLike,
} from "@/stores/tips.stores";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState, useEffect, Fragment, use } from "react";
import { useSelector } from "react-redux";
import {
  RemoveComment,
  createComment,
  createLikeComment,
  getComment,
} from "@/stores/comment.stores";
import { Popover, Radio, Space, message } from "antd";
import { Button, Modal } from "antd";
import {
  createUserFollows,
  deleteUserFollows,
  getUserFollow,
  getUserInfo,
  getUserTotalPost,
} from "@/stores/customer.stores";
import {
  getPrematchAndInplayOddsByMatchId,
  getScheduleAndResultByMatchId,
} from "@/stores/isport.stores";
import { GiCutDiamond } from "react-icons/gi";
import { BiDotsHorizontalRounded, BiDotsVerticalRounded } from "react-icons/bi";
import {
  AiOutlineClose,
  AiOutlineLike,
  AiOutlineMessage,
} from "react-icons/ai";
import { GrFormNext } from "react-icons/gr";
interface Like {
  _id: string;
  email: string;
  avatar: string;
}
const ArticleDetail = () => {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [activeLike, setActiveLike] = useState<boolean>(false);
  const [likesArray, setLikesArray] = useState<Like[]>([]);
  const [comment, setComment] = useState<any>("");
  const [dataComment, setDataComment] = useState<any>([]);
  const [follow, setFollow] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPay, setCurrentPay] = useState(0);
  const [isClickedPay, setIsClickedPay] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState(0);
  const [matchId, setMatchId] = useState<any>();
  const [team, setTeam] = useState<any>([]);
  const [tipsRelated, setTipsRelated] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);
  const [replyComment, setReplyComment] = useState<any>("");
  const [activePopover, setActivePopover] = useState<any>("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [userFollow, setUserFollow] = useState<any>();
  const [activeRanking, setActiveRanking] = useState(1);
  const [totalPost, setTotalPost] = useState<any>();
  const [activeMenu, setActiveMenu] = useState<any>("");

  const getUserFollows = async () => {
    try {
      const result = await getUserFollow(pageIndex, pageSize, "");
      setUserFollow(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserTotalPostAPI = async () => {
    const dataRef = {
      user: data?.createdBy._id,
    };
    const response = await getUserTotalPost(dataRef);
    setTotalPost(response.data);
  };

  const user = useSelector((state: AppState) => state.auth.user);
  const getByIdDiscusions = async () => {
    const data = await getByIdDiscusion(router.query?.id);
    setData(data?.data?.discussions);
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const getLikePost = async () => {
    // if (router.query.id) {
    const data = await getLikesTips(router.query.id as string);
    setLikesArray(data.data.data);
    // }
  };

  const addLike = async () => {
    const data = await postLike({
      user: user,
      tipId: router.query.id as string,
    });
    if (data.status === 1) {
      getLikePost();
      setLikesArray(data.data);
    }
    getLikePost();
  };

  const getDisscussionByGroupBaiVietTips = async () => {
    const data = await getDisscussionByGroupBaiVietTip(router.query?.id);
    setData(data?.data?.discussions);
  };
  const getDataComment = async () => {
    const data = await getComment(router.query.id as string);
    setDataComment(
      data?.data.comments.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return (dateB as any) - (dateA as any);
      })
    );
  };

  useEffect(() => {
    if (router.query.id) {
      if (router.query.type === "discus") {
        getByIdDiscusions();
      }
      if (router.query.type === "tips") {
        getDisscussionByGroupBaiVietTips();
      }
      getLikePost();
      getDataComment();
      getUserFollows();
    }
  }, [router.query]);

  const getUserInfos = async () => {
    const data = await getUserInfo();
    setUserInfo(data?.user);
  };
  useEffect(() => {
    getUserInfos();
    if (data?.createdBy?._id) {
      getUserTotalPostAPI();
    }
  }, [data?.createdBy?._id]);
  const checkFollow = () => {
    const active = userInfo?.follow?.filter(
      (item: any) => item._id === data?.createdBy?._id
    );
    setFollow(active);
  };

  useEffect(() => {
    handleActiveLike();
    checkFollow();
  }, [router.query.id, likesArray, userInfo?.follow]);

  const handleActiveLike = () => {
    let active = likesArray?.some((like) => like._id === user._id);
    setActiveLike(active);
  };

  const handleLike = () => {
    if (!activeLike) {
      addLike();
      setActiveLike(true);
    }
  };

  const handleComment = async () => {
    const dataRef = {
      user: user._id,
      content: comment,
      post: router?.query?.id,
      parentId: null,
      type: router?.query?.type,
    } as any;
    const data = await createComment(dataRef);
    if (data.data?.status === 1) {
      getDataComment();
      message.success("Bình luận thành công!");
    } else {
      message.error("Bình luận không thành công!");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createUserFollow = async () => {
    const dataRef = {
      userId: data?.createdBy?._id,
      user: user?._id,
    } as any;
    const result = await createUserFollows(dataRef);
    if (result.data.status === 1) {
      getUserInfos();
      message.success("Follow thành công!");
    }
  };

  const deleteUserFollow = async () => {
    const dataRef = {
      userId: data?.createdBy?._id,
      user: user?._id,
    } as any;
    const result = await deleteUserFollows(dataRef);
    if (result.data.status === 1) {
      getUserInfos();
      message.success("Hủy Follow thành công!");
    }
  };

  const getPrematchAndInplayOddsByMatchIds = async () => {
    const result = await getPrematchAndInplayOddsByMatchId(data?.matchId);
    setMatchId(result);
  };

  const getScheduleAndResultByMatchIds = async () => {
    const result = await getScheduleAndResultByMatchId(data?.matchId);
    setTeam(result);
  };

  const getRelatedListTips = async () => {
    const result = await getRelatedListTip(data?._id);
    setTipsRelated(result.data?.data);
  };

  useEffect(() => {
    if (router.query.id && data?.matchId && data?._id) {
      getPrematchAndInplayOddsByMatchIds();
      getScheduleAndResultByMatchIds();
      getRelatedListTips();
    }
  }, [router.query, data?.matchId, data?._id]);

  const handleBaiViet = (value: any) => {
    router.push({
      pathname: `/bai-viet/${value?._id}`,
      query: { type: "tips" },
    });
  };

  const getAllPostUsers = async () => {
    const result = await getAllPostUser(user?._id);
    setPosts(result.data?.data);
  };
  useEffect(() => {
    getAllPostUsers();
  }, [user?._id]);

  const handleReplyComment = async (item: any) => {
    const dataRef = {
      content: replyComment,
      post: router?.query?.id,
      parentId: item?._id,
    } as any;

    const data = await createComment(dataRef);
    if (data.data?.status === 1) {
      getDataComment();
      message.success("Bình luận thành công!");
    } else {
      message.error("Bình luận không thành công!");
    }
    setReplyComment("");
  };

  const onClickActive = (value: any) => {
    setActivePopover(value?._id);
  };

  const createLikeComments = async (value: any) => {
    const dataRef = {
      commentId: value?._id,
    } as any;
    await createLikeComment(dataRef);
    getDataComment();
  };

  const handleSortDay = (reverse: boolean = false): any => {
    let commentArray = [...dataComment];
    if (reverse) {
      commentArray.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return (dateA as any) - (dateB as any);
      });
    } else {
      commentArray.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return (dateB as any) - (dateA as any);
      });
    }
    setDataComment(commentArray);
  };
  const handleSortLike = () => {
    const data = [...dataComment];
    data.sort((a: any, b: any): any => {
      return b.like.length - a.like.length;
    });
    setDataComment(data);
  };

  const handleSortValue = (e?: React.ChangeEvent<HTMLSelectElement>) => {
    let value = "time";
    if (e) {
      value = e.target.value;
    }
    if (value === "time") {
      handleSortDay(false);
    } else if (value === "time-reverse") {
      handleSortDay(true);
    } else {
      handleSortLike();
    }
  };

  const handleActiveMenu = (value: any) => {
    setActiveMenu(value?._id);
  };

  const handleRemoveComment = async (value: any) => {
    const result = await RemoveComment(value?._id);
    if (result.data.status === 1) {
      message.success("Xóa bình luận thành công!");
      getDataComment();
    }
  };

  const handleCreateFollow = async (value: any) => {
    const dataRef = {
      userId: value?.customer?._id,
      user: user?._id,
    } as any;
    const result = await createUserFollows(dataRef);
    if (result.data.status === 1) {
      getUserInfos();
      getDataComment();
      message.success("Follow thành công!");
    }
  };

  const handledeleteFollow = async (value: any) => {
    const dataRef = {
      userId: value?.customer?._id,
      user: user?._id,
    } as any;
    const result = await deleteUserFollows(dataRef);
    if (result.data.status === 1) {
      getUserInfos();
      getDataComment();
      message.success("Hủy Follow thành công!");
    }
  };

  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const handleReport = () => {
    setIsModalOpen1(true);
    setActiveMenu('')
  };

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="text-black page-container">
      <div className="grid grid-cols-12 gap-2 mt-3 ">
        <div className="col-span-12 p-4 bg-white rounded-lg shadow-lg md:col-span-8">
          <h1 className="text-3xl font-semibold">{data?.title}</h1>
          <div className="flex items-center justify-between py-2 mt-3 border-b">
            <div className="flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="flex-shrink-0 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="ml-2">
                {moment(data?.createdAt).fromNow()} nhóm:{" "}
                <span className="font-bold text-green-400">
                  {router.query?.type === "tips" ? (
                    <Link href="/" target="_blank">
                      Tips Bóng Đá
                    </Link>
                  ) : (
                    <Link href="/" target="_blank">
                      Thảo luận
                    </Link>
                  )}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <p className="flex items-center text-sm text-gray-400 text-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {data?.view?.length > 0 ? data?.view?.length : 0}
              </p>
              <p className="flex items-center text-sm text-gray-400 text-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
                {likesArray?.length > 0 ? likesArray?.length : 0}
              </p>
              <p className="flex items-center text-sm text-gray-400 text-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                {dataComment?.length > 0 ? dataComment?.length : 0}
              </p>
            </div>
          </div>
          <div className="px-2 py-3 mt-3 rounded-lg shadow-md">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center text-sm text-gray-400 gap-x-2">
                <span>{team?.[0]?.date}</span>
                <span>{format(team?.[0]?.matchTime * 1000 || 0, "HH:mm")}</span>
                <span>{team?.[0]?.subLeagueName}</span>
              </div>
              <div className="flex items-center text-sm gap-x-2">
                <Link
                  href=""
                  className="font-bold text-green-500 underline hover:no-underline"
                >
                  <p>Tips</p>
                </Link>
                <Link
                  href=""
                  className="font-bold text-green-500 underline hover:no-underline"
                >
                  <p>Phân tích</p>
                </Link>
                <Link
                  href=""
                  className="font-bold text-green-500 underline hover:no-underline"
                >
                  <p>TL</p>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-center text-xl font-bold gap-x-5">
                <h2>{team?.[0]?.awayName}</h2>-<h2>{team?.[0]?.homeName}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-3 md:gap-3">
              {matchId?.europeOdds &&
                matchId?.europeOdds.map((item: any, index: number) => {
                  const data = item?.split(",");
                  return index === 0 ? (
                    <>
                      <div
                        key={index}
                        className="col-span-1 px-3 py-2 text-center text-white bg-orange-500 rounded-lg "
                      >
                        Chủ {data?.[2]}
                      </div>
                      <div
                        key={index}
                        className="col-span-1 px-3 py-2 text-center text-white bg-orange-500 rounded-lg "
                      >
                        Hòa {data?.[3]}
                      </div>
                      <div
                        key={index}
                        className="col-span-1 px-3 py-2 text-center text-white bg-orange-500 rounded-lg "
                      >
                        Khách {data?.[4]}
                      </div>
                    </>
                  ) : (
                    ""
                  );
                })}
              {matchId?.handicap &&
                matchId?.handicap.map((item: any, index: number) => {
                  const data = item?.split(",");
                  return index === 0 ? (
                    <>
                      <div
                        key={index}
                        className="col-span-1 px-3 py-2 text-center text-white bg-orange-500 rounded-lg "
                      >
                        Chủ {data?.[2]}
                      </div>
                      <div
                        key={index}
                        className="col-span-1 px-3 py-2 text-center text-white bg-gray-500 rounded-lg "
                      >
                        HDP {data?.[3]}
                      </div>
                      <div
                        key={index}
                        className="col-span-1 px-3 py-2 text-center text-white bg-orange-500 rounded-lg "
                      >
                        Khách {data?.[4]}
                      </div>
                    </>
                  ) : (
                    ""
                  );
                })}
              {matchId?.overUnder &&
                matchId?.overUnder.map((item: any, index: number) => {
                  const data = item?.split(",");
                  return index === 0 ? (
                    <>
                      <div
                        key={index}
                        className="col-span-1 px-3 py-2 text-center text-white bg-orange-500 rounded-lg "
                      >
                        Tài {data?.[2]}
                      </div>
                      <div
                        key={index}
                        className="col-span-1 px-3 py-2 text-center text-white bg-gray-500 rounded-lg "
                      >
                        T/X {data?.[3]}
                      </div>
                      <div
                        key={index}
                        className="col-span-1 px-3 py-2 text-center text-white bg-orange-500 rounded-lg "
                      >
                        Xỉu {data?.[4]}
                      </div>
                    </>
                  ) : (
                    ""
                  );
                })}
            </div>
          </div>
          <div className="mt-5">
            {/* Parse content from api */}
            <div className="mt-2 text-justify min-h-[200px] relative">
              {data?.isFree ? (
                data?.content
              ) : (
                <div className="absolute top-0 w-full h-full bg-opacity-50 bg-[url(/images/blur-text.png)] flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 -mt-6 bg-white border border-gray-600 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <div
                    className="flex items-center justify-center px-10 py-3 mt-5 text-white bg-orange-500 cursor-pointer rounded-xl gap-x-2"
                    onClick={() => showModal()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      version="1.1"
                      className="w-5 h-5"
                    >
                      <path d="M31.835 9.233l-4.371-8.358c-0.255-0.487-0.915-0.886-1.464-0.886h-10.060c-0.011-0.001-0.022-0.003-0.033-0.004-0.009 0-0.018 0.003-0.027 0.004h-9.88c-0.55 0-1.211 0.398-1.47 0.883l-4.359 8.197c-0.259 0.486-0.207 1.248 0.113 1.696l15.001 20.911c0.161 0.224 0.375 0.338 0.588 0.338 0.212 0 0.424-0.11 0.587-0.331l15.247-20.758c0.325-0.444 0.383-1.204 0.128-1.691zM29.449 8.988h-5.358l2.146-6.144zM17.979 1.99h6.436l-1.997 5.716zM20.882 8.988h-9.301l4.396-6.316zM9.809 8.034l-2.006-6.044h6.213zM21.273 10.988l-5.376 15.392-5.108-15.392h10.484zM13.654 25.971l-10.748-14.983h5.776zM23.392 10.988h5.787l-11.030 15.018zM5.89 2.575l2.128 6.413h-5.539z" />
                    </svg>
                    54
                  </div>
                  <div className="mt-2 text-sm font-bold text-black">
                    Trả kim cương hoặc đặt mua để đọc bài tips này
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mt-3">
            <div
              className={`flex flex-col items-center justify-center font-bold border border-black rounded-full cursor-pointer hover:text-white h-14 w-14 hover:bg-green-500 hover:border-green-500 select-none ${
                activeLike === true
                  ? "bg-green-500 text-white border border-green-500"
                  : ""
              }`}
              onClick={handleLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
              {likesArray?.length}
            </div>
          </div>
          <div className="p-2 mt-4 text-white bg-green-500 rounded-sm">
            Xem tips khác
          </div>
          {tipsRelated &&
            tipsRelated.slice(0, 2).map((item: any, index: number) => {
              return (
                <>
                  <div
                    key={item?._id}
                    onClick={() => handleBaiViet(item)}
                    style={{ cursor: "pointer" }}
                    className="p-2 rounded-lg shadow-lg bg-slate-200/50 min-h-[90px] mt-4 "
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ width: "90%" }}>
                        <h3 className="font-bold">{item?.title}</h3>
                        <p className="text-sm text-gray-500">
                          Nhóm: {item?.groupId?.name} (
                          {moment(item?.createdAt).fromNow()})
                        </p>
                      </div>
                      {item?.isFree === false ? (
                        <div>
                          {" "}
                          <GiCutDiamond
                            style={{ fontSize: "25px", color: "#2de1d9" }}
                          />{" "}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex items-end gap-2">
                      <div className="px-4 py-1 mt-2 text-sm text-white bg-green-500 rounded-3xl">
                        {item?.ratio}
                      </div>
                      <span>{item?.content}</span>
                    </div>
                  </div>
                </>
              );
            })}

          <div className="py-2 mt-4 border-t-2">
            <div className="flex flex-wrap items-center justify-between py-2 border-b">
              <div className="text-sm font-semibold">
                {dataComment?.length} Bình luận
              </div>
              <div className="flex items-center">
                <select
                  name=""
                  id=""
                  className="ml-3 text-sm border"
                  onChange={handleSortValue}
                >
                  <option value="time">Theo thời gian</option>
                  <option value="time-reverse">TG đảo ngược</option>
                  <option value="comment-hot">Bình luận hot</option>
                </select>
              </div>
            </div>
          </div>
          {dataComment?.length > 0 &&
            dataComment?.map((item: any) => {

              return (
                <>
                  <div
                    key={item?._id}
                    style={{ width: "100%" }}
                    className="flex items-start mt-4"
                  >
                    {item.customer?.avatar ? (
                      <img
                        src={item.customer?.avatar}
                        alt=""
                        className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                      />
                    ) : (
                      <span
                        className="flex items-center justify-center flex-shrink-0 object-cover w-10 h-10 text-white rounded-full"
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        {item.customer?.email?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                    <div className="ml-2" style={{ width: "90%" }}>
                      <div className="flex items-center ">
                        <h4 className="font-bold">{item.customer?.email}</h4>
                        <span className="ml-2 text-sm font-bold text-gray-400 ">
                          {moment(item.createdAt).fromNow()}
                        </span>
                      </div>
                      <span>{item.content}</span>
                    </div>
                    <div style={{ width: "10%", textAlign: "end" }}>
                      <div
                        style={{ paddingBottom: "10px", marginLeft: "50px" }}
                      >
                        <BiDotsHorizontalRounded
                          style={{ cursor: "pointer" }}
                          onClick={() => handleActiveMenu(item)}
                        />
                        {activeMenu === item?._id ? (
                          <Popover
                            content={
                              <div style={{ width: "250px" }}>
                                {user?._id === item?.customer?._id ? (
                                  <div
                                    className="hover:bg-green-100 p-3"
                                    style={{
                                      cursor: "pointer",
                                      height: "40px",
                                      display: "flex",
                                      alignItems: "center",
                                      fontSize: "15px",
                                      width: "100%",
                                      // borderBottom: "1px solid #00000038",
                                    }}
                                    onClick={() => handleRemoveComment(item)}
                                  >
                                    <span style={{ width: "90%" }}>
                                      Xóa bình luận
                                    </span>{" "}
                                    <span style={{ fontSize: "20px" }}>
                                      <GrFormNext />{" "}
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    {
                                      // console.log(user?._id === item?.customer?._id, 'dsd')
                                      // user?._id === item?.customer?._id ? (
                                      //   <div
                                      //     className="hover:bg-green-100 p-3"
                                      //     style={{
                                      //       cursor: "pointer",
                                      //       height: "40px",
                                      //       display: "flex",
                                      //       alignItems: "center",
                                      //       fontSize: "15px",
                                      //       width: "100%",
                                      //       borderBottom: "1px solid #00000038",
                                      //     }}
                                      //     onClick={() =>
                                      //       handledeleteFollow(item)
                                      //     }
                                      //   >
                                      //     <span style={{ width: "90%" }}>
                                      //       Hủy theo dõi
                                      //     </span>{" "}
                                      //     <span style={{ fontSize: "20px" }}>
                                      //       <GrFormNext />{" "}
                                      //     </span>
                                      //   </div>
                                      // ) : (
                                      //   <div
                                      //     className="hover:bg-green-100 p-3"
                                      //     style={{
                                      //       cursor: "pointer",
                                      //       height: "40px",
                                      //       display: "flex",
                                      //       alignItems: "center",
                                      //       fontSize: "15px",
                                      //       width: "100%",
                                      //       borderBottom: "1px solid #00000038",
                                      //     }}
                                      //     onClick={() =>
                                      //       handleCreateFollow(item)
                                      //     }
                                      //   >
                                      //     <span style={{ width: "90%" }}>
                                      //       Theo dõi
                                      //     </span>{" "}
                                      //     <span style={{ fontSize: "20px" }}>
                                      //       <GrFormNext />{" "}
                                      //     </span>
                                      //   </div>
                                      // )
                                    }

                                    <div
                                      className="hover:bg-green-100 p-3"
                                      style={{
                                        cursor: "pointer",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: "15px",
                                        width: "100%",
                                      }}
                                    >
                                      <span style={{ width: "90%" }} onClick={handleReport} >
                                        Báo cáo bình luận
                                      </span>{" "}
                                      <span style={{ fontSize: "20px" }}>
                                        <GrFormNext />{" "}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            }
                            title={
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ width: "90%", fontSize: "20px" }}>
                                  Chọn
                                </div>{" "}
                                <span
                                  style={{ cursor: "pointer", color: "red" }}
                                  onClick={() => {
                                    setActiveMenu("");
                                  }}
                                >
                                  <AiOutlineClose />
                                </span>
                              </div>
                            }
                            trigger="click"
                            open={true}
                          >
                            {" "}
                          </Popover>
                        ) : (
                          ""
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "55px",
                          }}
                        >
                          {item.like.some(
                            (i: any) => (i === user?._id) === true
                          ) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="red"
                              viewBox="0 0 24 24"
                              strokeWidth={0}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                              />
                            </svg>
                          ) : (
                            <AiOutlineLike
                              style={{ cursor: "pointer" }}
                              onClick={() => createLikeComments(item)}
                            />
                          )}
                          {item.like.length > 0 ? item.like.length : 0}
                        </div>
                        {item?._id === activePopover ? (
                          <Popover
                            content={
                              <div style={{ width: "250px" }}>
                                <div>
                                  <textarea
                                    style={{
                                      border: "1px solid #ccc",
                                      width: "100%",
                                      borderRadius: "2px",
                                      height: "80px",
                                      padding: "5px 10px",
                                    }}
                                    onChange={(e) =>
                                      setReplyComment(e.target.value)
                                    }
                                  />
                                </div>
                                <div style={{ textAlign: "end" }}>
                                  <button
                                    onClick={() => handleReplyComment(item)}
                                    style={{
                                      borderRadius: "4px",
                                      backgroundColor: "#397f19",
                                      color: "#fff",
                                      textAlign: "center",
                                      padding: "5px 25px",
                                    }}
                                  >
                                    Gửi
                                  </button>
                                </div>
                              </div>
                            }
                            title={
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ width: "90%" }}>Trả lời</div>{" "}
                                <span
                                  style={{ cursor: "pointer", color: "red" }}
                                  onClick={() => {
                                    setActivePopover("");
                                  }}
                                >
                                  <AiOutlineClose />
                                </span>
                              </div>
                            }
                            trigger="click"
                            open={true}
                          >
                            {" "}
                          </Popover>
                        ) : (
                          ""
                        )}

                        <AiOutlineMessage
                          onClick={() => onClickActive(item)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                  {item?.children &&
                    item?.children.map((ch: any, index: number) => {
                      return (
                        <div
                          key={ch?._id}
                          style={{
                            width: "100%",
                            paddingLeft: "50px",
                            marginTop: "10px",
                            borderRadius: "4px",
                          }}
                        >
                          <div
                            style={{
                              padding: "10px 15px",
                              backgroundColor: "#fafafa",
                            }}
                          >
                            <div
                              style={{
                                color: "#d64444",
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {ch?.customer?.email} :{" "}
                              <span
                                style={{ color: "#666666", fontSize: "15px" }}
                              >
                                {ch?.content}
                              </span>
                            </div>
                            <div style={{ color: "#b3b3b3", fontSize: "12px" }}>
                              {moment(ch?.createdAt).fromNow()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </>
              );
            })}

          <div className="sticky bottom-0 z-20 p-3 mt-4 bg-slate-200">
            <span className="font-bold">Bình luận</span>
            <textarea
              name=""
              className="w-full border min-h-[100px] outline-none"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="text-right">
              {" "}
              <button
                onClick={handleComment}
                className="px-4 py-2 ml-auto text-center text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="px-2 py-2 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center">
              {data?.createBy?.avatar ? (
                <img
                  src={data?.createdBy?.avatar}
                  alt=""
                  className="object-cover rounded-full shadow-lg w-14 h-14"
                />
              ) : (
                <span
                  className="flex items-center justify-center flex-shrink-0 object-cover w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {data?.createdBy?.email.charAt(0)?.toUpperCase()}
                </span>
              )}

              <span className="mt-2 text-xl font-bold">
                {data?.createdBy?.email}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 px-4 py-2">
              <div className="col-span-1">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-green-600">
                    {totalPost?.data ? totalPost?.data.length : 0}
                  </span>
                  <span>Bài viết</span>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-green-600">
                    {totalPost?.like ? totalPost?.like.length : 0}
                  </span>
                  <span>Thích</span>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-green-600">
                    {data?.createdBy?.follow?.length > 0
                      ? data?.createdBy?.follow?.length
                      : 0}
                  </span>
                  <span>Người theo dõi</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              {follow?.[0]?._id ? (
                <button
                  onClick={deleteUserFollow}
                  className="w-full p-1 mt-2 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
                >
                  Hủy theo dõi
                </button>
              ) : (
                <button
                  onClick={createUserFollow}
                  className="w-full p-1 mt-2 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white"
                >
                  Theo dõi
                </button>
              )}
            </div>
            <p className="mt-4 font-bold text-center">
              Chi tiết
              <span className="p-1 ml-2 text-sm text-orange-300 rounded-sm bg-orange-200/40 ">
                Won 6/6
              </span>
            </p>
            <div className="grid grid-cols-3 gap-3 px-4 py-2">
              <div className="col-span-1">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-orange-600">19</span>
                  <span>Tips</span>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-orange-600">
                    1.96
                  </span>
                  <span>Avg Odds</span>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-orange-600">
                    68.4%
                  </span>
                  <span>Win rate</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="w-full p-1 mt-2 text-orange-500 border border-orange-500 rounded-lg text-orange hover:bg-orange-500 hover:text-white">
                Đặt mua
              </button>
            </div>
          </div>
          <div className="w-full px-2 py-2 mt-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b">
              <h4 className="text-base font-bold">BXH thành viên</h4>
              <span className="cursor-pointer hover:text-green-600">
                Xem thêm
              </span>
            </div>
            <div className="flex items-center justify-center py-2 text-black bg-slate-300/30 gap-x-3 ">
              <span
                className={`font-bold cursor-pointer hover:text-green-500 ${
                  activeRanking === 1 ? "text-green-500" : ""
                }`}
                onClick={() => setActiveRanking(1)}
              >
                Hot
              </span>
              <span
                className={`font-bold cursor-pointer hover:text-green-500 ${
                  activeRanking === 2 ? "text-green-500" : ""
                }`}
                onClick={() => setActiveRanking(2)}
              >
                Thích
              </span>
              <span
                className={`font-bold cursor-pointer hover:text-green-500 ${
                  activeRanking === 3 ? "text-green-500" : ""
                }`}
                onClick={() => setActiveRanking(3)}
              >
                Theo dõi
              </span>
            </div>
            <div className="overflow-auto">
              <div className="max-h-[400px]">
                {activeRanking === 3 &&
                  userFollow?.length > 0 &&
                  userFollow.map((item: any, index: any) => (
                    <div className="flex items-center mt-4" key={index}>
                      <img
                        src={item.avatar}
                        alt=""
                        className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                      />
                      <div className="flex flex-col ml-2">
                        <div className="flex justify-center">
                          <span className="font-bold">{item.email}</span>
                          <span className="p-2 ml-1 text-xs font-bold text-orange-400 rounded-sm bg-orange-300/60">
                            Won 14/8
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                              />
                            </svg>
                            {item.like ? item.like.length : 0}
                          </div>
                          <div className="flex items-center text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                              />
                            </svg>
                            51
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex items-center justify-between mt-5 text-lg font-bold">
          <h3 className="text-xl">{isClickedPay ? "Nạp Kim cương" : "Trả"}</h3>
          <div className="text-blue-400">
            {" "}
            {isClickedPay ? (
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  className="w-5 h-5"
                >
                  <polygon
                    style={{ fill: "#C3F6F9" }}
                    points="256,499.47 512,146.167 414.217,12.53 97.784,12.53 0.001,146.167 "
                  />
                  <g>
                    <polygon
                      style={{ fill: "#D1F9F7" }}
                      points="97.786,12.53 170.663,146.172 0,146.172  "
                    />
                    <polygon
                      style={{ fill: "#D1F9F7" }}
                      points="414.217,12.53 341.327,146.172 255.995,12.53  "
                    />
                    <polygon
                      style={{ fill: "#D1F9F7" }}
                      points="341.327,146.172 255.995,499.467 170.663,146.172  "
                    />
                  </g>
                  <g>
                    <polygon
                      style={{ fill: "#9EE7E7" }}
                      points="414.217,12.53 511.99,146.172 341.327,146.172  "
                    />
                    <polygon
                      style={{ fill: "#9EE7E7" }}
                      points="255.995,12.53 341.327,146.172 170.663,146.172  "
                    />
                    <polygon
                      style={{ fill: "#9EE7E7" }}
                      points="170.663,146.172 255.995,499.467 0,146.172  "
                    />
                  </g>
                </svg>
                : 0
              </div>
            ) : (
              <span>Số dư: 0</span>
            )}
          </div>
        </div>
        {!isClickedPay && (
          <Fragment>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-x-3">
                <img
                  src="https://source.unsplash.com/random"
                  alt=""
                  className="object-cover w-12 h-12 rounded-full"
                />
                <div className="flex flex-col items-center">
                  <span className="font-bold">Ga Con93</span>
                  <span className="p-1 text-xs text-orange-500 bg-orange-200 rounded-md">
                    Won 12/15
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-3">
                <div className="flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                    />
                  </svg>
                  45
                </div>
                <div className="flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    version="1.1"
                    className="w-4 h-4 mr-2"
                  >
                    <path d="M31.835 9.233l-4.371-8.358c-0.255-0.487-0.915-0.886-1.464-0.886h-10.060c-0.011-0.001-0.022-0.003-0.033-0.004-0.009 0-0.018 0.003-0.027 0.004h-9.88c-0.55 0-1.211 0.398-1.47 0.883l-4.359 8.197c-0.259 0.486-0.207 1.248 0.113 1.696l15.001 20.911c0.161 0.224 0.375 0.338 0.588 0.338 0.212 0 0.424-0.11 0.587-0.331l15.247-20.758c0.325-0.444 0.383-1.204 0.128-1.691zM29.449 8.988h-5.358l2.146-6.144zM17.979 1.99h6.436l-1.997 5.716zM20.882 8.988h-9.301l4.396-6.316zM9.809 8.034l-2.006-6.044h6.213zM21.273 10.988l-5.376 15.392-5.108-15.392h10.484zM13.654 25.971l-10.748-14.983h5.776zM23.392 10.988h5.787l-11.030 15.018zM5.89 2.575l2.128 6.413h-5.539z" />
                  </svg>
                  45
                </div>
              </div>
            </div>
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <div
                  className={`flex items-center justify-between p-3 mt-4 border border-gray-400 rounded-lg cursor-pointer  ${
                    index === currentPay
                      ? "bg-orange-500 text-white hover:text-white hover:bg-orange-500 border-orange-500"
                      : "hover:text-orange-500 hover:border-orange-500"
                  }`}
                  key={index}
                  onClick={() => setCurrentPay(index)}
                >
                  <div className="flex items-center gap-x-2">
                    <span className="text-lg font-bold">68</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Layer_1"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      className="w-5 h-5"
                    >
                      <polygon
                        style={{ fill: "#C3F6F9" }}
                        points="256,499.47 512,146.167 414.217,12.53 97.784,12.53 0.001,146.167 "
                      />
                      <g>
                        <polygon
                          style={{ fill: "#D1F9F7" }}
                          points="97.786,12.53 170.663,146.172 0,146.172  "
                        />
                        <polygon
                          style={{ fill: "#D1F9F7" }}
                          points="414.217,12.53 341.327,146.172 255.995,12.53  "
                        />
                        <polygon
                          style={{ fill: "#D1F9F7" }}
                          points="341.327,146.172 255.995,499.467 170.663,146.172  "
                        />
                      </g>
                      <g>
                        <polygon
                          style={{ fill: "#9EE7E7" }}
                          points="414.217,12.53 511.99,146.172 341.327,146.172  "
                        />
                        <polygon
                          style={{ fill: "#9EE7E7" }}
                          points="255.995,12.53 341.327,146.172 170.663,146.172  "
                        />
                        <polygon
                          style={{ fill: "#9EE7E7" }}
                          points="170.663,146.172 255.995,499.467 0,146.172  "
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="text-base font-semibold">
                    Đọc bài tips này
                  </div>
                </div>
              ))}
            <div className="mt-2 font-bold text-orange-500">
              Bạn có thể xem tất cả bài tips của chuyên gia này trong 30 ngày.
            </div>
            <button
              className="w-full py-3 mt-2 text-lg font-bold text-center text-white bg-green-800 rounded-lg"
              onClick={() => setIsClickedPay(true)}
            >
              Trả
            </button>
          </Fragment>
        )}
        {isClickedPay && (
          <Fragment>
            <div className="mt-4">
              <h3 className="mb-2 font-bold">Chọn cách thanh toán</h3>
              <div className="grid grid-cols-4 gap-3">
                <div
                  className={`flex items-center justify-center w-full h-full p-2 border border-gray-500 rounded-lg cursor-pointer hover:border-orange-500 ${
                    paymentType == 0 && "bg-orange-500"
                  }`}
                  onClick={() => setPaymentType(0)}
                >
                  <img src="/images/credit-card.png" alt="" />
                </div>
                <div
                  className={`flex items-center justify-center w-full h-full p-2 border border-gray-500 rounded-lg cursor-pointer hover:border-orange-500 ${
                    paymentType == 1 && "bg-orange-500 "
                  }`}
                  onClick={() => setPaymentType(1)}
                >
                  <img src="/images/paypal.png" alt="" />
                </div>
                <div
                  className={`flex items-center justify-center w-full h-full p-2 border border-gray-500 rounded-lg cursor-pointer hover:border-orange-500 ${
                    paymentType == 2 && "bg-orange-500"
                  }`}
                  onClick={() => setPaymentType(2)}
                >
                  <img src="/images/razer-gold.png" alt="" />
                </div>
                <div
                  className={`flex items-center justify-center w-full h-full p-2 border border-gray-500 rounded-lg cursor-pointer hover:border-orange-500 text-center font-bold ${
                    paymentType == 3 &&
                    "bg-orange-500 text-white border-orange-500"
                  }`}
                  onClick={() => setPaymentType(3)}
                >
                  Đổi tiền thưởng
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-2 font-bold">Chọn số lượng kim cương:</h3>
              <div className="grid grid-cols-4 gap-3">
                {Array(5)
                  .fill(0)
                  .map((item, index) => (
                    <div className="flex items-center justify-center w-full h-full p-2 font-bold border border-gray-500 rounded-lg cursor-pointer gap-x-2 hover:border-orange-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Layer_1"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        className="w-5 h-5"
                      >
                        <polygon
                          style={{ fill: "#C3F6F9" }}
                          points="256,499.47 512,146.167 414.217,12.53 97.784,12.53 0.001,146.167 "
                        />
                        <g>
                          <polygon
                            style={{ fill: "#D1F9F7" }}
                            points="97.786,12.53 170.663,146.172 0,146.172  "
                          />
                          <polygon
                            style={{ fill: "#D1F9F7" }}
                            points="414.217,12.53 341.327,146.172 255.995,12.53  "
                          />
                          <polygon
                            style={{ fill: "#D1F9F7" }}
                            points="341.327,146.172 255.995,499.467 170.663,146.172  "
                          />
                        </g>
                        <g>
                          <polygon
                            style={{ fill: "#9EE7E7" }}
                            points="414.217,12.53 511.99,146.172 341.327,146.172  "
                          />
                          <polygon
                            style={{ fill: "#9EE7E7" }}
                            points="255.995,12.53 341.327,146.172 170.663,146.172  "
                          />
                          <polygon
                            style={{ fill: "#9EE7E7" }}
                            points="170.663,146.172 255.995,499.467 0,146.172  "
                          />
                        </g>
                      </svg>
                      100
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-black">
                Tất cả:{" "}
                <span className="text-xl font-bold text-red-600">$ 6.60</span>
              </p>
            </div>
            <button
              className="w-full py-3 mt-2 text-lg font-bold text-center text-white bg-green-800 rounded-lg"
              onClick={() => setIsClickedPay(true)}
            >
              Đi thanh toán
            </button>
            <ul className="mt-4">
              <li>
                1. Kim Cương chỉ được dùng để Mua bài/ Đặt mua, không thể rút
                ra;
              </li>
              <li>
                2. Một lần ít nhất đổi 100! 100 tiền thưởng bằng 100 kim cương;
              </li>
              <li>
                3. Không nạp được kim cương?{" "}
                <Link href="/" className="font-bold text-blue-500">
                  Click để liên lạc chúng tôi!
                </Link>
              </li>
            </ul>
          </Fragment>
        )}
      </Modal>
      <Modal title="Báo cáo nội dung xấu" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1}>
      <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>Spam</Radio>
        <Radio value={2}>Nội dung bạo lực, khiêu dâm</Radio>
        <Radio value={3}>Lăng mạ, xúc phạm đến người khác</Radio>
        <Radio value={4}>Liên quan đến chính trị, tôn giáo, trái pháp luật</Radio>
        <Radio value={5}>Nội dung xấu khác</Radio>
        
      </Space>
    </Radio.Group>
    <div style={{display:'flex', alignItems:'center', width:'100%', marginTop:'20px'}}><Button onClick={handleCancel1} >Gửi</Button></div>
      </Modal>
    </div>
  );
};

ArticleDetail.getLayout = (page: ReactNode) => {
  return <MainLayout>{page}</MainLayout>;
};

export default ArticleDetail;
