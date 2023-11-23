import { Button, Input, Result } from "antd";
import { useState, useEffect } from "react";
import { SearchOutlined, SmileOutlined } from "@ant-design/icons";
import { ImFileText2 } from "react-icons/im";
import { BiBarChartAlt2 } from "react-icons/bi";
import { AiOutlineMessage, AiOutlineFilePpt } from "react-icons/ai";
import { getUserGroupId } from "@/stores/customer.stores";
import { useRouter } from "next/router";
const GroupMember = ({}: any) => {
  const router = useRouter();
  const [active, setActive] = useState<number>(0);
  const [userGroup, setUserGroup] = useState<any>([]);
  const [search, setSearch] = useState<any>("");
  const getUserGroupIds = async () => {
    const data = await getUserGroupId(router.query?.id, search);
    setUserGroup(data?.data);
  };

  useEffect(() => {
    if (router.query?.id) {
      getUserGroupIds();
    }
  }, [router.query?.id]);

  const handleSearch = () => {
    getUserGroupIds();
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between w-full gap-2 ">
        <div className="flex flex-wrap items-center gap-2">
          <div
            className={`py-1 px-2 border rounded-lg cursor-pointer bg-gray-300/60 font-bold hover:text-white hover:bg-green-500 ${
              active === 0 ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setActive(0)}
          >
            Tất cả
          </div>
          <div
            className={`py-1 px-2  border rounded-lg cursor-pointer bg-gray-300/60 font-bold hover:text-white hover:bg-green-500  ${
              active === 1 ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setActive(1)}
          >
            Quản trị viên
          </div>
          <div
            className={`py-1 px-2  border rounded-lg cursor-pointer bg-gray-300/60 font-bold hover:text-white hover:bg-green-500 ${
              active === 2 ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setActive(2)}
          >
            Chuyên gia
          </div>
          <div
            className={`py-1 px-2  border rounded-lg cursor-pointer bg-gray-300/60 font-bold hover:text-white hover:bg-green-500 ${
              active === 3 ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setActive(3)}
          >
            Thành viên
          </div>
        </div>
        <div className="flex items-center">
          <Input
            className=""
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
          <Button
            icon={<SearchOutlined />}
            className="GroupUser_header_right_button"
            onClick={handleSearch}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>

      <div className="w-full">
        {active === 0 && (
          <>
            {userGroup &&
              userGroup?.map((item: any, index: number) => {
                
                return (
                  <div
                    key={item?._id}
                    className="flex flex-col lg:justify-between lg:items-center lg:flex-row"
                  >
                    <div className="flex items-center flex-1 gap-2 py-3">
                      {item?.avatar ? (
                        <img
                          src={item?.avatar}
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
                          {item?.email?.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <div className="font-bold truncate">{item?.email}</div>
                    </div>

                    <div className="flex items-center flex-1 w-full gap-2">
                      <div className="flex items-center gap-1">
                        <ImFileText2></ImFileText2>
                        {item?.post?.length > 0 ? item?.post?.length : 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <AiOutlineMessage></AiOutlineMessage>
                        214
                      </div>
                      <div className="flex items-center gap-1">
                        <AiOutlineFilePpt></AiOutlineFilePpt>
                        214
                      </div>
                      <div className="flex items-center gap-1">
                        <BiBarChartAlt2></BiBarChartAlt2>
                        214
                      </div>
                    </div>
                    <div className="flex-1 font-bold text-right text-green-500">
                      Quản trị viên
                    </div>
                  </div>
                );
              })}
          </>
        )}

        {active === 1 && (
          <Result
            icon={<SmileOutlined />}
            title="Chưa có thành viên"
            // extra={<Button type="primary">Next</Button>}
          />
        )}
        {active === 2 && (
          <Result
            icon={<SmileOutlined />}
            title="Chưa có thành viên"
            // extra={<Button type="primary">Next</Button>}
          />
        )}
        {active === 3 && (
          <Result
            icon={<SmileOutlined />}
            title="Chưa có thành viên"
            // extra={<Button type="primary">Next</Button>}
          />
        )}
      </div>
    </>
  );
};

export default GroupMember;
