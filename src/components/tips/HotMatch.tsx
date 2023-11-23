import React from "react";

interface IProps {
  firstTeam: string;
  firstTeamImage: string;
  matchName: string;
  date: string;
  time: string;
  tips: number;
  secondTeam: string;
  secondTeamImage: string;
}
const HotMatch = (props: IProps) => {
  const {
    firstTeam,
    firstTeamImage,
    matchName,
    date,
    time,
    tips,
    secondTeam,
    secondTeamImage,
  } = props;
  return (
    <div className="flex items-center justify-around py-2 mt-4 lg:py-4 border-y">
      <div className="flex items-center gap-x-2">
        <h3 className="text-xs text-center lg:text-sm w-[100px] lg:w-[168px]">
          {firstTeam}
        </h3>
        <img
          src={firstTeamImage}
          alt={firstTeam}
          className="object-cover w-12 h-12"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-xs text-center lg:text-sm w-[100px] lg:w-[155px]">
        <span>{matchName}</span>
        <span className="text-xs text-center lg:text-sm">
          {date} {time}
        </span>
        <span className="text-xs py-1 px-2 rounded-md bg-[#397f19] text-white">
          {tips} Tips
        </span>
      </div>
      <div className="flex items-center gap-x-2">
        <img
          src={secondTeamImage}
          alt={secondTeam}
          className="object-cover w-12 h-12"
        />
        <h3 className="text-xs text-center lg:text-sm w-[100px] lg:w-[168px]">
          {secondTeam}
        </h3>
      </div>
    </div>
  );
};

export default HotMatch;
