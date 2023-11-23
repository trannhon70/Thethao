import axios from "axios";
import {
  API_KEOVIP,
  FRAME_ISPORT,
  URL_AMINATION,
  URL_IFRAME_THESPORTS,
} from "../../config/config";
import MainLayout from "@/Layout/MainLayout";
import { useRouter } from "next/router";
import { getMatchDetail } from "@/stores/footballs.stores";
import EventStat from "@/containers/MatchDetailLive/EventStat";
import { useMemo } from "react";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
// @ts-ignore

const LiveStreamMatchDetail = ({
  matchDetail,
  matchTheSportsLive,
  matchTheSports,
}: any) => {
  const router = useRouter();
  const id = router.query.id;

  const matchIdTheSports = useMemo(() => {
    return matchTheSports?.length > 0
      ? matchTheSports.filter((data: any) => data?.match_id == matchDetail?.id)
      : [];
  }, [matchDetail?.id]);

  const matchIdLive = useMemo(() => {
    return matchTheSportsLive?.length > 0
      ? matchTheSportsLive?.filter(
          (data: any) => matchIdTheSports[0]?.thesports_uuid === data?.match_id
        )
      : [];
  }, [matchIdTheSports[0]?.thesports_uuid]);
  return (
    <MainLayout>
      <div className="home-page-wrapper">
        <div className="home-page mx-auto">
          <div className="match-team-info-wrapper my-4">
            {/* <div className="grid grid-cols-11">
               <div className="col-span-11 md:col-span-4">
                <div className="d-flex align-items-center justify-content-center flex-col">
                  <img
                    src={matchDetail?.team_home_logo}
                    width={64}
                    height={64}
                  />
                  <div
                    className="mt-1"
                    style={{ color: "#fff", fontWeight: "500" }}
                  >
                    {matchDetail?.team_home_name}
                  </div>
                </div>
              </div>
              <div className="col-span-11 md:col-span-3">
                <div className="w-full d-flex align-items-center justify-content-center flex-col">
                  <div
                    style={{
                      fontSize: "28px",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {matchDetail?.score?.home} - {matchDetail?.score?.away}
                  </div>
                  <div style={{ fontWeight: "600", color: "greenyellow" }}>
                    {matchDetail?.time}
                  </div>
                </div>
              </div> 
               <div className="col-span-11 md:col-span-4">
                <div className="d-flex align-items-center justify-content-center flex-col">
                  <img
                    src={matchDetail?.team_away_logo}
                    width={64}
                    height={64}
                  />
                  <div
                    className="mt-1"
                    style={{ color: "#fff", fontWeight: "500" }}
                  >
                    {matchDetail?.team_away_name}
                  </div>
                </div>
              </div> 
            </div> */}
          </div>

          <div className="match-details-live">
            <div className="match-live" style={{ position: "relative" }}>
              {matchIdLive?.length > 0 ? (
                <iframe
                  src={`${URL_IFRAME_THESPORTS}&uuid=${matchIdLive?.[0].match_id}`}
                  width="100%"
                  height="100%"
                ></iframe>
              ) : (
                <iframe
                  src={`${URL_AMINATION}?matchId=${matchDetail?.id}&accessKey=tEFL6ClbFnfkvmEn0xspIVQyPV9jAz9u&lang=vi&statsPanel=hide`}
                  width="100%"
                  height="100%"
                ></iframe>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 mt-4">
            <div className="col-span-12 md:col-span-6">
              <div className="wrapper-info-match-live">
                <div className="info-match-live">
                  <iframe
                    src={`${URL_AMINATION}?matchId=${id}&accessKey=tEFL6ClbFnfkvmEn0xspIVQyPV9jAz9u&lang=vi`}
                    width="100%"
                    height="600"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="event-match-live-wrapper">
                <EventStat matchId={id as string} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

LiveStreamMatchDetail.getInitialProps = async (ctx: GetServerSidePropsContext) => {
  const matchId : any = ctx.query.id;
     const theSportsMatch = await axios.get(`${API_KEOVIP}/website/thesports`);
     const theSportsLiveMatch = await axios.get(
       `${API_KEOVIP}/website/thesports/live`
     );
     const matchDetail = await getMatchDetail(matchId);
     return {
       props: {
         matchDetail: matchDetail || {},
         matchTheSports: theSportsMatch?.data?.data || [],
         matchTheSportsLive: theSportsLiveMatch?.data?.data || [],
       },
     };
}

export default LiveStreamMatchDetail;

// export async function getServerSideProps(ctx: any) {
//   const matchId = ctx.params.id;
//   const theSportsMatch = await axios.get(`${API_KEOVIP}/website/thesports`);
//   const theSportsLiveMatch = await axios.get(
//     `${API_KEOVIP}/website/thesports/live`
//   );
//   const matchDetail = await getMatchDetail(matchId);
//   return {
//     props: {
//       matchDetail: matchDetail || {},
//       matchTheSports: theSportsMatch?.data?.data || [],
//       matchTheSportsLive: theSportsLiveMatch?.data?.data || [],
//     },
//   };
// }
