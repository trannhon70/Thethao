import MainLayout from "@/Layout/MainLayout";
import { getTotalMatchByDate, getTournaments } from "@/stores/liveScore.store";
import React, { ReactNode, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { getMatchStatus } from "@/helper";
import { Collapse } from "antd";
import Link from "next/link";
const modeChange = {
  hot: 1,
  all: 2,
  live: 3,
  inComing: 4,
  end: 5,
};
const { Panel } = Collapse;
const LiveScore = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [totalMatch, setTotalMatch] = useState<any[]>([]);
  const [currentLeague, setCurrentLeague] = useState<any>();
  const [mode, setMode] = useState<number>(modeChange.all);
  const [currentModeLeague, setCurrentModeLeague] = useState<any>([]);
  const router = useRouter();
  const hotTourName = [
    "English Premier League",
    "UEFA Champions League",
    "UEFA Europa League",
    "UEFA Europa Conference League",
    "German Bundesliga",
    "Spanish La Liga",
    "Italian Serie A",
    "Southeast Asian Games",
    "V.League 1",
    "France Ligue 1",
  ];

  const getTournamentsList = async () => {
    const response = await getTournaments();
    setTournaments(response?.data);
  };
  const tourId = useMemo(() => {
    return tournaments?.map((tour) => tour.leagueId);
  }, [tournaments]);

  const hotTour = useMemo(() => {
    return tournaments?.filter((value) => hotTourName.includes(value.name));
  }, [tournaments]);
  const handleModeChange = () => {
    switch (mode) {
      case modeChange.all:
        return setCurrentModeLeague(
          tournaments?.filter((value) => tourId.includes(value.leagueId))
        );
      case modeChange.hot:
        return setCurrentModeLeague(
          tournaments?.filter((value) => hotTourName.includes(value.name))
        );
      case modeChange.inComing:
      case modeChange.live:
      case modeChange.end: {
        return setCurrentModeLeague(
          tournaments?.filter((value) => tourId.includes(value.leagueId))
        );
      }
    }
  };
  const getTotalMatchList = async () => {
    // currentDay
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    const formattedCurrentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const response = await getTotalMatchByDate(formattedCurrentDate);
    // Tomorrow
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowYear = tomorrowDate.getFullYear();
    const tomorrowMonth = String(tomorrowDate.getMonth() + 1).padStart(2, "0");
    const tomorrowDay = String(tomorrowDate.getDate()).padStart(2, "0");
    const formattedTomorrowDate = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;
    const responseTomorrow = await getTotalMatchByDate(formattedTomorrowDate);
    if (response && responseTomorrow) {
      const result = [...response?.data, ...responseTomorrow?.data];
      setTotalMatch(result as any);
    }
  };

  const handleQueryLeague = (query: string) => {
    router.push({ pathname: "/ti-so-truc-tiep", query: { name: query } });
  };

  const handleFilterCategory = (id: string) => {
    // console.log(
    //   totalMatch.filter((item: any, idx: number) => {
    //     return item.leagueId == id;
    //   })
    // );
    return totalMatch.filter((item: any, idx: number) => {
      return item.leagueId == id;
    });
  };

  const formatTime = (unixTimestamp: number) => {
    let date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const formatDate = (dateString: string) => {
    let dateParts = dateString.split("-"); // Tách chuỗi thành mảng các phần tử
    let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    return formattedDate;
  };

  const inComing = useMemo(() => {
    return totalMatch.filter((match) => match?.status === 0);
  }, [totalMatch]);

  const inLiving = useMemo(() => {
    return totalMatch.filter(
      (match) => match?.status >= 1 && match?.status <= 5
    );
  }, [totalMatch]);

  const inFinished = useMemo(() => {
    return totalMatch.filter((match) => match?.status === -1);
  }, [totalMatch]);
  const handleStatusMode = (array: any) => {
    if (mode === modeChange.inComing) {
      return inComing.filter((item: any) => array.includes(item.leagueId));
    } else if (mode === modeChange.live) {
      return inLiving.filter((item: any) => array.includes(item.leagueId));
    } else if (mode === modeChange.end) {
      return inFinished.filter((item: any) => array.includes(item.leagueId));
    } else {
      return array;
    }
  };
  // console.log(totalMatch);
  useEffect(() => {
    if (router.query.name) {
      let current =
        currentModeLeague &&
        currentModeLeague?.find((item: any) => item.name === router.query.name);
      setCurrentLeague(current);
    }
  }, [router.query.name]);

  useEffect(() => {
    getTournamentsList();
    getTotalMatchList();
  }, []);

  useEffect(() => {
    handleModeChange();
  }, [mode, tournaments]);

  const handleDirect = (value : any) => {
      router.push(`/chi-tiet-tran/${value?.matchId}`)
  }
  return (
    <div className="page-container-fluid">
      <div className="grid grid-cols-12 gap-6 mt-4">
        <div className="col-span-12 min-[890px]:col-span-3">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Giải đấu hấp dẫn</h3>
            <div className="max-h-[300px] overflow-scroll md:max-h-full">
              {hotTour?.length > 0 &&
                hotTour.map((item: any, index: number) => (
                  <div
                    className={`flex items-center gap-3 mt-4 transition-all duration-300 cursor-pointer hover:ml-4 ${
                      item.name === router.query.name
                        ? "ml-4 text-green-500"
                        : ""
                    }`}
                    key={index}
                    onClick={() => handleQueryLeague(item.name)}
                  >
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full">
                      <img
                        src={item.logo ? item.logo : item.countryLogo}
                        alt=""
                        className="object-cover w-6 h-6 rounded-full"
                      />
                    </div>
                    <div
                      className={`text-sm font-bold text-black hover:text-green-500 ${
                        item.name === router.query.name ? "text-green-500" : ""
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-span-12 p-4 rounded-lg shadow-2xl min-[890px]:col-span-9">
          <h2 className="text-lg font-bold">Danh sách trận cầu</h2>
          {!router.query.name && (
            <div className="flex items-center gap-1 mt-3 font-bold md:gap-3">
              <div
                className={`text-sm pr-3 text-center  cursor-pointer sm:text-base hover:text-black md:text-base ${
                  mode === modeChange.all ? "text-black" : "text-gray-300"
                }`}
                onClick={() => setMode(modeChange.all)}
              >
                Tất cả
              </div>
              <div
                className={`text-sm pr-3 text-center  cursor-pointer sm:text-base hover:text-black md:text-base ${
                  mode === modeChange.hot ? "text-black" : "text-gray-300"
                }`}
                onClick={() => setMode(modeChange.hot)}
              >
                Hot
              </div>
              <div
                className={`text-sm pr-3 text-center  cursor-pointer sm:text-sm hover:text-black md:text-base ${
                  mode === modeChange.live ? "text-black" : "text-gray-300"
                }`}
                onClick={() => setMode(modeChange.live)}
              >
                Trực tiếp
              </div>
              <div
                className={`text-sm pr-3 text-center  cursor-pointer sm:text-sm hover:text-black md:text-base ${
                  mode === modeChange.inComing ? "text-black" : "text-gray-300"
                }`}
                onClick={() => setMode(modeChange.inComing)}
              >
                Sắp diễn ra
              </div>
              <div
                className={`text-sm pr-3 text-center  cursor-pointer sm:text-sm hover:text-black md:text-base ${
                  mode === modeChange.end ? "text-black" : "text-gray-300"
                }`}
                onClick={() => setMode(modeChange.end)}
              >
                Đã kết thúc
              </div>
            </div>
          )}
          <div className="mt-3">
            {/* {currentModeLeague.length == 0 && (
                <button type="button" className="bg-indigo-500 ..." disabled>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                  />
                  Processing...
                </button>
              )} */}
            {currentModeLeague?.length <= 0 && (
              <div className="flex items-center justify-center mt-10">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            )}
            {!router.query.name &&
              currentModeLeague?.length > 0 &&
              currentModeLeague?.slice(0, 5).map((item: any, index: number) => (
                <Collapse
                  size="small"
                  key={index}
                  defaultActiveKey={["0", "1", "2"]}
                >
                  <Panel
                    header={
                      <div className="grid items-center grid-cols-12 gap-2 px-5 rounded-lg cursor-pointer bg-gray-100/80">
                        <div className="flex items-center col-span-12 min-[540px]:col-span-7">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="flex-shrink-0 w-8 h-8"
                          />
                          <p className="text-sm font-bold text-gray-400 ">
                            {item.country} <span>{item.name}</span>
                          </p>
                        </div>
                        <div className="items-center justify-around hidden col-span-2 gap-3 mr-3 font-bold sm:flex">
                          <span>1</span>
                          <span>X</span>
                          <span>2</span>
                        </div>
                        <div className="hidden min-[540px]:block min-[540px]:col-span-4 font-bold text-center sm:col-span-2">
                          Options
                        </div>
                      </div>
                    }
                    key={index}
                  >
                    {handleFilterCategory(item.leagueId).length > 0 ? (
                      handleStatusMode(handleFilterCategory(item.leagueId))
                        ?.slice(0, 5)
                        ?.map((item: any, index: number) => (
                          <div
                            className="grid items-center grid-cols-12 gap-2 px-5 py-3 mt-2 transition-all duration-300 border-2 rounded-lg cursor-pointer first:mt-0 hover:bg-gray-100/50"
                            key={item._id}
                          >
                            <div className="flex items-center justify-center col-span-12 gap-2 text-base font-bold">
                              <div>{formatTime(item.matchTime)}</div>
                              <div>{formatDate(item.date)}</div>
                              <span className="mx-2 text-red-600">
                                {getMatchStatus(item.status)}
                              </span>
                              {!(item.status === 0 || item.status <= -10) && (
                                <span className="text-sm">90+ ' </span>
                              )}
                            </div>
                            <div className="flex items-center col-span-12 justify-center min-[540px]:col-span-7 py-2">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center text-sm font-semibold">
                                  <div className="w-[100px] text-center">
                                    {item.homeName}
                                  </div>
                                  <img
                                    src={item.homeIcon}
                                    alt=""
                                    className="object-cover w-8 h-8 ml-2 sm:h-10 sm:w-10"
                                  />
                                </div>
                                <div className="flex items-center gap-2 font-bold">
                                  <span className="text-red-500">
                                    {item.homeScore}
                                  </span>
                                  <span className="text-red-500">-</span>
                                  <span className="text-red-500">
                                    {item.awayScore}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm font-semibold">
                                  <img
                                    src={item.awayIcon}
                                    alt=""
                                    className="object-cover w-8 h-8 mr-2 sm:h-10 sm:w-10"
                                  />
                                  <div className="w-[100px] text-center">
                                    {item.awayName}
                                  </div>
                                </div>
                                <div className="items-center hidden ml-3 text-sm xl:flex">
                                  <div className="font-bold">HT</div>
                                  <span className="ml-1 font-bold">
                                    {item.homeHalfScore} - {item.awayHalfScore}
                                  </span>
                                </div>
                                <div className="items-center hidden ml-2 text-sm xl:flex">
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
                                      d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                    />
                                  </svg>
                                  <span className="ml-1 font-bold">
                                    {item.homeCorner} - {item.awayCorner}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="items-center justify-around hidden col-span-2 gap-3 font-bold sm:flex">
                              <span>1.33</span>
                              <span>X</span>
                              <span>2.33</span>
                            </div>

                            <div className="flex items-center justify-center col-span-12 gap-2 font-bold text-center min-[540px]:col-span-5 sm:col-span-3">
                              <button
                                className="transition-shadow rounded-full hover:shadow-red-500 hover:shadow-sm"
                                title="Live"
                                onClick={() =>handleDirect(item)}
                              >
                                <svg
                                  width={25}
                                  height={24}
                                  viewBox="0 0 25 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    opacity="0.2"
                                    d="M12.1113 3C10.3313 3 8.59124 3.52784 7.1112 4.51677C5.63116 5.50571 4.47761 6.91131 3.79642 8.55585C3.11523 10.2004 2.937 12.01 3.28426 13.7558C3.63153 15.5016 4.4887 17.1053 5.74737 18.364C7.00604 19.6226 8.60969 20.4798 10.3555 20.8271C12.1013 21.1743 13.9109 20.9961 15.5555 20.3149C17.2 19.6337 18.6056 18.4802 19.5946 17.0001C20.5835 15.5201 21.1113 13.78 21.1113 12C21.1113 9.61305 20.1631 7.32387 18.4753 5.63604C16.7875 3.94821 14.4983 3 12.1113 3ZM10.6113 15V9L15.1113 12L10.6113 15Z"
                                    fill="#E62F2B"
                                  />
                                  <path
                                    d="M12.1113 2.25C10.183 2.25 8.2979 2.82183 6.69452 3.89317C5.09114 4.96451 3.84146 6.48726 3.10351 8.26884C2.36555 10.0504 2.17247 12.0108 2.54868 13.9021C2.92488 15.7934 3.85348 17.5307 5.21704 18.8943C6.5806 20.2579 8.31789 21.1865 10.2092 21.5627C12.1005 21.9389 14.0609 21.7458 15.8425 21.0078C17.6241 20.2699 19.1468 19.0202 20.2182 17.4168C21.2895 15.8134 21.8613 13.9284 21.8613 12C21.8586 9.41498 20.8305 6.93661 19.0026 5.10872C17.1747 3.28084 14.6964 2.25273 12.1113 2.25ZM12.1113 20.25C10.4796 20.25 8.88458 19.7661 7.52788 18.8596C6.17117 17.9531 5.11375 16.6646 4.48933 15.1571C3.8649 13.6496 3.70153 11.9908 4.01985 10.3905C4.33818 8.79016 5.12392 7.32015 6.2777 6.16637C7.43148 5.01259 8.90149 4.22685 10.5018 3.90852C12.1022 3.59019 13.761 3.75357 15.2685 4.37799C16.776 5.00242 18.0644 6.05984 18.971 7.41655C19.8775 8.77325 20.3613 10.3683 20.3613 12C20.3589 14.1873 19.4889 16.2843 17.9422 17.8309C16.3956 19.3775 14.2986 20.2475 12.1113 20.25ZM15.5276 11.3756L11.0276 8.37562C10.9146 8.30025 10.7833 8.25696 10.6476 8.25039C10.512 8.24382 10.3771 8.27421 10.2573 8.33831C10.1376 8.40241 10.0375 8.49782 9.96778 8.61436C9.89804 8.7309 9.86124 8.86419 9.86133 9V15C9.86124 15.1358 9.89804 15.2691 9.96778 15.3856C10.0375 15.5022 10.1376 15.5976 10.2573 15.6617C10.3771 15.7258 10.512 15.7562 10.6476 15.7496C10.7833 15.743 10.9146 15.6998 11.0276 15.6244L15.5276 12.6244C15.6305 12.5559 15.7148 12.4631 15.7732 12.3542C15.8315 12.2452 15.8621 12.1236 15.8621 12C15.8621 11.8764 15.8315 11.7548 15.7732 11.6458C15.7148 11.5369 15.6305 11.4441 15.5276 11.3756ZM11.3613 13.5984V10.4062L13.7595 12L11.3613 13.5984Z"
                                    fill="#E62F2B"
                                  />
                                </svg>
                              </button>
                              <Link
                                title="Phân tích"
                                href={`/chi-tiet-tran/${item.matchId}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="#888888"
                                  className="w-5 h-5 text-gray-500"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Link>
                              <Link
                                title="So sánh"
                                href={`/chi-tiet-tran/${item.matchId}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="#888888"
                                  className="w-5 h-5 text-gray-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                                  />
                                </svg>
                              </Link>
                              <Link
                                title="Chi tiết"
                                href={`/chi-tiet-tran/${item.matchId}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="#888888"
                                  className="w-5 h-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="font-bold text-center">
                        Không có dữ liệu
                      </div>
                    )}
                  </Panel>
                </Collapse>
              ))}
            {router.query.name && currentLeague && (
              <Collapse size="small" defaultActiveKey={["1"]}>
                <Panel
                  key={"1"}
                  header={
                    <div className="grid items-center grid-cols-12 gap-2 px-5 rounded-lg cursor-pointer bg-gray-100/80">
                      <div className="flex items-center col-span-12 min-[540px]:col-span-7">
                        <img
                          src={currentLeague.logo}
                          alt={currentLeague.name}
                          className="flex-shrink-0 w-8 h-8"
                        />
                        <p className="text-sm font-bold text-gray-400">
                          {currentLeague.country}
                          <span>{currentLeague.name}</span>
                        </p>
                      </div>

                      <div className="items-center justify-around hidden col-span-2 gap-3 mr-3 font-bold sm:flex">
                        <span>1</span>
                        <span>X</span>
                        <span>2</span>
                      </div>
                      <div className="hidden min-[540px]:block min-[540px]:col-span-4 font-bold text-center sm:col-span-2">
                        Options
                      </div>
                    </div>
                  }
                >
                  {handleFilterCategory(currentLeague.leagueId).length > 0 ? (
                    handleFilterCategory(currentLeague.leagueId).map(
                      (item: any, index) => (
                        <div
                          className="grid items-center grid-cols-12 gap-2 px-5 py-3 mt-2 transition-all duration-300 border-2 rounded-lg cursor-pointer first:mt-0 hover:bg-gray-100/50"
                          key={item._id}
                        >
                          <div className="flex items-center justify-center col-span-12 gap-2 text-base font-bold">
                            <div>{formatTime(item.matchTime)}</div>
                            <div>{formatDate(item.date)}</div>
                            <span className="mx-2 text-sm text-red-600">
                              {getMatchStatus(item.status)}
                            </span>
                            {!(item.status === 0 || item.status <= -10) && (
                              <span className="text-sm">90+ ' </span>
                            )}
                          </div>
                          <div className="flex items-center col-span-12 justify-center min-[540px]:col-span-7 py-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center text-sm font-semibold">
                                <div className="w-[100px] text-center">
                                  {item.homeName}
                                </div>
                                <img
                                  src={item.homeIcon}
                                  alt=""
                                  className="object-cover w-8 h-8 ml-2 sm:h-10 sm:w-10"
                                />
                              </div>
                              <div className="flex items-center gap-2 font-bold">
                                <span className="text-red-500">
                                  {item.homeScore}
                                </span>
                                <span className="text-red-500">-</span>
                                <span className="text-red-500">
                                  {item.awayScore}
                                </span>
                              </div>
                              <div className="flex items-center text-sm font-semibold">
                                <img
                                  src={item.awayIcon}
                                  alt=""
                                  className="object-cover w-8 h-8 mr-2 sm:h-10 sm:w-10"
                                />
                                <div className="w-[100px] text-center">
                                  {item.awayName}
                                </div>
                              </div>
                              <div className="items-center hidden ml-3 text-sm xl:flex">
                                <div className="font-bold">HT</div>
                                <span className="ml-1 font-bold">
                                  {item.homeHalfScore} - {item.awayHalfScore}
                                </span>
                              </div>
                              <div className="items-center hidden ml-2 text-sm xl:flex ">
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
                                    d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                  />
                                </svg>
                                <span className="ml-1 font-bold">
                                  {item.homeCorner} - {item.awayCorner}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="items-center justify-around hidden col-span-2 gap-3 font-bold sm:flex">
                            <span>1.33</span>
                            <span>X</span>
                            <span>2.33</span>
                          </div>

                          <div className="flex items-center justify-center col-span-12 gap-2 font-bold text-center min-[540px]:col-span-5 sm:col-span-3">
                            <button
                              className="transition-shadow rounded-full hover:shadow-red-500 hover:shadow-sm"
                              title="Live"
                            >
                              <svg
                                width={25}
                                height={24}
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.2"
                                  d="M12.1113 3C10.3313 3 8.59124 3.52784 7.1112 4.51677C5.63116 5.50571 4.47761 6.91131 3.79642 8.55585C3.11523 10.2004 2.937 12.01 3.28426 13.7558C3.63153 15.5016 4.4887 17.1053 5.74737 18.364C7.00604 19.6226 8.60969 20.4798 10.3555 20.8271C12.1013 21.1743 13.9109 20.9961 15.5555 20.3149C17.2 19.6337 18.6056 18.4802 19.5946 17.0001C20.5835 15.5201 21.1113 13.78 21.1113 12C21.1113 9.61305 20.1631 7.32387 18.4753 5.63604C16.7875 3.94821 14.4983 3 12.1113 3ZM10.6113 15V9L15.1113 12L10.6113 15Z"
                                  fill="#E62F2B"
                                />
                                <path
                                  d="M12.1113 2.25C10.183 2.25 8.2979 2.82183 6.69452 3.89317C5.09114 4.96451 3.84146 6.48726 3.10351 8.26884C2.36555 10.0504 2.17247 12.0108 2.54868 13.9021C2.92488 15.7934 3.85348 17.5307 5.21704 18.8943C6.5806 20.2579 8.31789 21.1865 10.2092 21.5627C12.1005 21.9389 14.0609 21.7458 15.8425 21.0078C17.6241 20.2699 19.1468 19.0202 20.2182 17.4168C21.2895 15.8134 21.8613 13.9284 21.8613 12C21.8586 9.41498 20.8305 6.93661 19.0026 5.10872C17.1747 3.28084 14.6964 2.25273 12.1113 2.25ZM12.1113 20.25C10.4796 20.25 8.88458 19.7661 7.52788 18.8596C6.17117 17.9531 5.11375 16.6646 4.48933 15.1571C3.8649 13.6496 3.70153 11.9908 4.01985 10.3905C4.33818 8.79016 5.12392 7.32015 6.2777 6.16637C7.43148 5.01259 8.90149 4.22685 10.5018 3.90852C12.1022 3.59019 13.761 3.75357 15.2685 4.37799C16.776 5.00242 18.0644 6.05984 18.971 7.41655C19.8775 8.77325 20.3613 10.3683 20.3613 12C20.3589 14.1873 19.4889 16.2843 17.9422 17.8309C16.3956 19.3775 14.2986 20.2475 12.1113 20.25ZM15.5276 11.3756L11.0276 8.37562C10.9146 8.30025 10.7833 8.25696 10.6476 8.25039C10.512 8.24382 10.3771 8.27421 10.2573 8.33831C10.1376 8.40241 10.0375 8.49782 9.96778 8.61436C9.89804 8.7309 9.86124 8.86419 9.86133 9V15C9.86124 15.1358 9.89804 15.2691 9.96778 15.3856C10.0375 15.5022 10.1376 15.5976 10.2573 15.6617C10.3771 15.7258 10.512 15.7562 10.6476 15.7496C10.7833 15.743 10.9146 15.6998 11.0276 15.6244L15.5276 12.6244C15.6305 12.5559 15.7148 12.4631 15.7732 12.3542C15.8315 12.2452 15.8621 12.1236 15.8621 12C15.8621 11.8764 15.8315 11.7548 15.7732 11.6458C15.7148 11.5369 15.6305 11.4441 15.5276 11.3756ZM11.3613 13.5984V10.4062L13.7595 12L11.3613 13.5984Z"
                                  fill="#E62F2B"
                                />
                              </svg>
                            </button>
                            <Link
                              title="Phân tích"
                              href={`/chi-tiet-tran/${item.matchId}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#888888"
                                className="w-5 h-5 text-gray-500"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Link>
                            <Link
                              title="So sánh"
                              href={`/chi-tiet-tran/${item.matchId}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#888888"
                                className="w-5 h-5 text-gray-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                                />
                              </svg>
                            </Link>
                            <Link
                              title="Chi tiết"
                              href={`/chi-tiet-tran/${item.matchId}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#888888"
                                className="w-5 h-5"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="font-bold text-center">
                      Không có dữ liệu
                    </div>
                  )}
                </Panel>
              </Collapse>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

LiveScore.getLayout = function getLayout(page: ReactNode, listCate: any) {
  return <MainLayout>{page}</MainLayout>;
};
export default LiveScore;
