import MainLayout from "@/Layout/MainLayout";
import HotMatch from "@/components/tips/HotMatch";
import ModalTips from "@/components/tips/ModalTips";
import TipNotice from "@/components/tips/TipNotice";
import TipsExpertRakingItem from "@/components/tips/TipsExpertRakingItem";
import TipsGroupRankingItem from "@/components/tips/TipsGroupRankingItem";
import TipsMemberRankingItem from "@/components/tips/TipsMemberRankingItem";
import { IGroup, IUser } from "@/interface";
import { AppState } from "@/redux";
import { setAuthState } from "@/redux/authSlice";
import { setLoginModal } from "@/redux/layoutSlice";
import { createUserGroup, getUserInfo } from "@/stores/customer.stores";
import { getAllGroup } from "@/stores/group.stores";
import { getScheduleAndResultByDate } from "@/stores/isport.stores";
import { Result, message } from "antd";
import Link from "next/link";
import React,{ Fragment, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { createView, getPaging, getUserFollow } from "@/stores/tips.stores";
import moment from "moment";
import { useRouter } from "next/router";
import { SmileOutlined } from "@ant-design/icons";
import { GetServerSidePropsContext } from "next";
import { convertObjectToQuery, getCateBySlugSchema, getSeoByLink } from "@/stores/categories.stores";
import Head from "next/head";
import parse from 'html-react-parser';
import Script from "next/script";

const Tips = ({schema, tags} : any) => {
  
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [open, setIsOpen] = useState(false);
  const [groups, setGroups] = useState<any>([]);
  const [dataMacth, setDataMacth] = useState<any>([]);
  const [dataHot, setDataHot] = useState<any>([]);
  const [dataFollow, setDataFollow] = useState<any>([]);
  const [more, setMore] = useState<any>(10);
  const [rankingType, setRankingType] = useState<string>("member");
  const [moreHot, setMoreHot] = useState<number>(3);
  const [rankingMemberType, setRakingMemberType] = useState<string>("hot");
  const [userInfoGroup, setUserInfoGroup] = useState<any>();
  const [userInfo, setUserInfo] = useState<IUser>();
  const dispatch = useDispatch();
  const auth = useSelector((state: AppState) => state.auth);
  const handleOpenLoginForm = () => {
    dispatch(setLoginModal(true));
  };
  const getGroups = async () => {
    try {
      const result = await getAllGroup();
      setGroups(result);
    } catch (error) {
      console.log(error);
    }
  };
  const today = new Date();
  const formatDateDD = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTipsMatch = async () => {
    const data = await getScheduleAndResultByDate(formatDateDD(today));
    setDataMacth(data);
  };

  const getPagings = async () => {
    const data = await getPaging(100, 1, "");
    setDataHot(data?.data?.tips);
  };

  const getUserFollows = async () => {
    const data = await getUserFollow();
    setDataFollow(data.data.data);
  };
  const getUser = async () => {
    const data = await getUserInfo();
    setUserInfoGroup(data?.user.group);
    setUserInfo(data?.user);
  };

  function checkElementsInArray(arr1: any, element: string) {
    let result = false;
    for (let i = 0; i < arr1?.length; i++) {
      if (arr1[i]._id === element) {
        result = true;
      }
    }
    return result;
  }
  useEffect(() => {
    if (value === 1) {
      getTipsMatch();
    }
    if (value === 0) {
      getPagings();
    }
    if (value === 2) {
      getUserFollows();
    }
  }, [value]);

  useEffect(() => {
    getGroups();
    getTipsMatch();
    getUser();
  }, []);

  const handleCreateGroup = async (item: any) => {
    const dataRef = {
      id: item?._id,
    };
    const result = await createUserGroup(dataRef);
    if (result.status === 1) {
      message.success("Tham gia group thành công!");
    } else {
      message.error("Tham gia group không thành công!");
    }
    getUser();
  };

  const handleClickItem = (item: any) => {
    handleCreateView(item._id);
    router.push({
      pathname: `/bai-viet/${item._id}`,
      query: { type: "tips" },
    });
  };

  const handleMore = () => {
    setMore((more: any) => more + 10);
  };

  const handleMoreHot = () => {
    setMoreHot((more: any) => more + 10);
  };

  const handleCreateView = async (postId: string) => {
    let userId = userInfo?._id;
    const result = await createView({
      postId,
      userId,
      type: "tips",
    });
  };

  return (
    <Fragment>
      <Head>
        {tags?.map((tag : any, index : any) => (
          <React.Fragment key={index}>{parse(tag)}</React.Fragment>
        ))}
      </Head>
      {schema?.map((tag : any, index : any) => (
          <Script
        id='globalSchema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html:`${tag.script}`}} />
        ))}
      <ModalTips
        open={open}
        setIsOpen={setIsOpen}
        groups={groups}
        handleCreateGroup={handleCreateGroup}
        userGroupInfo={userInfoGroup}
      ></ModalTips>
      <div className="text-black page-container">
        <div className="flex items-center mt-2 ml-2 text-sm font-bold">
          <Link href="/#" className="text-green-700">
            Bóng đá
          </Link>{" "}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <Link href="/#" className="text-gray-400">
              Tips bóng đá
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center justify-between border-b-4 border-[#397f19] py-1 flex-wrap gap-2">
              <div className="flex items-center gap-2 font-bold">
                <div
                  className={`px-2 sm:px-4 md:px-8  py-2  text-xs md:text-sm text-center  bg-[#e5e5e5]  text-black rounded-md cursor-pointer ${
                    value === 0 ? "bg-green-700 text-white" : ""
                  }`}
                  onClick={() => setValue(0)}
                >
                  Hot
                </div>
                <div
                  className={`px-4 sm:px-4  md:px-8 py-2 text-xs md:text-sm  text-center text-black rounded-md cursor-pointer bg-[#e5e5e5] hover:bg-gray-300 ${
                    value === 1 ? "bg-green-700 text-white" : ""
                  }`}
                  onClick={() => setValue(1)}
                >
                  Trận đấu
                </div>
                <div
                  className={`px-4 sm:px-4  md:px-8 py-2 text-xs md:text-sm  text-center text-black rounded-md cursor-pointer bg-[#e5e5e5] hover:bg-gray-300 ${
                    value === 2 ? "bg-green-700 text-white" : ""
                  }`}
                  onClick={() => setValue(2)}
                >
                  Theo dõi
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="px-2 sm:px-6 md:px-8 md:py-3 py-2  text-xs md:text-sm flex items-center justify-center  text-white bg-[#f60] rounded-md cursor-pointer font-bold"
                  onClick={() => {
                    if (auth.authState) {
                      setIsOpen(true);
                    } else {
                      handleOpenLoginForm();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-1 sm:w-5 sm:h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Gửi bài
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-[10px]">
              {value === 0 && (
                <Fragment>
                  {dataHot &&
                    dataHot?.map((item: any, index: any) => {
                      return (
                        <TipNotice
                          item={item}
                          handleClickItem={handleClickItem}
                          key={item?._id}
                          comments={
                            item?.comment?.length > 0
                              ? item?.comment?.length
                              : 0
                          }
                          // date="03/05/2023"
                          group={item?.groupId?.name}
                          likes={item?.like?.length}
                          matchName={item?.content}
                          matchType="DP"
                          // subTitle=" Hạng 2 Nhật Bản"
                          time={moment(item?.createdAt).fromNow()}
                          userName={item?.title}
                          views={
                            item?.view?.length > 0 ? item?.view?.length : 0
                          }
                          winRate="3/4"
                          img={item?.createdBy?.avatar}
                          isFree={item?.isFree}
                        ></TipNotice>
                      );
                    })}
                </Fragment>
              )}
              {value === 1 && (
                <Fragment>
                  {dataMacth &&
                    dataMacth.slice(0, more).map((item: any, index: number) => {
                      return (
                        <HotMatch
                          key={index}
                          date={item?.date}
                          firstTeam={item?.awayName}
                          firstTeamImage={item?.awayIcon}
                          matchName={item?.subLeagueName}
                          secondTeam={item?.homeName}
                          secondTeamImage={item?.homeIcon}
                          time={format(item?.matchTime * 1000, "HH:mm")}
                          tips={0}
                        ></HotMatch>
                      );
                    })}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    <button
                      className="bg-[#397f19] text-white text-md py-1 px-2 rounded-md"
                      onClick={handleMore}
                    >
                      Xem thêm
                    </button>
                  </div>
                </Fragment>
              )}
              {value === 2 && (
                <Fragment>
                  {dataFollow?.length > 0 ? (
                    dataFollow.map((item: any) => {
                      return (
                        <TipNotice
                          userName={item.createdBy.email}
                          time={moment(item?.createdAt).fromNow()}
                          group={item.groupId.name}
                          likes={item.like?.length || 0}
                          views={item.view?.length || 0}
                          matchName={item.title}
                          subTitle={item.content}
                          img={item.createdBy.avatar}
                          handleClickItem={() => handleClickItem(item)}
                          key={item._id}
                          winRate={item.ratio}
                          comments={
                            item.comment?.length > 0 ? item.comment?.length : 0
                          }
                        ></TipNotice>
                      );
                    })
                  ) : (
                    <Result
                      icon={<SmileOutlined />}
                      title="Chưa có dữ liệu!"
                      // extra={<Button type="primary">Next</Button>}
                    />
                  )}
                </Fragment>
              )}
            </div>
          </div>

          <div className="col-span-12 rounded-lg md:col-span-5">
            <div className="p-4 text-black bg-white rounded-lg shadow-lg">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold text-black">Trận đấu Hot</h2>
                <span
                  className="text-gray-400 transition-all duration-300 cursor-pointer hover:text-red-500"
                  onClick={() => setValue(1)}
                >
                  Xem thêm
                </span>
              </div>
              {dataMacth &&
                dataMacth.slice(0, moreHot).map((item: any, index: number) => {
                  return (
                    <HotMatch
                      key={index}
                      date={item?.date}
                      firstTeam={item?.awayName}
                      firstTeamImage={item?.awayIcon}
                      matchName={item?.subLeagueName}
                      secondTeam={item?.homeName}
                      secondTeamImage={item?.homeIcon}
                      time={format(item?.matchTime * 1000, "HH:mm")}
                      tips={0}
                    ></HotMatch>
                  );
                })}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "10px",
                }}
              >
                <div
                  onClick={handleMoreHot}
                  style={{
                    background: "rgb(255 102 0 /1",
                    color: "white",
                    padding: "5px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Xem thêm
                </div>
              </div>
            </div>
            <div className="px-2 py-2 mt-4 bg-white rounded-lg shadow-lg md:max-w-[600px] mx-auto">
              <div>
                <div className="flex items-center justify-between pb-2 border-b"></div>
                <div className="flex items-center px-4 py-2 text-black bg-slate-400/30 gap-x-3">
                  <span
                    className={`font-bold cursor-pointer hover:text-green-500 p-2 ${
                      rankingType === "member"
                        ? "bg-green-600 text-white hover:text-white"
                        : ""
                    }`}
                    onClick={() => setRankingType("member")}
                  >
                    BXH thành viên
                  </span>
                  <span
                    className={`font-bold cursor-pointer hover:text-green-500 p-2 ${
                      rankingType === "expert"
                        ? "bg-green-600 text-white hover:text-white"
                        : ""
                    }`}
                    onClick={() => setRankingType("expert")}
                  >
                    Chuyên gia
                  </span>
                  <span
                    className={`font-bold cursor-pointer hover:text-green-500 p-2 ${
                      rankingType === "group"
                        ? "bg-green-600 text-white hover:text-white"
                        : ""
                    }`}
                    onClick={() => setRankingType("group")}
                  >
                    Nhóm
                  </span>
                </div>
                {rankingType === "member" && (
                  <Fragment>
                    <div className="flex items-center justify-center py-2 text-black bg-slate-300/40 gap-x-3">
                      <span
                        className={`font-bold cursor-pointer hover:text-green-500 ${
                          rankingMemberType === "hot" ? "text-green-500" : ""
                        }`}
                        onClick={() => setRakingMemberType("hot")}
                      >
                        Hot
                      </span>
                      <span
                        className={`font-bold cursor-pointer hover:text-green-500 ${
                          rankingMemberType === "like" ? "text-green-500" : ""
                        }`}
                        onClick={() => setRakingMemberType("like")}
                      >
                        Thích
                      </span>
                      <span
                        className={`font-bold cursor-pointer hover:text-green-500 ${
                          rankingMemberType === "follow" ? "text-green-500" : ""
                        }`}
                        onClick={() => setRakingMemberType("follow")}
                      >
                        Theo dõi
                      </span>
                    </div>
                    <div className="overflow-auto">
                      <div className="max-h-[400px]">
                        {rankingMemberType === "hot" && (
                          <Fragment>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                          </Fragment>
                        )}
                        {rankingMemberType === "like" && (
                          <Fragment>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                          </Fragment>
                        )}
                        {rankingMemberType === "follow" && (
                          <Fragment>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                            <TipsMemberRankingItem></TipsMemberRankingItem>
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}
                {rankingType === "expert" && (
                  <Fragment>
                    <TipsExpertRakingItem></TipsExpertRakingItem>
                    <TipsExpertRakingItem></TipsExpertRakingItem>
                    <TipsExpertRakingItem></TipsExpertRakingItem>
                  </Fragment>
                )}
                {rankingType === "group" &&
                  groups.map((item: any, index: number) => (
                    <Fragment key={index}>
                      <TipsGroupRankingItem
                        avatar={item.avatar}
                        key={item._id}
                        name={item.name}
                        isActive={checkElementsInArray(
                          userInfoGroup as any,
                          item._id
                        )}
                        item={item}
                        handleCreateGroup={handleCreateGroup}
                      ></TipsGroupRankingItem>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Tips.getLayout = function getLayout(page: ReactNode, listCate: any) {
  return <MainLayout>{page}</MainLayout>;
};

Tips.getInitialProps= async (ctx: GetServerSidePropsContext) => {
  const slug = 'tips'
  const result = await getCateBySlugSchema(slug)

  const params: any = {
    link: slug as string,
    // domain: process.env.NEXT_PUBLIC_DOMAIN,
  };
  
  const dataSlug = await getSeoByLink(convertObjectToQuery(params))
    
  const tags = dataSlug?.data?.tags
  return {
    schema: result.data || [],
    tags :  tags  ? tags?.map((item : any) => item?.value) : []
  }
}

export default Tips;
