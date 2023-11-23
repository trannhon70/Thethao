import { Fragment, useEffect, useState } from "react";
import { CiYoutube } from "react-icons/ci";
import { AiOutlineEye, AiOutlineMessage, AiOutlineLike } from "react-icons/ai";
import { Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import {
  getAllGroupIdDiscus,
  getAllGroupIdTips,
  getAllGroupTipDiscussionId,
} from "@/stores/group.stores";
import { useRouter } from "next/router";
import moment from "moment";
import Link from "next/link";
import { GiCutDiamond } from "react-icons/gi";
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const GroupHome = ({}: any) => {
  const router = useRouter();
  const [active, setActive] = useState<number>(0);
  const [allData, setAllData] = useState<any>([]);
  const [tipsData, setTipsData] = useState<any>([]);
  const [discusData, setDiscusData] = useState<any>([]);

  const getAllGroupTipDiscussionIds = async () => {
    const dataRef = {
      groupId: router.query?.id,
    };
    const data = await getAllGroupTipDiscussionId(dataRef);
    setAllData(data);
  };
  // console.log(allData);

  const getAllGroupIdTip = async () => {
    const dataRef = {
      groupId: router.query?.id,
    };
    const data = await getAllGroupIdTips(dataRef);
    setTipsData(data);
  };

  const getAllGroupIdDiscu = async () => {
    const dataRef = {
      groupId: router.query?.id,
    };
    const data = await getAllGroupIdDiscus(dataRef);
    setDiscusData(data);
  };
  useEffect(() => {
    if (router.query?.id) {
      if (active === 0) {
        getAllGroupTipDiscussionIds();
      }
      if (active === 1) {
        getAllGroupIdTip();
      }
      if (active === 2) {
        getAllGroupIdDiscu();
      }
    }
  }, [router.query, active]);

  const handleClickItem = (item: any) => {
    if (item?.ratio) {
      router.push({
        pathname: `/bai-viet/${item._id}`,
        query: { type: "tips" },
      });
    } else {
      router.push({
        pathname: `/bai-viet/${item._id}`,
        query: { type: "discus" },
      });
    }
  };
  return (
    <div id="GroupHome">
      <div className="GroupHome_header">
        <div className="GroupHome_header_left">
          <div className="GroupHome_header_left_button">
            <button
              className={active === 0 ? "active" : ""}
              onClick={() => setActive(0)}
            >
              Tất cả
            </button>
          </div>
          <div className="GroupHome_header_left_button">
            <button
              className={active === 1 ? "active" : ""}
              onClick={() => setActive(1)}
            >
              Tips
            </button>
          </div>
          <div className="GroupHome_header_left_button">
            <button
              className={active === 2 ? "active" : ""}
              onClick={() => setActive(2)}
            >
              Thảo luận
            </button>
          </div>
        </div>
        <div className="GroupHome_header_right"></div>
      </div>
      <div className="GroupHome_main">
        {active === 0 && (
          <>
            {allData.length ? (
              allData.map((item: any, index: number) => {
                return (
                  <div
                    onClick={() => handleClickItem(item)}
                    key={item?._id}
                    className="flex items-start gap-2"
                  >
                    <Fragment>
                      {/* <img src="https://img_cms.thscore.fun/uploadimg/avatar/0315/202203151635391813.jpeg" alt="" /> */}
                      {item?.customer?.avatar ? (
                        <img
                          src={
                            item?.customer?.avatar
                              ? item?.customer?.avatar
                              : item?.createdBy?.avatar
                          }
                          style={{ width: "55px", height: "55px" }}
                          alt=".."
                          className="w-[55px] h-[55px] rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div
                          style={{
                            backgroundColor: `${getRandomColor()}`,
                          }}
                          className="flex items-center justify-center flex-shrink-0 text-2xl text-white border-2 border-white rounded-full w-14 h-14"
                        >
                          {item?.customer?.email
                            ? item?.customer?.email?.charAt(0).toUpperCase()
                            : item?.createdBy?.email?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Fragment>
                    <div className="GroupHome_main_body_right">
                      <div className="GroupHome_main_body_right_title">
                        {item?.customer?.email
                          ? item?.customer?.email
                          : item?.createdBy?.email}
                      </div>
                      <div className="GroupHome_main_body_right_center">
                        <span
                          className="GroupHome_main_body_right_center_text"
                          dangerouslySetInnerHTML={{ __html: item?.content }}
                        ></span>
                        <div className="GroupHome_main_body_right_center_icon">
                          {item?.isFree ? (
                            <CiYoutube />
                          ) : (
                            <GiCutDiamond
                              style={{ fontSize: "25px", color: "#2de1d9" }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="GroupHome_main_body_right_bottom">
                        <div className="GroupHome_main_body_right_bottom_left">
                          {moment(item?.createdAt).fromNow()}
                        </div>
                        <div className="GroupHome_main_body_right_bottom_right">
                          <AiOutlineEye style={{ fontSize: "22px" }} />
                          <span>
                            {item?.view?.length > 0 ? item?.view?.length : 0}
                          </span>
                          <AiOutlineMessage style={{ fontSize: "22px" }} />
                          <span>
                            {item?.comment.length > 0
                              ? item?.comment.length
                              : 0}
                          </span>
                          <AiOutlineLike style={{ fontSize: "22px" }} />
                          <span>
                            {item?.like?.length > 0 ? item?.like?.length : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Result
                icon={<SmileOutlined />}
                title="Chưa có dữ liệu"
                // extra={<Button type="primary">Next</Button>}
              />
            )}
          </>
        )}
        {active === 1 && (
          <>
            {tipsData.length ? (
              tipsData.map((item: any, index: number) => {
                return (
                  <div
                    onClick={() => handleClickItem(item)}
                    key={item?._id}
                    className="flex items-start gap-2"
                  >
                    <Fragment>
                      {item?.createdBy?.avatar ? (
                        <img
                          src={item?.createdBy?.avatar}
                          style={{ width: "55px", height: "55px" }}
                          alt=".."
                          className="w-[55px] h-[55px] rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div
                          style={{
                            backgroundColor: `${getRandomColor()}`,
                          }}
                          className="flex items-center justify-center flex-shrink-0 text-2xl text-white border-2 border-white rounded-full w-14 h-14"
                        >
                          {item?.createdBy?.email?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </Fragment>
                    {/* <img src="https://img_cms.thscore.fun/uploadimg/avatar/0315/202203151635391813.jpeg" alt="" /> */}

                    <div className="GroupHome_main_body_right">
                      <div className="GroupHome_main_body_right_title">
                        {item?.createdBy?.email}
                      </div>
                      <div className="GroupHome_main_body_right_center">
                        <span
                          className="GroupHome_main_body_right_center_text"
                          dangerouslySetInnerHTML={{ __html: item?.content }}
                        ></span>
                        <div className="GroupHome_main_body_right_center_icon">
                          {item?.isFree ? (
                            <CiYoutube />
                          ) : (
                            <GiCutDiamond
                              style={{ fontSize: "25px", color: "#2de1d9" }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="GroupHome_main_body_right_bottom">
                        <div className="GroupHome_main_body_right_bottom_left">
                          {moment(item?.createdAt).fromNow()}
                        </div>
                        <div className="GroupHome_main_body_right_bottom_right">
                          <AiOutlineEye style={{ fontSize: "22px" }} />
                          <span>
                            {item?.view?.length > 0 ? item?.view?.length : 0}
                          </span>
                          <AiOutlineMessage style={{ fontSize: "22px" }} />
                          <span>
                            {item?.comment.length > 0
                              ? item?.comment.length
                              : 0}
                          </span>
                          <AiOutlineLike style={{ fontSize: "22px" }} />
                          <span>
                            {item?.like?.length > 0 ? item?.like?.length : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Result
                icon={<SmileOutlined />}
                title="Chưa có dữ liệu"
                // extra={<Button type="primary">Next</Button>}
              />
            )}
          </>
        )}
        {active === 2 && (
          <>
            {discusData.length ? (
              discusData.map((item: any, index: number) => {
                return (
                  <div
                    onClick={() => handleClickItem(item)}
                    key={item?._id}
                    className="flex items-start gap-2"
                  >
                    <Fragment>
                      {item?.customer?.avatar ? (
                        <img
                          src={item?.customer?.avatar}
                          style={{ width: "55px", height: "55px" }}
                          alt=".."
                          className="w-[55px] h-[55px] rounded-full flex-shrink-0"
                        />
                      ) : (
                        <span
                          style={{
                            backgroundColor: `${getRandomColor()}`,
                          }}
                          className="flex items-center justify-center flex-shrink-0 text-2xl text-white border-2 border-white rounded-full w-14 h-14"
                        >
                          {item?.customer?.email?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </Fragment>

                    {/* <img src="https://img_cms.thscore.fun/uploadimg/avatar/0315/202203151635391813.jpeg" alt="" /> */}

                    <div className="GroupHome_main_body_right">
                      <div className="GroupHome_main_body_right_title">
                        {item?.customer?.email}
                      </div>
                      <div className="GroupHome_main_body_right_center">
                        <span
                          className="GroupHome_main_body_right_center_text"
                          dangerouslySetInnerHTML={{ __html: item?.content }}
                        ></span>
                        <div className="GroupHome_main_body_right_center_icon">
                          {item?.isFree ? (
                            <CiYoutube />
                          ) : (
                            <GiCutDiamond
                              style={{ fontSize: "25px", color: "#2de1d9" }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="GroupHome_main_body_right_bottom">
                        <div className="GroupHome_main_body_right_bottom_left">
                          {moment(item?.createdAt).fromNow()}
                        </div>
                        <div className="GroupHome_main_body_right_bottom_right">
                          <AiOutlineEye style={{ fontSize: "22px" }} />
                          <span>
                            {item?.view?.length > 0 ? item?.view?.length : 0}
                          </span>
                          <AiOutlineMessage style={{ fontSize: "22px" }} />
                          <span>
                            {item?.comment.length > 0
                              ? item?.comment.length
                              : 0}
                          </span>
                          <AiOutlineLike style={{ fontSize: "22px" }} />
                          <span>
                            {item?.like?.length > 0 ? item?.like?.length : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Result
                icon={<SmileOutlined />}
                title="Chưa có dữ liệu"
                // extra={<Button type="primary">Next</Button>}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupHome;
