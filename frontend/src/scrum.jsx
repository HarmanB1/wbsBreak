import { useState } from "react";

export const Scrum = () => {
  const[input, setInput] = useState('');
  return (
    <div className="flex flex-col h-90vh max-w-2xl mx-auto border border-gray-300 ">
      {/** interface */}
      <div>
        sfsj

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
