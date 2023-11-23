/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";

import DetailMatch from "@/components/DetailMatch/DetailMatch";
// import AnaLysisPage from "../../../app/project/analysis/Analysis";
// import CompareOdds from "../../../app/project/CompareOdds/CompareOdds";
import {
  getEventByMatchId,
  getScheduleAndResultByMatchId,
  getStatsByMatchId,
  getmatchAnalysis,
} from "@/stores/calendar.stores";

import { getMatchStatus } from "@/helper";
import { isDisplayScore } from "@/helper";
import findMatchData from "@/helper/matchAnalyticsHelper";
import moment from "moment";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import MainLayout from "@/Layout/MainLayout";
import { ReactNode } from "react";
import AnalysisPage from "@/components/analysis/Analysis";
import CompareOdds from "@/components/CompareOdds/CompareOdds";
import OddsTable from "@/components/CompareOdds/OddsTable";

const ChiTietTranDau = ({
  slug,
  keyword,
  description,
  result,
  matchAnalysis,
  events,
  stats,
}: {
  slug: string;
  keyword: string;
  description: string;
  result: any;
  matchAnalysis: any;
  events: any;
  stats: any;
}) => {
  const router = useRouter();

  const [menu, setMenu] = useState(1);
  const convertDays = [
    "Chủ Nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const getMenu = () => {
    if (router.query["chi-tiet"] === "") {
      setMenu(1);
    }
    if (router.query["phan-tich"] === "") {
      setMenu(2);
    }
    if (router.query["so-sanh-tl"] === "") {
      setMenu(3);
    }
  };
  useEffect(() => {
    getMenu();
  }, [router?.query?.pid]);
  const matchTime = new Date(result.matchTime * 1000);
  return (
    <div className="page-container">
      <div className="body">
        <div className="my-8 menu-details-match-result">
          <p className="league-name-and-time">
            <span className="menu-detail-league-name">
              {result?.leagueShortName}
            </span>
            {`${matchTime.getDate()}/${(
              "0" +
              (matchTime.getMonth() + 1)
            ).substring(-2)}/${matchTime.getFullYear()}`}{" "}
            {`${matchTime.getHours()}:${matchTime.getMinutes()}`}{" "}
            {`${convertDays[matchTime.getDay()]}`}
          </p>
          <div className="match-result-versus">
            <div className="match-result-home-logo">
              <img
                style={{ width: "90px" }}
                alt={result.homeName}
                src={result.homeIcon ? result.homeIcon : "/images/no-logo.png"}
                // src={`${result?.homeIcon}`}
              />
            </div>
            <div className="match-result-vs-detail">
              <div className="match-result-vs-detail-homename">
                <p>{result.homeName}</p>
              </div>
              <div className="match-result-vs-datail-result">
                <p>
                  {isDisplayScore(result.status) && (
                    <span className="match-result-vs-datail-result-score">
                      {result.homeScore}
                    </span>
                  )}
                  {result.status == 0 ? (
                    <span className="match-result-vs-datail-result-score">
                      VS
                    </span>
                  ) : (
                    <span className="match-result-vs-datail-result-status">
                      {getMatchStatus(result.status)}
                    </span>
                  )}
                  {isDisplayScore(result.status) && (
                    <span className="match-result-vs-datail-result-score">
                      {result.awayScore}
                    </span>
                  )}
                </p>
              </div>
              <div className="match-result-vs-detail-awayname">
                <p>{result.awayName}</p>
              </div>
            </div>
            <div className="match-result-away-logo">
              <img
                style={{ width: "90px" }}
                alt={result.awayName}
                src={result.awayIcon ? result.awayIcon : "/images/no-logo.png"}
              />
            </div>
          </div>
        </div>
        <div className="menu-details-match">
          {/* <button
            className={menu === 0 ? "menu-hover" : ""}
            onClick={() => setMenu(0)}
          >
            Tips
          </button> */}
          <button
            className={menu === 1 ? "menu-hover" : ""}
            onClick={() => {
              router.push({
                pathname: `/chi-tiet-tran/${router.query?.pid}`,
                query: "chi-tiet",
              });
              setMenu(1);
            }}
          >
            Chi Tiết
          </button>
          <button
            className={menu === 2 ? "menu-hover" : ""}
            onClick={() => {
              router.push({
                pathname: `/chi-tiet-tran/${router.query?.pid}`,
                query: "phan-tich",
              });
              setMenu(2);
            }}
          >
            Phân Tích
          </button>
          <button
            className={menu === 3 ? "menu-hover" : ""}
            onClick={() => {
              router.push({
                pathname: `/chi-tiet-tran/${router.query?.pid}`,
                query: "so-sanh-tl",
              });
              setMenu(3);
            }}
          >
            So Sánh TL
          </button>
        </div>
        <div className="details-match">
          {menu === 1 && (
            <DetailMatch
              matchAnalysis={matchAnalysis}
              match={result}
              events={events}
              stats={stats}
            />
          )}
          {menu === 2 && (
            <AnalysisPage matchAnalysis={matchAnalysis} match={result} />
          )}
          {menu === 3 && (
            <>
              <CompareOdds match={result} />
              <OddsTable />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const keyword = ["chi tiet tran", "Chi tiet tran dau", "chi tiết trận đấu"];
  const description = "Chi tiết trận đấu";
  const slug = "chi-tiet-tran";
  const id = Number(params?.pid);
  const [result, matchAnalysis, stats] = await Promise.all([
    getScheduleAndResultByMatchId(id),
    getmatchAnalysis(id),
    getStatsByMatchId(id),
  ]);
  const date = moment(new Date(result?.matchTime * 1000))
    .utcOffset(0)
    .format("YYYY-MM-DD");
  const events = await getEventByMatchId(id, date);
  const returnMatchAnalysis = findMatchData(matchAnalysis, result);
  return {
    props: {
      result: result || {},
      matchAnalysis: returnMatchAnalysis || {},
      slug,
      keyword,
      description,
      events: events || {},
      stats: stats || {},
    },
  };
};

ChiTietTranDau.getLayout = function getLayout(page: ReactNode, listCate: any) {
  return <MainLayout>{page}</MainLayout>;
};

export default ChiTietTranDau;
