import { Avatar } from 'antd'
import React, { ReactNode } from 'react'
import LayoutAccount from '@/Layout/LayoutAccount';
import MainLayout from '@/Layout/MainLayout';

function Balance() {

  return (
    <LayoutAccount>
        <div>Balance</div>
    </LayoutAccount>
  )
}

Balance.getLayout = (pages:ReactNode) => {
  return <MainLayout>{pages}</MainLayout>
}

export default Balance;
