import { useState } from "react";

export const Scrum = () => {
  const[input, setInput] = useState('');
  const[messages, setMessages] = useState([]);

  const sendMessage= ()=>{
    if(input.trim()==='') return;
    setMessages([...messages, {text:input, owner: "client"}]);
    setInput('');

    
  };

  const handlerKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-2xl mx-auto border border-gray-300 rounded-lg shadow-md ">
      {/** interface */}
      <div className="bg-blue-600 text-white px-4 py-4 font-bold">Chat</div>

      {/** messages */}

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
        {messages.length === 0 && (
          <div className="text-gray-400">no message</div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className="flex justify-end">
            <div className="bg-blue-100 px-4 py-2 rounded-lg text-sm shadow"></div>
            {msg.text}
          </div>
        ))}
      </div>

      {/**input */}
      <div className="flex items-center border-t border-gray-300 p-3 bg-gray-50">
        <input
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
          placeholder="type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handlerKey}
        />
      </div>
      <button onClick={()=>{sendMessage()}}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send

      </button>
    </div>
  );
};
