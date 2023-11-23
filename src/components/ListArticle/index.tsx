import { Avatar, Divider } from "antd";
import React, { useMemo } from "react";
import { CgEye } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import Img from "@/assets/images/user.png";
import moment from "moment";
import "moment/locale/vi";
import Link from "next/link";
import { useRouter } from "next/router";
import { API_URL } from "@/config/config";
import { IUser } from "@/interface";
import { createView } from "@/stores/tips.stores";

function ListArticle({
  articles,
  isGroup = false,
  isName = true,
  isShowNoData = false,
  users,
}: {
  articles: any;
  isGroup?: boolean;
  isName?: boolean;
  isShowNoData?: boolean;
  users?: IUser[];
}) {
  if (articles.length == 0 && !isShowNoData) {
    return <div className="p-5 text-center">Chưa có bài viết nào</div>;
  }
  return (
    <div className="p-3 mt-4 shadow-lg md:mt-0">
      {articles.map((article: any) => (
        <Article
          key={article._id}
          article={article}
          isGroup={isGroup}
          isName={isName}
          users={users || []}
        />
      ))}
    </div>
  );
}

export default ListArticle;

function Article({
  article,
  isGroup,
  isName,
  users,
}: {
  article: any;
  isGroup: boolean;
  isName: boolean;
  users: IUser[];
}) {
  const router = useRouter();
  const AvatarImg = useMemo(() => {
    const user = article.user;
    let url = "";
    if (user?.avatar) {
      if (user.avatar.includes("http")) {
        url = user.avatar;
      } else {
        url = `${API_URL}/images/` + user.avatar;
      }
    } else {
      url = Img.src;
    }
    return url;
  }, [article]);
  // console.log(users);
  const tipsWin = useMemo(() => {
    if (!users || users.length == 0) {
      return null;
    } else {
      const user = users.find((user) => user._id === article?.user._id);
      return 0;
    }
  }, [article?.user?._id, users]);
  const dataMatch = useMemo(() => {
    try {
      if (article.type == "1") {
        return {
          match: article.matchId,
          analysis: JSON.parse(article?.matchInfo).analysis,
        };
      }
    } catch {
      return null;
    }
  }, [article]);

  const handleClickUser = () => {
    if (article?.user?._id) {
      router.push(`/user/${article?.user?._id}`);
    }
  };
  const handleCreateView = async (postId: string) => {
    let userId = article?.createdBy;
    const result = await createView({
      postId,
      userId,
      type: "tips",
    });
  };
  const handleClickItem = (item: any) => {
    handleCreateView(item._id);
    router.push({
      pathname: `/bai-viet/${item._id}`,
      query: { type: "tips" },
    });
  };
  return (
    // <>
    //   <div className="flex w-full gap-2">
    //     {isName && (
    //       <Avatar
    //         onClick={handleClickUser}
    //         className="min-w-[36px] h-9"
    //         src={AvatarImg}
    //       />
    //     )}
    //     <div className="w-full">
    //       {isName && (
    //         <div
    //           onClick={handleClickUser}
    //           className="flex items-center gap-2 text-green-500 cursor-pointer"
    //         >
    //           <span className="font-bold">{article.user?.fullName} </span>
    //           {true ? (
    //             <div className="h-3 p-2 text-xs text-orange-300 bg-orange-100 display-center">
    //               Won {0 + "/" + 0}
    //             </div>
    //           ) : (
    //             ""
    //           )}
    //         </div>
    //       )}
    //       <Link href={`/article/${article.slugs}`}>
    //         {dataMatch ? (
    //           <div className="flex flex-col px-4 py-3 cursor-pointer bg-gray-50 rounded-xl">
    //             <span className="text-lg font-bold md:text-sm">
    //               {article.title}
    //             </span>
    //             <span className="text-xs text-gray-600">
    //               <span className="mr-2">{dataMatch?.match.leagueName}</span>
    //               <span className="mr-1">
    //                 ({moment(dataMatch.match.matchTime * 1000).format("L")}
    //               </span>
    //               <span>
    //                 {moment(dataMatch.match.matchTime * 1000).format("HH:mm")})
    //               </span>
    //             </span>
    //             <div className="flex gap-3 mt-2 md:mt-1 md:text-xs">
    //               <div className="">
    //                 {dataMatch.match.teamA.name} <span className="mx-1">-</span>
    //                 {dataMatch.match.teamB.name}
    //               </div>
    //             </div>
    //           </div>
    //         ) : (
    //           <div className="text-base font-bold md:text-sm">
    //             {article.title}
    //           </div>
    //         )}
    //       </Link>

    //       <div className="flex justify-between mt-2">
    //         <div className="">
    //           {moment(article.createdTime).fromNow()}
    //           {!isGroup && (
    //             <>
    //               {" "}
    //               Nhóm : <span className="text-green-500">⭐Tips 5 Sao⭐</span>
    //             </>
    //           )}
    //         </div>
    //         <div className="flex gap-4 text-gray-400">
    //           <span className="flex items-center gap-2">
    //             <CgEye /> {article.numView}
    //           </span>
    //           <span className="flex items-center gap-2">
    //             <BiLike /> {article.numLike}
    //           </span>
    //           <span className="flex items-center gap-2">
    //             <FaRegCommentDots /> {article.comment?.length}
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <div
        className="flex flex-col w-full mb-4 cursor-pointer md:items-center md:justify-between md:flex-row"
        onClick={() => handleClickItem(article)}
      >
        <div className="flex items-start gap-2">
          <img
            src={AvatarImg}
            alt=""
            className="flex-shrink-0 object-cover w-8 h-8 rounded-full cursor-pointer"
            onClick={handleClickUser}
          />
          <div>
            <div className="flex items-center gap-1">
              <h3>{article.user?.fullName}</h3>
              <span className="p-1 text-sm text-orange-400 rounded-md bg-orange-300/70">
                Won 3/4
              </span>
            </div>
            <p className="max-w-[300px] truncate text-sm font-semibold">
              {article.title}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold">
                {" "}
                {moment(article.createdAt).fromNow()}
              </p>
              <p className="text-sm font-bold">
                {!isGroup && (
                  <>
                    Nhóm :
                    <span className="text-green-500">
                      {article.groupId?.name}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-gray-400">
          <span className="flex items-center gap-2">
            <CgEye /> {article.numView}
          </span>
          <span className="flex items-center gap-2">
            <BiLike /> {article.like.length > 0 ? article.like.length : 0}
          </span>
          <span className="flex items-center gap-2">
            <FaRegCommentDots /> {article.comment?.length}
          </span>
        </div>
      </div>
    </>
  );
}
