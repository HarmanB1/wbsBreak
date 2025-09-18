import { NavLink } from "react-router";
export const Features = () => {
  return (
    <div className="flex flex-col items-center  bg-orange-50 w-full min-h-screen">
      <h1 className="flex   text-xl">
        Transfrom your devolper Jounry
      </h1>
      <h2 className="flex items-center px-6 text-center">
        [App Name] helps solo developers plan, organize, and execute projects
        like a full Agile team. Turn ideas into structured work breakdowns,
        prioritize tasks, and track progress effortlessly — all while simulating
        Scrum workflows. Stay focused, work smarter, and move your projects from
        concept to completion with the guidance of your virtual Scrum Master.
      </h2>
      <h3>Timeline</h3>
      <h1>feature 1</h1>

      <h1>Ready to get started?</h1>
          <NavLink
            to="/login"
            className="border-2 p-4 rounded-lg border-red-300 bg-orange-600 text-white"
          >
            Sign Up Now
          </NavLink>
    </div>
  );}
