import { Inter } from "next/font/google";
import MainLayout from "@/Layout/MainLayout";
import React, { ReactNode } from "react";
import SportCalendar from "@/components/home/SportCalendar";
import ComponentTitle from "@/components/common/ComponentTitle";
import GallaryNews from "@/components/home/GallaryNews/intex";
import NewestVideo from "@/components/home/NewestVideo";
import { PostItemProps, StandingObjectProps } from "@/interface";
import CategoryList from "@/components/home/CategoryList";
import ChartComponent from "@/components/home/ChartComponent";
import AllNews from "@/components/home/AllNews";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import { getHotMatch, getStandingByLeague } from "@/stores/footballs.stores";
import {
  getPostByCateSlug,
  getPostByMultiCateSlug,
} from "@/stores/posts.stores";
import {convertObjectToQuery, getCateBySlugSchema, getSeoByLink} from '@/stores/categories.stores'
import Head from "next/head";
import parse from "html-react-parser";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

const Home = ({
  // matches,
  // tablePoint,
  listVideo,
  lastestPost,
  weekListMatch,
  listStanding,
  listPostCate,
  listPostBongDaVietNam,
  getCateBySlugSchemas,
  tags
}: {
  // matches: any;
  // tablePoint: any;
  listVideo: any;
  lastestPost: any;
  weekListMatch: any;
  listStanding: StandingObjectProps;
  listPostCate: [{ slug: string; post: PostItemProps[] }];
  listPostBongDaVietNam: any,
  getCateBySlugSchemas : any,
  tags : any
}) => {
  return (
    <>
    <Head>
    <meta name="msvalidate.01" content="286C05BE75AA8BE5CD840497ED8C46AE" />
        {tags?.map((tag : any, index : any) => (
          <React.Fragment key={index}>{parse(tag)}</React.Fragment>
        ))}
      </Head>
      {getCateBySlugSchemas?.map((tag : any, index : any) => (
          <Script
        id='globalSchema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html:`${tag.script}`}} />
        ))}

      <Script
        id="script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ThethaoSH",
            "alternateName": "ThểThaoSH",
            "url": "https://thethaosh.com/",
            "logo": "https://thethaosh.com/images/logo-footer.png"
          }
          `,
        }}
      ></Script>

      <div className="home-page-wrapper">
        <div className="mx-auto home-page">
          <SportCalendar matches={weekListMatch} />
          <div className="home-page-news">
          <div className="home-page-news-newest">
            <ComponentTitle title="Tin mới nhất" url="#" />
            <div className="mt-5 home-page-news-galary">
              <GallaryNews lastestPost={lastestPost} />
            </div>
          </div>
          <div className="mt-8 home-page-video-newest">
            <ComponentTitle title="Video mới nhất" showAll url="/video" />
            <div className="w-full mt-4 mb-4 video-newest-video">
              <NewestVideo listVideo={listVideo} />
            </div>
          </div>
          <div className="my-8 home-page-sport-category">
            <ComponentTitle title="Danh mục" url="#" />
            <div className="mt-4">
              <CategoryList listPostCate={listPostCate} />
            </div>
          </div>
        </div>
        </div>
        <div className="my-12 home-page-charts">
          <ChartComponent listStanding={listStanding} />
        </div>
        <div className="px-2 mx-auto home-page">
          <div className="my-2 homepage-all-new">
            <ComponentTitle title="Tin bóng đá" showAll url="/tin-bong-da" />
            <div className="mt-6">
              <AllNews lastestPost={lastestPost} />
            </div>
          </div>
        </div>

        <div className="px-2 mx-auto mt-10 home-page">
          <div className="my-2 homepage-all-new">
            <ComponentTitle
              title="Bóng đá Việt Nam"
              showAll
              url="/bong-da-viet-nam"
            />
            <div className="mt-6">
              <AllNews lastestPost={listPostBongDaVietNam} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactNode, listCate: any) {
  return <MainLayout>{page}</MainLayout>;
};

Home.getInitialProps = async (ctx: GetServerSidePropsContext) => {
  const slug = '/'
  const params: any = {
    link: slug as string,
    // domain: process.env.NEXT_PUBLIC_DOMAIN,
  };
  let [listStanding, weekListMatch, lastestPost, listVideo, listPostCate, listPostBongDaVietNam, getCateBySlugSchemas, getSeoByLinks] = await Promise.all([getStandingByLeague([
    4335, 4378, 4346, 4399, 4347, 4976,
  ]), getHotMatch(), getPostByCateSlug("tin-bong-da"), getPostByCateSlug("video"), getPostByMultiCateSlug(
    "bong-da-trong-nuoc,champion-league,la-liga,ngoai-hang-anh,seri-a"
  ), getPostByCateSlug("bong-da-viet-nam") , getCateBySlugSchema(slug), getSeoByLink(convertObjectToQuery(params))])
  // let weekListMatch = await getMatchOfWeek();
    
  const tags = getSeoByLinks?.data?.tags
  
  return {
    listVideo: listVideo || [],
    lastestPost: lastestPost || [],
    weekListMatch: weekListMatch?.data || {},
    listStanding: listStanding || [],
    listPostCate: listPostCate || [],
    listPostBongDaVietNam: listPostBongDaVietNam || [],
    getCateBySlugSchemas: getCateBySlugSchemas.data || [] ,
    tags : tags ? tags?.map((item : any) => item?.value) : []
  };
};

export default Home;
