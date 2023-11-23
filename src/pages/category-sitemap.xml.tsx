import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // const result = await fetch(`http://localhost:8000/api/category/getAllCates`);
    const result = await fetch(`https://api.thethaosh.com/api/category/getAllCates`);
    const cate = await result?.json();
    if (cate && cate?.data?.length > 0) {
      const newsSitemaps = cate?.data?.map((item: any) => {
        return {
            loc: `https://thethaosh.com/${item.slug?.toString()}`,
            lastmod: new Date(item.createdAt).toISOString(),
          }
      });
      return  getServerSideSitemap(ctx,newsSitemaps);
    }
    return getServerSideSitemap(ctx, []);
  };
  
  export default function SiteMap() {
    return <></>;
  }