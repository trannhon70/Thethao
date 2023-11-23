import { getEventMatchLive } from "@/stores/footballs.stores";
import React, { useEffect, useState } from "react";
import { BiBall, BiFootball } from "react-icons/bi";
import { GiCardPlay } from "react-icons/gi";

type Props = {
  matchId: string;
};

function EventStat({ matchId }: Props) {
  const [events, setEvents] = useState([]);
  
  const getDataEvent = async () => {
    try {
      const result = await getEventMatchLive();

      setEvents(
        result?.find((item: any) => item?.matchId === matchId)?.events || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataEvent();
    const timer = setInterval(() => {
      getDataEvent();
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [matchId]);

  const render = {
    1: <BiFootball size={20} />,
    2: <GiCardPlay style={{ color: "#fc2003" }} size={20} />,
    3: <GiCardPlay style={{ color: "#f5dd02" }} size={20} />,
    7: <BiFootball size={20} style={{ color: "#1cfc03" }} />,
  };

  return (
    <div className="event-stat-match-live">
      <div className="text-center title-event-state-match-live">
        Sự kiện chính
      </div>

      <div className="event-stat-match-live-list">
        {events?.map((item: any, index) => (
          <div
            key={index}
            className="event-stat-match-live-item mt-2 d-flex align-items-center"
          >
            {item?.homeEvent ? (
              <>
                <div style={{ minWidth: "40px" }}>
                  {/* <BiFootball size={20} /> */}
                  {render[item?.type as "1" | "2" | "3" | "7"]}
                </div>
                <div
                  style={{
                    minWidth: "calc(45% - 40px)",
                    fontSize: "17px",
                    fontWeight: "500",
                  }}
                >
                  {item?.playerName}
                </div>
              </>
            ) : (
              <div style={{ minWidth: "45%" }}></div>
            )}

            <div
              className="text-center"
              style={{ minWidth: "10%", color: "green", fontWeight: "bold" }}
            >
              {item?.minute}{" "}
              {Number(item?.overtime) ? `(+${item?.overtime})` : ""}
              {"'"}
            </div>

            {!item?.homeEvent ? (
              <>
                <div
                  style={{
                    minWidth: "calc(45% - 40px)",
                    fontSize: "17px",
                    fontWeight: "500",
                    textAlign: "right",
                  }}
                >
                  {item?.playerName}
                </div>

                <div
                  style={{ minWidth: "40px" }}
                  className="d-flex justify-content-end"
                >
                  {render[item?.type as "1" | "2" | "3" | "7"]}
                </div>
              </>
            ) : (
              <div style={{ minWidth: "45%" }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventStat;
