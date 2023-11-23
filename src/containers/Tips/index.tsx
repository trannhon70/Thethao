import Link from "next/link";
import { Fragment } from "react";

const ContainerTips = ({
    dataToday ,onClickTournament ,dataTomorrow, matchId, item, detail, setActive, setRatio, setTypeOdd,active, setTitle,setDescription, toggle ,isOpened,handleSend
}: any) =>{
    const formatDate = (unixTimestamp: any) => {
        const date = new Date(unixTimestamp * 1000);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
    
        const formattedDateTime = `${day}/${month}/${year} ${hour}:${minute}`;
    
        return formattedDateTime;
      };
    return <Fragment>
    <div className="col-span-7 md:col-span-3">
      <div className="flex items-center justify-between  bg-[#f1f1f1] w-full px-3 py-2">
        <div className="flex items-center gap-x-2">
          <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 text-sm text-white bg-green-600 rounded-full">
            1
          </span>
          <h3 className="ml-2 font-semibold text-md lg:text-base">
            Chọn giải đấu
          </h3>
        </div>
        <div className="flex items-center gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
        </div>
      </div>
      <div className="w-full px-3 py-2 overflow-auto bg-gray-100/60">
        <div className="max-h-[400px]">
          {dataToday &&
            dataToday.map((item: any, index: number) => {
              return (
                <div key={item._id} className="mt-2 first:mt-0">
                  <h4 className="p-1 text-sm font-bold text-black border-b bg-gray-400/70">
                    {item?.leagueName}
                  </h4>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-between p-1 border-b last:border-0">
                      <div className="flex flex-grow">
                        <div className="flex flex-col pr-2 text-xs font-bold border-r-2">
                          <span>{formatDate(item?.matchTime)}</span>
                          {/* <span>16:00</span> */}
                        </div>
                        <div className="flex flex-col pr-2 ml-2 text-xs font-bold">
                          <p>{item?.awayName}</p>
                          <p>{item.homeName}</p>
                        </div>
                      </div>
                      <svg
                        onClick={() => onClickTournament(item)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="flex-shrink-0 w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}

          {dataTomorrow &&
            dataTomorrow.map((item: any, index: number) => {
              return (
                <div key={item._id} className="mt-2 first:mt-0">
                  <h4 className="p-1 text-sm font-bold text-black border-b bg-gray-400/70">
                    {item?.leagueName}
                  </h4>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-between p-1 border-b last:border-0">
                      <div className="flex flex-grow">
                        <div className="flex flex-col pr-2 text-xs font-bold border-r-2">
                          <span>{formatDate(item?.matchTime)}</span>
                          {/* <span>16:00</span> */}
                        </div>
                        <div className="flex flex-col pr-2 ml-2 text-xs font-bold">
                          <p>{item?.awayName}</p>
                          <p>{item.homeName}</p>
                        </div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="flex-shrink-0 w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
    <div className="col-span-7 bg-white md:col-span-4">
      <div className="flex items-center gap-x-2">
        <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 text-sm text-white bg-green-600 rounded-full">
          2
        </span>
        <h3 className="ml-2 font-semibold text-md lg:text-base">
          Xác nhận lựa chọn
        </h3>
      </div>
      {matchId ? (
        <div className="mt-2 ">
          <div className="flex justify-between">
            <Link href="">
              <h3 className="w-full underline">
                {item?.awayName} VS {item?.homeName}
              </h3>
            </Link>
            <Link href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="flex-shrink-0 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          </div>
          <div className="grid gap-5 mt-2 sm:grid-cols-2 md:grid-cols-3 ">
            {/* {
              detail?.europeOdds.length === 0 &&  detail?.handicap.length === 0 && detail?.overUnder.length === 0 ? <div className="text-center">
                Chưa có thông tin 
              </div> : ''
            } */}
            {detail?.europeOdds &&
              detail?.europeOdds.map((item: any, index: number) => {
                const data = item?.split(",");
                return index === 0 ? (
                  <>
                    <div onClick={() => (setActive(1), setRatio(data?.[2]), setTypeOdd(1) )  } className={active === 1? "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 bg-green-600 text-white" : "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 hover:bg-green-600 hover:text-white"}>
                      Chủ {data?.[2]}
                    </div>
                    <div onClick={() => (setActive(2), setRatio(data?.[3]),  setTypeOdd(1))}  className={active === 2? "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 bg-green-600 text-white" : "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 hover:bg-green-600 hover:text-white"}>
                      Hòa {data?.[3]}
                    </div>
                    <div onClick={() => (setActive(3), setRatio(data?.[3]))}  className={active === 3? "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 bg-green-600 text-white" : "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 hover:bg-green-600 hover:text-white"}>
                      Khách {data?.[4]}
                    </div>
                  </>
                ) : (
                  ""
                );
              })}
            {detail?.handicap &&
              detail?.handicap?.map((item: any, index: number) => {
                const data = item?.split(",");
                return index === 0 ? (
                  <>
                    <div onClick={() => (setActive(4), setRatio(data?.[2]),   setTypeOdd(2))}  className={active === 4? "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 bg-green-600 text-white" : "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 hover:bg-green-600 hover:text-white"}>
                      Chủ {data?.[2]}
                    </div>
                    <div className="px-2 py-1 font-semibold text-center bg-gray-500 border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 ">
                      HDP {data?.[3]}
                    </div>
                    <div onClick={() => (setActive(5), setRatio(data?.[4]))}  className={active === 5? "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 bg-green-600 text-white" : "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 hover:bg-green-600 hover:text-white"}>
                      Khách {data?.[4]}
                    </div>
                  </>
                ) : (
                  ""
                );
              })}

            {detail?.overUnder &&
              detail?.overUnder.map((item: any, index: number) => {
                const data = item?.split(",");
                return index === 0 ? (
                  <>
                    <div onClick={() => (setActive(6), setRatio(data?.[2]),  setTypeOdd(3))}  className={active === 6? "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 bg-green-600 text-white" : "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 hover:bg-green-600 hover:text-white"}>
                      Tài {data?.[2]}
                    </div>
                    <div className="px-2 py-1 font-semibold text-center bg-gray-500 border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3">
                      T/X {data?.[3]}
                    </div>
                    <div onClick={() => (setActive(7), setRatio(data?.[4]),   setTypeOdd(3))}  className={active === 7? "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 bg-green-600 text-white" : "px-2 py-1 font-semibold text-center border-2 border-black rounded-lg cursor-pointer md:py-2 md:px-3 hover:bg-green-600 hover:text-white"}>
                      Xỉu {data?.[4]}
                    </div>
                  </>
                ) : (
                  ""
                );
              })}
          </div>
        </div>
      ) : (
        <div className="mt-2 text-center">
          Vui lòng chọn giải đấu
        </div>
      )}

      <div className="flex items-center mt-2 gap-x-2">
        <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 text-sm text-white bg-green-600 rounded-full">
          3
        </span>
        <h3 className="ml-2 font-semibold text-md lg:text-base">
          Nội dung
        </h3>
      </div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="w-full p-2 mt-2 border-2 rounded-lg outline-none"
        placeholder="Vui lòng nhập tiêu đề"
      />
      <textarea
        name=""
        id=""
        className="w-full outline-none md:min-h-[300px] border-2 rounded-lg p-2 mt-3"
        placeholder="Vui lòng nhập nội dung"
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="flex items-center mt-2 gap-x-2">
        <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 text-sm text-white bg-green-600 rounded-full">
          4
        </span>
        <h3 className="ml-2 font-semibold text-md lg:text-base">
        Đặt quyền đọc
        </h3>
      </div>
      <div className="flex flex-wrap mt-2 gap-x-3">
        <div onClick={toggle} className={isOpened === true ? "px-3 py-2 font-bold text-center border-2 border-white rounded-lg cursor-pointer bg-green-600  text-white" : "px-3 py-2 font-bold text-center border-2 border-black rounded-lg cursor-pointer"}>
          Miễn phí
        </div>
      </div>
      <button onClick={handleSend} className="w-full px-3 py-2 mt-3 text-white bg-green-600 rounded-lg hover:bg-green-700">
        Gửi bài
      </button>
    </div>      
    </Fragment>

}

export default ContainerTips