import React from 'react'

function TabM({data = [], tabActive, setTabActive}: {data: any, tabActive: any, setTabActive: any}) {
  return (
    <div className="w-full text-sm font-bold text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 bg-white">
    <div className="flex justify-around w-full">
      {data.map((item:any, idx:number) => (
        <div onClick={() => setTabActive(idx)} key={item.id} className={`flex-1 display-center text-xs cursor-pointer ${tabActive == idx? "text-green-600 border-b-2 border-green-600": "border-b  hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} block p-3 rounded-t-lg`}>
          {item.name}
        </div>
      ))}
  
    </div>
  </div>
  )
}

export default TabM