import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, message } from "antd";
import Link from "next/link";
import { IGroup } from "@/interface";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/redux";
import { CDN_URL } from "@/config/config";
import { createUserGroup } from "@/stores/customer.stores";
const ModalTips = ({
  open,
  setIsOpen,
  groups,
  handleCreateGroup,
  userGroupInfo,
}: {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  groups: IGroup[];
  handleCreateGroup: any;
  userGroupInfo: any;
}) => {
  const groupNotJoin = groups.filter((item) => {
    if (!checkElementsInArray(userGroupInfo, item._id)) {
      return item;
    }
  });
  function checkElementsInArray(arr1: any, element: string) {
    let result = false;
    for (let i = 0; i < arr1?.length; i++) {
      if (arr1[i]._id === element) {
        result = true;
      }
    }
    return result;
  }
  return (
    <>
      <Modal open={open} closable={false}>
        <div className="md:px-2">
          <div className="flex items-center justify-between">
            <h2 className="py-4 text-2xl font-bold ">
              Chọn một nhóm để đăng bài
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {userGroupInfo?.map((item: any) => (
            <div className="flex flex-col flex-wrap mt-4 gap-x-2">
              <div className="flex items-center w-full gap-x-2 ">
                <div className="flex-shrink-0 w-8 h-8 lg:h-10 lg:w-10">
                  <img
                    src={`${CDN_URL}/${item.avatar}`}
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <h3 className="text-xs font-bold md:text-sm">{item.name}</h3>
                <h3>
                  <Link
                    href=""
                    className="text-xs font-bold text-green-500 sm:text-sm"
                  >
                    Thành viên
                  </Link>
                </h3>
              </div>
              <div className="flex items-center justify-between py-2 border-b md:gap-x-2">
                <span className="text-xs md:text-sm">
                 {item?.description}
                </span>
                <Link
                  href={`/group/${item?._id}`}
                  className="inline-block px-2 py-1 text-xs text-black rounded-lg md:text-sm"
                >
                  Gửi bài
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="py-4 font-bold text-center border-b cursor-pointer hover:text-green-500">
          Xem Thêm
        </div>
        {groupNotJoin.map((item) => (
          <div className="flex flex-col flex-wrap mt-4 gap-x-2">
            <div className="flex items-center w-full gap-x-2 ">
              <div className="flex-shrink-0 w-8 h-8 lg:h-10 lg:w-10">
                <img
                  src={`${CDN_URL}/${item.avatar}`}
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <h3 className="text-xs font-bold md:text-sm">{item.name}</h3>
              <div className="flex items-center gap-x-2">
                <span className="flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  1.7k
                </span>
                <span className="flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                  1.7k
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 md:gap-x-2">
              <span className="text-xs md:text-sm">{item.description}</span>
              <Link
                onClick={() => handleCreateGroup(item)}
                href=""
                className="inline-block px-2 py-1 text-xs text-black border rounded-lg md:text-sm"
              >
                Tham gia
              </Link>
            </div>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default ModalTips;
