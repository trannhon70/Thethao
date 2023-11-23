//@ts-nocheck
import React, { useEffect, useState } from "react";
import { RankTable } from "./RankTable";
import { HeadToHead } from "./HeadToHead";
import { RecentAchievements } from "./RecentAchievements";
import CompareData from "./CompareData";
import AsianOddsStatistics from "./AsianOddsStatistics";
import AsianOddsStatisticsHistory from "./AsianOddsStatisticsHistory";
import { GoalTotal } from "./GoalTotal";
import { HTFTDetail } from "./HTFTDetail";
import { BigSicOddEven } from "./BigSicOddEven";
import { UpcomingMatchesThree } from "./UpcomingMatchesThree";
import RecentLineups from "./RecentLineups";
import DataHistory from "./DataHistory";
import InjuriesAndSuspensions from "./InjuriesAndSuspensions";
import { TimeToScoreGoals } from "./TimeToScoreGoals";

const AnalysisPage = ({
  match,
  matchAnalysis,
}: {
  match: any;
  matchAnalysis: any;
}) => {
  // const router = useRouter();
  // const [teamData, setTeamData] = useState([])

  // const getTeamData = async () => {
  //   const response = await axios.get(
  //     `${ip}/website/matches/teamData/${router.query?.pid}`
  //   );
  //   let data = response && response.data.awayLastMatches
  //   setTeamData(data)
  // };

  // useEffect(() => {
  //   if (router.query?.pid) getTeamData();
  // }, [router.asPath]);

  const [more, setMore] = useState<number>(0)

  return (
    <>
      <div>
        <div>
          <div id="rankTable" style={{ marginTop: "30px" }}>
            <RankTable match={match} />
          </div>
          <div id="headToHead" style={{ marginTop: "30px" }}>
            <HeadToHead matchAnalysis={matchAnalysis} />
          </div>
          <div id="recentAchievements" style={{ marginTop: "30px" }}>
            <RecentAchievements matchAnalysis={matchAnalysis} />
          </div>
          <div id="CompareData">
            <CompareData matchAnalysis={matchAnalysis} />
          </div>
         
          <div style={more === 0 ? {display:'none'} : {display:'block'}}>
          <div id="asianOddsStatistics" style={{ marginTop: "30px" }}>
            <AsianOddsStatistics matchAnalysis={matchAnalysis} />
          </div>
          <div id="asianOddsStatisticsHistory" style={{ marginTop: "30px" }}>
            <AsianOddsStatisticsHistory
              matchAnalysis={matchAnalysis}
              match={match}
            />
          </div>
          

          <div id="goalTotal" style={{ marginTop: "30px" }}>
            <GoalTotal matchAnalysis={matchAnalysis} />
          </div>
          <div id="hTFTDetail" style={{ marginTop: "30px" }}>
            <HTFTDetail matchAnalysis={matchAnalysis} />
          </div>
          <div id="bigSicOddEven">
            <BigSicOddEven matchAnalysis={matchAnalysis} />
          </div>
          <div id="timeToScoreGoals">
            <TimeToScoreGoals matchAnalysis={matchAnalysis} />
          </div>
          <div id="upcomingMatchesThree">
            <UpcomingMatchesThree matchAnalysis={matchAnalysis} />
          </div>
          <div id="injuriesAndSuspensions">
            {/* <InjuriesAndSuspensions /> */}
          </div>
          <div id="recentLineups">{/* <RecentLineups /> */}</div>
          <div id="dataHistory">
            <DataHistory matchAnalysis={matchAnalysis} />
          </div>
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}> 
            {
              more === 0 ? 
              <button onClick={() => setMore(1)} className="p-2 bg-gray-300 hover:text-green-500">Xem thêm</button>
              :
              <button onClick={() => setMore(0)} className="p-2 bg-gray-300 hover:text-green-500">Thu gọn</button>
            }
          </div>
        </div>
        {/* <div id="analyMap">
          <a>Cài đặt</a>
          <a href="#compareOddsOnline" title="So sánh kèo trực tuyến">
            Live kèo
          </a>
          <a href="#rankTable" title="Dự đoán trận đấu">
            {" "}
            BXH
          </a>
          <a href="#headToHead" title="Bảng xếp hạng">
            {" "}
            VS
          </a>

          <a href="#CompareData" title="Tỷ số quá khứ">
            {" "}
            Tỷ số
          </a>
          <a href="#asianOddsStatistics" title="So sánh số liệu ">
            {" "}
            So sánh
          </a>
          <a href="#asianOddsStatisticsHistory" title="Thống kê kèo châu Á">
            {" "}
            HDP
          </a>
          <a href="#goalTotal" title="Lịch sử kèo châu Á tương đồng">
            {" "}
            SHHO
          </a>
          <a
            href="#hTFTDetail"
            title="Tổng số ghi bàn thắng/Số bàn thắng trong H1&amp;H2"
          >
            {" "}
            Bàn
          </a>
          <a href="#bigSicOddEven" title="Chi tiết về HT/FT">
            {" "}
            HT/FT
          </a>
          <a href="#timeToScoreGoals" title="Tài Xỉu/Lẻ Chẵn">
            {" "}
            TX/LC
          </a>
          <a href="#upcomingMatchesThree" title="Thời gian ghi bàn thắng">
            {" "}
            Giờ
          </a>
          <a href="#recentLineups" title="Lịch thi đấu">
            {" "}
            LTĐ
          </a>
          <a href="#injuriesAndSuspensions" title="Chấn thương và dừng chiến">
            {" "}
            Chấn thương
          </a>
          <a href="#dataHistory" title="Đội hình gần đây">
            Đội hình
          </a>
          <a href="#dataHistory" title="Dữ liệu thống kê mùa giải này">
            {" "}
            Mùa giải
          </a>
        </div> */}
      </div>
    </>
  );
};

export default AnalysisPage;
