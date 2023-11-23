import React from 'react'

function Tab({ childrenLeft, data, tabActive, setTabActive, className = "" }: { childrenLeft?: any, data: any, tabActive: any, setTabActive: any, className?: string }) {
    return (
        <div className="flex justify-between items-center border-b-2 border-green-700">
            <div className={`flex gap-2 ${className}`}>
                {data.map((i:any, idx: number) => (
                    <div onClick={() => setTabActive(idx)} key={i.id} className={`h-8 w-24 flex items-center justify-center ${tabActive === idx ? " bg-green-700 text-white" : "bg-gray-100"} font-bold text-xs rounded-t-lg display-center cursor-pointer`}>{i.name}</div>
                ))}
            </div>
            <div>
                {childrenLeft}
            </div>
        </div>
    )
}

export default Tab;