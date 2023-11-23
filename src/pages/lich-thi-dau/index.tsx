import Link from "next/link";
import styles from "@/styles/lichthidau/index.module.scss";
import React, { useEffect, useRef, useState } from "react";
import {
  getListLeague,
  getScheduleAndResultByDate,
} from "@/stores/calendar.stores";
import { getMatchStatus } from "@/helper";
import { GetServerSidePropsContext } from "next";
import MainLayout from "@/Layout/MainLayout";
import { ReactNode } from "react";
import moment from "moment";
import { Spin, Tooltip } from "antd";
import {
  convertObjectToQuery,
  getCateBySlugSchema,
  getSeoByLink,
} from "@/stores/categories.stores";
import Head from "next/head";
import parse from "html-react-parser";
import Script from "next/script";

const LichThiDau = ({
  date,
  slug,
  tags,
}: {
  date: string;
  slug: any;
  tags: any;
}) => {
  const [listLeague, setListLeague] = useState([]);
  const [listMatch, setListMatch] = useState([]);

  const getLeagues = async () => {
    try {
      const listLeague = await getListLeague();
      setListLeague(listLeague);
    } catch (error) {
      console.log(error);
    }
  };

  const getMatches = async () => {
    try {
      const match = await getScheduleAndResultByDate(date);
      setListMatch(match);
    } catch (error) {
      console.log(error);
    }
  };

  const convertDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const get15DaysArray = () => {
    const arrayDate = [];

    for (let i = 7; i > 0; i--) {
      const thisDate = new Date();
      arrayDate.push(new Date(thisDate.setDate(thisDate.getDate() - i)));
    }
    arrayDate.push(new Date());
    for (let i = 1; i <= 7; i++) {
      const thisDate = new Date();
      arrayDate.push(new Date(thisDate.setDate(thisDate.getDate() + i)));
    }

    return arrayDate;
  };

  const mergeMatchesAndLeagues = () => {
    return listLeague?.map((item: any) => {
      item.matchToDay = listMatch?.filter((match: any) => {
        return match.leagueId == item.leagueId;
      });
      return item;
    });
  };

  useEffect(() => {
    if (document.getElementById("icon-category")) {
      //@ts-ignore
      document.getElementById("icon-category").style.rotate = "180deg";
    }
    getLeagues();
    getMatches();
  }, [date]);

  return (
    <>
      <Head>
        {tags?.map((tag: any, index: any) => (
          <React.Fragment key={index}>{parse(tag)}</React.Fragment>
        ))}
      </Head>
      {slug?.map((tag: any, index: any) => (
        <Script
          id="globalSchema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${tag.script}`,
          }}
        />
      ))}

      <div className={styles.calendar}>
        <div className={styles.calendarWrapper}>
          <div className={styles.calendarContent}>
            <div className={styles.calendarContentNavbar}>
              <ul>
                {get15DaysArray().map((item, index) => (
                  <Link
                    key={index}
                    href={`/lich-thi-dau?date=${moment(item).format(
                      "YYYY-MM-DD"
                    )}`}
                  >
                    <li
                      style={
                        new Date(date).getDate() == item.getDate()
                          ? {
                              background: "#f60",
                              color: "white",
                              boxShadow: "0 1px 5px 0 rgb(144 87 0 / 25%)",
                            }
                          : {}
                      }
                    >
                      <p>{convertDays[moment(item).day()]}</p>
                      <p>{moment(item).date()}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className={styles.calendarOption}>
              <ul>
                <li
                  style={{
                    backgroundColor: "#3d980a",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  Tất cả
                </li>
              </ul>
            </div>
            <div className={styles.calendarTable}>
              <Spin tip="Loading..." spinning={listMatch?.length === 0}>
                <table
                  style={{
                    overflowX: "auto",
                    minWidth: "700px",
                    fontSize: "16px",
                  }}
                >
                  <thead>
                    <tr>
                      <td style={{ fontSize: "18px" }} width={"9%"}>
                        Giờ
                      </td>
                      <td style={{ fontSize: "18px" }} width={"8%"}>
                        TT
                      </td>
                      <td
                        style={{
                          textAlign: "end",
                          paddingRight: "25px",
                          fontSize: "18px",
                        }}
                        width={"23%"}
                      >
                        Chủ
                      </td>
                      <td
                        width={"10%"}
                        style={{ textAlign: "center", fontSize: "18px" }}
                      >
                        Tỷ số
                      </td>
                      <td width={"23%"} style={{ fontSize: "18px" }}>
                        Khách
                      </td>
                      <td
                        width={"9%"}
                        style={{ fontSize: "18px" }}
                        className="hidden md:flex"
                      >
                        Phạt góc
                      </td>
                      <td width={"10%"} style={{ fontSize: "18px" }}>
                        Dữ liệu
                      </td>
                    </tr>
                  </thead>

                  <tbody>
                    {mergeMatchesAndLeagues()
                      ?.filter((item: any) => item.matchToDay?.length > 0)
                      ?.map((item: any) => {
                        return (
                          <>
                            <tr style={{ backgroundColor: "#e5e5e5" }}>
                              <td
                                colSpan={8}
                                style={{ fontWeight: "bold", fontSize: "17px" }}
                              >
                                {item?.shortName}
                              </td>
                            </tr>
                            {item.matchToDay?.map(
                              (item: any, index: number) => {
                                return (
                                  <tr key={index}>
                                    <td style={{ fontSize: "16px" }}>
                                      {moment(item.matchTime * 1000).format(
                                        "HH:mm"
                                      )}
                                    </td>
                                    <td style={{ fontSize: "18px" }}>
                                      {getMatchStatus(item.status)}
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "end",
                                        // paddingRight: "25px",
                                        fontSize: "16px",
                                      }}
                                    >
                                      {item.status > 0 ||
                                        (item.status == -1 &&
                                          item.homeRed > 0 && (
                                            <span className={styles.redCard}>
                                              {item.homeRed}
                                            </span>
                                          ))}
                                      {item.status > 0 ||
                                        (item.status == -1 && (
                                          <span className={styles.yellowCard}>
                                            {item.homeYellow}
                                          </span>
                                        ))}
                                      {item.homeName}
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "center",
                                        fontSize: "16px",
                                      }}
                                    >
                                      {item.status > 0 || item.status == -1
                                        ? `${item.homeScore} - ${item.awayScore}`
                                        : `-`}
                                    </td>
                                    <td style={{ fontSize: "16px" }}>
                                      {item.awayName}
                                      {item.status > 0 ||
                                        (item.status == -1 && (
                                          <span className={styles.yellowCard}>
                                            {item.awayYellow}
                                          </span>
                                        ))}
                                      {item.status > 0 ||
                                        (item.status == -1 &&
                                          item.awayRed > 0 && (
                                            <span className={styles.redCard}>
                                              {item.awayRed}
                                            </span>
                                          ))}
                                    </td>
                                    <td
                                      style={{ fontSize: "16px" }}
                                      className="hidden md:block"
                                    >
                                      <div>
                                        {" "}
                                        {item.homeCorner} - {item.awayCorner}
                                      </div>
                                    </td>
                                    <td
                                      style={{
                                        fontSize: "16px",
                                      }}
                                    >
                                      <div className="flex">
                                        <Link
                                          href={`/chi-tiet-tran/${item.matchId}`}
                                        >
                                          <Tooltip title="Phân tích">
                                            <img
                                              style={{
                                                width: "20px",
                                                padding: "0 2px",
                                              }}
                                              src="/images/analysis.png"
                                            />
                                          </Tooltip>
                                        </Link>
                                        <Link
                                          href={`/chi-tiet-tran/${item.matchId}`}
                                        >
                                          <Tooltip title="So sánh TL">
                                            <img
                                              style={{
                                                width: "20px",
                                                padding: "0 2px",
                                              }}
                                              src="/images/odds.png"
                                            />
                                          </Tooltip>
                                        </Link>
                                        <Link
                                          href={`/chi-tiet-tran/${item.matchId}`}
                                        >
                                          <Tooltip title="Chi tiết">
                                            <img
                                              style={{
                                                width: "22px",
                                                padding: "0 2px",
                                              }}
                                              src="/images/t5.png"
                                            />
                                          </Tooltip>
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </Spin>
            </div>
          </div>
          {/* <div className={styles.calendarSidebarRight}>
          <Input
            placeholder="Giải đấu/đội bóng"
            style={{ borderRadius: "8px" }}
            prefix={<BiSearch />}
            type="text"
            value={search}
            onChange={(e) => handleChangeSearch(e.target.value)}
          />
        </div> */}
        </div>
      </div>
    </>
  );
};

export default LichThiDau;

LichThiDau.getLayout = function getLayout(page: ReactNode, listCate: any) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const slug = "lich-thi-dau";
  const result = await getCateBySlugSchema(slug);
  const params: any = {
    link: slug as string,
    // domain: process.env.NEXT_PUBLIC_DOMAIN,
  };

  const dataSlug = await getSeoByLink(convertObjectToQuery(params));

  const tags = dataSlug?.data?.tags;

  return {
    props: {
      date: ctx.query.date || moment(new Date()).format("YYYY-MM-DD"),
      slug: result?.data || [],
      tags: tags ? tags?.map((item: any) => item?.value) : [],
    },
  };
}
