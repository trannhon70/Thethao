import { CDN_URL } from "@/config/config";
import { IGroup } from "@/interface";
import React from "react";

interface IProps {
  avatar?: string;
  name?: string;
  memberQuantity?: number;
  topicQuantity?: number;
  isActive?: boolean;
  handleCreateGroup: any;
  item: any;
}

const TipsGroupRankingItem = ({
  avatar = "https://source.unsplash.com/random",
  name = "group 1",
  memberQuantity = 11,
  topicQuantity = 12,
  isActive = false,
  handleCreateGroup,
  item,
}: IProps) => {
  return (
    <div className="flex flex-col py-3 border-b md:justify-between md:items-end last:border-0 md:flex-row">
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-9 h-9">
          <img
            src={`${CDN_URL}/${avatar}`}
            alt=""
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold md:text-base">{name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-gray-400 md:text-sm">
              Thành viên{" "}
              <span className="font-bold text-green-600">
                {item?.member?.length}
              </span>
            </p>
            <p className="text-xs font-semibold text-gray-400 md:text-sm">
              Chủ đề mới{" "}
              <span className="text-green-600">{item?.post.length}</span>
            </p>
          </div>
        </div>
      </div>
      {isActive ? (
        <div className="mt-1 text-xs text-green-500 md:mt-0 md:text-sm">
          Thành viên
        </div>
      ) : (
        <button
          className="p-1 text-sm border rounded-md hover:bg-green-400 hover:text-white"
          onClick={() => handleCreateGroup(item)}
        >
          Tham gia
        </button>
      )}
    </div>
  );
};

export default TipsGroupRankingItem;
