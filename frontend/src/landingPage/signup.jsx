import { useState } from "react";
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [setPassword, setPassword] = useState("");


  
  return(
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit}

    </div>
  );

};
