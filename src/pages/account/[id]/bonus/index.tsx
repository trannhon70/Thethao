import { Avatar } from 'antd'
import React, { ReactNode } from 'react'
import LayoutAccount from '@/Layout/LayoutAccount';
import MainLayout from '@/Layout/MainLayout';

function Bonus() {

  return (
    <LayoutAccount>
        <div>bonus</div>
    </LayoutAccount>
  )
}

Bonus.getLayout = (pages:ReactNode) => {
  return <MainLayout>{pages}</MainLayout>
}

export default Bonus;
