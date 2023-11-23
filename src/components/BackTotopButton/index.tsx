import { FloatButton } from 'antd'
import React from 'react'

function ButtonBackToTop() {
    const onClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }

    return (
        <FloatButton.BackTop className='btn-back-to-top' onClick={onClick} />
    )
}

export default ButtonBackToTop