import { useEffect, useState } from "react";

export const Card = ({name, description, date, imgSrc })=>{

    const[option, setOption] = useState(false);

    return (
      <div className="relative big-white rounded-lg shadow-md overflow-hidden w-full h-full">
        <button
          className="absolute top-2 right-2 px-2 py-1 rounded hover:bg-gray-200  focus:outline-none"
          onClick={() => setOption(!option)}
        >
          ⋮⋮
        </button>

        {/**option drop down */}
        {option && (
          <div className="absolute top-8 right-2 bg-white border rounded shadow-md z-10 flex flex-col">
            <button className="px-4 py-2 hover:bg-gray-100">hide</button>
            <button className="px-4 py-2 hover:bg-gray-100">custom</button>
            <button className="px-4 py-2 text-red-600 hover:bg-gray-100">
              delete
            </button>
          </div>
        )}
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2">{name}</h1>
          <h2 className="text-gray-700 font-semibold mb-1">Description</h2>
          <p className="text-gray-600 mb-3 line-clamp-3">{description}</p>
          <p className="text-sm text-gray-500">Date: {date}</p>
        </div>
      </div>
    );
}