import { useState } from "react";

export const Scrum = () => {
  const[input, setInput] = useState('');
  return (
    <div className="flex flex-col h-90vh max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-md ">
      {/** interface */}
      <div className="bg-blue-600 text-white px-4 py-4 font-bold">
       Chat

      </div>

      {/**input */}
      <div>
        <input 
        className="focus:outline-none "
        type="text"
        placeholder="type your message to scrum master" 
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        
        />

      </div>
    </div>

  )
};
