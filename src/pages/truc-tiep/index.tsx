import { API_KEOVIP } from "@/config/config";
import axios from "axios";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { Col, Row } from "antd";
import Link from "next/link";
import MainLayout from "@/Layout/MainLayout";
import {
  convertObjectToQuery,
  getCateBySlugSchema,
  getSeoByLink,
} from "@/stores/categories.stores";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import Script from "next/script";
const Live = ({ matches, schema, tags }: any) => {
  return (
    <>
      <Head>
        {tags?.map((tag: any, index: any) => (
          <React.Fragment key={index}>{parse(tag)}</React.Fragment>
        ))}
      </Head>
      {schema?.map((tag: any, index: any) => (
        <Script
          id="globalSchema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${tag.script}`,
          }}
        />
      ))}
      <MainLayout>
        <div className="py-4 text-center title-seagame-schedule-page">
          Danh sách trực tiếp
        </div>
        <div className="live-stream-sport">
          <Row
            gutter={[16, 16]}
            style={{
              justifyContent: "center",
              display: "flex",
              margin: "auto !important",
              flexFlow: "row wrap",
            }}
          >
            {matches?.map((item: any) => {
              return (
                <>
                  <Link
                    key={item?._id}
                    href={`/truc-tiep/${item?.match_live_info?.id}`}
                  >
                    <Col lg={6}>
                      {/* <div className="live-stream-card">
                        <div className="live-stream-card-content">
                            <div className="live-stream-card-content-logo">
                                <img src={item?.match_live_info?.team_home_logo} />
                            </div>
                            <div>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <p>{item?.match_live_info?.team_home_name}</p>
                                    <span>VS</span>
                                    <p>{item?.match_live_info?.team_away_name}</p>
                                </div>
                                {item?.match_live_info.status > 0 || item?.match_live_info?.status === -1 ? <p style={{textAlign: 'center'}}>{item?.match_live_info?.time}</p> : <p  style={{textAlign: 'center'}}>{item?.match_live_info?.score?.home} - {item?.match_live_info?.score?.away}</p>}
                            </div>
                            <div className="live-stream-card-content-logo">
                                <img src={item?.match_live_info?.team_away_logo} />
                            </div>
                        </div>
                    </div> */}

                      <div
                        className="card-border"
                        style={{ color: "white", padding: "10px" }}
                      >
                        <div className="match_card text-light">
                          <div
                            className="match_header"
                            style={{ color: "yellow" }}
                          >
                            <span className="match_title">
                              {item?.match_live_info?.league}
                            </span>
                          </div>
                          <div
                            className="match_body"
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <div className="team d-flex flex-column align-items-center">
                              <picture>
                                <img
                                  src={`${item?.match_live_info?.team_home_logo}`}
                                  alt={item?.match_live_info?.team_home_name}
                                />
                              </picture>
                              <span className="font-bold team_name">
                                {item?.match_live_info?.team_home_name}
                              </span>
                            </div>
                            <div className="match_status d-flex flex-column justify-content-center">
                              <div
                                className="happening"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <span className="current_status"></span>
                                <span className="match_time">
                                  {item?.match_live_info?.time}
                                </span>
                                {item?.match_live_info?.status > 0 ||
                                item?.match_live_info?.status === -1 ? (
                                  <span className="current_result">
                                    <span style={{ margin: "0px 10px" }}>
                                      {item?.match_live_info?.score?.home}
                                    </span>
                                    <span />
                                    <span style={{ margin: "0px 10px" }}>
                                      {item?.match_live_info?.score?.home}
                                    </span>
                                  </span>
                                ) : (
                                  <div>VS</div>
                                )}
                              </div>
                            </div>
                            <div
                              className="team"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <picture>
                                <img
                                  src={`${item?.match_live_info?.team_away_logo}`}
                                  alt={item?.match_live_info?.team_away_name}
                                />
                              </picture>
                              <span className="font-bold team_name">
                                {item?.match_live_info?.team_away_name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Link>
                </>
              );
            })}
          </Row>
        </div>
      </MainLayout>
    </>
  );
};

Live.getInitialProps = async (ctx: GetServerSidePropsContext) => {
  const slug = "truc-tiep";
  const [theSportMatch, matches] = await Promise.all([
    axios.get(`${API_KEOVIP}/website/thesports`),
    axios.get(`${API_KEOVIP}/website/matches`),
  ]);
  function reverseString(str: string): string {
    return str === "" || str === undefined
      ? ""
      : reverseString(str.substr(1)) + str.charAt(0);
  }
  const schema = await getCateBySlugSchema(slug);
  const liveMatch = matches.data.data?.map((item: any) =>
    theSportMatch?.data?.data?.find((x: any) => {
      if (x?.match_id == reverseString(item.id.toString().slice(1, 8))) {
        x.match_live_info = item;
        return x;
      }
      return null;
    })
  );

  const params: any = {
    link: slug as string,
    // domain: process.env.NEXT_PUBLIC_DOMAIN,
  };

  const dataSlug = await getSeoByLink(convertObjectToQuery(params));

  const tags = dataSlug?.data?.tags;
  return {
    matches: liveMatch?.filter((item: any) => item) || [],
    schema: schema.data || [],
    tags: typeof tags ? tags?.map((item: any) => item?.value) : [],
  };
};

// export async function getServerSideProps(ctx: GetStaticPropsContext) {
//   const slug = 'truc-tiep'
//   const [theSportMatch, matches] = await Promise.all([axios.get(`${API_KEOVIP}/website/thesports`), axios.get(`${API_KEOVIP}/website/matches`)]);
//   function reverseString(str: string): string {
//     return str === "" || str === undefined
//       ? ""
//       : reverseString(str.substr(1)) + str.charAt(0);
//   }
//   const schema = await getCateBySlugSchema(slug)
//   const liveMatch = matches.data.data?.map((item: any) =>
//     theSportMatch?.data?.data?.find((x: any) => {
//       if (x?.match_id == reverseString(item.id.toString().slice(1, 8))) {
//         x.match_live_info = item;
//         return x;
//       }
//       return null;
//     })
//   );
//   return {
//     props: {
//       matches: liveMatch?.filter((item: any) => item) || [],
//       schema: schema.data || []
//     },
//   };
// }
export default Live;
