//@ts-nocheck
import CateLayout from "@/Layout/CateLayout";
import MainLayout from "@/Layout/MainLayout";
import PostLayout from "@/Layout/PostLayout";
import MediumPost from "@/components/posts/MediumPost";
import PostDetails from "@/components/posts/PostDetails";
import PostItem from "@/components/posts/PostItem";
import RelativePost from "@/components/posts/RelativePost";
import Sidebar from "@/components/posts/Sidebar";
import { PostItemProps } from "@/interface";
import {
  convertObjectToQuery,
  getCateBySlug,
  getCateBySlugPost,
  getCateBySlugSchema,
  getSeoByLink,
} from "@/stores/categories.stores";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getLastestPost,
  getPostByCateSlug,
  getPostBySlug,
  getRelativePost,
} from "@/stores/posts.stores";
import { debounce } from "lodash";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
import { getHotMatch, getStandingByLeague } from "@/stores/footballs.stores";
import SportCalendar from "@/components/home/SportCalendar";
import Link from "next/link";
import PostCategoryRelative from "@/containers/PostCategoryRelative";
import Head from "next/head";
import parse from "html-react-parser";
import Script from "next/script";
import ChartComponent from "@/components/home/ChartComponent";
const SlugHandle: NextPage = (props: {
  slug: string;
  post: PostItemProps;
  listNews: PostItemProps[];
  weekListMatch: any;
  schema: any;
  tags: any;
  listStanding: any;
}) => {
  //@ts-ignore
  const [end, setEnd] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [total, setTotal] = useState(1);
  const [posts, setPosts] = useState([]);
  const [listRelative, setListRelative] = useState([]);
  // console.log(props.slug, props.type,props.schema);
  if (props.type === "category") {
    const handleGetPost = async () => {
      setPageIndex(1);
      let res = await getPostByCateSlug(props.slug, 10, 1);
      if (res?.length === 0) {
        setEnd(true);
      }
      setPosts(res || []);
    };

    const firstPost = posts?.slice(0, 4);
    const listPost = posts?.slice(4, posts.length);
    useEffect(() => {
      handleGetPost();
    }, [props.slug]);

    const handleFetchMoreData = async () => {
      setPageIndex(pageIndex + 1);
      let res = await getPostByCateSlug(props.slug, 10, pageIndex + 1);
      if (res.length > 0) {
        setPosts([...posts, ...res]);
      } else {
        setEnd(true);
      }
    };
    const handleGetChart = () => {
      if (
        props.slug === "bong-da" ||
        props.slug === "tin-bong-da" ||
        props.slug === "nhan-dinh-bong-da"
      ) {
        return <ChartComponent listStanding={props.listStanding} />;
      }
    };
    return (
      <>
        <Head>
          {props?.tags?.map((tag, index) => (
            <React.Fragment key={index}>{parse(tag)}</React.Fragment>
          ))}
        </Head>
        {props.schema?.map((tag: any, index: any) => (
          <Script
            id="globalSchema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `${tag.script}`,
            }}
          />
        ))}
        <MainLayout>
          <div className="mx-auto home-page">
            <SportCalendar matches={props.weekListMatch} />
            <div className="mt-4 mb-4">
              <div className="grid grid-cols-12 mt-4">
                {/* <div className="col-span-12 md:col-span-1"></div> */}
                <div className="col-span-12 px-4">
                  {/* post main */}
                  <Link href={`${posts?.[0]?.slug}`}>
                    <div className="post-seagame-item-main">
                      <div className="grid grid-cols-12">
                        <div className="col-span-12 md:col-span-7">
                          <img
                            className="object-cover rounded-lg post-image-main"
                            src={posts?.[0]?.thumb?.medium}
                            alt={posts?.[0]?.title || ""}
                          />
                        </div>
                        <div className="col-span-12 md:col-span-5">
                          <div className="info">
                            <div className="title">
                              <div style={{ color: "black" }}>
                                {posts?.[0]?.title}
                              </div>
                            </div>
                            <div
                              className="mt-2 description"
                              style={{ color: "black" }}
                            >
                              {posts?.[0]?.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* post secondary */}
                  <div className="grid grid-cols-12 mt-4 post-secondary-wrapper">
                    {posts?.slice(1, 4)?.map((post: any, index: number) => (
                      <Link
                        href={`/${post.slug}`}
                        className="col-span-12 mb-4 md:col-span-4 md:mb-0"
                      >
                        <div className="post-seagame-item-secondary">
                          <div>
                            <img
                              className="object-cover post-image-secondary"
                              src={post?.thumb?.small}
                            />
                          </div>

                          <div className="info">
                            <div className="title" style={{ color: "black" }}>
                              <Link href={`/${post.slug}`}>{post?.title}</Link>
                            </div>

                            <div
                              style={{ color: "black" }}
                              className="description"
                            >
                              {post?.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-3"></div>
                <div className="col-span-12 md:col-span-1"></div>
              </div>
            </div>

            <hr />
            {handleGetChart()}
            <div className="grid grid-cols-12 mt-4">
              {/* <div className="col-span-12 md:col-span-1"></div> */}
              <div className="col-span-12 ml-6 md:col-span-8">
                {/* post third */}
                {posts?.slice(4, 10)?.map((post: any, index: number) => (
                  <Link href={`/${post?.slug}`}>
                    <div className="grid grid-cols-12 pb-4 mt-4 post-seagame-item-third">
                      <div className="col-span-12 md:col-span-4">
                        <div>
                          <img
                            className="post-image-third"
                            src={post?.thumb?.small}
                          />
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-8">
                        <div className="mt-2 info ms-4 md:mt-0">
                          <div className="title" style={{ color: "black" }}>
                            <Link href={"/"}>{post?.title}</Link>
                          </div>
                          <div
                            className="description"
                            style={{ color: "black" }}
                          >
                            {post?.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-span-12 md:col-span-3">
                <div className="col-span-12 md:col-span-1">
                  <PostCategoryRelative posts={posts} />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-3 category-first-post">
            <div className="flex flex-wrap gap-5">
              {firstPost?.map((post: any) => (
                <div className="small-news-item">
                  <PostItem
                    image={post?.thumb?.medium}
                    title={post?.title}
                    url={post?.slug}
                    description={post?.description}
                  />
                </div>
              ))}
            </div>
          </div>
          <InfiniteScroll
            dataLength={posts?.length}
            next={() => handleFetchMoreData()}
            hasMore={true}
            loader={
              !end ? (
                <div class="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <></>
              )
            }
          >
            <div className="category-list-post">
              <div className="flex flex-wrap gap-3 mt-5">
                {listPost?.map((item: PostItemProps, index: number) => {
                  return (
                    <div className="category-post" key={index}>
                      <MediumPost
                        url={item.slug}
                        image={item.thumb.medium}
                        title={item.title}
                        description={item.description}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll> */}
        </MainLayout>
      </>
    );
  } else {
    const initData = async () => {
      setPageIndex(1);
      let relativePost = await getRelativePost(
        props.post?.categories?.[0]?.slug,
        props.slug,
        10,
        1
      );
      if (relativePost.length > 0) {
        setListRelative(relativePost);
      } else {
        setEnd(true);
      }
    };

    useEffect(() => {
      initData();
    }, [props.slug]);
    const handleFetchMoreData = async () => {
      setPageIndex(pageIndex + 1);
      let listNews = await getRelativePost(
        props.post?.categories?.[0]?.slug,
        props.slug,
        10,
        pageIndex + 1
      );
      if (listNews?.length > 0) {
        setListRelative([...listRelative, ...listNews]);
      } else {
        setEnd(true);
      }
    };

    return (
      <>
        <Head>
          {props?.tags?.map((tag, index) => (
            <React.Fragment key={index}>{parse(tag)}</React.Fragment>
          ))}
        </Head>
        {props.schema?.map((tag: any, index: any) => (
          <Script
            id="globalSchema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `${tag.script}`,
            }}
          />
        ))}
        <MainLayout>
          <PostLayout>
            <div className="main-post">
              <PostDetails
                post={props.post}
                watchMore={listRelative?.slice(0, 3)}
              />
              <Sidebar title="Tin mới nhất" listPost={props.listNews} />
            </div>
            <InfiniteScroll
              dataLength={listRelative?.length}
              next={() => handleFetchMoreData()}
              hasMore={true}
              loader={
                !end ? (
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <></>
                )
              }
            >
              <RelativePost
                listPost={listRelative.slice(4, listRelative.length)}
              />
            </InfiniteScroll>
          </PostLayout>
        </MainLayout>
      </>
    );
  }
};

export default SlugHandle;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  let slug = ctx.query.slug;
  let listStanding = [];
  if (
    slug === "bong-da" ||
    slug === "tin-bong-da" ||
    slug === "nhan-dinh-bong-da"
  ) {
    listStanding = await getStandingByLeague([
      4335, 4378, 4346, 4399, 4347, 4976,
    ]);
  }
  //@ts-ignore
  let resCate = await getCateBySlug(slug);
  const schema = await getCateBySlugSchema(slug);
  const params: any = {
    link: slug as string,
    // domain: process.env.NEXT_PUBLIC_DOMAIN,
  };

  const dataSlug = await getSeoByLink(convertObjectToQuery(params));

  const tags = dataSlug?.data?.tags;

  if (resCate?.success) {
    const weekListMatch = await getHotMatch();

    return {
      props: {
        slug: slug,
        type: "category",
        weekListMatch: weekListMatch?.data || {},
        schema: schema.data || [],
        tags:
          typeof tags === Array ? tags?.map((item: any) => item?.value) : [],
        listStanding: listStanding || [],
      },
    };
  } else {
    let [post, listNews, listStanding] = await Promise.all([
      getPostBySlug(slug),
      getLastestPost(),
    ]);

    return {
      props: {
        type: "post",
        post: post || [],
        slug: slug || "",
        listNews: listNews || [],
        schema: schema?.data || [],
        tags:
          typeof tags === Array ? tags?.map((item: any) => item?.value) : [],
        listStanding: listStanding || [],
      },
    };
  }
}
