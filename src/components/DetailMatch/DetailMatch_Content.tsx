import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function avg(data: any, count: number, name: string, key: number) {
  let countTotal = 0;
  data.map((item: any, index: number) => {
    if (index < count) {
      if (item[name]?.[key]) {
        countTotal = countTotal + parseInt(item[name]?.[key]);
      }
    }
  });
  if (!countTotal) {
    return 0;
  }
  const result = countTotal / count;
  if (result % 1 === 0) return result.toString();
  return result.toFixed(1).toString();
}
export default function DetailMatch_Content({
  matchAnalysis,
}: {
  matchAnalysis: any;
}) {
  const getHomeLast3MatchStats = () => {
    let goal = 0;
    let lose = 0;
    let corner = 0;
    let red = 0;
    matchAnalysis?.homeLastMatches?.slice(0, 4).forEach((item: any) => {
      if (!item.isHome) {
        goal += Number(item.away?.scoreAway || 0);
        corner += Number(item.away?.awayCorner || 0);
        lose += Number(item.home?.scoreHome || 0);
        red += Number(item.awayRed || 0);
      } else {
        goal += Number(item.away?.scoreHome || 0);
        corner += Number(item.corner?.homeCorner || 0);
        lose += Number(item.away?.scoreAway || 0);
        red += Number(item.homeRed || 0);
      }
    });
    return {
      goal,
      lose,
      red,
      corner,
    };
  };

  const getHomeLast10Match = () => {
    let goal = 0;
    let lose = 0;
    let corner = 0;
    let red = 0;
    matchAnalysis?.homeLastMatches?.slice(0, 11).forEach((item: any) => {
      if (!item.isHome) {
        goal += Number(item.away?.scoreAway || 0);
        corner += Number(item.away?.awayCorner || 0);
        lose += Number(item.home?.scoreHome || 0);
        red += Number(item.awayRed || 0);
      } else {
        goal += Number(item.away?.scoreHome || 0);
        corner += Number(item.corner?.homeCorner || 0);
        lose += Number(item.away?.scoreAway || 0);
        red += Number(item.homeRed || 0);
      }
    });
    return {
      goal,
      lose,
      red,
      corner,
    };
  };

  const getAwayLast3Match = () => {
    let goal = 0;
    let lose = 0;
    let corner = 0;
    let red = 0;
    matchAnalysis?.awayLastMatches?.slice(0, 3).forEach((item: any) => {
      if (!item.isHome) {
        goal += Number(item.away?.scoreAway || 0);
        corner += Number(item.away?.awayCorner || 0);
        lose += Number(item.home?.scoreHome || 0);
        red += Number(item.awayRed || 0);
      } else {
        goal += Number(item.away?.scoreHome || 0);
        corner += Number(item.corner?.homeCorner || 0);
        lose += Number(item.away?.scoreAway || 0);
        red += Number(item.homeRed || 0);
      }
    });
    return {
      goal,
      lose,
      red,
      corner,
    };
  };

  const getAwayLast10Match = () => {
    let goal = 0;
    let lose = 0;
    let corner = 0;
    let red = 0;
    matchAnalysis?.awayLastMatches?.slice(0, 11).forEach((item: any) => {
      if (!item.isHome) {
        goal += Number(item.away?.scoreAway || 0);
        corner += Number(item.away?.awayCorner || 0);
        lose += Number(item.home?.scoreHome || 0);
        red += Number(item.awayRed || 0);
      } else {
        goal += Number(item.away?.scoreHome || 0);
        corner += Number(item.corner?.homeCorner || 0);
        lose += Number(item.away?.scoreAway || 0);
        red += Number(item.homeRed || 0);
      }
    });
    return {
      goal,
      lose,
      red,
      corner,
    };
  };

  return (
    <div
      className="w-full content"
      style={{ backgroundColor: "white", padding: "20px 6px" }}
    >
      <div>
        <h2 className="team-table-title">Dữ liệu đội bóng</h2>
        <div className="team-h1">
          <span className="home-bg"></span>
          <span className="away-bg"></span>
        </div>
        <table
          style={{ overflow: "auto" }}
          className="team-table-other"
          width="100%"
        >
          <tbody>
            <tr>
              <th>Chủ</th>
              <th>3 trận gần nhất</th>
              <th>Khách</th>
              <th>Chủ</th>
              <th>10 trận gần nhất</th>
              <th>Khách</th>
            </tr>

            <tr>
              <td
              // className={`${
              //   data3MatchLast[item].home > data3MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getHomeLast3MatchStats().goal}
              </td>
              <td>
                <b>{`Bàn thắng`}</b>
              </td>
              <td
              // className={`${
              //   data3MatchLast[item].home < data3MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getAwayLast3Match().goal}
              </td>
              <td
              // className={`${
              //   data10MatchLast[item].home > data10MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getHomeLast10Match().goal}
              </td>
              <td>
                <b>{`Bàn thắng`}</b>
              </td>
              <td
              // className={`${
              //   data10MatchLast[item].home < data10MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getAwayLast10Match().goal}
              </td>
            </tr>
            <tr>
              <td
              // className={`${
              //   data3MatchLast[item].home > data3MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getHomeLast3MatchStats().lose}
              </td>
              <td>
                <b>{`Bàn thua`}</b>
              </td>
              <td
              // className={`${
              //   data3MatchLast[item].home < data3MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getAwayLast3Match().lose}
              </td>
              <td
              // className={`${
              //   data10MatchLast[item].home > data10MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getHomeLast10Match().lose}
              </td>
              <td>
                <b>{`Bàn thua`}</b>
              </td>
              <td
              // className={`${
              //   data10MatchLast[item].home < data10MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getAwayLast10Match().lose}
              </td>
            </tr>
            <tr>
              <td
              // className={`${
              //   data3MatchLast[item].home > data3MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getHomeLast3MatchStats().red}
              </td>
              <td>
                <b>{`Thẻ đỏ`}</b>
              </td>
              <td
              // className={`${
              //   data3MatchLast[item].home < data3MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getAwayLast3Match().red}
              </td>
              <td
              // className={`${
              //   data10MatchLast[item].home > data10MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getHomeLast10Match().red}
              </td>
              <td>
                <b>{`Thẻ đỏ`}</b>
              </td>
              <td
              // className={`${
              //   data10MatchLast[item].home < data10MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getAwayLast10Match().red}
              </td>
            </tr>
            <tr>
              <td
              // className={`${
              //   data3MatchLast[item].home > data3MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getHomeLast3MatchStats().corner}
              </td>
              <td>
                <b>{`Phạt góc`}</b>
              </td>
              <td
              // className={`${
              //   data3MatchLast[item].home < data3MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getAwayLast3Match().corner}
              </td>
              <td
              // className={`${
              //   data10MatchLast[item].home > data10MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getHomeLast10Match().corner}
              </td>
              <td>
                <b>{`Phạt góc`}</b>
              </td>
              <td
              // className={`${
              //   data10MatchLast[item].home < data10MatchLast[item].away
              //     ? "red"
              //     : ""
              // } ${item.havePercent ? "havePercent" : ""}`}
              >
                {getAwayLast10Match().corner}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
