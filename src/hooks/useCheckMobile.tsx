import React, { useEffect, useState } from 'react'

function useCheckMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(typeof window !== "undefined" && window.innerWidth <= 768)
    }, [])

    return isMobile;
}

export default useCheckMobile