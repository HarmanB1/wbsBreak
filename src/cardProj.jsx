import { useEffect, useState } from "react";

export const Card = ({name, description, date, imgSrc })=>{

    const[option, setOption] = setOption(false);

    return (
      <div>
        <button
          className="hover:bg-slate-100"
          onClick={() => setOption(!option)}
        >
          {" "}
          ⋮⋮
        </button>
        {option && (
          <div>
            <button>hide</button>
            <button></button>
            <button>delete</button>
          </div>
        )}
        <div className="">
          <h1 className="text-xl font-bold mb-2">{name}</h1>
          <img src={imgSrc} alt="Card image" />
          <div>
            <h2>Description</h2>
            <p>{description}</p>
            <p>Date: {date}</p>
          </div>
        </div>
      </div>
    );
}