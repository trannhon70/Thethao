import React, { ReactNode, useEffect, useMemo, useState } from "react";
import LayoutAccount from "@/Layout/LayoutAccount";
import Tab from "@/components/common/Tab";
import TabM from "@/components/common/TabM";
import ListArticle from "@/components/ListArticle";
import { getAllCustomerPost, getUserInfo } from "@/stores/customer.stores";
import styled from "styled-components";
import useCheckMobile from "@/hooks/useCheckMobile";
import { GetServerSidePropsContext } from "next";
import { IUser } from "@/interface";
import MainLayout from "@/Layout/MainLayout";
import { useRouter } from "next/router";
function Article() {
  const [user, setUser] = useState<IUser>();
  const [tabActive, setTabActive] = useState(0);
  const isMobile = useCheckMobile();
  const [discussions, setDiscussions] = useState([]);
  const [tips, setTips] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getUser = async () => {
    try {
      const result = await getUserInfo();
      setUser(result?.user);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("user", user);
  const getPosts = async () => {
    try {
      const result: any = await getAllCustomerPost(id?.toString() || "");
      setDiscussions(result?.discussions || []);
      setTips(result?.tips || []);
    } catch (error) {
      console.log(error);
    }
  };

  const render = useMemo(() => {
    switch (tabActive) {
      case 0:
      default:
        return <ListArticle articles={[...discussions, ...tips]} />;
      case 1: {
        return <ListArticle articles={tips} />;
      }
      case 2: {
        return <ListArticle articles={discussions} />;
      }
    }
  }, [tabActive, tips, discussions]);
  if (isMobile) {
    return (
      <div style={{ paddingTop: 110 }} className="body">
        <h1 className="title-heading">Bài viết của tôi</h1>
        <TabM data={data} tabActive={tabActive} setTabActive={setTabActive} />
        {render}
      </div>
    );
  }

  useEffect(() => {
    getUser();
    getPosts();
  }, [id]);

  return (
    <LayoutAccount>
      <Tab data={data} tabActive={tabActive} setTabActive={setTabActive} />
      <Wrapper>{render}</Wrapper>
    </LayoutAccount>
  );
}

Article.getLayout = (pages: ReactNode) => {
  return <MainLayout>{pages}</MainLayout>;
};

export default Article;
const Wrapper = styled.div`
  max-height: calc(100vh);
  overflow-y: scroll;
`;

const data = [
  {
    id: 1,
    name: "Tất cả",
  },
  {
    id: 2,
    name: "Tips",
  },
  {
    id: 3,
    name: "Thảo luận",
  },
];
