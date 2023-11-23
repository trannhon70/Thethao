//@ts-nocheck
import { Table } from "antd";
import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from "react-icons/hi";
const RateOfFortune = ({ oddList }) => {

  const columns = [
    {
      title: "Công ty",
      dataIndex: "company",
      key: "company",
      width: 100,
      fixed: "center",
      render: (value) => <div style={{ color: "black" }}>{value}</div>,
    },
    {
      title: "Sớm",
      children: [
        {
          title: "Tài",
          width: 150,
          dataIndex: "overUnder",
          key: "overUnder",
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialOver}
              </div>
              {/* {compareStringFloatOdds(
                value?.[0]?.initialOver,
                value?.[0]?.instantOver
              )} */}
            </div>
          ),
        },
        {
          title: "Kèo đấu",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialHandicap}
              </div>
              {/* {compareStringFloatOdds(
                value?.[0]?.initialHandicap,
                value?.[0]?.instantHandicap
              )} */}
            </div>
          ),
        },
        {
          title: "Xỉu",
          dataIndex: "overUnder",
          key: "guest",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {value?.[0]?.initialUnder}
              </div>
              {/* {compareStringFloatOdds(
                value?.[0]?.initialAway,
                value?.[0]?.instantAway
              )} */}
            </div>
          ),
        },
      ],
    },
    {
      title: "Live",
      children: [
        {
          title: "Tài",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {/* {value?.[0]?.initialOver} */}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialOver,
                value?.[0]?.instantOver
              )}
            </div>
          ),
        },
        {
          title: "Kèo đấu",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {/* {value?.[0]?.initialHandicap} */}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialHandicap,
                value?.[0]?.instantHandicap
              )}
            </div>
          ),
        },
        {
          title: "Xỉu",
          dataIndex: "overUnder",
          key: "overUnder",
          width: 150,
          render: (value) => (
            <div className="result">
              <div style={{ width: "60%", textAlign: "right" }}>
                {/* {value?.[0]?.initialUnder} */}
              </div>
              {compareStringFloatOdds(
                value?.[0]?.initialUnder,
                value?.[0]?.instantUnder
              )}
            </div>
          ),
        },
      ],
    },
    {
      title: "Xem thêm",
      width: 130,
      render: () => {
        return (
          <div className="seeMore">
            <CgSearch size={24} />
          </div>
        );
      },
    },
  ];
  const compareStringFloatOdds = (initial, instant) => {
    if (initial !== undefined) {
      let a = parseFloat(initial).toFixed(2);
      let b = parseFloat(instant).toFixed(2);
      if (a > b) {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="oddDowns">{instant} </div>
            <HiOutlineArrowSmDown size={16} style={{ color: "red" }} />
          </div>
        );
      } else if (a == b) {
        return (
          <div className="customOddUp">
            <div className="oddUp" style={{ width: "60%", textAlign: "right" }}>
              {instant}{" "}
            </div>
          </div>
        );
      } else {
        return (
          <div className="customOddUp">
            <div
              className="oddUp"
              style={{ width: "60%", textAlign: "right", color: "green" }}
            >
              {instant}{" "}
            </div>
            <HiOutlineArrowSmUp
              size={16}
              style={{ color: "green", marginLeft: "2px" }}
            />
          </div>
        );
      }
    }
  };
  return (
    <Table
      columns={columns}
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      }
      dataSource={oddList}
      bordered
      style={{ color: "black" }}
      size="small"
      pagination={false}
    />
  );
};
export default RateOfFortune;
