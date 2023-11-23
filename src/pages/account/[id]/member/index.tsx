import { Divider, Modal } from 'antd'
import React, { ReactNode } from 'react'
import styled from 'styled-components';
import LayoutAccount from '@/Layout/LayoutAccount';
import { SlLock } from 'react-icons/sl'
import { useState } from 'react';
import useCheckMobile from '@/hooks/useCheckMobile';
import MainLayout from '@/Layout/MainLayout';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/redux';
import { setChangePasswordModal } from '@/redux/layoutSlice';
function MemberInfo() {
  const dispatch = useDispatch()
  const isMobile = useCheckMobile();
  const layout = useSelector((state:AppState) => state.layout)

  const closeChangePasswordModal = () => {
    dispatch(setChangePasswordModal(false))
  }

  const openChangePasswordModal = () => {
    dispatch(setChangePasswordModal(true))
  }
  const Content = () => {
    return (
      <div className='page-container my-8'>
        <div className="grid grid-cols-2 md:grid-cols-1">
          <Modal
            open={layout.changePasswordModal}
            title="Đổi mật khẩu"
            onCancel={closeChangePasswordModal}
            cancelButtonProps={{ className: 'button-close-login-modal' }}
            okButtonProps={{ className: 'button-ok-login-modal' }}
            className="max-w-md">
            <ChangePasswordModal />
          </Modal>
          <Button>
            <div className="flex items-center gap-3">
              <SlLock className="text-4xl" />
              <div>
                <div className="font-bold text-start">Mật khẩu</div>
                <div className="text-xs">Đổi mật khẩu</div>
              </div>
            </div>
            <div className="btn-child" onClick={openChangePasswordModal}>Sửa đổi</div>
          </Button>
        </div>
        {/* <ModalChangePassword isOpen={isShowChangePassword} onClose={() => setIsShowChangePassword(false)}/> */}
      </div>
    )
  }

  if (isMobile) {
    return (
      <div style={{ paddingTop: 110 }} className="body">
        <h1 className="title-heading">Thông tin cá nhân</h1>
        <Divider />
        {Content()}
      </div>
    )
  }
  return (
    <LayoutAccount>
      <div className="font-bold text-xl">Thông tin cá nhân</div>
      <Divider />
      {Content()}

    </LayoutAccount>
  )
}

MemberInfo.getLayout = (pages: ReactNode) => {
  return <MainLayout>{pages}</MainLayout>
}

export default MemberInfo;
const Button = styled.div`
    justify-content: space-between;
    text-align: center;
    border-radius: 4px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    padding: 10px;
    min-height: 50px;
    display: flex;
    align-items: center;
    margin: 1%;
    flex: 0 0 48%;
    border: solid 1px #ddd;
    background: #f7f7f7;
    background: -o-linear-gradient(top, #ffffff, #f7f7f7);
    background: linear-gradient(to bottom, #ffffff, #f7f7f7);
    .btn-child {
      background: #397f19;
      color: #fff;
      border-radius: 5px;
      min-width: 50px;
      height: 28px;
      line-height: 28px;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
    }
`;
