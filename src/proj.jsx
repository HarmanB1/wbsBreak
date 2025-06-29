
import { useEffect, useState } from "react";
import { Card } from "./cardProj";
export const Proj = () => {
  const [ projects, setProjects] = useState([]);

  useEffect(() => {
    const fakeProjects = [
      {
        id: 1,
        name: "Task Tracker",
        description: "A simple web app to track daily tasks and todos.",
        date: "2024-12-01",
        imgSrc: "https://source.unsplash.com/random/300x200?productivity",
      },
      {
        id: 2,
        name: "BugSquash",
        description: "A bug-tracking system for agile teams.",
        date: "2025-01-15",
        imgSrc: "https://source.unsplash.com/random/300x200?debug",
      },
      {
        id: 3,
        name: "KanbanPro",
        description: "A kanban-style board to organize sprints visually.",
        date: "2025-03-20",
        imgSrc: "https://source.unsplash.com/random/300x200?workflow",
      },
      {
        id: 4,
        name: "SprintSync",
        description: "Tool to manage sprints, tasks, and standups.",
        date: "2025-04-10",
        imgSrc: "https://source.unsplash.com/random/300x200?scrum",
      },
    ];

    setProjects(fakeProjects);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-6 relative">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            sort
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 ">
            hide
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-visible ">
        {projects.map((proj) => {
          return (
            <div
              className="transition-transform duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-lg"
              key={proj.id}
            >
              <Card
                name={proj.name}
                description={proj.description}
                date={proj.date}
                imgSrc={proj.imgSrc}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
