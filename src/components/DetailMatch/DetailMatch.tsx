import React, { useState } from "react";
import DetailMatch_Content from "./DetailMatch_Content";
import DetailMatch_TeamTech from "./DetailMatch_TeamTech";
import DetailMatchEvent from "./DetailMatch_Events";

export default function DetailMatch({ events, match, stats, matchAnalysis }: { events: any, match: any, stats: any, matchAnalysis: any }) {
  const [dataCompany, setDataCompany] = useState([
    { label: "Bet365", value: "8" },
    { label: "Sbobet", value: "31" },
  ]);
  const [companyId, setCompanyId] = useState(8); //default Bet365
  const onChangeCompany = (e: any) => {
    setCompanyId(e.target.value);
  };
  return (
    <div id="matchData">
      <div
        className="content"
        style={{ marginTop: "2px", marginBottom: " 0px", overflow: "visible" }}
      >
        <div id="ad1"></div>
        {events?.events && <DetailMatchEvent match={match} events={events} />}
        {stats?.stats && <DetailMatch_TeamTech stats={stats} />}
        <DetailMatch_Content matchAnalysis={matchAnalysis} />
      </div>
      <div
        style={{
          textAlign: "center",
          lineHeight: "30px",
          backgroundColor: "white",
          margin: "0 6px",
        }}
      >
      </div>
    </div>
  );
}
