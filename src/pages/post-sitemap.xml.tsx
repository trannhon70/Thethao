import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // const result = await fetch(`http://localhost:8000/api/posts/getAllPostnew`);
    const result = await fetch(`https://api.thethaosh.com/api/posts/getAllPostnew`);
    
    const posts = await result?.json();
    
    if (posts && posts?.data?.length > 0) {
      const newsSitemaps = posts?.data?.map((item: any) => {
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