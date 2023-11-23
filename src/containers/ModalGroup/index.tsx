import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Input, Radio, Space, Modal } from "antd";
const ModalGroup = ({ isModalOpen, handleOk, handleCancel }: any) => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <Modal
        title="Quyền hạn"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
      >
        <div style={{fontSize:'20px', paddingBottom:'10px', fontWeight:'bold', paddingTop:'20px'}}>
            Đăng bài
        </div>
        <Radio.Group style={{marginLeft:'20px'}} onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Quản trị viên</Radio>
            <Radio value={2}>Thành viên nhóm</Radio>
            <Radio value={3}>Tất cả mọi người</Radio>
            
          </Space>
        </Radio.Group>
        <div style={{fontSize:'20px', paddingBottom:'10px', fontWeight:'bold', paddingTop:'20px'}}>
            Bình luận
        </div>
        <Radio.Group style={{marginLeft:'20px'}} onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>quản trị viên</Radio>
            <Radio value={2}>Thành viên nhóm</Radio>
            <Radio value={3}>Tất cả mọi người</Radio>
            
          </Space>
        </Radio.Group>
      </Modal>
    </>
  );
};

export default ModalGroup;
